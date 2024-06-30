<template>
  <view class="pl-6 pr-6 pt-6 flex justify-between items-center">
    <view class="flex items-center" @click="handleMenu">
      <img class="w-4 h-3" src="@/static/images/menu.png" alt="">
      <view class="ml-4 text-primary text-2xl">{{ props.title }}</view>
    </view>
    <view @click="handleIcon">
      <img class="w-5 h-5" :src="props.icon" alt="">
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const showMenu = ref(false)
const emit = defineEmits(['showMenu', 'handleIconEvent'])
const props = defineProps({
  title: {
    type: String,
    default: "Home"
  },
  icon: {
    type: String,
    default: "/static/images/search.png"
  }
})
const handleMenu = () => {
  showMenu.value = true
  emit('showMenu', showMenu.value)
}
const handleIcon = () => {
  console.log('icon Event handle')
  emit('handleIconEvent')
}
</script>

<style scoped></style>