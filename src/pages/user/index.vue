<template>
  <view @click="handleLogin">login</view>
  <view @click="handleLogout">Logout</view>
</template>
<script setup lang="ts">
import { getUserInfo, logout } from '@/api/modules/user';
import { useUserStore } from '@/stores/modules/user';
const store = useUserStore();


const handleLogin = () => {
  uni.navigateTo({
    url: '/subpkg_pages/login/index',
  })
}


const getUserInfoById = () => {
  getUserInfo('1871591727941652482').then((res) => {
    console.log(res.data)
    store.setUserInfo(res.data)
  })
}
const handleLogout = () => {
  logout().then((res) => {
    console.log(res)
  })
}

getUserInfoById()

</script>

<style scoped></style>