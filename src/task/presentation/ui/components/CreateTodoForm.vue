<script setup lang="ts">
import { PlusIcon } from 'lucide-vue-next'
import type { ICreateTodoCommand } from '@/task/application/command/CreateTodo/ICreateTodoCommand.ts'
const { createTodo } = useTodoStore()
import { closeSheet } from '@/core/presentation/ui/store/sheetStore.ts'

const createTodoFormData = {
  title: '',
  description: '',
  due_date: '2025-11-24'
}
const submit = async (data: ICreateTodoCommand) => {
  try {
    await createTodo({ ...data })
    closeSheet()
  } catch (_error) {
    console.error(_error)
  }
}
</script>

<template>
  <div class="flex h-full flex-col p-6">
    <div class="mb-4">
      <h2 class="text-xl font-semibold">Add Todo</h2>
    </div>

    <div class="flex-1 overflow-y-auto pr-2">
      <FormKit
        type="form"
        @submit="submit"
        :config="{
          validationVisibility: 'submit'
        }"
        :actions="false"
        :classes="{
          form: 'space-y-4',
          input: 'font-medium'
        }"
      >
        <FormKit
          type="text"
          name="title"
          id="title"
          label="Title"
          placeholder="New Todo"
          validation="required"
          v-model="createTodoFormData.title"
          :classes="{
            outer: 'space-y-1',
            label: 'text-sm font-medium',
            input: 'w-full rounded-md border px-3 py-2 shadow-sm'
          }"
        />

        <FormKit
          type="textarea"
          name="description"
          id="description"
          label="Description"
          placeholder="Task description"
          validation="required"
          v-model="createTodoFormData.description"
          :classes="{
            outer: 'space-y-1',
            label: 'text-sm font-medium',
            input: 'w-full rounded-md border px-3 py-2 shadow-sm min-h-[120px]'
          }"
        />

        <FormKit
          type="date"
          v-model="createTodoFormData.due_date"
          label="Due Date"
          id="dueDate"
          name="dueDate"
          help="When is the deadline"
          validation="required"
          validation-visibility="live"
        />
        <FormKit type="submit">
          <PlusIcon class="w-4 h-4" />
          Add a Todo
        </FormKit>
      </FormKit>
    </div>
  </div>
</template>
