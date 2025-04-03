<script setup lang="ts">
import { ref } from 'vue'
import type { Launch } from '../types'

defineProps<{
  launch: Launch
}>()


console.log('Données reçues dans le modal:', props.launch)

const emit = defineEmits(['close'])
const showVideo = ref(false)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR')
}

const getFirstImage = (images: string[]): string | undefined => {
  return images.length > 0 ? images[0] : undefined
}

</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
      <div class="p-6 text-black"> <!-- Ajout de text-black ici -->

        <div class="flex justify-between items-start mb-4">
          <h2 class="text-2xl font-bold text-black">{{ launch?.name }}</h2> <!-- Texte en noir -->
          <button @click="emit('close')" class="text-black hover:text-gray-700"> <!-- Texte en noir -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
            <!-- Date -->
            <div class="mb-4">
              <h3 class="text-lg font-semibold mb-2 text-black">Date de lancement</h3>
              <p class="text-black">{{ formatDate(launch.date_utc) }}</p>
            </div>

            <!-- Détails -->
            <div class="mb-4">
              <h3 class="text-lg font-semibold mb-2 text-black">Détails de la mission</h3>
              <p class="text-black whitespace-pre-line">
                {{ launch.details || 'No mission details available' }}
              </p>
            </div>

            <!-- Lieu -->
            <div class="mb-4">
              <h3 class="text-lg font-semibold mb-2 text-black">Lieu de lancement</h3>
              <p class="text-black">{{ launch.launchpad?.name || 'Unknown launchpad' }}</p>
            </div>

            <!-- Payloads -->
            <div class="mb-4">
              <h3 class="text-lg font-semibold mb-2 text-black">Chargements (Payloads)</h3>
              <ul class="list-disc pl-5 text-black">
                <li v-for="payload in launch.payloads" :key="payload.id">
                  {{ payload.name }} ({{ payload.type || 'Unknown type' }})
                </li>
                <li v-if="launch.payloads.length === 0">Aucun chargement enregistré</li>
              </ul>
            </div>

            <!-- Clients -->
            <div class="mb-4">
              <h3 class="text-lg font-semibold mb-2 text-black">Clients</h3>
              <ul class="list-disc pl-5 text-black">
                <li v-for="(customer, index) in Array.from(new Set(launch.payloads.flatMap(p => p.customers || [])))"
                    :key="index">
                  {{ customer }}
                </li>
                <li v-if="launch.payloads.flatMap(p => p.customers || []).length === 0">
                  Aucun client enregistré
                </li>
              </ul>
            </div>

            <!-- Article -->
            <div v-if="launch.links.article" class="mb-4">
              <h3 class="text-lg font-semibold mb-2 text-black">Article</h3>
              <a :href="launch.links.article" target="_blank"
                 class="text-black hover:underline break-all">
                {{ launch.links.article }}
              </a>
            </div>
          </div>


          <div>
            <!-- Image -->
            <div class="mb-4">
              <h3 class="text-lg font-semibold mb-2 text-black">Image de la mission</h3>
              <img v-if="getFirstImage(launch.links.flickr.original)"
                   :src="getFirstImage(launch.links.flickr.original)"
                   :alt="launch.name"
                   class="w-full h-auto rounded-lg max-h-64 object-cover">
              <div v-else class="bg-gray-200 h-64 flex items-center justify-center rounded-lg">
                <span class="text-black">Aucune image disponible</span>
              </div>
            </div>


            <div v-if="launch.links.youtube_id" class="mt-4">
              <div class="flex items-center mb-2">
                <input type="checkbox" id="showVideo" v-model="showVideo" class="mr-2">
                <label for="showVideo" class="text-black">Afficher la vidéo YouTube</label>
              </div>

              <div v-if="showVideo" class="aspect-w-16 aspect-h-9">
                <iframe :src="`https://www.youtube.com/embed/${launch.links.youtube_id}`"
                        class="w-full h-64 rounded-lg"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.whitespace-pre-line {
  white-space: pre-line;
}
</style>