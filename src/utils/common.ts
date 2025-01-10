/**
 * 节流
 * @param func
 * @param wait
 * @returns
 */
export function throttle(func: (...args: any[]) => void, wait: number = 100) {
  let timeoutId: NodeJS.Timeout | null = null
  let lastExecutedTime = 0
  return function throttled(...args: any[]) {
    const now = Date.now()
    const remainingTime = wait - (now - lastExecutedTime)
    if (remainingTime <= 0 || remainingTime > wait) {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      lastExecutedTime = now
      func.apply(this, args)
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastExecutedTime = Date.now()
        timeoutId = null
        func.apply(this, args)
      }, remainingTime)
    }
  }
}

/**
 *
 * @param func 防抖
 * @param wait
 * @param immediate
 * @returns
 */
export function debounce(func: (...args: any[]) => void, wait: number = 100, immediate?: boolean) {
  let timeoutId: NodeJS.Timeout | null = null
  return function debounced(...args: any[]) {
    const context = this
    const later = () => {
      timeoutId = null
      if (!immediate) {
        func.apply(context, args)
      }
    }
    const callNow = immediate && !timeoutId
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(later, wait)
    if (callNow) {
      func.apply(context, args)
    }
  }
}

/**简单深拷贝
 * @param obj
 * @returns
 */
export function deepCloneByJSON<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

//复杂对象深拷贝
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  let clone: any
  if (Array.isArray(obj)) {
    clone = [] as any[]
    for (let i = 0; i < obj.length; i++) {
      clone[i] = deepClone(obj[i])
    }
  } else {
    clone = {} as T
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clone[key] = deepClone(obj[key])
      }
    }
  }
  return clone
}

//日期格式化
export function customFormatDate(date, format = 'yyyy-MM-dd HH:mm:ss') {
  const map = {
    yyyy: date.getFullYear(),
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    dd: String(date.getDate()).padStart(2, '0'),
    HH: String(date.getHours()).padStart(2, '0'),
    mm: String(date.getMinutes()).padStart(2, '0'),
    ss: String(date.getSeconds()).padStart(2, '0'),
  }
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (match) => map[match])
}
/**
 *
 * @param dateString 根据日期字符串获取星期几
 * @returns
 */
export function getWeekDay(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1) // 假设周一为一周的开始
  const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000) // 一周后的同一时间（不包括最后一天的时间部分）

  // 检查是否在同一天
  if (date.toDateString() === today.toDateString()) {
    return '今天到期'
  }

  // 检查是否在同一周（从周一开始计算）
  if (date >= startOfWeek && date < endOfWeek) {
    const weekDays = ['日', '一', '二', '三', '四', '五', '六']
    return '本周' + weekDays[date.getDay()] + '到期'
  }

  // 如果不是本周，则返回默认（可以根据需要调整）
  return date.toLocaleDateString() + '到期'
}

// 注意：上面的代码假设一周从周一开始，并且`dateString`是一个有效的日期字符串。
// 在实际应用中，您应该添加对无效日期的检查，并且可能需要根据您的时区或一周的开始日来调整逻辑。
