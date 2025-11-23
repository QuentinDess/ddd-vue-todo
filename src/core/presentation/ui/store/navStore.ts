import type { Component } from 'vue'

export const navActions = shallowReactive<Component[]>([])
export const navModules = shallowReactive<Component[]>([])
export const registerNavAction = (action: Component) => {
  navActions.push(action)
}

export const registerModuleAction = (module: Component) => {
  navModules.push(module)
}
