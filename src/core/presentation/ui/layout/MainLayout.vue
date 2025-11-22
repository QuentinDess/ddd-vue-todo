<script setup lang="ts">
import TopNavBar from '@/core/presentation/ui/layout/TopNavBar.vue'
import { Sheet, SheetContent } from '@/core/presentation/ui/components/sheet'
import { sheetOpen, sheetContent } from '@/core/presentation/ui/store/sheetStore.ts'
</script>

<template>
  <div class="flex flex-col min-h-screen transition-[margin]">
    <TopNavBar />
    <Sheet v-model:open="sheetOpen">
      <SheetContent class="w-[500px]">
        <component v-if="sheetContent" :is="sheetContent" />
      </SheetContent>
    </Sheet>

    <main class="flex-1 flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <slot name="content-slot" />
    </main>
  </div>
</template>

<style scoped></style>
