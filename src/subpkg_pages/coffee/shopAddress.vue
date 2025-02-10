<template>
  <view class="flex flex-col h-screen bg-gray-100">
    <view class="w-full flex justify-center bg-white h-[100rpx]">
      <DeliveryMethod />
    </view>
    <view class="flex-1">
      <view class="w-[680rpx] min-h-[500rpx] bg-white shadow-md rounded-xl m-auto mt-4">
        <view class="p-4 text-[24rpx] text-gray-600">我的收货地址</view>
        <template v-for="(item, index) in addressList">
          <view class="mb-6" :data="index">
            <view class="flex justify-between w-full items-center pl-4 pr-2 h-[40rpx]">
              <view class="mr-4 h-[40rpx] font-bold">{{ item.address }}</view>
              <TnIcon name="edit" size="32" />
            </view>
            <view class="flex w-full items-center pl-4 pr-2 h-[40rpx] mt-2 text-gray-600 mb-2">
              <view class="flex justify-center w-[50rpx] items-center border-2 border-[#9b8657] h-[40rpx]">家 </view>
              <view class="mr-1">{{ item.receiverPhone }}</view>
              <view class="ml-1">{{ item.receiverName }}先生</view>
              <view v-if="item.isDefault === 1" class="ml-1">
                <TnTag type="primary">默认地址</TnTag>
              </view>
            </view>
          </view>
        </template>
      </view>
    </view>
    <view class="w-full flex justify-center shop-btn-bottom">
      <TnButton @click="handleAdd" custom-class="my-btn" width="680rpx" height="82rpx" :custom-style="style"><text
          class="pr-1">+</text>新增收货地址
      </TnButton>
    </view>
  </view>
</template>
<script setup lang="ts">
import DeliveryMethod from '@/components/delivery-method.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnTag from '@tuniao/tnui-vue3-uniapp/components/tag/src/tag.vue'
import { ref, type CSSProperties } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { onShow } from '@dcloudio/uni-app'
import { getAddressList } from '@/api/modules/user'
const store = useUserStore()
const style: CSSProperties = {
  fontSize: '32rpx',
  color: '#ffffff',
  backgroundColor: '#e46345',
  borderRadius: '42rpx',
  marginRight: '20rpx',
}
const handleAdd = () => {
  uni.navigateTo({
    url: '/subpkg_pages/coffee/insertAddress',
  })
}
const addressList = ref<any>([])
const getAddress = async () => {
  //从store 获取用户信息
  const userId = store.getUserInfo().id
  const res = await getAddressList(userId)
  addressList.value = res.data
  console.log(res)
}
onShow(() => {
  getAddress()
})
</script>
<style scoped>
.shop-btn-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
