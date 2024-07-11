<template>
  <view>
    user page

  </view>
</template>

<script setup lang="ts">
import { getTopMovieList, getBiliSearch } from '@/api/modules/movie'
import { onLoad } from '@dcloudio/uni-app';

//热播电影票房信息
const getMovieList = async () => {
  let data = await getTopMovieList()
  console.log("==返回的data===", data)
}

//B站视频搜索
const getBiliSearchInfo = async () => {
  const query = {
    msg: 'vue',
    n: 1,
  }
  let data = await getBiliSearch(query)
  console.log("==返回的data===", data)
}
onLoad((option) => {
  console.log("页面 onLoad:", option);
  getMovieList()
  getBiliSearchInfo()
});
</script>

<style scoped></style>