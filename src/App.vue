<script setup lang="ts">
import { ref, computed } from 'vue';
import NextLaunch from './components/NextLaunch.vue';
import LaunchFilter from './components/LaunchFilter.vue';
import LaunchCard from './components/LaunchCard.vue';
import LaunchModal from './components/LaunchModal.vue';
import { useSpaceX } from './composables/useSpaceX';



const { nextLaunch, pastLaunches, loading, selectedLaunch, selectLaunch } = useSpaceX();
const filter = ref<'all' | 'success' | 'failed'>('all');


const filteredLaunches = computed(() => {
  if (filter.value === 'success') {
    return pastLaunches.value.filter(launch => launch.success);
  } else if (filter.value === 'failed') {
    return pastLaunches.value.filter(launch => !launch.success);
  }
  return pastLaunches.value;
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">

    <header class="bg-gray-900 text-white py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold">SpaceX Launch Tracker</h1>
      </div>
    </header>


    <main class="container mx-auto px-4 py-8">

      <NextLaunch :launch="nextLaunch" v-if="!loading && nextLaunch" />


      <LaunchFilter v-model="filter" class="my-8" />

      <div v-if="loading" class="flex justify-center my-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>


      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LaunchCard
            v-for="launch in filteredLaunches.slice(0, 10)"
            :key="launch.id"
            :launch="launch"
            @click="selectLaunch(launch)"
            class="transition-transform hover:scale-105 cursor-pointer"
        />
      </div>


      <LaunchModal
          v-if="selectedLaunch"
          :launch="selectedLaunch"
          @close="selectedLaunch = null"
      />
    </main>
  </div>
</template>