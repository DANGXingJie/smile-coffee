// 登录用户信息
interface IloginUser {
  appid?: string
  code?: string
  iv?: string
  rawData?: string
  signature?: string
  encryptedData?: string
}
//用户个人信息
export interface IUserInfo {
  avatar: string
  bio: string
  email: string
  is_active: number
  last_login_time: string
  phone: string
  status: number
  user_name: string
}
//blibli视频信息
export interface ImovieInfo {
  title: string
  user: string
  desc: null
  user_avathor: string
  img_url: string
  url: string
}

//嵌套的个人信息
interface IProfile {
  email: string
  phone: string
  birthdate: string
}

interface IAddress {
  street: string
  city: string
  state: string
  postalCode: string
}

interface IItem {
  productId: string
  quantity: number
  price: number
}

interface IOrder {
  orderId: string
  items: IItem[]
  totalAmount: number
  orderDate: string
}

interface IUser {
  id: number
  name: string
  profile: IProfile
  address: IAddress
  orders: IOrder[]
}

export interface IResult {
  users: IUser[]
}
