<template>
  <div class="mb-6">
    <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
    <div class="p-3 border rounded-lg">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>