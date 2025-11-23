<script setup lang="ts">
import VueSpeedometer from 'vue-speedometer'
const statisticStore = useStatisticStore()

const { statistic } = storeToRefs(statisticStore)
const { getStatistic } = useStatisticStore()
onMounted(async () => {
  await getStatistic()
})
</script>

<template>
  <div class="flex justify-between items-center gap-2 mx-auto">
    <h3 class="text-lg">Performance</h3>

    <VueSpeedometer
      :value="statistic?.performanceScore"
      :min-value="0"
      :max-value="100"
      :width="100"
      :height="75"
      :segments="3"
      :segment-colors="['#ef4444', '#facc15', '#22c55e']"
      :needle-height-ratio="0.4"
      needle-color="white"
      :ring-width="20"
      :max-segment-labels="0"
      currentValueText=" "
      :custom-segment-labels="[]"
    />
  </div>
</template>
