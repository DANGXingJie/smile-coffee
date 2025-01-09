<template>
  <view class="flex pl-[70rpx] items-center">
    <TnAvatar size="156" :url="userInfo.avatarUrl" />
    <view class="ml-[27rpx]">
      <view class="text-[46rpx] font-bold text-secondary">{{ userInfo.username }}</view>
      <view class="mt-[30rpx] text-[22rpx] text-[#7e7e7e]">这个人很懒，什么都还没有留下哦~</view>
    </view>
  </view>
  <view class="w-[650rpx] h-[120rpx] m-auto mt-[54rpx] user-info flex items-center">
    <image mode="aspectFill" class="w-[49rpx] h-[62rpx] ml-[44rpx]" src="/static/images/user-level.png" />
    <view class="ml-[10rpx]">
      <view
        class="w-[128rpx] h-[45rpx] mb-[12rpx] flex justify-center items-center rounded-[22.5rpx] bg-[#CCAC89] text-[26rpx] text-white">
        LV3</view>
      <TnLineProgress active-color="" inactive-color="" :percent="progressPercent"> </TnLineProgress>
    </view>
  </view>
  <view class="mt-[76rpx] ml-[43rpx] flex gap-x-[35rpx] gap-y-[40rpx] flex-wrap w-[680rpx]">
    <template v-for="(item, index) in menuList" :key="index">
      <view class="w-[313rpx] h-[146rpx] flex items-center justify-center" @click="handleMenu(item)"
        :style="{ background: item.bg }">
        <image mode="aspectFill" class="w-[56rpx] h-[62rpx]" :src="menuIcon" />
        <view class="ml-[12rpx]">
          <view class="text-[30rpx] font-medium text-secondary mb-[14rpx]">{{ item.title }}</view>
          <view class="text-[22rpx] font-medium text-secondary">{{ item.text }}</view>
        </view>
      </view>
    </template>
  </view>
</template>
<script setup lang="ts">
import TnAvatar from '@tuniao/tnui-vue3-uniapp/components/avatar/src/avatar.vue'
import TnLineProgress from '@tuniao/tnui-vue3-uniapp/components/line-progress/src/line-progress.vue'
import menuIcon from '@/static/images/menu-icon.png'
import menuIcon2 from '@/static/images/menu-icon1.png'

import { getUserInfo, logout } from '@/api/modules/user'
import { useUserStore } from '@/stores/modules/user'
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
const store = useUserStore()
const progressPercent = ref(80)
const handleLogin = () => {
  uni.navigateTo({
    url: '/subpkg_pages/login/index',
  })
}
const menuList = ref([
  {
    title: '我的订单',
    text: 'my order',
    icon: menuIcon,
    path: '/pages/order/index',
    bg: '#FFF7F4',
  },
  {
    title: '账户余额',
    text: 'Account balance',
    icon: menuIcon2,
    path: '/pages/collect/index',
    bg: '#F4F6FF',
  },
  {
    title: '查看礼品券',
    text: 'Gift voucher',
    icon: menuIcon,
    path: '/pages/coupon/index',
    bg: '#F3FDFB',
  },
])

//切换菜单
const handleMenu = (item: any) => {
  uni.navigateTo({
    url: item.path,
  })
}
const userInfo = ref<any>()

const getWxUserInfo = () => {
  getUserInfo().then((res: any) => {
    userInfo.value = res.data
    store.setUserInfo(res.data)
  })
}
const handleLogout = () => {
  logout().then((res) => {
    console.log(res)
  })
}
onShow(() => {
  getWxUserInfo()
})

</script>

<style scoped>
.user-info {
  opacity: 1;
  border-radius: 10rpx;
  background: linear-gradient(180deg, #fde7c1 0%, #dfa978 100%), linear-gradient(198.74deg, #865b5b 0%, #220e0e 100%);
}
</style>
