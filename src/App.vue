<script setup lang="ts">
import MainLayout from '@/core/presentation/ui/layout/MainLayout.vue'
import Sonner from '@/core/presentation/ui/components/sonner/Sonner.vue'
import 'vue-sonner/style.css'
</script>

<template>
  <MainLayout>
    <template v-slot:content-slot>
      <Sonner rich-colors />
      <RouterView v-slot="{ Component, route }">
        <Suspense v-if="Component" :timeout="0">
          <Component :is="Component" :key="route.name" />
        </Suspense>
      </RouterView>
    </template>
  </MainLayout>
</template>
<style scoped></style>
