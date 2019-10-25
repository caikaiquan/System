<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'app',
  created(){
    let winWidth = window.innerWidth || document.body.clientWidth;
    this.saveWinWidth(winWidth);
  },
  methods:{
    ...mapActions(['saveWinWidth'])
  }
}
</script>
<style lang='scss' >
@import './assets/css/base.scss';
#app{
  width: 100vw;
  height: 100vh;
  overflow: auto;
  @extend .scroll_bar;
}
</style>
