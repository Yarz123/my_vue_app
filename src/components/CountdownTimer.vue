<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps<{
  targetDate: string
}>()

const timePassed = ref({
  years: 0,
  months: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

const isPastLaunch = computed(() => {
  return new Date(props.targetDate).getTime() < Date.now()
})

const updateTime = () => {
  const launchDate = new Date(props.targetDate)
  const now = new Date()
  const diff = now.getTime() - launchDate.getTime()

  if (diff > 0) {
    // Calcul du temps écoulé
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    timePassed.value = {
      years: Math.floor(days / 365),
      months: Math.floor((days % 365) / 30),
      days: days % 30,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60
    }
  }
}

let interval: number

onMounted(() => {
  updateTime()
  interval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div v-if="isPastLaunch" class="flex flex-wrap gap-2">
    <div v-if="timePassed.years > 0" class="bg-gray-200 rounded p-2 text-center min-w-[60px]">
      <div class="text-2xl font-bold">{{ timePassed.years }}</div>
      <div class="text-xs">années</div>
    </div>
    <div v-if="timePassed.months > 0" class="bg-gray-200 rounded p-2 text-center min-w-[60px]">
      <div class="text-2xl font-bold">{{ timePassed.months }}</div>
      <div class="text-xs">mois</div>
    </div>
    <div class="bg-gray-200 rounded p-2 text-center min-w-[60px]">
      <div class="text-2xl font-bold">{{ timePassed.days }}</div>
      <div class="text-xs">jours</div>
    </div>
    <div class="bg-gray-200 rounded p-2 text-center min-w-[60px]">
      <div class="text-2xl font-bold">{{ timePassed.hours }}</div>
      <div class="text-xs">heures</div>
    </div>
    <div class="bg-gray-200 rounded p-2 text-center min-w-[60px]">
      <div class="text-2xl font-bold">{{ timePassed.minutes }}</div>
      <div class="text-xs">minutes</div>
    </div>
    <div class="bg-gray-200 rounded p-2 text-center min-w-[60px]">
      <div class="text-2xl font-bold">{{ timePassed.seconds }}</div>
      <div class="text-xs">secondes</div>
    </div>
  </div>
  <div v-else class="flex gap-2">

    <div class="bg-gray-900 text-white rounded p-2 text-center min-w-[60px]">
      <div class="text-2xl font-bold">{{ timePassed.days }}</div>
      <div class="text-xs">jours</div>
    </div>

  </div>
</template>