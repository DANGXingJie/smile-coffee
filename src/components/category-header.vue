<template>
  <view class="mt-[31rpx] flex justify-between">
    <view class="pl-4 text-[34rpx] text-secondary">{{ props.title }}</view>
    <view @click="handleFindAll" v-if="props.isFindAll" class="pr-4 text-[26rpx] text-firstGray">查看全部
      <TnIcon name="right" type="info" />
    </view>
  </view>
</template>

<script setup lang="ts">
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
const props = withDefaults(defineProps<{ title: string, pagePath: string, isFindAll: boolean }>(), {
  title: "5月榜单",
  pagePath: "",
  isFindAll: true
})
const emit = defineEmits<{ (e: 'click'): void }>()

const handleFindAll = () => {
  console.log('findAll')
  emit('click')
}

</script>

<style scoped></style>