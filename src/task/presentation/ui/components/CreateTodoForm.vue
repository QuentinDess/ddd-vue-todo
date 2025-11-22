<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/core/presentation/ui/components/button'
import { PlusIcon } from 'lucide-vue-next'

const title = ref('')
const description = ref('')

const submit = (data: any) => {
  console.log('Creating task:', data)
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
        submit-label="Create Todo"
        :classes="{
          form: 'space-y-4',
          input: 'font-medium',
          button:
            'px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700 hover:border-b-green-950 hover:cursor-pointer'
        }"
      >
        <FormKit
          type="text"
          name="name"
          id="name"
          label="Name"
          placeholder="My new task"
          validation="required|length:1,255"
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
          validation="length:0,500"
          :classes="{
            outer: 'space-y-1',
            label: 'text-sm font-medium',
            input: 'w-full rounded-md border px-3 py-2 shadow-sm min-h-[120px]'
          }"
        />
      </FormKit>
    </div>
  </div>
</template>
