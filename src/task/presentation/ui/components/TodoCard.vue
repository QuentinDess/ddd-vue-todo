<script setup lang="ts">
import { CheckCircle, Pencil, Trash, Ban } from 'lucide-vue-next'
import { Card, CardContent, CardHeader } from '@/core/ui/components/card'
import { Button } from '@/core/ui/components/button'
import { Badge } from '@/core/ui/components/badge'
import { TodoViewModel } from '@/task/presentation/view/TodoViewModel.ts'
import { computed } from 'vue'

const props = defineProps<{
  todo: TodoViewModel
}>()

const badgeClass = computed(() => {
  const badgeClassMap = new Map<string, string>([
    ['completed', 'bg-green-600 border-green-800'],
    ['in_progress', 'bg-blue-600 border-blue-800'],
    ['aborted', 'bg-red-600 border-red-800']
  ])
  return badgeClassMap.get(props.todo.status) ?? ''
})

const cardClass = computed(() => {
  const cardClassMap = new Map<string, string>([
    ['completed', 'bg-green-300 border-green-400'],
    ['in_progress', 'bg-blue-300 border-blue-400'],
    ['aborted', 'bg-red-300 border-red-400']
  ])
  return cardClassMap.get(props.todo.status) ?? ''
})

const canBeCompleted = computed(() => {
  return props.todo.status !== 'completed'
})
const isCompleted = computed(() => {
  return props.todo.status === 'completed'
})

const canBeAborted = computed(() => {
  return props.todo.status !== 'aborted' && props.todo.status !== 'completed'
})

const emits = defineEmits<{
  (e: 'delete', id: string): void
  (e: 'complete', id: string): void
  (e: 'abort', id: string): void
}>()
</script>

<template>
  <Card
    class="border shadow-sm hover:shadow-md transition-shadow rounded-xl cursor-pointer select-none"
    :class="cardClass"
  >
    <CardHeader class="flex flex-row items-start justify-between py-3">
      <!-- Checkbox + Title -->
      <div class="flex items-start gap-3">
        <div class="flex flex-col">
          <Badge variant="secondary" :class="badgeClass">
            {{ todo.status }}
          </Badge>
          <h3 class="text-gray-900 font-medium text-base" :class="{ 'line-through ': isCompleted }">
            {{ todo.title }}
          </h3>
          <p class="text-xs text-gray-500 mt-1">Created: {{ todo.createdAt }}</p>
          <p class="text-xs text-gray-500 mt-1">Due Date: {{ todo.dueDate }}</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="grid-cols-2 grid gap-2">
        <Button
          v-if="canBeCompleted"
          variant="ghost"
          size="icon"
          class="h-8 w-8 text-green-600 hover:text-green-700 hover:cursor-pointer"
          @click="emits('complete', todo.id)"
        >
          <CheckCircle class="h-4 w-4" />
        </Button>
        <Button
          v-if="canBeAborted"
          variant="ghost"
          size="icon"
          class="h-8 w-8 text-red-600 hover:text-ored-700 hover:cursor-pointer"
          @click="emits('abort', todo.id)"
        >
          <Ban class="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" class="h-8 w-8 hover:cursor-pointer">
          <Pencil class="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8 text-red-600 hover:text-red-600 hover:cursor-pointer"
          @click="emits('delete', todo.id)"
        >
          <Trash class="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>

    <CardContent class="pb-4 flex items-center justify-center">
      <p class="text-sm text-gray-600">{{ todo.description }}</p>
    </CardContent>
  </Card>
</template>
