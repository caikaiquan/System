<template>
  <div class="bearing-data" v-show='false'>
    <div class="header">
      <div class="item brand">
        品牌：
        <el-select v-model="brandValue" placeholder="请选择">
          <el-option
            v-for="item in BrandList"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="container"></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      brandValue:"",
      BrandList:[
        {value:"FAG"},{value:"NSK"},{value:"SKF"}
      ]
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/base.scss";
.bearing-data {
  width: 100%;
  background-color: #f2f2f2;
  padding-top: 60px;
  position: relative;
  .header {
    width: calc(100vw - 260px);
    height: 60px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: red;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }
  .container {
    width: 100%;
    min-width: 824px;
    .el-table--scrollable-y .el-table__body-wrapper {
      @extend .scroll_bar;
    }
  }
}
</style>