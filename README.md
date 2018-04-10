# md-editor

> 个人markdown文章编辑器

## 使用协议


### 基本信息
版本号:v1.0
作者:思吾谓何思


### 软件组成
本软件是封装mavon-editor编辑器以及nedb数据库而成


### 开源协议</h3>
本软件完全开源免费,遵循MIT协议!

github地址:https://github.com/lyttonlee/md-editor


### 使用特色
本软件加入了七牛云配置,只要填入自己的七牛云信息,文章中插入的图片将自动上传至用户的七牛云空间,且获得返回的图片地址

一般如简书.思否等支持markdown写作的平台,上传图片最大支持5M,如果使用该编辑器先编辑好文章,再发布到其他博客平台,就可以不受此限制!

本软件使用的是nedb本地数据库,所有信息均是保存在本地的,所以请不要担心你辛苦写的文章会事先泄露(本软件唯一需要网络支持的地方在于上传图片到七牛云服务器)


#### 当然如果您愿意的话也感谢你的支持，金额随意

![image](https://github.com/lyttonlee/pic/raw/master/zfb.jpg?raw=true)

作者的支付宝收款码


#### Build Setup

#### 推荐使用yarn安装打包

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:9080
yarn run dev

# build electron application for production
yarn run build

# run unit & end-to-end tests
yarn test


# lint all JS/Vue component files in `src/`
yarn run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[7c4e3e9](https://github.com/SimulatedGREG/electron-vue/tree/7c4e3e90a772bd4c27d2dd4790f61f09bae0fcef) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
