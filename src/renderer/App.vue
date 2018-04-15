<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'md-editor',
    mounted () {
      window.addEventListener('drop', event => {
        console.log(event)
        if (event.target.className === 'md') {
          event.preventDefault()
        }
      }, false)
    }
  }
</script>

<style lang="less">
#app {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  font-size: 13px;
  text-align: center;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
}
</style>

