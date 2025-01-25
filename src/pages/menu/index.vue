<template>
  <view class="w-full h-screen flex flex-col">
    <SearchHeader @onSearchBtnClickEvent="handleSearch" @onClearEvent="handleClear" />
    <TabsHeader :tabsData="categoryList" class="pl-[40rpx]" @change="handleChange" />
    <view class="flex-1">
      <view class="grid grid-cols-2 gap-x-[42rpx] gap-y-[43rpx] pl-[35rpx] pr-[35rpx] grid-container mt-2">
        <template v-for="(item, index) in searchList" :key="index">
          <view class="w-[330rpx] h-[506rpx] rounded-[15rpx] opacity-100 bg-white shadow-md" @click="handleDetail(item)">
            <image class="w-[310rpx] h-[315rpx] text-center mr-[10rpx] ml-[10rpx]" :src="baseURL + item.imageUrl"
              mode="aspectFill" lazy-load="false" />
            <view class="m-[12rpx] text-[28rpx] font-bold text-secondary">{{ item.productName }}</view>
            <view class="w-full flex justify-between">
              <view class="pl-[15rpx] text-[20rpx] text-firstGray"> {{ item.description }}</view>
              <view class="pr-[48rpx] text-[18rpx] text-btnBg"> {{ 4.5 }}</view>
            </view>
            <view class="mt-2 w-full flex justify-between items-center">
              <view class="pl-[15rpx] text-[32rpx]"><text class="mr-[7rpx]">¥</text>{{ item.price }}</view>
              <view
                class="w-[102rpx] h-[69rpx] rounded-[26rpx] bg-secondGray flex justify-center items-center mr-[21rpx]">
                <TnIcon name="add" type="info" color="#ffffff" size="22rpx" bold />
              </view>
            </view>
          </view>
        </template>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import SearchHeader from '@/components/search-header.vue'
import TabsHeader from '@/components/tabs-header.vue'
import serviceUrls from '@/config/baseURLConfig'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { getCategory, searchCategory } from '@/api/modules/coffee';
import { computed, ref } from 'vue';
import { onReachBottom, onShow } from '@dcloudio/uni-app';
const baseURL = serviceUrls.imageService
interface IsearchParams {
  categoryId: number | undefined,
  productName: string,
  pageNum: number,
  pageSize: number
}
interface IsearchList {
  categoryId: number,
  categoryName: string,
  description: string,
  imageUrl: string,
  price: number,
  productName: string,
  productId: string
}

interface IcategoryList {
  categoryId: string,
  categoryName: string
}
const searchParams = ref<IsearchParams>({
  categoryId: undefined,
  productName: '',
  pageNum: 1,
  pageSize: 4
})
//是否正在加载中
const isLoading = ref(false)
//总记录数
const total = ref(0)
//获取咖啡分类
const categoryList = ref<IcategoryList[]>([])
//获取咖啡分类
const getCoffeeList = () => {
  getCategory().then(res => {
    categoryList.value = [
      { categoryId: undefined, categoryName: '全部' },
      ...res.data
    ]
  })
}
const searchList = ref<IsearchList[]>([])
//按条件搜索咖啡
const getSearchList = (searchParams: IsearchParams) => {
  isLoading.value = true
  searchCategory(searchParams).then(res => {
    searchList.value.push(...res.data.records)
    isLoading.value = false
    total.value = res.data.total
  })
}
//搜索条件切换
const handleChange = (index: number) => {
  searchParams.value.categoryId = index
  searchParams.value.pageNum = 1
  searchList.value = []
  getSearchList(searchParams.value)
}

//输入框搜索
const handleSearch = (value: string) => {
  searchParams.value.productName = value
  searchParams.value.pageNum = 1
  searchList.value = []
  getSearchList(searchParams.value)
}
//清空搜索
const handleClear = () => {
  searchParams.value.productName = ''
  searchParams.value.pageNum = 1
  searchList.value = []
  getSearchList(searchParams.value)
}

/**
 * 动态计算行数
 */
const rows = computed(() => {
  const rowCount = Math.ceil(searchList.value.length / 2);
  return `repeat(${rowCount}, 1fr)`;
});

const handleDetail = (item: any) => {
  uni.navigateTo({
    url: '/subpkg_pages/coffee/detail?productId=' + item.productId
  })
}
getSearchList(searchParams.value)
// 触底加载更多
onReachBottom(() => {
  if (isLoading.value) {
    return
  }
  if (searchList.value.length >= total.value) {
    uni.showToast({
      title: '没有更多数据了',
      duration: 2000
    });
    return
  }
  searchParams.value.pageNum += 1
  getSearchList(searchParams.value)
})
onShow(() => {
  getCoffeeList()
})
</script>
<style scoped>
.grid-container {
  grid-template-rows: v-bind(rows);
  /* 动态计算行数 */
}
</style>
