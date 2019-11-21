<template>
  <div class="bearing-data" v-show="true">
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
      <div class="item">
        <el-button type="primary" @click='getBrandList'>查询</el-button>
      </div>
      <div class="item">
        <el-button type="primary">清空</el-button>
      </div>
    </div>
    <div class="container">
      <el-table :data="tableData" height="calc(100vh - 150px)" border style="width: 100%">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="Brand" label="品牌"></el-table-column>
        <el-table-column prop="Model" label="型号"></el-table-column>
        <el-table-column prop="OutD" label="外圈"></el-table-column>
        <el-table-column prop="InnerD" label="内圈"></el-table-column>
        <el-table-column prop="Rolling" label="滚动体"></el-table-column>
        <el-table-column prop="Cage" label="保持架"></el-table-column>
      </el-table>
      <div class="total">
        <p>轴承库总数：</p>
        <P>{{tableData.length}}</P>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      brandValue: "", // 品牌
      BrandList: [{ value: "FAG" }, { value: "NSK" }, { value: "SKF" }],
      modelValue: "", // 型号
      tableData: [],
    };
  },
  methods:{
    // 获取轴承数据
    getBrandList(){
      let GetAllBearingList = window['YZ_GetAllBearingList'];
      if(GetAllBearingList){
        GetAllBearingList({Brand:this.brandValue, Model:this.modelValue},(res,data) =>{
          if(res == 0 && data){
            data = JSON.parse(data);
            console.log('获取到轴承数据',JSON.parse(JSON.stringify(data)))
            this.BrandList = data.BrandList;
          }else{
            this.BrandList = [];
          }
        })
      }
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
    .item {
      display: flex;
      align-items: center;
      & > span {
        margin-right: 10px;
      }
      .el-select,
      .el-input {
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

    .has-gutter {
      tr {
        th {
          background: #5b9bd5;
          .cell {
            color: #fff;
            text-align: center;
            font-size: 14px;
            font-weight: 600;
          }
        }
      }
    }

    .el-table__body-wrapper {
      tr {
        &:nth-child(2n) {
          td {
            background: #eaeff7;
          }
        }
        &:nth-child(2n + 1) {
          background: #d2deef;
        }

        .cell {
          color: #333;
          text-align: center;
        }
      }
    }
  }

  .total {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    font-size: 18px;
    p + p {
      color: #ff0000;
      margin-left: 10px;
      margin-right: 40px;
      font-weight: 600;
    }
  }
}
</style>