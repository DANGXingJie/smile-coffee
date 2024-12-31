<template>
  <view class="p-[36rpx]">
    <TnSearchBox shape="round" v-model="searchValue" @clear="clearEvent" @input="searchInputEvent"
      @search="searchBtnClickEvent" search-button-bg-color="#FF902A" />
  </view>
</template>

<script setup lang="ts">
import TnSearchBox from '@tuniao/tnui-vue3-uniapp/components/search-box/src/search-box.vue'
import { ref } from 'vue'
const searchValue = ref('')

const emit = defineEmits(['onSearchInputEvent', 'onSearchBtnClickEvent', "onClearEvent"])

const searchInputEvent = (value: string) => {
  // eslint-disable-next-line no-console
  console.log('searchInputEvent', value)
}
const searchBtnClickEvent = (value: string) => {
  // eslint-disable-next-line no-console
  console.log('searchBtnClickEvent', value)
  emit('onSearchBtnClickEvent', value)
}

const clearEvent = () => {
  emit('onClearEvent', "")
}

</script>

<style scoped></style>