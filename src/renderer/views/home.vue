<template>
  <div class="home">
    <h1>{{title}}</h1>
    <h2>使用协议</h2>
    <h3>一.基本信息</h3>
    <p>版本号:v1.0</p>
    <!-- <p>作者:思吾谓何思</p> -->
    <h3>二.软件组成</h3>
    <p>本软件是封装mavon-editor编辑器以及nedb数据库而成</p>
    <h3>三.开源协议</h3>
    <p>本软件完全开源免费,遵循MIT协议!</p>
    <p>github地址:https://github.com/lyttonlee/md-editor</p>
    <h3>四.使用特色</h3>
    <li>本软件加入了七牛云配置,只要填入自己的七牛云信息,文章中插入的图片将自动上传至用户的七牛云空间,且获得返回的图片地址</li>
    <li>一般如简书.思否等支持markdown写作的平台,上传图片最大支持5M,如果使用该编辑器先编辑好文章,再发布到其他博客平台,就可以不受此限制!</li>
    <li>本软件使用的是nedb本地数据库,所有信息均是保存在本地的,所以请不要担心你辛苦写的文章会事先泄露(本软件唯一需要网络支持的地方在于上传图片到七牛云服务器)
    </li>
    <!-- <h3>五.最后我也厚颜无耻一下</h3>
    <img src="../assets/zfb.jpg" alt="">
    <h4>如果你用了本软件感觉的确对你有帮助,不知我是否能厚颜无耻求个打赏,金额随意!</h4> -->
    <el-button type="primary" @click="toset">确 定</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '感谢使用markdown文章编辑器'
    }
  },
  methods: {
    toset () {
      // 从本地数据库中读出七牛云配置
      // this.$store.dispatch('qnoption')
      this.$db.findOne({hasoption: {$exists: true}}, (err, doc) => {
        if (err) {
          console.log(err + '出错误了！')
        } else {
          console.log(doc)
          if (doc) {
            this.$router.push('/home')
          } else {
            this.$router.push('/option')
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  .el-button {
    width: 100%;
  }
  h3,p, li {
    text-align: left;
    margin: 10px 20px;
  }
  li {
    font-size: 14px;
  }
  img {
    width: 120px;
    text-align: left;
  }
}
</style>

