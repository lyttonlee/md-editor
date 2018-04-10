<template>
  <div class="home">
    <head-md></head-md>
    <router-view></router-view>
    <!-- <foot-md></foot-md> -->
  </div>
</template>
<script>
import HeadMd from '@/views/chome/head'
// import FootMd from '@/views/chome/foot'
export default {
  components: {
    HeadMd
  }
}
</script>

