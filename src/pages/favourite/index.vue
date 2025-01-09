<template>
  <TnSwitchTab inactive-bg-color="#ffffff" inactive-text-color="#333333" active-text-color="#FF902A"
    active-bg-color="#ffffff" v-model="currentTabIndex" :tabs="tabs" @change="handleChange">
    <view class="flex pl-[37rpx] justify-between mb-[26rpx]" v-for="(item, index) in 3">
      <view class="w-[678rpx] h-[172rpx] flex items-center relative">
        <view :class="currentTabIndex === 0 ? 'bg-successColor text-secondary' : 'bg-failColor text-firstGray'"
          class="w-[242rpx] h-full rounded-[15rpx] rounded-tr-[15rpx] rounded-br-[15rpx] flex items-center justify-center">
          <view :class="currentTabIndex === 0 ? 'text-successText' : 'text-firstGray'"
            class="relative w-[80rpx] h-[40rpx] text-[42rpx]">
            8.8
            <view class="absolute -bottom-[20rpx] right-0  text-[16rpx]">折 </view>
          </view>
        </view>
        <view class="h-[90rpx] border-1 border-pink-200 border-dashed"> </view>
        <view :class="currentTabIndex === 0 ? 'bg-successColor text-secondary' : 'bg-failColor text-firstGray'"
          class="w-[435rpx] h-full  rounded-[15rpx] rounded-tl-[15rpx] rounded-bl-[15rpx] flex flex-col justify-center  discount">
          <view class="text-[30rpx] pl-[39rpx] font-bold">经典咖啡</view>
          <view class="text-[16rpx] pl-[39rpx] mt-[18rpx]">到期时间：2022-07-02</view>
        </view>
        <image class="absolute w-[138rpx] h-[121rpx] top-0 right-0"
          :src="currentTabIndex === 0 ? conponBgSuccess : conponBgFail" mode="aspectFit" lazy-load="false" />
        <view class="text-[26rpx] absolute top-[35rpx] right-[15rpx] font-bold text-white text-info">折扣券</view>
      </view>
    </view>
  </TnSwitchTab>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TnSwitchTab from '@tuniao/tnui-vue3-uniapp/components/switch-tab/src/switch-tab.vue'
import conponBgSuccess from '@/static/images/conpon.png'
import conponBgFail from '@/static/images/conpon-fail.png'
// 当前选中的标签索引
const currentTabIndex = ref(0)
const tabs = ['即将过期', '已过期']
//切换标签
const handleChange = (index: number) => {
  console.log("切换标签", index)
  currentTabIndex.value = index
}
</script>

<style scoped>
.text-info {
  width: 78rpx;
  height: 36rpx;
  opacity: 1;
  transform: rotate(41.15deg);
}
</style>
