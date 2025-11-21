import type { ErrorViewModel } from '@/core/ui/view/ErrorViewModel.ts'
import { toast } from 'vue-sonner'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<ErrorViewModel | null>(null)

  const setActiveError = (error: ErrorViewModel): void => {
    activeError.value = error

    toast.error('Issue have been retrieved', {
      position: 'top-right',
      duration: 3000,
      description: activeError.value.message
    })

    clearActiveError()
  }
  const clearActiveError = (): void => {
    activeError.value = null
  }

  return {
    activeError,
    setActiveError,
    clearActiveError
  }
})
