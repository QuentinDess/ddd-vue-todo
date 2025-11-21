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
        <template #fallback>
          <div
            class="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center w-full h-screen bg-background bg-opacity-90 z-50"
          ></div>
        </template>
      </Suspense>
    </RouterView>
  </MainLayout>
</template>
<style scoped></style>
