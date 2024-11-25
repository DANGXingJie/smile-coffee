<template>
  <view class="flex flex-col h-screen">
    <view class="h-[595rpx]">
      <TnSwiper v-model="currentSwiperIndex" autoplay indicator indicator-type="dot" :data="swiperData" width="100%"
        height="595">
        <template #default="{ data }">
          <view class="w-full h-[595rpx] relative">
            <image class="w-full h-[595rpx]" :src="data" mode="aspectFill" />
            <view
              class="absolute bottom-8 left-8 w-[91rpx] h-[44rpx] bg-btnBg rounded-[29rpx] flex justify-center items-center">
              <TnIcon name="star-fill" size="17rpx" color="#fff" />
              <text class="text-[20rpx] text-white">4.8分</text>
            </view>
          </view>
        </template>
      </TnSwiper>
    </view>
    <view class="flex-1">
      <view class="mt-[48rpx] ml-[55rpx] h-[50rpx] text-[36rpx] font-bold"> cold brew cooffee </view>
      <view class="ml-[32rpx] mt-[16rpx]">
        <view class="w-[681rpx] flex justify-between">
          <view class="pl-4">经典咖啡</view>
          <view>¥ 34.75</view>
        </view>
        <view class="mt-[31rpx] h-[1rpx] w-[681rpx] ml-0 m-auto bg-firstGray"></view>
        <view class="mt-[24rpx] text-[24rpx] text-firstGray font-normal h-[68rpx] leading-[40rpx]">
          简单即是美味，臻选进口咖啡豆，萃取经典浓缩咖啡，以水调和，香气浓郁漫溢。
        </view>
        <view class="mt-[41rpx] flex justify-between">
          <view>数量</view>
          <TnNumberBox class="mr-[51rpx]" v-model="numberValue" />
        </view>
        <CategorySecect />
        <CategorySecect :title="'浓缩咖啡'" :category="cooffeeList" />
      </view>
      <view class="mt-[58rpx] ml-[55rpx]">经典搭配</view>
      <CoffeeItem />
    </view>
    <view class="mt-[22rpx] flex justify-between h-[151rpx] items-center shop-btn-bottom">
      <view class="w-10 ml-[81rpx]">
        <text class="pr-2">¥</text>36
      </view>
      <view class="flex h-[80rpx] pr-[26rpx]">
        <view class="mr-[22rpx]">
          <TnButton width="231rpx" plain height="82rpx" type="info">加入购物车</TnButton>
        </view>
        <TnButton width="231rpx" height="82rpx" type="success">购买</TnButton>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import TnSwiper from '@tuniao/tnui-vue3-uniapp/components/swiper/src/swiper.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnNumberBox from '@tuniao/tnui-vue3-uniapp/components/number-box/src/number-box.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import CoffeeItem from '@/components/coffee-item.vue'
import { ref } from 'vue'
import CategorySecect from '@/components/category-select.vue'
const currentSwiperIndex = ref(0)
// 轮播图数据
const swiperData = [
  'https://tse1-mm.cn.bing.net/th/id/OIP-C.tkqqmISI6HAyse8UinG5ygHaE8?rs=1&pid=ImgDetMain',
  'https://wh1.nutsbp.com/whimg/d8/df/d8/64/99/3f/15/a5/08/30/2c/55/6e/a2/bd/81.jpg',
]
const cooffeeList = [
  {
    id: 1,
    name: '标准',
  },
  {
    id: 2,
    name: '低因',
  },
]
const numberValue = ref(1)
</script>

<style scoped>
.carShopbtn {
  margin-right: 22rpx;
}

.shop-btn-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
