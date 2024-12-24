<template>
  <view @click="handleLogin">login</view>
</template>
<script setup lang="ts">
import { getUserInfo } from '@/api/modules/user';


const handleLogin = () => {
  uni.navigateTo({
    url: '/subpkg_pages/login/index',
  })
}


const getUserInfoById = () => {
  //1871591727941652500
  getUserInfo('1871591727941652482').then((res) => {
    console.log(res)
  })
}

getUserInfoById()

</script>

<style scoped></style>