<template>
  <view>
    <HeaderMenu @showMenu="handleShowMenu" />
    <view class="mt-2">
      <view class="m-4">
        <TnSwiper v-model="currentSwiperIndex" next-margin="35" autoplay loop :data="swiperData" width="100%" height="337"
          indicator indicator-type="dot">
          <template #default="{ data }">
            <view class="ml-4">
              <img class="w-full h-[339rpx] rounded-[20rpx]" :src="data" mode="aspectFill" />
            </view>
          </template>
        </TnSwiper>
      </view>
    </view>
    <view class="mt-2 text-2xl pl-4 text-dark">
      Shop By
    </view>
    <view class="w-full mt-2">
      <view class="grid grid-cols-2 grid-rows-2 gap-x-7 gap-y-7 w-[680rpx] m-auto pl-1">
        <template v-for="(item, index) in data" :key="index">
          <view
            class="bg-white w-[300rpx] h-[300rpx] flex flex-col justify-center items-center rounded-[20rpx] shadow border border-light-100">
            <img class="w-[100rpx] h-[152rpx]" :src="item.image" mode="aspectFill" />
            <view class="mt-4 text-dark text-xs font-bold"> {{ item.title }}</view>
          </view>
        </template>
      </view>
    </view>
    <view class="mt-2 text-2xl w-full p-4 text-dark flex justify-between items-center">
      <view>Featured</view>
      <img src="../../../static/images/right-icon.png" class="w-[30rpx] h-[30rpx]" />
    </view>
    <view class="w-full mb-4 h-[520rpx]">
      <view class="pl-4 pr-4">
        <scroll-view class="w-full whitespace-nowrap " scroll-x="true" show-scrollbar @scroll="handleScroll"
          scroll-left="1">
          <template v-for="(item, index) in list" :key="index">
            <view class="scroll-view-item_H">
              <view id="demo1" :style="{ backgroundImage: `url(${item.image})` }"
                class="relative w-[260rpx] h-[350rpx] rounded-[15rpx] bg-no-repeat bg-cover bg-center">
                <img :src="item.score" class="w-[46rpx] h-[62rpx] absolute top-[20rpx] right-[45rpx]" />
              </view>
              <view class="w-full h-full flex justify-center">
                <view class="w-[200rpx] whitespace-normal h-full text-xs text-left font-bold">
                  {{ item.title }}
                </view>
              </view>
              <view class="text-left text-xs ml-4 mt-2 tracking-widest">
                <view class="inline-block mr-1">$</view>{{ item.price }}
              </view>
            </view>
          </template>
        </scroll-view>
      </view>
    </view>
  </view>
  <popupMenu :show="isShowMenu" @close="isShowMenu = false" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TnSwiper from '@tuniao/tnui-vue3-uniapp/components/swiper/src/swiper.vue'
import HeaderMenu from '@/components/header-menu.vue'
import popupMenu from '@/components/popup-menu.vue';
const currentSwiperIndex = ref(0)
// 轮播图数据
const swiperData = [
  'https://resource.tuniaokj.com/images/xiongjie/x14.jpg',
  'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-2.jpg',
  'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new.jpg',
  'https://resource.tuniaokj.com/images/xiongjie/xiong-3d-new1.png',
  'https://resource.tuniaokj.com/images/xiongjie/xiong-3d.jpg',
]
const data =
  [
    {
      id: 1,
      title: 'University',
      path: '/pages/index/index',
      image: '/static/images/university.png'
    },
    {
      id: 2,
      title: 'School',
      path: '/pages/index/index',
      image: '/static/images/School.png'
    },
    {
      id: 3,
      title: 'Department',
      path: '/pages/index/index',
      image: '/static/images/Department.png'
    },
    {
      id: 4,
      title: 'Authors',
      path: '/pages/index/index',
      image: '/static/images/Authors.png'
    },
  ]
const list = [
  {
    id: 1,
    title: 'The Forgotten Hours',
    path: '/pages/index/index',
    image: '/static/images/pic.png',
    score: '/static/images/score.png',
    price: '4.99'
  },
  {
    id: 2,
    title: 'The Forgotten Hours',
    path: '/pages/index/index',
    image: '/static/images/pic.png',
    score: '/static/images/score.png',
    price: '4.99'
  },
  {
    id: 3,
    title: 'The Forgotten Hours',
    path: '/pages/index/index',
    image: '/static/images/pic.png',
    score: '/static/images/score.png',
    price: '4.99'
  },
  {
    id: 4,
    title: 'The Forgotten Hours',
    path: '/pages/index/index',
    image: '/static/images/pic.png',
    score: '/static/images/score.png',
    price: '4.99'
  }
]

const handleScroll = () => {
}
const isShowMenu = ref(false)
const handleShowMenu = (val: boolean) => {
  isShowMenu.value = val
}
</script>
<style scoped>
.scroll-view-item_H {
  @apply inline-block mr-[45rpx];
}

.scroll-view-item_H:last-child {
  @apply mr-0;
}
</style>
