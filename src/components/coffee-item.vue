<template>
  <view class="relative">
    <template v-for="(item, index) in 2" :key="index">
      <view class="pl-[30rpx] pr-[30rpx] mt-[30rpx] flex">
        <image class="w-[232rpx] h-[244rpx]" mode="aspectFill" src="/static/images/list-2.png" />
        <view class="w-[458rpx] h-[245rpx] bg-[#FFF8F2] rounded-[15rpx]">
          <view class="w-full h-[45rpx] mt-[60rpx] pl-[28rpx] text-[32rpx] font-bold">COLD BREW COOFFEE</view>
          <view class="pl-[28rpx]">
            <TnRate v-model="rateValue" size="22rpx" inactive-color="#FF902A" active-color="#FF902A" />
          </view>
          <view class="pl-[28rpx] flex justify-between w-full h-[69rpx] items-center">
            <view class="mt-[29rpx] flex text-[32rpx]">
              <view class="tracking-wide mr-[15rpx]">¥ 36</view>
              <view class="text-firstGray line-through">¥ 36</view>
            </view>
            <view class="w-[102rpx] h-full mr-[18rpx] rounded-[26rpx] bg-secondGray flex justify-center items-center">
              <TnIcon name="add" type="info" color="#ffffff" size="22rpx" bold />
            </view>
          </view>
        </view>
      </view>
    </template>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TnRate from '@tuniao/tnui-vue3-uniapp/components/rate/src/rate.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
const rateValue = ref(0)
</script>
<style scoped></style>