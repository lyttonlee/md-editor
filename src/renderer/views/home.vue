<template>
  <div class="home">
    <h1>{{title}}</h1>
    <h3>使用协议</h3>
    <p>Our Pledge
In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

Our Standards
Examples of behavior that contributes to creating a positive environment include:

Using welcoming and inclusive language
Being respectful of differing viewpoints and experiences
Gracefully accepting constructive criticism
Focusing on what is best for the community
Showing empathy towards other community members
Examples of unacceptable behavior by participants include:

The use of sexualized language or imagery and unwelcome sexual attention or advances
Trolling, insulting/derogatory comments, and personal or political attacks
Public or private harassment
Publishing others’ private information, such as a physical or electronic address, without explicit permission
Other conduct which could reasonably be considered inappropriate in a professional setting</p>
    <el-button type="primary" @click="toset">确 定</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '感谢使用markdown编辑器！'
    }
  },
  methods: {
    toset () {
      // 从本地数据库中读出七牛云配置
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
}
</style>

