<template>
  <view @click="handleLogin">login</view>
</template>
<script setup lang="ts">


const handleLogin = () => {
  uni.navigateTo({
    url: '/subpkg_pages/login/index',
  })
}

</script>

<style scoped></style>