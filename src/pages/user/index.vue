<template>
  <view class="p-2 flex items-center">
    <cover-image class="w-[120rpx] h-[120rpx]" :src="movieInfo?.user_avathor"></cover-image> {{ movieInfo?.title }}
  </view>
  <view class="p-2 flex items-center">
    <cover-image class="w-[120rpx] h-[120rpx]" :src="userInfo?.avatar"></cover-image> {{ userInfo?.user_name }}
  </view>
</template>
<script setup lang="ts">
import { getTopMovieList, getBiliSearch } from '@/api/modules/movie'
import { getUserInfo } from '@/api/modules/user'
import type { IUserInfo, ImovieInfo } from '@/api/types/user';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
//热播电影票房信息
const getMovieList = async () => {
  let data = await getTopMovieList()
  //console.log("==返回的movie==data===", data)
}
const movieInfo = ref<ImovieInfo>()
//B站视频搜索
const getBiliSearchInfo = async () => {
  const query = {
    msg: '明朝那些事',
    n: 5,
  }
  let data: any = await getBiliSearch(query)
  movieInfo.value = data
}
//获取用户信息
const userInfo = ref<IUserInfo>()
const getUserInfoById = async () => {
  let data = await getUserInfo(3)
  userInfo.value = data.data
}
onLoad((option) => {
  console.log("页面 onLoad:", option);
  getMovieList()
  getBiliSearchInfo()
  //getUserInfoById()
});
</script>

<style scoped></style>