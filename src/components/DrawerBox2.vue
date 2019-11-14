<template>
  <div>
    <div class="drawer-box" v-show="!drawer" @click="drawer = !drawer">
      <i class="el-icon-d-arrow-left"></i>
    </div>
    <el-drawer title="设备振动频率计算" :visible.sync="drawer" size="400px">
      <div class="bg-drawer">
        <div class="item" @click="item1 = true"></div>
        <div class="item" @click="item2 = true"></div>
        <div class="item" @click="item3 = true"></div>
        <div class="item" @click="item4 = true"></div>
        <div class="item" @click="item5 = true"></div>
        <div class="item" @click="item6 = true"></div>
        <div class="item" @click="item7 = true"></div>
      </div>
    </el-drawer>
    <el-dialog title="传动带" :visible.sync="item1" width="500px">
      <div class="item1-box item-box">
        <div class="item1-img item-img">
          <p class="item-input1 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
          <p class="item-input2 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
          <p class="item-input3 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
          <p class="item-input4 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
          <p class="item-input5 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
        </div>
        <div class="item1-content item-content">
          <p>传动比(Transmission Ratio) = 0.00</p>
          <p>皮带长(Belt Length) = 0.00 mm</p>
          <p>带速度(Belt Velocity) =0.00 mm/min</p>
          <p>滑轮驱动器转速(Driver Pulley RPM) = 0.00</p>
          <p>从动皮带轮转速(Driven Pulley RPM) = 0.00</p>
          <p>皮带速度(Belt RPM) = 0.00</p>
        </div>
        <div class="item-table">
          <el-table :data="item1Data" border style="width: 100%">
            <el-table-column prop="date" label="RPM（Hz）"></el-table-column>
            <el-table-column prop="name" label="输入转速"></el-table-column>
            <el-table-column prop="address" label="输出转速"></el-table-column>
            <el-table-column prop="address1" label="皮带速度"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="电机" :visible.sync="item2" width="500px">
      <div class="item2-box item-box">
        <div class="item2-img item-img">
          <p class="item-input1 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
          <p class="item-input2 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
          <p class="item-input3 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
          <p class="item-input4 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
        </div>
        <div class="item1-content item-content">
          <p>马达转速(RPM) = 0.00</p>
          <p>同步速度(CPM) = 0.00</p>
          <p>Slip(CPM) = 0.00</p>
          <p>Slip(%) =0.00</p>
          <p>PPF(CPM) =0.00</p>
          <p>RBPF(CPM) =0.00</p>
        </div>
        <div class="item-table">
          <el-table :data="item1Data" border style="width: 100%">
            <el-table-column prop="date" label="RPM（Hz）"></el-table-column>
            <el-table-column prop="name" label="RPM"></el-table-column>
            <el-table-column prop="address" label="PPF"></el-table-column>
            <el-table-column prop="address1" label="RBPF"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="滑动轴承" :visible.sync="item3" width="500px">
      <div class="item3-box item-box">
        <div class="item3-img item-img">
          <p class="item-input1 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
        </div>
        <div class="item-table">
          <el-table :data="item3Data" border style="width: 100%">
            <el-table-column prop="date" label="RPM（Hz）"></el-table-column>
            <el-table-column prop="name" label="Rotor Sync."></el-table-column>
            <el-table-column prop="address" label="输出转速"></el-table-column>
            <el-table-column prop="address1" label="皮带转速"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="风扇/鼓风机" :visible.sync="item4" width="500px">
      <div class="item4-box item-box">
        <div class="item4-img item-img">
          <p class="item-input1 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
          <p class="item-input2 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
        </div>
        <div class="item-table">
          <el-table :data="item1Data" border style="width: 100%">
            <el-table-column prop="date" label="RPM（Hz）"></el-table-column>
            <el-table-column prop="name" label="Rotor Sync."></el-table-column>
            <el-table-column prop="address" label="输出转速"></el-table-column>
            <el-table-column prop="address1" label="皮带转速"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="泵" :visible.sync="item5" width="500px">
      <div class="item5-box item-box">
        <div class="item5-img item-img">
          <p class="item-input1 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
          <p class="item-input2 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
        </div>
        <div class="item-table">
          <el-table :data="item1Data" border style="width: 100%">
            <el-table-column prop="date" label="RPM（Hz）"></el-table-column>
            <el-table-column prop="name" label="Rotor Speed"></el-table-column>
            <el-table-column prop="address" label="Vane Pass"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="滚动轴承" :visible.sync="item6" width="500px">
      <div class="item6-box item-box">
        <div class="item6-img item-img">
          <p class="item-input1 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
          <p class="item-input2 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
          <p class="item-input3 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
          <p class="item-input4 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
          <p class="item-input5 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
        </div>
        <div class="item-table">
          <el-table :data="item1Data" border style="width: 100%">
            <el-table-column prop="date" label="RPM（Hz）" width="118"></el-table-column>
            <el-table-column prop="name" label="X" width="65"></el-table-column>
            <el-table-column prop="address" label="1X" width="65"></el-table-column>
            <el-table-column prop="address" label="2X" width="65"></el-table-column>
            <el-table-column prop="address" label="3X" width="65"></el-table-column>
            <el-table-column prop="address" label="4X"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="齿轮" :visible.sync="item7" width="500px">
      <div class="item7-box item-box">
        <div class="item7-img item-img">
          <p class="item-input1 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
          <p class="item-input2 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
          <p class="item-input3 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
          <p class="item-input4 item-input">
            <el-input v-model="item1Form.input1"></el-input>
          </p>
        </div>
        <div class="item1-content item-content">
          <p>输入速度(Input Speed) = 0.00</p>
          <p>输出速度(Input Speed) = 0.00</p>
          <p>输入齿数(Input# of Teeth) = 0.00</p>
          <p>输出齿数(Onput# of Teeth) = 0.00</p>
        </div>
        <div class="item-table">
          <el-table :data="item7Data" border style="width: 100%" class="item7-table">
            <el-table-column prop="date" label="RPM（Hz）">
              <template>
                <div class="item7-cell">
                  <p>INPUT GEAR</p>
                  <p>GMF</p>
                  <p>-1xSB +1xSB</p>
                  <p>-2xSB +2xSB</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="1X">
              <template>
                <div class="item7-cell1">
                  <p>0.00</p>
                  <p>
                    <span>0.00</span>
                    <span>0.00</span>
                  </p>
                  <p>
                    <span>0.00</span>
                    <span>0.00</span>
                  </p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="2X">
              <template>
                <div class="item7-cell1">
                  <p>0.00</p>
                  <p>
                    <span>0.00</span>
                    <span>0.00</span>
                  </p>
                  <p>
                    <span>0.00</span>
                    <span>0.00</span>
                  </p>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      item1: false,
      item1Data: [
        { date: "1X", name: "0.00", address: "0.00", address1: "0.00" },
        { date: "2X", name: "0.00", address: "0.00", address1: "0.00" },
        { date: "3X", name: "0.00", address: "0.00", address1: "0.00" },
        { date: "4X", name: "0.00", address: "0.00", address1: "0.00" }
      ],
      item1Form: {
        input1: "111",
        input2: "222",
        input3: "",
        input4: ""
      },
      item2: false,
      item3: false,
      item3Data: [
        { date: "1X", name: "0.00", address: "0.00", address1: "0.00" },
        { date: "2X", name: "0.00", address: "0.00", address1: "0.00" },
        { date: "3X", name: "0.00", address: "0.00", address1: "0.00" },
        { date: "4X", name: "0.00", address: "0.00", address1: "0.00" },
        { date: "5X", name: "0.00", address: "0.00", address1: "0.00" },
        { date: "6X", name: "0.00", address: "0.00", address1: "0.00" },
        { date: "7X", name: "0.00", address: "0.00", address1: "0.00" },
        { date: "8X", name: "0.00", address: "0.00", address1: "0.00" },
        { date: "0.4-0.48X", name: "0.00", address: "0.00", address1: "0.00" }
      ],
      item4: false,
      item5: false,
      item6: false,
      item7: false,
      item7Data: [{}, {}]
    };
  }
};
</script>

<style lang='scss'>
.drawer-box {
  border-radius: 25px;
  position: fixed;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 40px;
  color: #666;
  cursor: pointer;
  z-index: 10;
}
.bg-drawer {
  width: 400px;
  height: 550px;
  background: url("../assets/images/1.png") no-repeat center;
  background-size: 100% 100%;
  position: relative;
  .item {
    position: absolute;
    width: 100px;
    height: 90px;
    // border: 1px solid #000;
    cursor: pointer;
  }

  .item:nth-child(1) {
    left: 27px;
    top: 75px;
  }

  .item:nth-child(2) {
    left: 145px;
    top: 75px;
  }

  .item:nth-child(3) {
    left: 270px;
    top: 75px;
  }

  .item:nth-child(4) {
    left: 27px;
    top: 212px;
  }

  .item:nth-child(5) {
    left: 145px;
    top: 212px;
  }

  .item:nth-child(6) {
    left: 270px;
    top: 212px;
  }

  .item:nth-child(7) {
    left: 27px;
    top: 355px;
  }

  .item:nth-child(8) {
    left: 145px;
    top: 355px;
  }
}
.el-drawer__body {
  background-color: #ccc;
}
#el-drawer__title {
  margin-bottom: 10px;
  span {
    font-size: 25px;
  }
}
.el-dialog__body {
  padding: 0 20px 20px 20px !important;
}
.item-box {
  .item-img {
    margin-bottom: 10px;
  }
  .item1-img {
    width: 460px;
    height: 240px;
    background: url("../assets/images/2.png") no-repeat center;
    position: relative;
    .item-input {
      width: 72px;
      position: absolute;
      left: 22px;
      top: 9px;
      input {
        height: 44px;
        line-height: 44px;
        padding: 0 3px;
      }
      &.item-input2 {
        left: 228px;
        top: 16px;
      }

      &.item-input3 {
        left: 314px;
        top: 98px;
      }

      &.item-input4 {
        left: 153px;
        top: 184px;
      }
    }
  }

  .item2-img {
    width: 460px;
    height: 220px;
    background: url("../assets/images/3.png") no-repeat center;
    position: relative;
    .item-input {
      width: 96px;
      position: absolute;
      top: 0;
      left: 0;
      input {
        height: 44px;
        line-height: 44px;
        padding: 0 3px;
      }
    }

    .item-input1 {
      left: 58px;
      top: 9px;
    }

    .item-input2 {
      left: 214px;
      top: 9px;
    }

    .item-input3 {
      left: 269px;
      top: 88px;
    }

    .item-input4 {
      left: 44px;
      top: 144px;
    }
  }

  .item3-img {
    width: 460px;
    height: 160px;
    background: url("../assets/images/4.png") no-repeat center;
    position: relative;
    .item-input {
      width: 135px;
      position: absolute;
      top: 37px;
      left: 215px;
      input {
        height: 44px;
        line-height: 44px;
        padding: 0 3px;
      }
    }
  }

  .item4-img {
    width: 460px;
    height: 160px;
    background: url("../assets/images/5.png") no-repeat center;
    position: relative;
    .item-input {
      width: 104px;
      position: absolute;
      top: 37px;
      left: 215px;
      input {
        height: 44px;
        line-height: 44px;
        padding: 0 3px;
      }
    }

    .item-input1 {
      left: 162px;
      top: 9px;
    }

    .item-input2 {
      left: 137px;
      top: 92px;
    }
  }

  .item5-img {
    width: 460px;
    height: 160px;
    background: url("../assets/images/6.png") no-repeat center;
    position: relative;
    .item-input {
      width: 104px;
      position: absolute;
      top: 37px;
      left: 215px;
      input {
        height: 44px;
        line-height: 44px;
        padding: 0 3px;
      }
    }

    .item-input1 {
      left: 160px;
      top: 12px;
    }

    .item-input2 {
      left: 134px;
      top: 95px;
    }
  }

  .item6-img {
    width: 460px;
    height: 300px;
    background: url("../assets/images/7.png") no-repeat center;
    position: relative;
    .item-input {
      width: 104px;
      position: absolute;
      top: 37px;
      left: 215px;
      input {
        height: 38px;
        line-height: 38px;
        padding: 0 3px;
      }
    }

    .item-input1 {
      left: 136px;
      top: 4px;
      width: 91px;
    }

    .item-input2 {
      left: 65px;
      top: 139px;
      width: 90px;
    }

    .item-input3 {
      left: 314px;
      top: 131px;
      width: 90px;
      input {
        height: 40px;
        line-height: 40px;
      }
    }

    .item-input4 {
      left: 66px;
      top: 256px;
      width: 90px;
    }

    .item-input5 {
      width: 63px;
      left: 331px;
      top: 197px;
    }
  }

  .item7-img {
    width: 460px;
    height: 225px;
    background: url("../assets/images/8.png") no-repeat center;
    position: relative;
    .item-input {
      width: 104px;
      position: absolute;
      top: 37px;
      left: 215px;
      input {
        height: 44px;
        line-height: 44px;
        padding: 0 3px;
      }
    }

    .item-input1 {
      left: 76px;
      top: 9px;
    }

    .item-input2 {
      left: 336px;
      top: 75px;
    }

    .item-input3 {
      left: 58px;
      top: 103px;
    }

    .item-input4 {
      left: 267px;
      top: 153px;
    }
  }
}

.item7-box {
  .item7-table {
    tr {
      td {
        padding: 0 !important;
        .cell{
          padding: 0!important;
        }
      }
    }
  }
  .item7-cell {
    p {
      height: 20px;
      font-size: 12px;
      text-align: center;
    }
  }

  .item7-cell1 {
    p {
      height: 30px;
      line-height: 30px;
      box-sizing: border-box;
      text-align: center;
    }
    p+p{
      border-top: 1px solid #EBEEF5;
      display: flex;
      text-align: center;
      span{
        flex: 1;
        &+span{
          border-left:1px solid #EBEEF5;
        }
      }
    }
  }
}

.item-content {
  padding: 10px 0;
  p {
    padding-bottom: 5px;
    text-align: center;
  }
}

.el-table td {
  padding: 5px 0 !important;
}

.el-dialog__header {
  text-align: center;
}

.has-gutter {
  tr{
    th{
      background: #5B9BD5;
      .cell{
        text-align: center!important;
        color:#fff;
      }
    }
  }
}
</style>