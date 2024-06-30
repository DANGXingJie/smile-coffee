## uni-app 小程序 

#### 技术栈

Vue3+Vite+Uni-app+Pinia+TuniaoUI V3+windi.css+typescript 

#### 快速开始

##### 克隆项目

```shell
git clone https://gitee.com/xinjiedang/online-book.git
```

##### 使用vscode打开，安装依赖（可以用来开发项目，个人比较推荐）

```shell
yarn
或
npm i
```

##### 打开HBuilder X，导入项目（可以只用来运行项目）

选中项目，找到编辑器菜单栏找到  运行->运行到小程序模拟器->微信开发者工具，即可运行项目

#### 项目说明

##### 项目创建，使用vue-cli创建ui-app 项目， typescript 开发的工程

```she
npx degit dcloudio/uni-preset-vue#vite-ts my-vue3-project
```

##### 集成windi.css 原子化css框架

小程序用上原汁原味的 Tailwind/Windi CSS，文档地址：[Mini Program Tailwind Webpack Plugin (craft.me)](https://true.craft.me/Wx2f9cjGwyZYOx/x/8049AFBE-6BA8-4513-B2A7-528633DE83E8)

主要是这个插件：@dcasia/mini-program-tailwind-webpack-plugin -D

##### 集成Pinia 状态管理

文档地址：[介绍 | Pinia 中文文档 (web3doc.top)](https://pinia.web3doc.top/introduction.html)

如果使用HBuilder X创建的项目，无需安装pinia，已经内置

使用vue-cli创建的项目

```shell
//执行 
yarn add pinia@2.0.36
//或
npm install pinia@2.0.36 //安装，要固定版本
```

pinia持久化配置，文档地址：[快速开始 | pinia-plugin-persistedstate (prazdevs.github.io)](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/)

```
yarn add piniaPluginPersistedstate
```

持久化需要在每个业务store中单独配置

```typescript
//持久化配置
  {
    persist: {
      // uni-app配置用官方的uni.getStorageSync，因为没有localstorage的说法
      storage: {
        getItem: uni.getStorageSync,
        setItem: uni.setStorageSync,
      },
    },
  }
```

或者安装专门为uni-app 设置的插件

```shell
npm i pinia-plugin-unistorage -D
```

持久化只需要开启：unistorage: true, 

```typescript
import { defineStore } from "pinia";
export const useStore = defineStore(
  "main",
  () => {
    const someState = ref("hello pinia");
    return { someState };
  },
  {
    unistorage: true, // 开启后对 state 的数据读写都将持久化
  },
);
```

##### 集成axios封装请求，需要适配微信小程序，安装以下这个插件

```shell
yarn add axios axios-miniprogram-adapter
```

##### TuniaoUI V3 组件库（Vue3 Typescript Uniapp版本）

文档地址：[安装 - TuniaoUI (tuniaokj.com)](https://vue3.tuniaokj.com/doc/guide/install.html)

##### 原型图和设计稿

mastergo资源社区，搜索**线上书店**，[线上书店APP界面设计-MasterGo 社区](https://mastergo.com/community/resource/9910?from=card)

#### 运行截图

![1719745025513.png](https://img.picui.cn/free/2024/06/30/668139bfd9045.png)
![1719745035674.png](https://img.picui.cn/free/2024/06/30/668139bfdc26e.png)
![1719745006163.png](https://img.picui.cn/free/2024/06/30/668139c05ab5a.png)
![1719745054272.png](https://img.picui.cn/free/2024/06/30/668139c05f558.png)





#### 项目树结构

```
vue3-test
├─ .env.development                                   //配置文件开发环境
├─ .env.production                                    //配置文件生产环境
├─ .gitignore
├─ .hbuilderx
│  └─ launch.json
├─ index.html
├─ package-lock.json
├─ package.json
├─ shims-uni.d.ts
├─ src
│  ├─ api                                             //接口请求
│  │  ├─ modules                                      //业务接口
│  │  │  └─ card.ts
│  │  └─ types                                        //类型
│  ├─ App.vue
│  ├─ components                                      //全局组件
│  │  ├─ hader-menu.vue
│  │  └─ popup-menu.vue
│  ├─ env.d.ts
│  ├─ hooks                                           //全局hooks
│  │  └─ app.ts
│  ├─ main.ts
│  ├─ manifest.json
│  ├─ pages                                           //主包页面
│  │  ├─ card
│  │  │  └─ index.vue
│  │  ├─ favourite
│  │  │  └─ index.vue
│  │  ├─ index
│  │  │  ├─ components                                //页面内组件
│  │  │  │  └─ test.vue
│  │  │  └─ index.vue
│  │  └─ user
│  │     └─ index.vue
│  ├─ pages.json                                      //页面配置
│  ├─ shime-uni.d.ts
│  ├─ static                                          //静态文件
│  │  ├─ images
│  │  │  ├─ Authors.png
│  │  │  ├─ card.png
│  │  │  ├─ Department.png
│  │  │  ├─ favourite.png
│  │  │  ├─ home.png
│  │  │  ├─ menu.png
│  │  │  ├─ pic.png
│  │  │  ├─ right-icon.png
│  │  │  ├─ School.png
│  │  │  ├─ score.png
│  │  │  ├─ search.png
│  │  │  ├─ title.png
│  │  │  ├─ University.png
│  │  │  └─ user.png
│  │  └─ logo.png
│  ├─ stores                                          //状态管理
│  │  ├─ index.ts
│  │  └─ modules
│  │     ├─ card.ts
│  │     ├─ favourite.ts
│  │     └─ user.ts
│  ├─ subpkg_pages                                    //分包1
│  │  ├─ about
│  │  └─ login
│  │     └─ index.vue
│  ├─ types                                           //全局类型
│  │  └─ global.d.ts
│  ├─ uni.scss
│  └─ utils                                           //工具类
│     ├─ common.ts                                    //通用工具函数
│     └─ request.ts                                   //请求封装
├─ tsconfig.json
├─ vite-env.d.ts
├─ vite.config.ts                                     //vite配置文件
├─ windi.config.ts                                    //windi.css配置文件
└─ yarn.lock

```



