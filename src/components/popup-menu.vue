<template>
  <view>
    <TnPopup v-model="showPopup" open-direction="left" maskCloseable @close="handleClose">
      <view class="w-[600rpx] h-full">
        <view class="h-[300rpx] bg-[#B7343D] flex justify-center items-center">
          <img class="w-[480rpx] h-[120rpx]" src="/static/images/title.png" alt="">
        </view>
        <view class="w-[600rpx] h-full -mt-6  bg-white shadow-md  rounded-tl-[50rpx] rounded-tr-[50rpx] ">
          <view class="pt-8 flex flex-col">
            <template v-for="(item, index) in list" :key="index">
              <view class="mb-6 font-bold text-2xl w-[500rpx] h-[80rpx]  leading-[80rpx] text-left menu-item "
                @click="handleSelect(item.key)"
                :class="item.key === selectKey ? 'menu-item-active menu-item-active-text' : ''">
                <view class="pl-8">{{ item.name }}</view>
              </view>
            </template>
          </view>
        </view>
      </view>
    </TnPopup>
  </view>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
const showPopup = ref(false)
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['close'])
const handleClose = () => {
  emit('close')
  selectKey.value = 1
}
watch(() => props.show, (newVal) => {
  if (newVal) {
    showPopup.value = true
  } else {
    showPopup.value = false
  }
})
const selectKey = ref(1)
const list = [
  {
    key: 1,
    name: 'Home',
    icon: 'el-icon-info',
    to: '/about',
  },
  {
    key: 2,
    name: 'Payment',
    icon: 'el-icon-github',
    to: 'https://github.com/zhangyuang/vue3-admin-template',
  },
  {
    key: 3,
    name: 'Address',
    icon: 'el-icon-github',
    to: 'https://github.com/zhangyuang/vue3-admin-template',
  },
  {
    key: 4,
    name: 'Privacy Policy',
    icon: 'el-icon-github',
    to: 'https://github.com/zhangyuang/vue3-admin-template',
  },
  {
    key: 5,
    name: 'Terms and Use',
    icon: 'el-icon-github',
    to: 'https://github.com/zhangyuang/vue3-admin-template',
  },
  {
    key: 6,
    name: 'About',
    icon: 'el-icon-github',
    to: 'https://github.com/zhangyuang/vue3-admin-template',
  },
  {
    key: 7,
    name: 'Contact Us',
    icon: 'el-icon-github',
    to: 'https://github.com/zhangyuang/vue3-admin-template',
  },
]
const handleSelect = (key: number) => {
  selectKey.value = key
}
</script>
<style scoped>
.menu-item {
  @apply relative;
}

.menu-item-active::before {
  content: '';
  @apply absolute left-0 top-0 w-1 h-full bg-primary opacity-100 transition-all;
}

.menu-item-active-text {
  @apply text-primary;
}
</style>