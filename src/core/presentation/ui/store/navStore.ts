import { reactive } from 'vue'
import type { Component } from 'vue'

export const navActions = reactive<Component[]>([])
export const navModules = reactive<Component[]>([])
export const registerNavAction = (action: Component) => {
  navActions.push(action)
}
