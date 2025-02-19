<template>
  <TnPopup width="95%" height="250" v-model="showPopup" open-direction="left" @close="handleClose" close-btn>
    <TnEmpty v-if="shopCartListInfo.length === 0" mode="cart" />
    <view class="tn-p-lg flex justify-between h-[90rpx] w-full items-center">
      <view class="flex items-center">
        <TnCheckbox active-color="#FF902A" @change="handleCheckedAll" checked-shape="circle" v-model="allChecked">已选购商品
        </TnCheckbox>
        <view class="ml-2">({{ shopCartListInfo.filter(item => item.checked).length }}件)</view>
      </view>
      <view class="flex items-center mr-4">
        <TnIcon name="delete" />
        <view class="text-gray-400 ml-1 text-[24rpx]" @click="handleRemoveAll">清空购物车</view>
      </view>
    </view>
    <view class="w-full h-[2rpx] bg-gray-300 mt-1"></view>
    <view class="mt-4">
      <template v-for="(item, index) in shopCartListInfo" :key="index">
        <view class="flex justify-between h-[160rpx] w-full items-end mb-6">
          <view class="flex items-center pl-[38rpx]">
            <TnCheckbox active-color="#FF902A" checked-shape="circle" @change="handleChecked(item)"
              v-model="item.checked">
            </TnCheckbox>
            <view class="flex items-center ml-2">
              <TnAvatar size="xl"
                url="https://ts1.cn.mm.bing.net/th/id/R-C.c006cb07b8ea0ed7b231ff2579dd6cc0?rik=ywoj7%2f7GZGzhQA&riu=http%3a%2f%2fwww.xinmengfood.com%2fuploads%2fallimg%2f20190522%2fba9b0cb42e8744addb181fcfaf6b3061.jpg&ehk=hEXyffYhWA2k1Kq6fy1fw%2fWthwiBTDS4esXyS30VpbQ%3d&risl=&pid=ImgRaw&r=0" />
              <view class="ml-4">
                <view class="font-bold text-[28rpx]">{{ item.productName }}</view>
                <view class="mt-1 text-gray-400">{{ item.temperature }}</view>
                <view class="mt-4 flex text-red-600">¥<view>{{ item.price }}</view>
                </view>
              </view>
            </view>
          </view>
          <view class="pr-4 mt-2">
            <TnNumberBox v-model="item.quantity" :min="1" :max="999" @change="handleChange(item)" />
          </view>
        </view>
      </template>
    </view>
    <view class="fixed bottom-1 left-0 right-0 z-20 w-full h-[180rpx] shop-btn-bottom">
      <view class="flex justify-between items-center h-[110rpx] w-full rounded-[55rpx] bg-gray-100 shadow">
        <view class="flex">
          <TnAvatar shape="square" class="ml-4"
            url="https://ts1.cn.mm.bing.net/th/id/R-C.8c2d61a457758ce7710ffe28d41fea2e?rik=hgFEMM%2bSoNYZaw&riu=http%3a%2f%2fwww.kuaipng.com%2fUploads%2fpic%2fw%2f2020%2f12-16%2f95747%2fwater_95747_698_691.25_.png&ehk=LOkC8ZdEHk%2bRGO9kM6ZABgPOn%2bTc%2f5j%2f6WO1R6ERaY8%3d&risl=&pid=ImgRaw&r=0"
            badge="99" size="65rpx" />
          <view class="ml-6">
            <view class="flex text-black font-bold">预计到手<view class="text-red-500 ml-1 mr-2">¥</view>
              <view class="text-red-500">{{ computedChecked }}</view>
            </view>
            <view class="text-[24rpx] mt-2 text-gray-700">已享受更多优惠，共减免25元</view>
          </view>
        </view>
        <view
          class="h-full w-[180rpx] bg-blue-800 text-white text-center flex justify-center items-center rounded-r-55rpx">
          去结算
        </view>
      </view>
    </view>
  </TnPopup>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import TnCheckbox from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox.vue'
import TnAvatar from '@tuniao/tnui-vue3-uniapp/components/avatar/src/avatar.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnNumberBox from '@tuniao/tnui-vue3-uniapp/components/number-box/src/number-box.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnEmpty from '@tuniao/tnui-vue3-uniapp/components/empty/src/empty.vue'
import { removeAll, shopCartList } from '@/api/modules/shopCarts'
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})
const numberValue = ref<number>(0)
const showPopup = ref(false)
//监听show的变化赋值给shopPopup
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      showPopup.value = true
      getShopCarts()
    } else {
      showPopup.value = false
    }
  }
)
const emit = defineEmits(['close'])
const handleClose = () => {
  emit('close')
}
const allChecked = ref(false)

const shopCartListInfo = ref<any[]>([])
//加载购物车列表
const getShopCarts = () => {
  shopCartList().then((res: any) => {
    console.log('%c [ 购物车列表 ]-93', 'font-size:13px; background:pink; color:#bf2c9f;', res)
    shopCartListInfo.value = res.data
    // shopCartListInfo.value 每一项都加一个checked属性
    shopCartListInfo.value.forEach((item: any) => {
      item.checked = false
    })
  })
}
//选中购物车的时候
const handleChecked = (item: any) => {
  //判断是否全部选中
  const isAllChecked = shopCartListInfo.value.every((item: any) => {
    return item.checked
  })
  allChecked.value = isAllChecked
}
//计算属性计算 选中的商品数量和价格
const computedChecked = computed(() => {
  const total = shopCartListInfo.value.reduce((acc: any, cur: any) => {
    if (cur.checked) {
      acc += cur.price * cur.quantity;
    }
    return acc;
  }, 0);
  // 在累加完成后保留两位小数
  return parseFloat(total.toFixed(2));
})
//控制全选
const handleCheckedAll = () => {
  shopCartListInfo.value.forEach((item: any) => {
    item.checked = allChecked.value
  })
}
//清空所有的购物车
const handleRemoveAll = () => {
  //提示是否清空购物车
  uni.showModal({
    title: '提示',
    content: '是否清空购物车',
    success: (res) => {
      let ids = shopCartListInfo.value.map(item => item.id)
      if (res.confirm) {
        // 清空购物车
        removeAll({ ids }).then((res: any) => {
          if (res.code === 200) {
            uni.showToast({
              title: '清空购物车成功',
              icon: 'none',
            })
            getShopCarts()
          }
        })
      }
    }
  })
}
//购物车的值发生变化时
const handleChange = (item: any) => {

  console.log('%c [ 购物车的值发生变化时 ]-159', 'font-size:13px; background:pink; color:#bf2c9f;', item)
}
</script>
<style scoped>
.shop-btn-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
