import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
export const useUserStore = defineStore(
  'userStore',
  () => {
    const token = ref('')
    const userInfo = reactive({
      id: '',
      avatarUrl: '',
      nickname: '',
      phoneNumber: '',
      username: '',
      email: '',
    })
    const setToken = (value: string) => {
      token.value = value
    }
    const getToken = () => {
      return token.value
    }
    const setUserInfo = (value: any) => {
      userInfo.id = value.id
      userInfo.avatarUrl = value.avatarUrl
      userInfo.nickname = value.nickname
      userInfo.username = value.username
      userInfo.phoneNumber = value.phoneNumber
      userInfo.email = value.email
    }
    const getUserInfo = () => {
      return userInfo
    }

    const removeUseInfo = () => {
      userInfo.id = ''
      userInfo.avatarUrl = ''
      userInfo.nickname = ''
      userInfo.username = ''
      userInfo.phoneNumber = ''
      userInfo.email = ''
    }

    const isLogin = () => {
      return token.value !== ''
    }
    return { token, setToken, getToken, setUserInfo, getUserInfo, userInfo, removeUseInfo, isLogin }
  },
  //持久化配置
  {
    persist: {
      storage: {
        getItem: uni.getStorageSync,
        setItem: uni.setStorageSync, // uni-app配置用官方的uni.getStorageSync，因为没有localstorage的说法
      },
    },
  }
)
