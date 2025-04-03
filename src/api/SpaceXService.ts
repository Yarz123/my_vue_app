export interface Launch {
    id: string;
    name: string;
    date_utc: string;
    success: boolean | null;
    details: string | null;
    links: {
        article?: string | null;
        flickr_images: string[];
        webcast?: string | null;
    };
    launchpad: string;
    payloads: string[];
    customers: string[];
}

// 🚀 Récupérer tous les lancements
export const getLaunches = async (): Promise<Launch[]> => {
    try {
        const response = await fetch('https://api.spacexdata.com/v5/launches');
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des lancements:', error);
        return [];
    }
};

// 🚀 Récupérer le prochain lancement
export const getNextLaunch = async (): Promise<Launch | null> => {
    try {
        const response = await fetch('https://api.spacexdata.com/v5/launches/next');
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération du prochain lancement:', error);
        return null;
    }
};

// 🚀 Récupérer les 10 derniers lancements avec filtre (tous, réussis, échoués)
export const getLastLaunches = async (filter: 'all' | 'success' | 'failed'): Promise<Launch[]> => {
    try {
        const response = await fetch('https://api.spacexdata.com/v5/launches/past');
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        let launches: Launch[] = await response.json();

        // Trier les lancements par date décroissante et prendre les 10 derniers
        launches = launches.sort((a, b) => new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime()).slice(0, 10);

        if (filter === 'success') {
            return launches.filter(launch => launch.success === true);
        } else if (filter === 'failed') {
            return launches.filter(launch => launch.success === false);
        }
        return launches;
    } catch (error) {
        console.error('Erreur lors de la récupération des derniers lancements:', error);
        return [];
    }
};