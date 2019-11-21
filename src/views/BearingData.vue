<template>
  <div class="bearing-data" v-show='false'>
    <div class="header">
      <div class="item brand">
        <span>品牌：</span>  
        <el-select v-model="brandValue" placeholder="请选择">
          <el-option
            v-for="item in BrandList"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="item model">
        <span>型号：</span>
        <el-input v-model="modelValue"></el-input>
      </div>
    </div>
    <div class="container"></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      brandValue:"", // 品牌
      BrandList:[
        {value:"FAG"},{value:"NSK"},{value:"SKF"}
      ],
      modelValue:"",// 型号
    }
  }
};
</script>

<style lang='scss'>
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
    display: flex;
    align-items: center;
    padding-left: 20px;
    .item{
      display: flex;
      align-items: center;
      &>span{
        margin-right: 10px;
      }
      .el-select,
      .el-input
      {
        width: 140px;
      }
      margin-right: 20px;
    }
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