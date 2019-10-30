<template>
  <div id="app">
    <div class="minimize">
      <i class="el-icon-minus" @click="handleMini"></i>
    </div>
    <div class="close-icon">
      <i class="el-icon-close" @click="handleClose"></i>
    </div>
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
    ...mapActions(['saveWinWidth']),
    handleMini(){
      let YZ_Min = window['YZ_Min'];
      if(YZ_Min){
        YZ_Min()
      }
    },
    handleClose(){
      let YZ_Exit = window['YZ_Exit'];
      if(YZ_Exit){
        YZ_Exit()
      }
    }
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
  .close-icon,
  .minimize
  {
    width: 20px;
    height: 20px;
    position: fixed;
    top: 20px;
    right: 20px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    font-weight: bold;
    cursor: pointer;
  }

  .minimize{
    right: 50px;
  }
}
</style>
