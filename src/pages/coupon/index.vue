<template>
  <view>
    <TnSwitchTab inactive-bg-color="#ffffff" inactive-text-color="#333333" active-text-color="#FF902A"
      active-bg-color="#ffffff" v-model="currentTabIndex" :tabs="tabs" @change="handleChange">
      <view class="flex pl-[37rpx] justify-between mb-[26rpx]" v-for="(item, index) in couponList" :key="index">
        <view class="w-[678rpx] h-[172rpx] flex items-center relative">
          <view :class="currentTabIndex === 0 ? 'bg-successColor text-secondary' : 'bg-failColor text-firstGray'"
            class="w-[242rpx] h-full rounded-[15rpx] rounded-tr-[15rpx] rounded-br-[15rpx] flex items-center justify-center">
            <view v-if="item.discountType === 'percentage'"
              :class="currentTabIndex === 0 ? 'text-successText' : 'text-firstGray'"
              class="relative w-[80rpx] h-[40rpx] text-[42rpx]">
              {{ item.discountValue * 10 }}
              <view class="absolute -bottom-[20rpx] right-0  text-[16rpx]">折 </view>
            </view>
            <view v-else :class="currentTabIndex === 0 ? 'text-successText' : 'text-firstGray'"
              class="relative w-[95rpx] h-[40rpx] text-[25rpx]">{{ item.couponName }}</view>
          </view>
          <view class="h-[90rpx] border-1 border-pink-200 border-dashed"> </view>
          <view :class="currentTabIndex === 0 ? 'bg-successColor text-secondary' : 'bg-failColor text-firstGray'"
            class="w-[435rpx] h-full  rounded-[15rpx] rounded-tl-[15rpx] rounded-bl-[15rpx] flex flex-col justify-center  discount">
            <view class="text-[30rpx] pl-[39rpx] font-bold">{{ item.couponName }}</view>
            <view class="text-[16rpx] pl-[39rpx] mt-[18rpx]">到期时间：{{ getWeekDay(item.expirationDate) }}</view>
          </view>
          <image class="absolute w-[138rpx] h-[121rpx] top-0 right-0"
            :src="currentTabIndex === 0 ? conponBgSuccess : conponBgFail" mode="aspectFit" lazy-load="false" />
          <view class="text-[26rpx] absolute top-[35rpx] right-[15rpx] font-bold text-white text-info">
            {{ showType(item.discountType) }}</view>
        </view>
      </view>
    </TnSwitchTab>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TnSwitchTab from '@tuniao/tnui-vue3-uniapp/components/switch-tab/src/switch-tab.vue'
import conponBgSuccess from '@/static/images/conpon.png'
import conponBgFail from '@/static/images/conpon-fail.png'
import { onShow } from '@dcloudio/uni-app';
import { getCouponList } from '@/api/modules/card';
import { getWeekDay } from '@/utils/common'
interface IRecord {
  couponId: number;
  couponName: string;
  discountType: string;
  discountValue: number;
  minimumOrderAmount: number;
  remainingQuantity: number;
  validForAllProducts: number;
  expirationDate: Date;
}
// 当前选中的标签索引
const currentTabIndex = ref(0)
const tabs = ['即将过期', '已过期']
//切换标签
const handleChange = (index: number) => {
  currentTabIndex.value = index
}
const couponList = ref<IRecord[]>([]);
//获取优惠券
const getCoupon = () => {
  getCouponList({ pageNum: 1, pageSize: 4 }).then(res => {
    couponList.value = res.data.records
  })
}
//根据类型显示券类型

const showType = (type: string) => {
  if (type === 'percentage') {
    return '优惠券'
  } else {
    return '满减券'
  }
}
onShow(() => {
  getCoupon()
})
</script>
<style scoped>
.text-info {
  width: 78rpx;
  height: 36rpx;
  opacity: 1;
  transform: rotate(41.15deg);
}
</style>
