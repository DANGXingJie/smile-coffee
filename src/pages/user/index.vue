<template>
  <view>
    user page
    {{ movieInfo }}

  </view>
</template>

<script setup lang="ts">
import { getTopMovieList, getBiliSearch } from '@/api/modules/movie'
import { getUserInfo, userLogin } from '@/api/modules/user'
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { useUserStore } from '@/stores/modules/user';
const userStore = useUserStore()

//热播电影票房信息
const getMovieList = async () => {
  let data = await getTopMovieList()
  console.log("==返回的movie==data===", data)
}

const movieInfo = ref({})
//B站视频搜索
const getBiliSearchInfo = async () => {
  const query = {
    msg: 'vue',
    n: 1,
  }
  let data = await getBiliSearch(query)
  console.log("==返回的blibli==data===", data)
  movieInfo.value = data
  console.log("movieInfo", movieInfo.value)
}

//登录
const login = async () => {
  const params = {
    user_name: 'admin',
    password: '123456',
  }
  let data: any = await userLogin(params)
  console.log('%c [ 登录的data ]-44', 'font-size:13px; background:pink; color:#bf2c9f;', data)
  //设置token
  userStore.setToken(data.data.token)
  console.log("==返回的data===", data)
}
//获取用户信息
const getUserInfoById = async () => {
  let data = await getUserInfo(3)
  console.log("==返回的用户data===", data)
}
onLoad((option) => {
  console.log("页面 onLoad:", option);
  getMovieList()
  getBiliSearchInfo()
  //login()
  getUserInfoById()

});
</script>

<style scoped></style>