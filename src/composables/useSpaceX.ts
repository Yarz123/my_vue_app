import { ref, computed } from 'vue'
import type { Launch } from '../types'
import { watchEffect } from 'vue';



const API_URL = 'https://api.spacexdata.com/v5'

export const useSpaceX = () => {
    const nextLaunch = ref<Launch | null>(null)
    const pastLaunches = ref<Launch[]>([])
    const loading = ref(true)
    const selectedLaunch = ref<Launch | null>(null)

    const fetchData = async (url: string, options?: RequestInit) => {
        try {
            const response = await fetch(url, options)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            return await response.json()
        } catch (error) {
            console.error('Error fetching data:', error)
            throw error
        }
    }

    const fetchNextLaunch = async () => {
        try {
            const data = await fetchData(`${API_URL}/launches/next`)
            nextLaunch.value = normalizeLaunchData(data)
        } catch (error) {
            console.error('Error fetching next launch:', error)
            nextLaunch.value = null
        }
    }

    const fetchPastLaunches = async () => {
        try {
            const data = await fetchData(`${API_URL}/launches/query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: {},
                    options: {
                        sort: {
                            date_utc: 'desc'
                        },
                        limit: 20,
                        populate: [
                            { path: 'payloads', select: 'name type customers' },
                            { path: 'launchpad', select: 'name' }
                        ]
                    }
                })
            })
            pastLaunches.value = data.docs.map(normalizeLaunchData)
        } catch (error) {
            console.error('Error fetching past launches:', error)
            pastLaunches.value = []
        } finally {
            loading.value = false
        }
    }

    const fetchLaunchDetails = async (id: string) => {
        try {
            const data = await fetchData(`${API_URL}/launches/query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: { _id: id },
                    options: {
                        select: 'details links.flickr.original links.patch',
                        limit: 1,
                        populate: [
                            {
                                path: 'payloads',
                                select: 'name type customers',
                                populate: {
                                    path: 'customers',
                                    select: 'name'
                                }
                            },
                            {
                                path: 'launchpad',
                                select: 'name full_name locality region'
                            },
                            { // Nouveau - pour les cores
                                path: 'cores.core',
                                select: 'serial status'
                            }
                        ]
                    }
                })
            });

            if (!data.docs || data.docs.length === 0) {
                console.warn('Aucun lancement trouvé avec cet ID:', id);
                return null;
            }

            const launchData = data.docs[0];
            console.log('Données complètes reçues:', launchData); // Debug

            return normalizeLaunchData(launchData);
        } catch (error) {
            console.error('Erreur détaillée:', {
                error: error.message,
                stack: error.stack
            });
            return null;
        }
    };



    const selectLaunch = async (launch: Launch) => {
        selectedLaunch.value = await fetchLaunchDetails(launch.id)
    }

    const normalizeLaunchData = (launch: any): Launch => {
        const getDefaultDetails = () => {
            const date = launch.date_utc
                ? new Date(launch.date_utc).toLocaleDateString('fr-FR')
                : 'date inconnue';
            return `Lancement ${launch.success ? 'réussi' : 'échoué'} le ${date}. ` +
                `Vol ${launch.name || 'non nommé'} depuis ${launch.launchpad?.name || 'site inconnu'}.`;
        };

        return {
            upcoming: false,
            id: launch.id || '',
            name: launch.name || 'Mission sans nom',
            date_utc: launch.date_utc || new Date().toISOString(),
            success: launch.success ?? false,
            details: launch.details || getDefaultDetails(),
            links: {
                patch: {
                    small: launch.links?.patch?.small || null,
                    large: launch.links?.patch?.large || null
                },
                flickr: {
                    original: launch.links?.flickr?.original?.filter(url => url) ||
                        (launch.links?.patch?.large ? [launch.links.patch.large] : [])
                },
                webcast: launch.links?.webcast || null,
                youtube_id: launch.links?.youtube_id || null,
                article: launch.links?.article || null,
            },
            payloads: launch.payloads?.map((p: any) => ({
                id: p.id || '',
                name: p.name || 'Payload sans nom',
                type: p.type || 'Type inconnu',
                customers: p.customers || []
            })) || [],
            launchpad: {
                name: launch.launchpad?.name || 'Site de lancement inconnu'
            }
        }
    }

    const filteredLaunches = computed(() => pastLaunches.value)
    watchEffect(() => {
        console.log("Selected Launch Updated:", selectedLaunch.value);
    });
    // Charge les données initiales
    Promise.all([fetchNextLaunch(), fetchPastLaunches()])

    return {
        nextLaunch,
        pastLaunches,
        filteredLaunches,
        loading,
        selectedLaunch,
        selectLaunch,
        fetchLaunchDetails
    }
}