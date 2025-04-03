<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-3 text-gray-800">Filtrer les lancements</h3>
    <div class="flex gap-3">

      <button
          @click="updateFilter('all')"
          :class="{
          'bg-blue-600 text-white shadow-md': modelValue === 'all',
          'bg-white text-white-800 border border-gray-300 hover:bg-gray-50': modelValue !== 'all'
        }"
          class="px-4 py-2 rounded-md transition-all duration-200 font-medium"
      >
        Tous
      </button>


      <button
          @click="updateFilter('success')"
          :class="{
          'bg-green-600 text-white shadow-md': modelValue === 'success',
          'bg-white text-white-800 border border-gray-300 hover:bg-gray-50': modelValue !== 'success'
        }"
          class="px-4 py-2 rounded-md transition-all duration-200 font-medium"
      >
        Réussis
      </button>


      <button
          @click="updateFilter('failed')"
          :class="{
          'bg-red-600 text-white shadow-md': modelValue === 'failed',
          'bg-white text-white-800 border border-gray-300 hover:bg-gray-50': modelValue !== 'failed'
        }"
          class="px-4 py-2 rounded-md transition-all duration-200 font-medium"
      >
        Échoués
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: 'all' | 'success' | 'failed'
}>()

const emit = defineEmits(['update:modelValue'])

const updateFilter = (value: 'all' | 'success' | 'failed') => {
  emit('update:modelValue', value)
}
</script>