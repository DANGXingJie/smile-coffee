// 节流
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

//防抖
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

//简单深拷贝
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
