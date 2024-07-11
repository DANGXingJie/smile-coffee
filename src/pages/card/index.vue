<template>
  <view class="w-full h-[800rpx] flex flex-col">
    <view class="w-[650rpx] flex-1 text-center m-auto mt-[50rpx] font-bold text-dark-50 flex justify-center items-center">
      {{ cardInfo }}
    </view>
    <view class="w-[700rpx] h-[180rpx] m-auto flex justify-between">
      <TnButton width="250" height="60" @click="increment" type="success">点我增加</TnButton>
      <view class="h-[50rpx] w-[180rpx]">当前数值{{ count }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import { storeToRefs } from 'pinia'
import { useCardStore } from '@/stores/modules/card'
import { getCardList } from '@/api/modules/card'
const store = useCardStore()
//store属性使用storeToRefs解构
const { count, cardInfo } = storeToRefs(store)
//也可以直接结构action
const { increment, setCardInfo } = store
const testApi = () => {
  getCardList().then((res: any) => {
    console.log('===返回的数据', res)
    setCardInfo(res)
  })
}
testApi()
</script>
<style scoped></style>
