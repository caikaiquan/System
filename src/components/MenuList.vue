<template>
  <el-menu
    :default-active="defaultActive"
    class="menu-list"
    :router="true"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/">
      <i class="iconfont icon-fenxi"></i>
      <span slot="title">频谱分析</span>
    </el-menu-item>
    <el-menu-item index="/parametersetting">
      <i class="iconfont icon-canshushezhi"></i>
      <span slot="title">参数设置</span>
    </el-menu-item>
    <el-menu-item index="/bearingdata">
      <i class="iconfont icon-shuju"></i>
      <span slot="title">轴承数据</span>
    </el-menu-item>
    <el-menu-item index="/systemsetup">
      <i class="iconfont icon-xitongshezhi"></i>
      <span slot="title">系统设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      defaultActive: "/"
    };
  },
  created() {
    this.handleDefaultActive();
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleDefaultActive() {
      let path = this.$route.path;
      this.defaultActive = path;
    }
  }
};
</script>

<style scoped lang="scss">
.menu-list {
  padding-top: 20px;
  border-right: none;
  i.iconfont {
    margin-right: 5px;
  }
}
</style>