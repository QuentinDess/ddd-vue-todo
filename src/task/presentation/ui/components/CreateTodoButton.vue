<script setup lang="ts">
import { Button } from '@/core/presentation/ui/components/button'
import { PlusIcon } from 'lucide-vue-next'
import { openSheet } from '@/core/presentation/ui/store/sheetStore.ts'
import CreateTodoForm from '@/task/presentation/ui/components/CreateTodoForm.vue'

const openTodoSheet = () => openSheet(CreateTodoForm)
</script>
<template>
  <Button
    @click="openTodoSheet"
    class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700 hover:border-b-green-950 hover:cursor-pointer"
  >
    <PlusIcon />
    Add Todo
  </Button>
</template>
