
```yaml
vue3-test
├─ .env.development                                   //配置文件生产环境
├─ .env.production                                    //配置文件开发环境
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