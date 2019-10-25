<template>
  <el-menu
    default-active="2"
    class="menu-list"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1">
      <i class="iconfont icon-fenxi"></i>
      <span slot="title">频谱分析</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="iconfont icon-canshushezhi"></i>
      <span slot="title">参数设置</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="iconfont icon-shuju"></i>
      <span slot="title">轴承数据</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="iconfont icon-xitongshezhi"></i>
      <span slot="title">系统设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped lang="scss">
.menu-list{
    padding-top: 20px;
    i.iconfont{
        margin-right: 5px;
    }
}
</style>