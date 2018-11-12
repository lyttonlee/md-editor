<template>
  <div class="article">
    <h2>{{article.title}}</h2>
    <mavon-editor
    class="md"
    :value="prop.value"
    :subfield = "prop.subfield"
    :default_open = "prop.default_open"
    :toolbarsFlag = "prop.toolbarsFlag"
    :editable="prop.editable"
    :scrollStyle="prop.scrollStyle"
    ></mavon-editor>
    <el-button type="danger" @click="deleteArticle">删除文章</el-button>
    <el-button type="primary" @click="updateArticle">修改文章</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      article: ''
    }
  },
  computed: {
    prop () {
      let data = {
        subfield: false,
        default_open: 'preview',
        editable: false,
        value: this.article.content,
        toolbarsFlag: false,
        scrollStyle: false
      }
      return data
    }
  },
  methods: {
    getArticle () {
      this.$db.findOne({'_id': this.$route.params.id}, (err, doc) => {
        // console.log(err, doc)
        if (err) {
          this.$message({
            type: 'error',
            message: '内部错误！获取数据失败'
          })
        } else {
          this.article = doc
        }
      })
    },
    deleteArticle () {
      this.$confirm('此操作将永久删除该文章, 是否确定删除?', '请确定你正在进行的操作!', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        console.log(this.article)
        let par = {
          _id: this.article._id
        }
        this.$db.remove(par, {}, (err, numRemoved) => {
          console.log(err, numRemoved)
          if (err) {
            this.$message({
              type: 'error',
              message: '删除失败!请稍后再试'
            })
          } else {
            this.$message({
              type: 'success',
              message: `'删除${numRemoved}篇文章成功!'`
            })
            this.$router.push('/home/new')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    updateArticle () {
      // console.log('1')
      this.$router.push('/edit/' + this.article._id)
    }
  },
  mounted () {
    // console.log(this.$route.params.id)
    this.getArticle()
  }
}
</script>
<style lang="less" scoped>
// ..
.article {
  margin-bottom: 20px;
  .md {
    z-index: 1;
  }
  .el-button {
    margin-top: 25px;
    width: 40%;
  }
}
</style>


