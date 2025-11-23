<script setup lang="ts">
import { LucideThumbsDown } from 'lucide-vue-next'
const statisticStore = useStatisticStore()

const { statistic } = storeToRefs(statisticStore)
const { getStatistic } = useStatisticStore()
onMounted(async () => {
  await getStatistic()
})
</script>

<template>
  <div class="flex justify-between items-center gap-2">
    <LucideThumbsDown />
    {{ statistic?.totalAborted }}
  </div>
</template>
