import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import VueRewards from 'vue-rewards'
import App from './App.vue'
import { registerModules } from '@/modules.ts'
export const router = createRouter({
  history: createWebHistory(),
  routes: []
})
try {
  const app = createApp(App)
  registerModules(router)

  app.use(createPinia())
  app.use(router)
  app.use(VueRewards, [])
  app.mount('#app')
} catch (error) {
  console.error(error)
}
