<template>
  <view class="w-full h-screen login-bg">
    <view class="mt-[214rpx] ml-[76rpx] w-[516rpx] h-[152px] text-[54rpx] text-left">
      Find the best coffee for you
    </view>
    <view class="h-[36rpx] mt-[104rpx] flex ml-[76rpx]">
      <template v-for="(item, index) in options" :key="item.value+index">
        <view @click="onChange(item.value)" :class="currentValue === item.value ? 'bg-btnBg' : ''"
          class="text-center mr-[24rpx] w-[82rpx] h-[48rpx] rounded rounded-xl flex justify-center items-center">
          {{ item.label }}</view>
      </template>
    </view>
    <view class="mt-[37rpx] m-auto w-[666rpx] h-[400rpx]">
      <TnForm label-position="top" ref="formRef" :model="formData" :rules="formRules" hide-required-asterisk>
        <TnFormItem label="" prop="user_name">
          <TnInput height="90rpx" v-model="formData.user_name">
            <template #prefix>
              <TnIcon name="circle" />
            </template>
          </TnInput>
        </TnFormItem>
        <TnFormItem label=" " prop="password">
          <TnInput height="90rpx" type="password" v-model="formData.password">
            <template #prefix>
              <TnIcon name="lock" />
            </template>
          </TnInput>
        </TnFormItem>
      </TnForm>

      <view class="mt-[71rpx] text-right text-[26rpx] text-[#C5C5C5]">忘记密码</view>
      <view class="m-auto mt-[261rpx] flex justify-center w-[666rpx] h-[90rpx]">
        <TnButton text-color="#fff" bg-color="#FF902A" custom-class="rounded-[40rpx]" type="success" width="666"
          height="90" @click="submitForm"> 登录
        </TnButton>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnForm from '@tuniao/tnui-vue3-uniapp/components/form/src/form.vue'
import TnFormItem from '@tuniao/tnui-vue3-uniapp/components/form/src/form-item.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import type { FormRules, TnFormInstance } from '@tuniao/tnui-vue3-uniapp'
import { useUserStore } from '@/stores/modules/user';
import { userLogin } from '@/api/modules/user'
import { onReady, onShow } from '@dcloudio/uni-app'
const userStore = useUserStore()
//登录注册选项
const options = reactive([
  {
    label: '登录',
    value: 1,
  },
  {
    label: '注册',
    value: 2,
  },
])
//当前选中的选项
const currentValue = ref(1)
const onChange = (value: number) => {
  console.log(value)
  //设置当前选项
  currentValue.value = value
}

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
      //login()
      uni.switchTab({
        url: '/pages/index/index',
      })
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
onReady(() => {
  // console.log('login onShow')
  // //动态修改状态栏的颜色
  // uni.setNavigationBarColor({
  //   //前景颜色
  //   frontColor: '#ffffff',
  //   //背景颜色
  //   backgroundColor: '#171111'
  // })

})
</script>
<style scoped>
.login-bg {
  /* background: url('../../static/images/bg-login.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  position: fixed; */
}
</style>