import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
// import { persistConfig } from '@/utils/common'
export const useCardStore = defineStore(
  'card',
  () => {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
      count.value++
    }
    const cardInfo = ref('Card Store信息')
    const setCardInfo = (value: string) => {
      cardInfo.value = value
    }
    return { count, doubleCount, increment, cardInfo, setCardInfo }
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
