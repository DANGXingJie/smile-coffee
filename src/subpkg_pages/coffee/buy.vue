<template>
  <view class="h-screen">
    <view class="w-[700rpx] p-4 h-[190rpx] bg-white m-auto mt-1 rounded-xl shadow-light-800">
      <view class="flex justify-between">
        <view class="text-[28rpx] font-bold">
          <text>贵港桥圩镇店(No.A9832)</text>
          <text>></text>
        </view>
        <DeliveryMethod />
      </view>
      <view class="w-[430rpx] text-[24rpx] leading-4 text-gray-500">
        广西壮族自治区贵港市港南区桥圩镇沿江路文化街
      </view>
    </view>
    <view class="w-[700rpx] p-4 h-[190rpx] bg-white m-auto mt-4 rounded-xl shadow-light-800">
      <view class="text-[28rpx] font-bold">
        <text>立即自取，约15:56可取</text>
      </view>
      <view class="flex justify-between mt-4 h-[80rpx]">
        <view class="w-[430rpx] text-[24rpx] leading-4 text-gray-500"> 金牌咖啡师正在等待你下单 </view>
        <view class="flex w-[210rpx] rounded-[32rpx] items-center justify-center -mt-4">
          <TnAvatar size="156" url="https://img.js.design/assets/img/629dad9a9c8c868469907307.png" />
        </view>
      </view>
    </view>
    <view class="w-[700rpx] p-4 h-[560rpx] bg-white m-auto mt-4 rounded-xl shadow-light-800">
      <view class="flex justify-between">
        <view class="flex">
          <TnAvatar size="150"
            url="https://ts1.cn.mm.bing.net/th/id/R-C.fc90d13cf62a003bfd50a1614c6766ec?rik=zOxQbBVuxr4AHQ&riu=http%3a%2f%2fwww.ecl.com.cn%2fUpFile%2f2020%2f1%2f9%2f202001091428311Mr3Mu.jpg&ehk=Hz6FJEkNo12AMxARtUqowgzMsv6VBsTHaRLHijUIuDc%3d&risl=&pid=ImgRaw&r=0" />
          <view class="ml-3">
            <text class="text-[28rpx] font-bold">小黄油拿铁</text>
            <view class="mt-1 mb-2 text-gray-500">冰/不另外加糖</view>
            <TnButton text-color="#ffffff" bg-color="#e46345" type="success">券后价</TnButton>
          </view>
        </view>
        <view class="text-right">
          <text class="leading-3 text-[#e46345] text-[28rpx]">¥12.48</text>
          <view class="text-gray-500 leading-3 mt-3">¥32</view>
          <view class="mt-3">X1</view>
        </view>
      </view>
      <!-- 优惠 -->
      <view class="flex justify-between items-center border-t-[1rpx] border-gray-500 w-[640rpx] h-[134rpx] mt-5 m-auto">
        <view class="pl-2 font-bold text-black">咖啡优惠</view>
        <view class="pr-2 leading-8 text-[#e46345] text-[28rpx]">-¥32
          <TnIcon color="#333333" size="20" name="down" />
        </view>
      </view>
      <view class="flex justify-end items-center border-t-[1rpx] border-gray-500 w-[640rpx] h-[134rpx] mt-5 m-auto">
        <view class="pl-2 pr-1 font-bold text-black"><text class="text-gray-500 pr-3">应付</text><text
            class="leading-3">¥32</text></view>
      </view>
    </view>
    <view
      class="w-[700rpx] p-4 h-[140rpx] bg-white m-auto mt-4 rounded-xl shadow-light-800 flex justify-between items-center">
      <view class="text-[28rpx] font-bold">
        支付方式
      </view>
      <view class="h-[80rpx] leading-[80rpx] flex items-center">
        <TnIcon type="success" size="58" name="payment-wechat" />
        <view class="ml-1">微信支付</view>
      </view>
    </view>

    <view class="w-full h-[140rpx] bg-white m-auto mt-4 rounded-xl shadow-light-800 fixed bottom-0 shop-btn-bottom ">
      <view class="flex justify-between items-center h-[140rpx]">
        <view class="pl-6">
          <view class="text-[28rpx]">应付<text class="text-[36rpx] ml-2 font-bold">¥32</text></view>
          <view class="mt-2 text-[#e46345] text-[24rpx]">总计优惠<text class="pl-1">¥19.52</text></view>
        </view>
        <TnButton @click="handleBuy" custom-class="my-btn" width="251rpx" height="82rpx" :custom-style="style">去支付
        </TnButton>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';
import TnAvatar from '@tuniao/tnui-vue3-uniapp/components/avatar/src/avatar.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { useProductStore } from '@/stores/modules/product'
import DeliveryMethod from '@/components/delivery-method.vue'
const productStore = useProductStore()
import type { CSSProperties } from 'vue';
import { preOrderDetail } from '@/api/modules/order';
const style: CSSProperties = {
  fontSize: '26rpx',
  color: '#ffffff',
  backgroundColor: '#e46345',
  borderRadius: '42rpx',
  marginRight: '20rpx'
}
const getPreOrderInfo = () => {
  preOrderDetail(productStore.getPreOrderInfo()).then((res) => {
    console.log(res)
  })
}


const handleBuy = () => {
  uni.navigateTo({
    url: '/subpkg_pages/coffee/shopAddress',
  })
}
//获取预订单信息
onShow(() => {
  getPreOrderInfo()
})
</script>
<style>
page {
  @apply bg-[#F5F5F5];
}
</style>
<style scoped>
.shop-btn-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>