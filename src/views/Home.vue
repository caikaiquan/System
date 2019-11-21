<template>
  <div class="home">
    <div class="left">
      <img src="../assets/images/logo.png" alt="">
      <menu-list></menu-list>
    </div>
    <div class="right">
      <!-- <header-nav></header-nav> -->
      <router-view />
    </div>
  </div>
</template>

<script>
import MenuList from "@/components/MenuList.vue";
// import HeaderNav from "@/components/HeaderNav.vue";
export default {
  components: { MenuList }
};
</script>

<style lang='scss' scoped>
@import '../assets/css/base.scss';
.home {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f2f2f2;
  display: flex;
  .left {
    min-width: 180px;
    background-color: #545c64;
  }
  .right {
    flex: 1;
    & > div:nth-child(1){
      width: calc(100vw - 180px);
      min-width: 1024px;
    }
    & > div:nth-child(2) {
      overflow: auto;
      width: calc(100vw - 180px);
      height: calc(100vh - 60px);
      @extend .scroll_bar;
      box-sizing: border-box;
      padding: 20px;
    }
  }
}
</style>