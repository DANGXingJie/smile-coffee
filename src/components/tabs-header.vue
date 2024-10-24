<template>
  <TnTabs @change="handleChange" v-model="currentTabIndex" active-color="#333333" bar-color="#FF902A" color="#B5B5B5"
    :bottom-shadow="false">
    <TnTabsItem v-for="(item, index) in tabsData" :key="index" :title="item.text" />
  </TnTabs>
</template>
<script setup lang="ts">
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import { ref, type PropType } from 'vue';
interface TabItem {
  text: string
}
const props = defineProps({
  tabsData: {
    type: Array as PropType<TabItem[]>,
    default: () => [
      { text: '本月上新' },
      { text: '咖啡豆' },
      { text: '甜品' },
      { text: '其他周边' },
    ]
  }
})
const currentTabIndex = ref(0)

const emit = defineEmits(['change'])
const handleChange = (index: any) => {
  // console.log('handleChange', index)
  currentTabIndex.value = index
  emit('change', currentTabIndex.value)
}

</script>


<style scoped></style>