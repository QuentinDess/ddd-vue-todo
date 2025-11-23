<script setup lang="ts">
import { ChartColumnIncreasing } from 'lucide-vue-next'

const statisticStore = useStatisticStore()

const { statistic } = storeToRefs(statisticStore)
const { getStatistic } = useStatisticStore()
onMounted(async () => {
  await getStatistic()
})
</script>

<template>
  <div class="flex justify-between items-center gap-2">
    <ChartColumnIncreasing />
    {{ statistic?.totalCreated }}
  </div>
</template>
