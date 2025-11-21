<script setup lang="ts">
import TodoCard from '@/task/presentation/ui/components/TodoCard.vue'

const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)

const { getTodos, deleteTodo } = useTodoStore()
await getTodos()

const edit = async (): Promise<void> => {}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
    <TodoCard v-for="todo in todos" :key="todo.id" :todo="todo" @delete="(id) => deleteTodo(id)" />
  </div>
</template>

<style scoped></style>
