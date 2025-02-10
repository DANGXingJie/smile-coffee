<template>
  <view class="flex flex-col h-screen">
    <view class="h-[595rpx]">
      <TnSwiper v-model="currentSwiperIndex" autoplay indicator indicator-type="dot" :data="swiperData" width="100%"
        height="595">
        <template #default="{ data }">
          <view class="w-full h-[595rpx] relative">
            <image class="w-full h-[595rpx]" :src="baseURL + data" mode="aspectFill" />
            <view
              class="absolute bottom-8 left-8 w-[91rpx] h-[44rpx] bg-btnBg rounded-[29rpx] flex justify-center items-center">
              <TnIcon name="star-fill" size="17rpx" color="#fff" />
              <text class="text-[20rpx] text-white">4.8分</text>
            </view>
          </view>
        </template>
      </TnSwiper>
    </view>
    <view class="flex-1">
      <view class="mt-[48rpx] ml-[55rpx] h-[50rpx] text-[36rpx] font-bold"> {{ productItem.productName }} </view>
      <view class="ml-[32rpx] mt-[16rpx]">
        <view class="w-[681rpx] flex justify-between">
          <view class="pl-4">{{ productItem.description }}</view>
          <view>¥ {{ productItem.price }}</view>
        </view>
        <view class="mt-[31rpx] h-[1rpx] w-[681rpx] ml-0 m-auto bg-firstGray"></view>
        <view class="mt-[24rpx] text-[24rpx] text-firstGray font-normal h-[68rpx] leading-[40rpx]">
          {{ productItem.description }}
        </view>
        <view class="mt-[41rpx] flex justify-between">
          <view>数量</view>
          <TnNumberBox :min="1" :max="999" class="mr-[51rpx]" v-model="numberValue" />
        </view>
        <CategorySlect @select="handleSelectHeat" :title="coffeeAttributeList.heatList[0].attributeTypeName"
          :category="coffeeAttributeList.heatList" />
        <CategorySlect @select="handleSelectDensity" :title="coffeeAttributeList.densityList[0].attributeTypeName"
          :category="coffeeAttributeList.densityList" />
      </view>
      <view v-if="false" class="mt-[58rpx] ml-[55rpx]">经典搭配</view>
      <CoffeeItem />
    </view>
    <view class="mt-[22rpx] flex justify-between h-[151rpx] items-center shop-btn-bottom">
      <view class="w-10 ml-[81rpx]"> <text class="pr-2">¥</text>{{ finaliyPrice }} </view>
      <view class="flex h-[80rpx] pr-[26rpx]">
        <view class="mr-[22rpx]">
          <TnButton width="231rpx" plain height="82rpx" type="info">加入购物车</TnButton>
        </view>
        <TnButton @click="handleBuy" width="231rpx" height="82rpx" type="success">购买</TnButton>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import TnSwiper from '@tuniao/tnui-vue3-uniapp/components/swiper/src/swiper.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnNumberBox from '@tuniao/tnui-vue3-uniapp/components/number-box/src/number-box.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import CoffeeItem from '@/components/coffee-item.vue'
import { computed, reactive, ref } from 'vue'
import CategorySlect from '@/components/category-select.vue'
import { getAttributeList, getDetail } from '@/api/modules/coffee'
import serviceUrls from '@/config/baseURLConfig'
import { useProductStore } from '@/stores/modules/product'
const productStore = useProductStore()
const currentSwiperIndex = ref(0)
const baseURL = serviceUrls.imageService
const props = defineProps({
  productId: {
    type: String,
    default: '',
  },
})
// 轮播图数据
const swiperData = ref<any>([])
const coffeeAttributeList = ref<any>([])
const numberValue = ref(1)
interface IProductItem {
  productId: string
  productName: string
  description: string
  price: number
  stockQuantity: number
  categoryId: number
  categoryName: null
  imageUrl: string
}
const productItem = ref<IProductItem>({})
// 获取咖啡详情
const getProductDetail = () => {
  console.log('detail', props.productId)
  getDetail(props.productId).then((res) => {
    productItem.value = res.data
    swiperData.value.push(res.data.imageUrl)
  })
}

//获取咖啡属性
const getAttributes = () => {
  getAttributeList().then((res) => {
    coffeeAttributeList.value = res.data
    //属性设置初始值
    productDesc.temperature = coffeeAttributeList.value.heatList[0].productAttribute
    productDesc.concentration = coffeeAttributeList.value.densityList[0].productAttribute
  })
}
const finaliyPrice = computed(() => {
  const rawValue = productItem.value.price * numberValue.value
  // 返回字符串类型（例如 "3.1"、"5.0"）
  return (Math.round(rawValue * 10) / 10).toFixed(1)
})

//咖啡属性
const productDesc = reactive({
  //温度
  temperature: "",
  //浓度
  concentration: "",
})
//选择温度
const handleSelectHeat = (item: any) => {
  productDesc.temperature = item.attributeTypeName

}
//选择浓度
const handleSelectDensity = (item: any) => {
  productDesc.concentration = item.attributeTypeName
}

//点击购买
const handleBuy = () => {
  //保存预订单参数
  const preOrderInfo = {
    productId: productItem.value.productId,
    quantity: numberValue.value,
    price: productItem.value.price,
    addressId: '2222',
    temperature: productDesc.temperature,
    concentration: productDesc.concentration,
    remark: '',
  }
  productStore.setPreOrderInfo(preOrderInfo)
  uni.navigateTo({
    url: '/subpkg_pages/coffee/buy',
  })
}
getProductDetail()
getAttributes()
</script>

<style scoped>
.carShopbtn {
  margin-right: 22rpx;
}

.shop-btn-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
