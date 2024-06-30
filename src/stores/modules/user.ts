import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
export const useUserStore = defineStore(
  'userStore',
  () => {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
      count.value++
    }
    const name = ref('Card Store信息')

    return { count, doubleCount, increment, name }
  },
  //持久化配置
  { persist: true }
)
