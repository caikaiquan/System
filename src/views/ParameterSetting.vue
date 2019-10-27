<template>
  <div class="parameter-setting">
    <div class="container">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="ip" label="IP"></el-table-column>
        <el-table-column prop="pl" label="采用频率Hz"></el-table-column>
        <el-table-column prop="cyds" label="采样点数"></el-table-column>
        <el-table-column prop="bcjg" label="保存间隔（s）"></el-table-column>
        <el-table-column prop="zscj" label="转速采集"></el-table-column>
        <el-table-column prop="tdsm" label="通道说明">
          <template slot-scope="scope">
            <p class="scope-cell" v-for="item in scope.row.tdsm" :key="item">{{item}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="lmd" label="IEPE灵敏度">
          <template slot-scope="scope">
            <p class="scope-cell" v-for="(item,index) in scope.row.lmd" :key="index">{{item}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="save" label="保存">
          <template slot-scope="scope">
            <p class="scope-cell" v-for="item in scope.row.tdsm" :key="item">
              <span class="handle-save">保存</span>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // tableData: [
      //   {
      //     ip: "192.186.0.100",
      //     pl: "128000",
      //     cyds: "1024",
      //     bcjg: "10",
      //     zscj: "开启",
      //     tdsm: "0.通道1",
      //     lmd: "1000mv/g"
      //   },
      //   {
      //     ip: "192.186.0.100",
      //     pl: "128000",
      //     cyds: "1024",
      //     bcjg: "10",
      //     zscj: "开启",
      //     tdsm: "0.通道2",
      //     lmd: "1000mv/g"
      //   },
      //   {
      //     ip: "192.186.0.100",
      //     pl: "128000",
      //     cyds: "1024",
      //     bcjg: "10",
      //     zscj: "开启",
      //     tdsm: "0.通道2",
      //     lmd: "1000mv/g"
      //   },
      //   {
      //     ip: "192.186.0.100",
      //     pl: "128000",
      //     cyds: "1024",
      //     bcjg: "10",
      //     zscj: "开启",
      //     tdsm: "0.通道3",
      //     lmd: "1000mv/g"
      //   }
      // ],
      tableData: [
        {
          ip: "192.186.0.100",
          pl: "128000",
          cyds: "1024",
          bcjg: "10",
          zscj: "开启",
          tdsm: ["0.通道1", "0.通道2", "0.通道3", "0.通道4"],
          lmd: ["1000mv/g", "1000mv/g", "1000mv/g", "1000mv/g"]
        }
      ],
      ipList: []
    };
  },
  methods: {}
};
</script>

<style lang='scss' >
.parameter-setting {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  .container {
    width: 100%;
    // height: 1000px;
    min-width: 824px;
    table {
      .cell {
        text-align: center;
      }
    }
    .el-table__body-wrapper {
      td {
        padding: 0;
        .cell {
          padding: 0;
        }
        .scope-cell {
          height: 35px;
          line-height: 34px;
          & + .scope-cell {
            border-top: 1px solid #ebeef5;
          }

          .handle-save{
            padding: 3px 15px;
            background-color: #F56C6C;
            border-radius: 3px;
            cursor: pointer;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>