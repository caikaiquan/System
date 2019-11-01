<template>
  <div class="parameter-setting">
    <div class="container">
      <el-table :data="tableData" border style="width: 100%" @row-click="handleRowClick">
        <!-- <el-table-column prop="ip" label="IP"></el-table-column>
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
        </el-table-column>-->
        <el-table-column prop="CollectorId" label="采集器ID" width="100"></el-table-column>
        <el-table-column prop="CollectorNote" label="备注">
          <template slot-scope="scope">
            <p v-show="!scope.row.editStatus">{{scope.row.CollectorNote}}</p>
            <el-input
              v-model="scope.row.CollectorNote"
              v-show="scope.row.editStatus"
              placeholder="请输入内容"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="CollectorIp" label="IP" width="130">
          <template slot-scope="scope">
            <p v-show="!scope.row.editStatus">{{scope.row.CollectorIp}}</p>
            <el-input
              v-model="scope.row.CollectorIp"
              v-show="scope.row.editStatus"
              placeholder="请输入内容"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="CollectorRate" label="采样频率HZ" width="130">
          <template slot-scope="scope">
            <p v-show="!scope.row.editStatus">{{scope.row.CollectorRate}}</p>
            <el-input-number
              v-model="scope.row.CollectorRate"
              controls-position="right"
              :min="1000"
              :max="128000"
              v-show="scope.row.editStatus"
              @change="(currentValue, oldValue) =>{changeInputNumber(currentValue, oldValue,scope.row,'edit-form')}"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="DataCount" label="采样点数">
          <template slot-scope="scope">
            <p v-show="!scope.row.editStatus">{{scope.row.DataCount}}</p>
            <el-input
              v-model="scope.row.DataCount"
              v-show="scope.row.editStatus"
              placeholder="请输入内容"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="StoreIntervel" label="保存间隔（s）">
          <template slot-scope="scope">
            <p v-show="!scope.row.editStatus">{{scope.row.StoreIntervel}}</p>
            <el-input
              v-model="scope.row.StoreIntervel"
              v-show="scope.row.editStatus"
              placeholder="请输入内容"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="OpenRotaionRate" label="转速采集">
          <template slot-scope="scope">
            <el-switch
              @click.native.stop="switchBeforeChange(scope.row)"
              style="display: block"
              :value="scope.row.OpenRotaionRate == 1"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :inactive-text="scope.row.OpenRotaionRate == 1?'开启':'关闭'"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="CollectorId" label="通道说明">
          <template slot-scope="scope">
            <p
              class="scope-cell left"
              v-show="!scope.row.editStatus"
            >0. {{scope.row.IEPESensitivity0}}</p>
            <p
              class="scope-cell left"
              v-show="!scope.row.editStatus"
            >1. {{scope.row.IEPESensitivity1}}</p>
            <p
              class="scope-cell left"
              v-show="!scope.row.editStatus"
            >2. {{scope.row.IEPESensitivity2}}</p>
            <p
              class="scope-cell left"
              v-show="!scope.row.editStatus"
            >3. {{scope.row.IEPESensitivity3}}</p>
            <p class="scope-cell left" v-show="scope.row.editStatus">
              <el-input
                class="input-scope-cell"
                v-model="scope.row.IEPESensitivity0"
                placeholder="请输入内容"
                size="mini"
              ></el-input>
            </p>
            <p class="scope-cell left" v-show="scope.row.editStatus">
              <el-input
                class="input-scope-cell"
                v-model="scope.row.IEPESensitivity1"
                placeholder="请输入内容"
                size="mini"
              ></el-input>
            </p>
            <p class="scope-cell left" v-show="scope.row.editStatus">
              <el-input
                class="input-scope-cell"
                v-model="scope.row.IEPESensitivity2"
                placeholder="请输入内容"
                size="mini"
              ></el-input>
            </p>
            <p class="scope-cell left" v-show="scope.row.editStatus">
              <el-input
                class="input-scope-cell"
                v-model="scope.row.IEPESensitivity3"
                placeholder="请输入内容"
                size="mini"
              ></el-input>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="CollectorId" label="IEPE灵敏度">
          <template slot-scope="scope">
            <p class="scope-cell" v-show="!scope.row.editStatus">{{scope.row.Channel0Note}} mv/g</p>
            <p class="scope-cell" v-show="!scope.row.editStatus">{{scope.row.Channel1Note}} mv/g</p>
            <p class="scope-cell" v-show="!scope.row.editStatus">{{scope.row.Channel2Note}} mv/g</p>
            <p class="scope-cell" v-show="!scope.row.editStatus">{{scope.row.Channel3Note}} mv/g</p>
            <p class="scope-cell left" v-show="scope.row.editStatus">
              <el-input
                class="input-scope-cell"
                v-model="scope.row.Channel0Note"
                placeholder="请输入内容"
                size="mini"
              ></el-input>
            </p>
            <p class="scope-cell left" v-show="scope.row.editStatus">
              <el-input
                class="input-scope-cell"
                v-model="scope.row.Channel1Note"
                placeholder="请输入内容"
                size="mini"
              ></el-input>
            </p>
            <p class="scope-cell left" v-show="scope.row.editStatus">
              <el-input
                class="input-scope-cell"
                v-model="scope.row.Channel2Note"
                placeholder="请输入内容"
                size="mini"
              ></el-input>
            </p>
            <p class="scope-cell left" v-show="scope.row.editStatus">
              <el-input
                class="input-scope-cell"
                v-model="scope.row.Channel3Note"
                placeholder="请输入内容"
                size="mini"
              ></el-input>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="CollectorId" label="保存">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.stop="handleSave(scope.row)">保存</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="CollectorId" label="删除">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.stop="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="add-btn" @click="dialogFormVisible = true">添加采集器</div>

    <el-dialog title="添加采集器" :visible.sync="dialogFormVisible" width="800px" center>
      <el-form :model="form" class="form-box">
        <div class="form-item w50">
          <el-form-item label="采集器ID：" :label-width="formLabelWidth">
            <el-input v-model="form.CollectorId" autocomplete="off" size="small"></el-input>
          </el-form-item>
        </div>
        <div class="form-item w50">
          <el-form-item label="IP：" :label-width="formLabelWidth">
            <el-input v-model.trim="form.CollectorIp" autocomplete="off" size="small" @blur.native="addFormCheck('IP')"></el-input>
          </el-form-item>
        </div>
        <div class="form-item w50">
          <el-form-item label="保存间隔（s）：" :label-width="formLabelWidth">
            <el-input v-model="form.StoreIntervel" autocomplete="off" size="small"></el-input>
          </el-form-item>
        </div>
        <div class="form-item w50">
          <el-form-item label="采样频率HZ：" :label-width="formLabelWidth">
            <el-input-number
              v-model="form.CollectorRate"
              controls-position="right"
              :min="1000"
              :max="128000"
              @change="(currentValue, oldValue) =>{changeInputNumber(currentValue, oldValue,form.CollectorRate,'add-form')}"
            ></el-input-number>
          </el-form-item>
        </div>
        <div class="form-item w50">
          <el-form-item label="采样点数：" :label-width="formLabelWidth">
            <el-input v-model="form.DataCount" autocomplete="off" size="small"></el-input>
          </el-form-item>
        </div>
        <div class="form-item w50">
          <el-form-item label="转速采集：" :label-width="formLabelWidth">
            <el-switch
              class="form-switch"
              @click.native.stop="changeFormSwitch"
              style="display: block"
              :value="form.OpenRotaionRate == 1"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :inactive-text="form.OpenRotaionRate == 1?'开启':'关闭'"
            ></el-switch>
          </el-form-item>
        </div>
        <div class="form-item w100">
          <el-form-item label="备注：" label-width="130px">
            <el-input v-model="form.CollectorNote" autocomplete="off" size="small"></el-input>
          </el-form-item>
        </div>
        <div class="form-item w50">
          <el-form-item label="通道0说明：" :label-width="formLabelWidth">
            <el-input v-model="form.Channel0Note" autocomplete="off" size="small"></el-input>
          </el-form-item>
        </div>
        <div class="form-item w50 iepe-box">
          <el-form-item label="IEPE灵敏度：" :label-width="formLabelWidth">
            <el-input v-model="form.IEPESensitivity0" autocomplete="off" size="small"></el-input>mg/v
          </el-form-item>
        </div>
        <div class="form-item w50">
          <el-form-item label="通道1说明：" :label-width="formLabelWidth">
            <el-input v-model="form.Channel1Note" autocomplete="off" size="small"></el-input>
          </el-form-item>
        </div>
        <div class="form-item w50 iepe-box">
          <el-form-item label="IEPE灵敏度：" :label-width="formLabelWidth">
            <el-input v-model="form.IEPESensitivity1" autocomplete="off" size="small"></el-input>mg/v
          </el-form-item>
        </div>
        <div class="form-item w50">
          <el-form-item label="通道2说明：" :label-width="formLabelWidth">
            <el-input v-model="form.Channel2Note" autocomplete="off" size="small"></el-input>
          </el-form-item>
        </div>
        <div class="form-item w50 iepe-box">
          <el-form-item label="IEPE灵敏度：" :label-width="formLabelWidth">
            <el-input v-model="form.IEPESensitivity2" autocomplete="off" size="small"></el-input>mg/v
          </el-form-item>
        </div>
        <div class="form-item w50">
          <el-form-item label="通道3说明：" :label-width="formLabelWidth">
            <el-input v-model="form.Channel3Note" autocomplete="off" size="small"></el-input>
          </el-form-item>
        </div>
        <div class="form-item w50 iepe-box">
          <el-form-item label="IEPE灵敏度：" :label-width="formLabelWidth">
            <el-input v-model="form.IEPESensitivity3" autocomplete="off" size="small"></el-input>mg/v
          </el-form-item>
        </div>
        <!-- <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          CollectorId: "C0001",
          CollectorNote: "采集器#1",
          CollectorIp: "192.186.0.100",
          CollectorRate: "128000",
          DataCount: "1024",
          StoreIntervel: "10",
          OpenRotaionRate: "1",
          IEPESensitivity0: "125",
          IEPESensitivity1: "250",
          IEPESensitivity2: "500",
          IEPESensitivity3: "1000",
          Channel0Note: "C0",
          Channel1Note: "C1",
          Channel2Note: "C2",
          Channel3Note: "C3",
          editStatus: false,
          formLabelWidth: "120px"
        }
      ],
      ipList: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        CollectorId: "",
        CollectorNote: "",
        CollectorIp: "",
        CollectorRate: "",
        DataCount: "",
        StoreIntervel: "",
        OpenRotaionRate: "",
        IEPESensitivity0: "",
        IEPESensitivity1: "",
        IEPESensitivity2: "",
        IEPESensitivity3: "",
        Channel0Note: "",
        Channel1Note: "",
        Channel2Note: "",
        Channel3Note: "",
        OpenRotaionRate: 1
      }
    };
  },
  created() {
    document.addEventListener("click", this.closeEidt);
  },
  methods: {
    // 获取
    handleRowClick(row, column, event) {
      row.editStatus = true;
    },
    closeEidt(e) {
      // console.log(e);
      let classNameList = [];
      e.path.forEach(item => {
        classNameList.push(item.className);
      });

      if (classNameList.includes("el-table__row")) {
        console.log("点击了表格的行");
      } else {
        console.log("点击了表格行以外的元素");
        this.tableData.forEach(item => {
          item.editStatus = false;
        });
      }
    },
    handleSave(row) {
      row.editStatus = false;
    },
    handleDel(row) {
      this.tableData = this.tableData.filter(
        item => item.CollectorId !== row.CollectorId
      );
      console.log(this.tableData);
    },
    switchBeforeChange(row) {
      row.OpenRotaionRate = row.OpenRotaionRate === "0" ? "1" : "0";
    },
    changeInputNumber(currentValue, oldValue, row, type) {

      let value;
      if (oldValue >= currentValue) {
        value = oldValue / 2;
      } else {
        value = oldValue * 2;
      }

      if (type === "edit-form") {
        row.CollectorRate = value;
      } else if (type === "add-form") {
        this.form.CollectorRate = value;
      }
    },
    changeFormSwitch() {
      this.form.OpenRotaionRate = this.form.OpenRotaionRate == 1 ? 0 : 1;
    },
    handleAdd() {
      console.log(this.form);
      // this.dialogFormVisible = false
    },

    addFormCheck(type){
      if(type === 'IP' && this.form.CollectorIp){
        let reg = /(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))/;
        if(!reg.test(this.form.CollectorIp)){
          this.form.CollectorIp = '';
        }
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener("click", this.closeEidt);
  }
};
</script>

<style lang='scss' >
.parameter-setting {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  .el-switch__label.el-switch__label--left {
    span {
      color: #333 !important;
    }
  }
  .container {
    width: 100%;
    // height: 1000px;
    min-width: 824px;
    // padding-top: 10px;
    table {
      .has-gutter {
        .cell {
          font-weight: 600;
          color: #333;
        }
      }
      .cell {
        text-align: center;
        .input-scope-cell {
          height: 30px;
        }
        .el-input-number.is-controls-right {
          width: 120px;
        }
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

          .handle-save {
            padding: 3px 15px;
            background-color: #f56c6c;
            border-radius: 3px;
            cursor: pointer;
            color: #fff;
          }

          &.left {
            padding-left: 10px;
            text-align: left;
          }
        }
      }
    }
  }

  .add-btn {
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 3px;
    margin: 20px 20px 0 auto;
    color: #fff;
    background: rgb(64, 158, 255);
    cursor: pointer;
    transition: all 0.25s;
    &:hover {
      background: rgba(64, 158, 255, 0.8);
    }
  }

  .form-box {
    display: flex;
    flex-wrap: wrap;
    .form-item {
      &.w50 {
        width: 50%;
        height: 40px;
        // border: 1px solid #ccc;
        padding: 0 8px;
      }

      &.w100 {
        width: 100%;
      }

      .form-switch {
        margin-top: 8px;
      }

      &.iepe-box {
        .el-form-item__content {
          .el-input.el-input--small {
            width: 80%;
          }
        }
      }
    }
  }
}
</style>



/* 
采集器ID  C0001
备注 采集器1#
IP  192.168.0.155
采样频率HZ  128000
采样点数  1024
保存间隔（s） 10
转速采集  开
通道说明   0. 通道0    1. 通道1   2. 通道2    3. 通道3
IEPE灵敏度   1000 mv/g
保存  保存    
删除  删除




 



 */