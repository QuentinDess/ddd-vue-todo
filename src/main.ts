import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import VueRewards from 'vue-rewards'
import { plugin } from '@formkit/vue'
import defaultConfig from '../formkit.config.ts'
import App from './App.vue'
import { registerModules } from '@/modules.ts'
export const router = createRouter({
  history: createWebHistory(),
  routes: []
})

const app = createApp(App)
await registerModules(router)
app.use(createPinia())
app.use(router)

app.use(plugin, defaultConfig)
app.use(VueRewards, [])
app.mount('#app')
