<script setup lang="ts"></script>

<template>
  <div class="flex flex-col transition-[margin]">
    <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl"></h1>
      </div>
      <slot />
    </main>
  </div>
</template>

<style scoped></style>
