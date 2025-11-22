<script setup lang="ts">
import TodoCard from '@/task/presentation/ui/components/TodoCard.vue'
import type { IPatchTodoCommand } from '@/task/application/PatchTodo/IPatchTodoCommand.ts'

const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)

const { getTodos, deleteTodo, patchTodo } = useTodoStore()
await getTodos()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
    <TodoCard
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @delete="(id) => deleteTodo(id)"
      @update="(updated) => patchTodo(updated)"
    />
  </div>
</template>

<style scoped></style>
