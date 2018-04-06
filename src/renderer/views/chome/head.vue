<template>
  <div class="head">
    <el-menu
    :default-active="$route.path"
    class="menu"
    router
    mode="horizontal"
    background-color="#9dc478"
    text-color="#333"
    active-text-color="#000">
      <!-- 循环路由 -->
      <template v-for="route in $router.options.routes[2].children">
        <!-- 循环children的路由 -->
        <el-menu-item :key="route.path" :index="route.path">
          {{ route.name }}
        </el-menu-item>
      </template>
      <el-menu-item key="/" index="/">
        使用协议
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  // methods: {
  //   show () {
  //     console.log(this.$router.options.routes[2])
  //   }
  // }
}
</script>
<style lang="less" scoped>
@import '../../less/index.less';
.head {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  // .el-menu {
  //   .el-menu-item {
  //     min-width: 20%;
  //   }
  // }
}
</style>


