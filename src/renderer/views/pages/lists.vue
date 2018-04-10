<template>
  <div class="section">
    <el-row class="con">
      <el-col class="left" :span="8">
        <h1>文章列表</h1>
        <router-link  v-for="doc in lists" :key="doc._id" :to="'/home/lists/' + doc._id">
          <div class="tit" :class="{active: active === doc._id}" @click="click(doc._id)" >
            <h3>{{doc.title}}</h3>
            <p>{{doc.time}}</p>
          </div>
        </router-link>
      </el-col>
      <el-col class="right" :offset="8" :span="16">
        <router-view :key="random"></router-view>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  // ..
  data () {
    return {
      lists: [],
      active: ''
    }
  },
  computed: {
    random () {
      return this.$route.params._id + new Date()
    }
  },
  methods: {
    getArticleLists () {
      this.$db.find({'meta': 'article'}, (err, docs) => {
        // console.log(err, docs)
        if (err) {
          this.$message({
            type: 'error',
            message: '内部错误！获取数据失败'
          })
        } else {
          this.lists = docs
          // console.log(this.lists)
        }
      })
    },
    click (id) {
      this.active = id
      // console.log(this.active)
    }
  },
  mounted () {
    this.getArticleLists()
  }
}
</script>
<style lang="less" scoped>
@import '../../less/index.less';
a {
  text-decoration: none;
}
.section {
  .con {
    width: 100%;
    .left {
      border-right: 1px solid @background;
      position: fixed;
      left: 0;
      top: 60px;
      bottom: 0;
      .tit {
        border-bottom: 1px solid @background;
        padding: 5px 0 0 0;
        color: #666;
        cursor: pointer;
        &:hover {
          background: @background-half;
          color: #000;
        }
      }
      .active {
        background: @background-half;
        color: #000;
      }
    }
    // .right {
    //   background: #fff;
    // }
  }
}
</style>


