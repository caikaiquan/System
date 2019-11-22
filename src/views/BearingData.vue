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
        <el-button type="primary" @click="handleQuery">查询</el-button>
      </div>
      <div class="item">
        <el-button type="primary" @click="handleClear">清空</el-button>
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
        <el-pagination
          ref="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 40, 50 , 100,200]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      brandValue: "", // 品牌
      BrandList: [],
      modelValue: "", // 型号
      tableData: [],
      pageSize: 50, // 每页显示条数
      pageNum: 1, // 显示页码
      total:0
    };
  },
  mounted() {
    this.getBrandList();
    this.getBearingList();
  },
  methods: {
    // 获取品牌数据
    getBrandList() {
      let GetAllBearingBrand = window["YZ_GetAllBearingBrand"];
      if (GetAllBearingBrand) {
        GetAllBearingBrand({}, (res, data) => {
          if (res == 0 && data) {
            data = JSON.parse(data);
            console.log("获取品牌数据", JSON.parse(JSON.stringify(data)));
            this.BrandList = data.BrandList.map(item => {
              return { value: item };
            });
          }
        });
      }
    },
    // 获取轴承数据
    getBearingList() {
      let GetAllBearingList = window["YZ_GetAllBearingList"];
      if (GetAllBearingList) {
        GetAllBearingList(
          {
            Brand: this.brandValue,
            Model: this.modelValue,
            pageSize: this.pageSize,
            pageNum: this.pageNum
          },
          (res, data) => {
            if (res == 0 && data) {
              data = JSON.parse(data);
              console.log("获取到轴承数据", JSON.parse(JSON.stringify(data)));
              this.tableData = data.BearingList;
              this.total = data.total;
            } else {
              this.tableData = [];
              this.total = 0;
              this.pageNum = 1;
            }
          }
        );
      }
    },
    // 清空数据
    handleClear() {
      this.brandValue = "";
      this.modelValue = "";
      this.tableData = [];
      this.pageSize = 50;
      this.pageNum = 1;
      this.total = 0;
      this.getBearingList();
    },
    // 点击查询
    handleQuery() {
      this.pageNum = 1;
      this.getBearingList();
    },
    // 切换页码
    handleSizeChange(size) {
      console.log("size", size);
      this.pageSize = size;
      this.getBearingList();
    },
    // 切换每页显示条数
    handleCurrentChange(page) {
      console.log("page", page);
      this.pageNum = page;
      this.getBearingList();
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
        width: 180px;
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
    justify-content: center;
  }
}
</style>