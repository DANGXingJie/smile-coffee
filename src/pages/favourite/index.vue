<template>
  <view>
    favouite page

  </view>
</template>

<script setup lang="ts">


const test = () => {
  for (var i = 0; i < 10; i++) {
    console.log(i)
  }
  console.log("i的值为:", i,)
}

const test2 = () => {
  let i = 0
  let valuei = i++
  console.log("valuei的值为:", valuei)//0
  console.log("i的值为:", i,)//1
}
const test3 = () => {
  let i = 0
  let valuei = ++i
  console.log("valuei的值为:", valuei)//1
  console.log("i的值为:", i,)//1
}
//test2()
test3()
//test()
</script>

<style scoped></style>