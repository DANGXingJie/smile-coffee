<template>
  <view class="mt-[41rpx]">
    <view>{{ props.title }}</view>
    <view class="mt-[26rpx] w-[700rpx] m-auto grid grid-rows-2 grid-cols-3 gap-x-[94rpx] gap-y-[23rpx]">
      <template v-for="(item, index) in props.category" :key="index">
        <view class="w-[149rpx] flex items-center justify-center h-[51rpx] opacity-100 rounded-[10rpx]"
          :class="curreyKey === item.id ? 'bg-btnBg text-white' : 'bg-firstGray'" @click="handleSelect(item)">
          {{ item.productAttribute }}</view>
      </template>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, type PropType } from 'vue'
interface CategoryItem {
  id: number
  productAttribute: string
}
const props = defineProps({
  category: {
    type: Array as PropType<CategoryItem[]>,
    default: () => [
      {
        id: 1,
        name: '热',
      },
      {
        id: 2,
        name: '微热',
      },
      {
        id: 3,
        name: '常温',
      },
      {
        id: 4,
        name: '少冰',
      },
      {
        id: 5,
        name: '去冰',
      },
      {
        id: 6,
        name: '全冰',
      },
    ],
  },
  title: {
    type: String,
    default: '温度',
  },
})
const curreyKey = ref(1)

const emit = defineEmits(['select'])

const handleSelect = (item: any) => {
  //console.log(id)
  curreyKey.value = item.id
  emit('select', item)
}
</script>
<style scoped>
.bg-firstGray {
  background-color: #f2f2f2;
}
</style>
