<template>
  <view class="flex flex-col h-screen">
    <view class="flex-1">
      <view class="w-[660rpx] h-[800rpx] bg-white shadow-light-500 rounded-xl m-auto mt-4">
        <view class="p-3">
          <TnForm ref="formRef" :model="formData" :rules="formRules">
            <TnFormItem label-position="left" label="联系人" prop="receiverName">
              <TnInput size="lg" border underline v-model="formData.receiverName" placeholder="请输入联系人名称" />
            </TnFormItem>
            <TnFormItem label-position="left" label="性别" prop="sex">
              <TnRadioGroup v-model="selectValue">
                <TnRadio label="1">男</TnRadio>
                <TnRadio label="2">女</TnRadio>
              </TnRadioGroup>
            </TnFormItem>
            <TnFormItem label-position="left" label="手机号" prop="receiverPhone">
              <TnInput size="lg" border underline placeholder="请输入手机号" v-model="formData.receiverPhone" />
            </TnFormItem>
            <TnFormItem label="地址" prop="address" placeholder="请输入地址">
              <TnInput size="lg" border underline placeholder="请输入地址" v-model="formData.address" />
            </TnFormItem>
            <TnFormItem label="门牌号" prop="houseNumber">
              <TnInput size="lg" border underline placeholder="请输入门牌号" v-model="formData.houseNumber" />
            </TnFormItem>
            <TnFormItem label="标签" placeholder="请输入标签" prop="addressTag">
              <view class="flex justify-around">
                <template v-for="(item, index) in tagList" :key="index">
                  <TnTag @click="handleTag(item)" :custom-style="item.value === selectTag ? activeTagStyle : tagStyle">{{
                    item.text }}</TnTag>
                </template>
              </view>
            </TnFormItem>
            <TnFormItem label="默认地址" prop="isDefault">
              <view class="flex justify-end">
                <TnSwitch v-model="formData.isDefault" />
              </view>
            </TnFormItem>
          </TnForm>
        </view>
      </view>
    </view>
    <view class="w-full flex justify-center shop-btn-bottom">
      <TnButton @click="handleAdd" custom-class="my-btn" width="680rpx" height="82rpx" :custom-style="style">保存
      </TnButton>
    </view>
  </view>
</template>
<script setup lang="ts">
import TnRadio from '@tuniao/tnui-vue3-uniapp/components/radio/src/radio.vue'
import TnRadioGroup from '@tuniao/tnui-vue3-uniapp/components/radio/src/radio-group.vue'
import TnForm from '@tuniao/tnui-vue3-uniapp/components/form/src/form.vue'
import TnFormItem from '@tuniao/tnui-vue3-uniapp/components/form/src/form-item.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnSwitch from '@tuniao/tnui-vue3-uniapp/components/switch/src/switch.vue'
import TnTag from '@tuniao/tnui-vue3-uniapp/components/tag/src/tag.vue'
import { ref, type CSSProperties, reactive } from 'vue'
import type { FormRules, TnFormInstance } from '@tuniao/tnui-vue3-uniapp'
import { saveAddress } from '@/api/modules/user'
const style: CSSProperties = {
  fontSize: '32rpx',
  color: '#ffffff',
  backgroundColor: '#e46345',
  borderRadius: '42rpx',
  marginRight: '20rpx',
}
const tagStyle: CSSProperties = {
  fontSize: '25rpx',
  color: 'black',
  backgroundColor: '#f5f5f5',
  borderRadius: '32rpx',
  height: '62rpx',
  width: '150rpx',
  textAlign: 'center',
}
const activeTagStyle: CSSProperties = {
  fontSize: '25rpx',
  color: 'white',
  backgroundColor: '#FF902A',
  borderRadius: '32rpx',
  height: '62rpx',
  width: '150rpx',
  textAlign: 'center',
}
const tagList = ref([
  {
    text: '公司',
    value: 1,
  },
  {
    text: '家',
    value: 2,
  },
  {
    text: '学校',
    value: 3,
  },
])
// 表单数据
const formData = reactive({
  receiverName: '',
  receiverPhone: '',
  address: '',
  isDefault: 1,
  houseNumber: '',
  sex: '1',
  addressTag: '',
})
const selectTag = ref(1)
const handleTag = (item: any) => {
  console.log(item)
  selectTag.value = item.value
  formData.addressTag = item.text
}
const selectValue = ref('')
const formRef = ref<TnFormInstance>()
// 规则
const formRules: FormRules = {
  receiverName: [{ required: true, message: '请输入联系人名称', trigger: ['change', 'blur'] }],
  sex: [{ required: true, message: '请选择性别', trigger: ['change', 'blur'] }],
  receiverPhone: [{ required: true, message: '请填写手机号', trigger: ['change', 'blur'] }],
  address: [{ required: true, message: '请填写地址', trigger: ['change', 'blur'] }],
  houseNumber: [{ required: true, message: '请填写门牌号', trigger: ['change', 'blur'] }],
  addressTag: [{ required: true, message: '请选择标签', trigger: ['change', 'blur'] }],
}
const handleAdd = () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      formData.isDefault = formData.isDefault ? 1 : 2
      console.log('%c [  ]-131', 'font-size:13px; background:pink; color:#bf2c9f;', formData)
      const res = await saveAddress(formData)
      console.log('%c [  ]-150', 'font-size:13px; background:pink; color:#bf2c9f;', res)
      uni.showToast({
        title: '新增地址成功',
        icon: 'success',
      })
      //跳转列表页
      uni.navigateBack()
    } else {
      uni.showToast({
        title: '表单校验失败',
        icon: 'none',
      })
    }
  })
}
</script>
<style>
page {
  @apply bg-[#F5F5F5];
}
</style>
<style scoped>
.shop-btn-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
