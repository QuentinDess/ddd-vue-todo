<script setup lang="ts">
import TodoCard from '@/task/presentation/ui/components/TodoCard.vue'
import { useReward } from 'vue-rewards'
import { useUiEventStore } from '@/task/presentation/ui/stores/uiTodoEventStore.ts'
import { ApplicationTodoTransitionEvent } from '@/task/application/events/ApplicationTodoTransitionEvent.ts'

const todoStore = useTodoStore()

const uiEvents = useUiEventStore()
const { currentEvent } = storeToRefs(uiEvents)

const { todos } = storeToRefs(todoStore)
const { getTodos, deleteTodo, patchTodo, completeTodo, abortTodo } = useTodoStore()

/** Animation setup with vue Rewards **/
const { reward: fireConfetti } = useReward('transition-reward-origin', 'confetti', {
  startVelocity: 30,
  spread: 90,
  elementCount: 80,
  decay: 0.9,
  colors: ['#A45BF1', '#25C6F6', '#72F753', '#F76C88', '#F5F770']
})
const { reward: fireAngry } = useReward('transition-reward-aborted', 'emoji', {
  emoji: ['😡', '🔥'],
  elementCount: 80,
  startVelocity: 20,
  spread: 100,
  decay: 0.9,
  font: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, EmojiSymbols, sans-serif'
})

watch(currentEvent, (evt) => {
  if (!evt) return
  if (evt instanceof ApplicationTodoTransitionEvent) {
    if (evt.type === 'TodoComplete') {
      fireConfetti()
    }
    if (evt.type === 'TodoAborted') {
      fireAngry()
    }
    uiEvents.consume()
  }
})
await getTodos()
</script>

<template>
  <span
    id="transition-reward-origin"
    style="position: fixed; top: 10%; left: 50%; pointer-events: none"
  ></span>
  <span
    id="transition-reward-aborted"
    style="position: fixed; top: 10%; left: 50%; pointer-events: none"
  ></span>

  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
    <TodoCard
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @delete="(id) => deleteTodo(id)"
      @update="(updated) => patchTodo(updated)"
      @complete="(id) => completeTodo(id)"
      @abort="(id) => abortTodo(id)"
    />
  </div>
</template>

<style scoped></style>
