<template>
  <div class="nav-body">
      <i class="iconfont icon-caidan"></i>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.nav-body{
    height: 60px;
    background-color: #fff;
    box-shadow: 0 2px 2px rgba(150,150,150,.24),0 0 10px rgba(150,150,150,.12);
    position: relative;
    &>i{
        font-size: 30px;
        font-weight: 600;
        color: #333;
        position: absolute;
        top: 13px;
        left: 15px;
        cursor:pointer;
    }
}
</style>