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
    @imgDel="$imgDel" 
    v-model="info"></mavon-editor>
  </div>
</template>
<script>
// import qn from '../../qiniu/qiniu'
export default {
  // ..
  data () {
    return {
      title: '',
      info: ''
    }
  },
  methods: {
    // mavoneditor图片上传到七牛云并替换地址
    // 绑定@imgAdd event
    $imgAdd (pos, $file) {
      // 1、获取七牛云上传凭证token
      // 第一步.将图片上传到服务器.
      let formdata = new FormData()
      formdata.append('file', $file)
      // UploadFile(formdata)
      // .then(url => {
      //   // console.log(url)
      //   // console.log(this.addprod.info)
      //   // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
      //   this.$refs.md.$img2Url(pos, url.data)
      // })
    },
    $imgDel (pos) {
      delete this.img_file[pos]
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


