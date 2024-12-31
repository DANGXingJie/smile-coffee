<template>
  <TnTabs v-model="currentTabIndex" active-color="#333333" bar-color="#FF902A" color="#B5B5B5" :bottom-shadow="false">
    <TnTabsItem @click="handleChange(item, index)" v-for="(item, index) in tabsData" :key="index"
      :title="item.categoryName" />
  </TnTabs>
</template>
<script setup lang="ts">
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import { ref, type PropType } from 'vue';
interface TabItem {
  categoryName: string
}
const props = defineProps({
  tabsData: {
    type: Array as PropType<TabItem[]>,
    default: () => [
      { categoryName: '本月上新' },
      { tcategoryNameext: '咖啡豆' },
      { categoryName: '甜品' },
      { categoryName: '其他周边' },
    ]
  }
})
const currentTabIndex = ref(0)
const emit = defineEmits(['change'])
const handleChange = (item: any, index: number) => {
  currentTabIndex.value = index
  emit('change', item.categoryId)
}
</script>


<style scoped></style>