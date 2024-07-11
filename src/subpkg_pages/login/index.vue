<template>
  <view class="w-full h-screen">
    <view class="h-[210rpx] mt-[100rpx] w-[700rpx] m-auto  flex justify-center items-center">
      <view class="text-center text-[40rpx] font-bold">登录</view>
    </view>
    <view class="mt-[50rpx] m-auto w-[700rpx] h-[400rpx]">
      <TnForm label-position="left" ref="formRef" :model="formData" :rules="formRules">
        <TnFormItem label="昵称" prop="user_name">
          <TnInput v-model="formData.user_name" />
        </TnFormItem>
        <TnFormItem label="密码 " prop="password">
          <TnInput type="password" v-model="formData.password" />
        </TnFormItem>
      </TnForm>
      <view class="m-auto mt-[100rpx] flex justify-center w-[550rpx] h-[80rpx]">
        <TnButton custom-class="rounded-[40rpx]" type="success" width="550" height="80" @click="submitForm"> 提交
        </TnButton>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import TnForm from '@tuniao/tnui-vue3-uniapp/components/form/src/form.vue'
import TnFormItem from '@tuniao/tnui-vue3-uniapp/components/form/src/form-item.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import type { FormRules, TnFormInstance } from '@tuniao/tnui-vue3-uniapp'
import { useUserStore } from '@/stores/modules/user';
import { userLogin } from '@/api/modules/user'
const userStore = useUserStore()
const formRef = ref<TnFormInstance>()
// 表单数据
const formData = reactive({
  user_name: '',
  password: '',
})
// 规则
const formRules: FormRules = {
  user_name: [
    { required: true, message: '请输入用户名', trigger: ['change', 'blur'] },
    {
      pattern: /^[\w-]{4,16}$/,
      message: '请输入4-16位英文、数字、下划线、横线',
      trigger: ['change', 'blur'],
    },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: ['change', 'blur'] },
    {
      pattern: /^[\w-]{4,16}$/,
      message: '请输入4-16位英文、数字、下划线、横线',
      trigger: ['change', 'blur'],
    },
  ],
}
/* 提交表单 */
const submitForm = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      login()
    } else {
      uni.showToast({
        title: '请输入完整的表单信息',
        icon: 'none',
      })
    }
  })
}
//登录
const login = async () => {
  let data: any = await userLogin(formData)
  //设置token
  userStore.setToken(data.data.token)
  uni.showToast({
    title: '登录成功',
  })
  uni.switchTab({
    url: '/pages/index/index',
  })
}
</script>
<style scoped></style>