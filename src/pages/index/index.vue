<template>
  <view>
    <image class="w-full h-[700rpx] -z-30" mode="aspectFill" src="/static/images/header.png"> </image>
    <view
      class="w-[650rpx] h-[120rpx] m-auto bg-white mt-[-80rpx] z-0 relative flex items-center justify-between shadow-md">
      <view class="flex ml-[64rpx]">
        <image class="w-[54rpx] h-[67rpx]" mode="aspectFill" src="/static/images/icon-coffer.png" />
        <view class="ml-5">
          <view class="text-firstGray text-[26rpx] w-[120rpx]">{{
            isLoginStatus() ? userInfo.username : "未登录" }}
          </view>
          <view class="text-secondary text-xs mt-1">入会积分，享更多优惠</view>
        </view>
      </view>
      <view v-if="!isLoginStatus()" @click="handleLogin"
        class="mr-[49rpx] w-[136rpx] h-[45rpx] rounded-[22rpx] bg-[#382525] text-[#ffffff] text-[26rpx] flex items-center justify-center">
        注册/登录</view>
    </view>
  </view>
  <CategoryHeader @click="handleChangeList" />
  <view class="grid grid-cols-2 grid-rows-2 gap-x-[29rpx] gap-y-[33rpx] ml-[30rpx] mr-[30rpx] mt-2">
    <template v-for="(item, index) in ranList" :key="index">
      <image class="w-[330rpx] h-[180rpx]" mode="aspectFill" :src="baseURL + item.imageUrl" />
    </template>
  </view>
  <view class="mt-[33rpx]">
    <CategoryHeader :title="'大师推荐'" :is-find-all="false" />
    <CoffeeItem :list="recommenList" />
  </view>
  <view class="mt-[38rpx]">
    <CategoryHeader @click="handleCoupon" :title="'专属优惠'" />
    <view class="flex p-[30rpx] pt-2 justify-between">
      <template v-for="(item, index) in couponList" :key="index">
        <view class="w-[332rpx] h-[130rpx]  flex items-center">
          <view
            class="w-[166rpx] h-full bg-pink-200 rounded-[15rpx] rounded-tr-[30rpx] rounded-br-[30rpx] flex items-center justify-center">
            <view v-if="item.discountType === 'percentage'"
              class="relative w-[80rpx] h-[40rpx] text-[42rpx] text-[#f07373]">
              {{ item.discountValue * 10 }}
              <view class="absolute -bottom-[15rpx] right-0 text-[#f07373] text-[16rpx]">折
              </view>
            </view>
            <view v-else class="relative w-[95rpx] h-[40rpx] text-[25rpx] text-[#f07373]">
              {{ item.couponName }}
            </view>
          </view>
          <view class="h-[90rpx] border-1 border-pink-200 border-dashed">
          </view>
          <view
            class="w-[166rpx] h-full bg-pink-200 rounded-[15rpx] rounded-tl-[30rpx] rounded-bl-[30rpx] flex flex-col justify-center text-[#f07373] discount ">
            <view class="text-[26rpx] pl-[20rpx] font-bold">{{ item.validForAllProducts === 1 ? '通用' : '指定产品' }}</view>
            <view class="text-[16rpx] pl-[20rpx] mt-[15rpx]">{{ getWeekDay(item.expirationDate) }}</view>
          </view>
        </view>
      </template>
    </view>
  </view>
  <view class="h-[500rpx]">
    <TabsHeader :tabs-data="categoryList" @change="handleChange" />
    <view class="mt-[15rpx] pl-[31rpx] pr-[31rpx] grid grid-cols-2 grid-rows-1 gap-x-[30rpx]">
      <template v-for="(item, index) in searchList" :key="index">
        <image class="w-[330rpx] h-[369rpx]" mode="aspectFill" :src="baseURL + item.imageUrl" />
      </template>
    </view>
  </view>
</template>
<script setup lang="ts">
import { getCategory, getRecommend, getbillboards, searchCategory } from '@/api/modules/coffee';
import CategoryHeader from '@/components/category-header.vue'
import CoffeeItem from '@/components/coffee-item.vue'
import TabsHeader from '@/components/tabs-header.vue';
import { useUserStore } from '@/stores/modules/user';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import serviceUrls from '@/config/baseURLConfig'
import { onShow } from '@dcloudio/uni-app';
import { getCouponList } from '@/api/modules/card';
import { getWeekDay } from '@/utils/common'
const baseURL = serviceUrls.imageService
const store = useUserStore()
const { userInfo } = storeToRefs(store)
const { isLoginStatus } = store
//登录
const handleLogin = () => {
  uni.navigateTo({
    url: '/subpkg_pages/login/index',
  })
}
//搜索参数
const searchParams = ref<any>({
  categoryId: 1,
  categoryName: '',
  pageNum: 1,
  pageSize: 2
})

const searchList = ref<any>([])
//按条件搜索咖啡
const getSearchList = async (searchParams: any) => {
  const res = await searchCategory(searchParams)
  searchList.value = res.data.records

  console.log('%c [searchList.value====>  ]-103', 'font-size:13px; background:pink; color:#bf2c9f;', searchList.value)

}
//查看更多
const handleChangeList = () => {
  uni.switchTab({
    url: '/pages/menu/index'
  });
}
const handleChange = (index: number) => {
  searchParams.value.categoryId = index
  getSearchList(searchParams.value)
}

const ranList = ref<any>([])
//获取五月榜单
const getRankList = () => {
  getbillboards().then(res => {
    ranList.value = res.data
  })
}

const recommenList = ref<any>([])
//获取大师推荐
const getRecommenList = () => {
  getRecommend().then(res => {
    recommenList.value = res.data
  })
}
//获取咖啡分类
const categoryList = ref<any>([])
//获取咖啡分类
const getCoffeeList = async () => {
  const res = await getCategory()
  categoryList.value = res.data
}

//获取优惠券
const couponList = ref<any>([])
const getCouponsList = () => {
  getCouponList({ pageNum: 1, pageSize: 2, isValid: 1 }).then(res => {
    couponList.value = res.data.records
  })
}

//查看更多优惠券
const handleCoupon = () => {
  uni.switchTab({
    url: '/pages/coupon/index'
  });
}
onShow(() => {
  getCoffeeList()
  getRecommenList()
  getRankList()
  getCouponsList()
  getSearchList(searchParams.value)
})
</script>

<style scoped>
.discount {
  position: relative;
}

.discount::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 20rpx;
  height: 100%;
  background: #f07373;
  opacity: 0.9;
  z-index: 1;
  border-top-right-radius: 10rpx;
  border-bottom-right-radius: 10rpx;

}
</style>
