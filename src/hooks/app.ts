import { ref, onMounted, onUnmounted } from 'vue'

//示例 文本复制
export default function useClipboard(textToCopy: string) {
  // 创建一个ref来存储复制状态
  const isCopied = ref(false)

  // 复制文本的函数
  const copyText = async () => {
    try {
      // 等待navigator clipboard api可用
      await navigator.clipboard.writeText(textToCopy)
      isCopied.value = true
      setTimeout(() => {
        isCopied.value = false
      }, 2000) // 2秒后恢复状态
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  // 在组件挂载时初始化
  onMounted(() => {
    // 如果需要，可以在这里做些什么，但本例中直接使用即可
  })

  // 在组件卸载时清理（如果有必要的话，本例中其实不需要）
  onUnmounted(() => {
    // 清理操作（如果有）
  })

  // 返回状态和方法
  return { isCopied, copyText }
}
