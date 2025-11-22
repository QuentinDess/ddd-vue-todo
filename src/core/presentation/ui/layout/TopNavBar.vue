<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Sun, MoonIcon } from 'lucide-vue-next'
import { Button } from '@/core/presentation/ui/components/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/core/presentation/ui/components/avatar'
import { navActions, navModules } from '@/core/presentation/ui/store/navStore.ts'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <nav class="h-16 w-screen border-b bg-muted/40 flex items-center px-6">
    <div class="flex-1 flex items-center">
      <component v-for="(Module, i) in navModules" :key="i" :is="Module" />
    </div>

    <div class="flex items-center gap-2">
      <component v-for="(Action, i) in navActions" :key="i" :is="Action" />
      <Button @click="toggleDark()" class="w-8 h-8 hover:cursor-pointer">
        <Transition name="scale" mode="out-in">
          <Sun v-if="isDark" />
          <MoonIcon v-else />
        </Transition>
      </Button>
      <div class="w-8 h-8">
        <Avatar>
          <AvatarImage src="https://github.com/QuentinDess.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: transform 0.2s;
}
.scale-enter-form,
.scale-leave-to {
  transform: scale(0.3);
}
</style>
