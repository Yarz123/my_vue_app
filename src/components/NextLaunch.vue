<script setup lang="ts">
import CountdownTimer from './CountdownTimer.vue'
import type { Launch } from '../types'

const props = defineProps<{
  launch: Launch
}>()

const launchDate = new Date(props.launch.date_utc)
const isPastLaunch = launchDate.getTime() < Date.now()
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-8">
    <h2 class="text-2xl font-bold mb-4">
      {{ isPastLaunch ? 'Dernier lancement' : 'Prochain lancement' }}
    </h2>
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h3 class="text-xl font-semibold">{{ launch.name }}</h3>
        <p class="text-gray-600">
          {{ isPastLaunch ? 'Lancé le' : 'Prévu le' }}
          {{ launchDate.toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }) }}
        </p>
      </div>
      <CountdownTimer :target-date="launch.date_utc" />
    </div>
  </div>
</template>