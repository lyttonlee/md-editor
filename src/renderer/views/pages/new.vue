<template>
  <div class="section">
    <el-input 
      v-model="title"
      placeholder="文章标题">
    </el-input>
    <mavon-editor 
    ref="md"
    class="md"
    @imgAdd="$imgAdd"
    placeholder="开始写文章"
    @imgDel="$imgDel"
    v-model="info"></mavon-editor>
    <el-button :disabled="disabled" type="danger" @click="SaveArticle">保 存 文 章</el-button>
  </div>
</template>
<script>
import QN from '../../qiniu/qiniu'
export default {
  // ..
  data () {
    return {
      title: '',
      info: ''
    }
  },
  computed: {
    disabled () {
      if (this.title === '' || this.info === '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    // mavoneditor图片上传到七牛云并替换地址
    // 绑定@imgAdd event
    $imgAdd (pos, $file) {
      // 1-1、获取七牛云参数
      this.$db.findOne({hasoption: {$exists: true}}, (err, doc) => {
        console.log(doc, err)
        let {ak, sk, domain, scope, position} = doc.option
        console.log(ak, sk, position)
        // 1-2、生成七牛云上传Token
        const myqn = new QN(ak, sk, scope, domain)
        const Token = myqn.upToken(18000)
        console.log(Token)
        // 1-3、上传文件到七牛云
        const config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        const time = this.$moment(new Date()).format('YYYY/MM/DD-HH:MM:SS')
        const typeIndex = $file.name.lastIndexOf('.')
        const filetype = $file.name.substring(typeIndex)
        const keyname = time + '-' + scope + '-' + Math.floor(Math.random() * 100) + filetype
        // console.log(filetype)
        // console.log(keyname)
        // console.log(time)
        // console.log($file)
        let formdata = new FormData()
        formdata.append('file', $file)
        formdata.append('token', Token)
        formdata.append('key', keyname)
        // 上传文件
        this.$http.post(position, formdata, config).then(res => {
          console.log(res)
          // 上传成功后替换图片地址
          const newUrl = 'http://' + domain + '/' + res.data.key
          // console.log(newUrl)
          this.$refs.md.$img2Url(pos, newUrl)
        }).catch(err => {
          console.log(err)
          this.$message({
            type: 'error',
            message: '上传失败，请确定网络连接或确认你的七牛云配置!' + err
          })
        })
      })
    },
    $imgDel (pos) {
      delete this.img_file[pos]
    },
    // 保存文章
    SaveArticle () {
      console.log(this.info, this.titile)
      let par = {
        meta: 'article',
        title: this.title,
        content: this.info,
        time: this.$moment(new Date()).format('YYYY-MM-DD:HH-mm')
      }
      this.$db.insert(par, (err, ret) => {
        console.log(ret, err)
        this.$router.push('/home/lists')
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../less/index.less';
.section {
  width: 100%;
  .el-input {
    width: 90%;
    margin: 20px 0 0 0;
    z-index: 10;
  }
  .md {
    z-index: 1;
  }
}
</style>


