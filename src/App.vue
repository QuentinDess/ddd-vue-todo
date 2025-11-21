<script setup lang="ts">
import MainLayout from '@/core/ui/layout/MainLayout.vue'
import Sonner from '@/core/ui/components/sonner/Sonner.vue'
import 'vue-sonner/style.css'
</script>

<template>
  <MainLayout>
    <Sonner rich-colors />
    <RouterView v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route.name" />
      </Suspense>
    </RouterView>
  </MainLayout>
</template>
<style scoped></style>
