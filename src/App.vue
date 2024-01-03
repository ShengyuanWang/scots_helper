<script setup>
import { computed } from '@vue/runtime-core';
import { useRoute } from 'vue-router';

const route = useRoute();
const key = computed(() => {
  return route.fullPath
});

</script>

<template>

  <router-view :key="key"></router-view>
</template>

<style scoped>
.fullscreen{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #e6f2f9;
}
</style>