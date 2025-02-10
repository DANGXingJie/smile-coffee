import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
// import { persistConfig } from '@/utils/common'
export const useProductStore = defineStore(
  'product',
  () => {
    const preOrderInfo = reactive({
      productId: '',
      quantity: 18,
      price: 0,
      addressId: '',
      temperature: '',
      concentration: '',
      remark: '',
    })

    const setPreOrderInfo = (value: any) => {
      preOrderInfo.productId = value.productId
      preOrderInfo.quantity = value.quantity
      preOrderInfo.price = value.price
      preOrderInfo.addressId = value.addressId
      preOrderInfo.temperature = value.temperature
      preOrderInfo.concentration = value.concentration
      preOrderInfo.remark = value.remark
    }
    const getPreOrderInfo = () => {
      return preOrderInfo
    }
    return { preOrderInfo, setPreOrderInfo, getPreOrderInfo }
  },
  //持久化配置
  {
    persist: {
      // uni-app配置用官方的uni.getStorageSync，因为没有localstorage的说法
      storage: {
        getItem: uni.getStorageSync,
        setItem: uni.setStorageSync,
      },
    },
  }
)
