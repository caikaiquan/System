<template>
  <div class="home">
    <div class="left">
      <menu-list></menu-list>
    </div>
    <div class="right">
        <header-nav></header-nav>
        <router-view />
    </div>
  </div>
</template>

<script>
import MenuList from "@/components/MenuList.vue";
import HeaderNav from "@/components/HeaderNav.vue";
export default {
  components: { MenuList, HeaderNav,  }
};
</script>

<style lang='scss' scoped>
.home {
  width: 100vw;
  height: 100vh;
  overflow: hidden;  
  background-color: #f2f2f2;
  display: flex;
  .left {
    width: 200px;
    background-color: #545c64;
  }
  .right{
      flex: 1;
  }
}
</style>