import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import VueRewards from 'vue-rewards'

export const router = createRouter({
  history: createWebHistory(),
  routes: []
})

import App from './App.vue'
import { registerModules } from '@/modules.ts'

registerModules(router)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueRewards)
app.mount('#app')
