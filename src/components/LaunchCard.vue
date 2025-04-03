<template>
  <div
      class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-transform hover:scale-105 cursor-pointer"
      @click="$emit('click')"
  >

    <div class="h-48 bg-gray-100 flex items-center justify-center p-4">
      <img
          v-if="launch.links?.patch?.small"
          :src="launch.links.patch.small"
          :alt="launch.name"
          class="max-h-full max-w-full"
      >
      <div v-else class="text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>


    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-bold truncate">{{ launch.name }}</h3>
        <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            :class="launch.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
        >
          {{ launch.success ? 'Réussi' : 'Échoué' }}
        </span>
      </div>

      <div class="flex items-center text-sm text-gray-500 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {{ formattedDate }}
      </div>

      <div v-if="launch.details" class="text-sm text-gray-600 line-clamp-2">
        {{ launch.details }}
      </div>
      <div v-else class="text-sm text-gray-400 italic">
        Aucun détail disponible
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Launch } from '../types'

const props = defineProps<{
  launch: Launch
}>()

defineEmits(['click'])

const formattedDate = computed(() => {
  return new Date(props.launch.date_utc).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
})
</script>