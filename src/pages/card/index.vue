<template>
  <view class="w-full h-[250rpx] text-center flex justify-center items-center flex-col">
    <view>当前数值{{ count }}</view>
    <TnButton size="lg" @click="increment" type="success">点我增加</TnButton>
    <view>store信息:{{ cardInfo }}</view>
    <TnButton size="lg" @click="handleLogin" type="info">登录</TnButton>
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
const handleLogin = () => {
  uni.navigateTo({
    url: '/subpkg_pages/login/index'
  });
}
</script>
<style scoped></style>
