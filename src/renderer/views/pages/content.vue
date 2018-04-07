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
        console.log(err, doc)
        if (err) {
          this.$message({
            type: 'error',
            message: '内部错误！获取数据失败'
          })
        } else {
          this.article = doc
        }
      })
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
</style>


