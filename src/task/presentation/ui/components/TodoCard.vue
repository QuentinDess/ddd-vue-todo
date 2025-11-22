<script setup lang="ts">
import { FlagIcon, CheckCircle, Pencil, Trash, Ban } from 'lucide-vue-next'
import { Card, CardContent, CardHeader } from '@/core/presentation/ui/components/card'
import { Button } from '@/core/presentation/ui/components/button'
import { Badge } from '@/core/presentation/ui/components/badge'
import { TodoViewModel } from '@/task/presentation/view/TodoViewModel.ts'
import { computed, ref, watch } from 'vue'
import type { IPatchTodoCommand } from '@/task/application/command/PatchTodo/IPatchTodoCommand.ts'
import { useErrorStore } from '@/core/presentation/ui/store/error.ts'
const errorStore = useErrorStore()
const { activeError } = storeToRefs(errorStore)

const props = defineProps<{
  todo: TodoViewModel
}>()
const isEditMode = ref<boolean>(false)

const editableTodo = ref<Partial<IPatchTodoCommand>>({
  title: props.todo.title,
  description: props.todo.description
})

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
watch(activeError, () => {
  if (activeError) {
    console.log(activeError)
    editableTodo.value = {
      title: props.todo.title,
      description: props.todo.description
    }
    useErrorStore().clearActiveError()
  }
})

const isCompleted = computed(() => {
  return props.todo.status === 'completed'
})
const canBeEdited = computed(() => {
  return props.todo.status !== 'aborted' && props.todo.status !== 'completed'
})
const startEditing = () => {
  editableTodo.value = {
    title: props.todo.title,
    description: props.todo.description
  }
  isEditMode.value = true
}

const emits = defineEmits<{
  (e: 'delete', id: string): void
  (e: 'complete', id: string): void
  (e: 'abort', id: string): void
  (e: 'update', updated: Partial<IPatchTodoCommand> & { id: string }): void
}>()

const sendUpdate = async (): Promise<void> => {
  emits('update', {
    id: props.todo.id,
    ...editableTodo.value
  })
  isEditMode.value = false
}
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
          <h3
            v-if="!isEditMode"
            class="text-gray-900 font-medium text-base px-1 py-1 my-1"
            :class="{ 'line-through': isCompleted }"
          >
            {{ todo.title }}
          </h3>

          <input
            v-else
            v-model="editableTodo.title"
            class="font-medium text-base p-0 border text-gray-900 w-full border-b-black focus:outline-none py-1 my-1"
            :disabled="isCompleted"
          />
          <p class="text-xs text-gray-500 mt-1">Created: {{ todo.createdAt }}</p>
          <p class="text-xs text-gray-500 mt-1">Due Date: {{ todo.dueDate }}</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="grid-cols-2 grid gap-2">
        <Button
          v-if="canBeEdited"
          variant="ghost"
          size="icon"
          class="h-8 w-8 text-green-600 hover:text-green-700 hover:cursor-pointer"
          @click="emits('complete', todo.id)"
        >
          <FlagIcon class="h-4 w-4" />
        </Button>
        <Button
          v-if="canBeEdited"
          variant="ghost"
          size="icon"
          class="h-8 w-8 text-red-600 hover:text-ored-700 hover:cursor-pointer"
          @click="emits('abort', todo.id)"
        >
          <Ban class="h-4 w-4" />
        </Button>
        <Button
          v-if="canBeEdited && !isEditMode"
          variant="ghost"
          size="icon"
          class="h-8 w-8 hover:cursor-pointer"
          @click="startEditing"
        >
          <Pencil class="h-4 w-4" />
        </Button>
        <Button
          v-if="isEditMode && canBeEdited"
          variant="ghost"
          size="icon"
          class="h-8 w-8 text-green-600 hover:text-green-700 hover:cursor-pointer"
          @click="sendUpdate"
        >
          <CheckCircle class="h-4 w-4" />
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
      <p v-if="!isEditMode" class="text-sm text-gray-600">{{ todo.description }}</p>
      <div
        v-else
        class="grid w-full py-2 border-b border-black text-gray-600 text-sm [&>textarea]:text-inherit [&>textarea]:resize-none [&>textarea]:overflow-hidden [&>textarea]:[grid-area:1/1/2/2] after:[grid-area:1/1/2/2] after:whitespace-pre-wrap after:invisible after:content-[attr(data-cloned-val)] after:border-b after:border-black"
        :data-cloned-val="editableTodo.description"
      >
        <textarea
          v-model="editableTodo.description"
          class="appearance-none outline-none bg-transparent"
          rows="1"
        ></textarea>
      </div>
    </CardContent>
  </Card>
</template>
