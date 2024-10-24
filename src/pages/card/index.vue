<template>
  <view class="w-full h-[800rpx] flex flex-col">
    <SearchHeader />
    <TabsHeader :tabsData="tabsData" class="pl-[53rpx]" @change="handleChange" />
    <view class="grid grid-cols-2 gap-x-[42rpx] gap-y-[43rpx] pl-[35rpx] pr-[35rpx] grid-container mt-2">
      <template v-for="(item, index) in items" :key="index">
        <view class="w-[330rpx] h-[506rpx] rounded-[15rpx] opacity-100 bg-white shadow-md" @click="handleDetail(item)">
          <image class="w-[310rpx] h-[315rpx] text-center mr-[10rpx] ml-[10rpx]" src="/static/images/list-4.png"
            mode="aspectFill" lazy-load="false" />
          <view class="m-[12rpx] text-[28rpx] font-bold text-secondary">{{ item.name }}</view>
          <view class="w-full flex justify-between">
            <view class="pl-[15rpx] text-[20rpx] text-firstGray"> {{ item.desc }}</view>
            <view class="pr-[48rpx] text-[18rpx] text-btnBg"> {{ item.score }}</view>
          </view>
          <view class="mt-2 w-full flex justify-between items-center">
            <view class="pl-[15rpx] text-[32rpx]"><text class="mr-[7rpx]">¥</text>{{ item.price }}</view>
            <view class="w-[102rpx] h-[69rpx] rounded-[26rpx] bg-secondGray flex justify-center items-center mr-[21rpx]">
              <TnIcon name="add" type="info" color="#ffffff" size="22rpx" bold />
            </view>
          </view>
        </view>
      </template>
    </view>
  </view>
</template>

<script setup lang="ts">
import SearchHeader from '@/components/search-header.vue'
import TabsHeader from '@/components/tabs-header.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { computed, ref } from 'vue';

const handleChange = (index: any) => {
  // eslint-disable-next-line no-console
  console.log('handleChange', index)
}
const tabsData = [
  { text: '全部' },
  { text: '必点' },
  { text: '经典咖啡' },
  { text: '拿铁' },
  { text: '甜品' },
]
const items = ref([
  {
    id: 1,
    name: 'cold brew',
    price: 34.75,
    img: '/static/images/list-4.png',
    desc: 'cold brew',
    score: 4.5
  }
  , {
    id: 2,
    name: 'cold brew',
    price: 34.75,
    img: '/static/images/list-4.png',
    desc: 'cold brew',
    score: 4.5
  }
  , {
    id: 3,
    name: 'cold brew',
    price: 34.75,
    img: '/static/images/list-4.png',
    desc: 'cold brew',
    score: 4.5
  }
  , {
    id: 4,
    name: 'cold brew',
    price: 34.75,
    img: '/static/images/list-4.png',
    desc: 'cold brew',
    score: 4.5
  }
  // 可以有更多项
]);
/**
 * 动态计算行数
 */
const rows = computed(() => {
  const rowCount = Math.ceil(items.value.length / 2);
  return `repeat(${rowCount}, 1fr)`;
});

const handleDetail = (item: any) => {
  // eslint-disable-next-line no-console
  console.log('handleDetail', item)
  uni.navigateTo({
    url: '/subpkg_pages/coffee/detail'
  })
}
</script>
<style scoped>
.grid-container {
  grid-template-rows: v-bind(rows);
  /* 动态计算行数 */
}
</style>
