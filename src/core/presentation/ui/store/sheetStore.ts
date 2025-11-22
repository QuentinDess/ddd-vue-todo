import { ref } from 'vue'
import type { Component } from 'vue'

export const sheetOpen = ref(false)
export const sheetContent = shallowRef<Component | null>(null)

export const openSheet = (content: Component) => {
  sheetContent.value = content
  sheetOpen.value = true
}
export const closeSheet = () => {
  sheetOpen.value = false
  sheetContent.value = null
}
