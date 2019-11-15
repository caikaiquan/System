<template>
  <div class="drawer-box">
    <div class="model" v-show="drawerOpen"></div>
    <div class="icon-left" @click="drawerOpen = true" v-show="!drawerOpen">
      <img src="../assets/images/VibCal.png" alt />
    </div>
    <div class="drawer-module" :class="{'open':drawerOpen}">
      <div class="nav-list">
        <div class="close-drawer" @click="drawerOpen = false">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="link-list">
          <div class="link-item" @click="handleChange('drawerFlag1')">电机</div>
          <div class="link-item" @click="handleChange('drawerFlag2')">齿轮</div>
          <div class="link-item" @click="handleChange('drawerFlag3')">滚动轴承</div>
          <div class="link-item" @click="handleChange('drawerFlag4')">泵</div>
          <div class="link-item" @click="handleChange('drawerFlag5')">风机风扇</div>
          <div class="link-item" @click="handleChange('drawerFlag6')">滑动轴承</div>
          <div class="link-item" @click="handleChange('drawerFlag7')">传动带</div>
          <div class="link-item">振动参照</div>
        </div>
      </div>
      <div class="drawer-content">
        <div class="item" :class="{'show':draweFlags.drawerFlag1}">
          <i class="back" @click="draweFlags.drawerFlag1 = false">返回</i>
          <i class="el-icon-d-arrow-right item-right" @click="handleClode"></i>
          <div class="item-content item2">
            <div class="header">电机</div>
            <div class="img">
              <p>
                <el-input v-model="item1Form.input1"></el-input>
              </p>
              <p>
                <el-input v-model="item1Form.input2"></el-input>
              </p>
              <p>
                <el-input v-model="item1Form.input3"></el-input>
              </p>
              <p>
                <el-input v-model="item1Form.input4"></el-input>
              </p>
            </div>
            <div class="btn-count">
              <el-button type="primary">计算</el-button>
            </div>
            <div class="text-con">
              <p>马达转速(RPM) = 0.00</p>
              <p>同步速度(CPM) = 0.00</p>
              <p>Slip(CPM) = 0.00</p>
              <p>Slip(%) = 0.00</p>
              <p>PPF(CPM) = 0.00</p>
              <p>RBPF(CPM) = 0.00</p>
            </div>
            <div class="tbale-con">
              <el-table :data="item1Data" border style="width: 100%">
                <el-table-column prop="date" label="RPM（Hz）"></el-table-column>
                <el-table-column prop="name" label="RPM"></el-table-column>
                <el-table-column prop="address" label="PPF"></el-table-column>
                <el-table-column prop="address1" label="RBPF"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="item" :class="{'show':draweFlags.drawerFlag2}">
          <i class="back" @click="draweFlags.drawerFlag2 = false">返回</i>
          <i class="el-icon-d-arrow-right item-right" @click="handleClode"></i>
          <div class="item-content item7">
            <div class="header">齿轮</div>
            <div class="img">
              <p>
                <el-input v-model="item1Form.input1"></el-input>
              </p>
              <p>
                <el-input v-model="item1Form.input2"></el-input>
              </p>
              <p>
                <el-input v-model="item1Form.input3"></el-input>
              </p>
              <p>
                <el-input v-model="item1Form.input4"></el-input>
              </p>
            </div>
            <div class="btn-count">
              <el-button type="primary">计算</el-button>
            </div>
            <div class="text-con">
              <p>输入速度(Input Speed) = 0.00</p>
              <p>输出速度(Input Speed) = 0.00</p>
              <p>输入齿数(Input# of Teeth) = 0.00</p>
              <p>输出齿数(Onput# of Teeth) = 0.00</p>
            </div>
            <div class="tbale-con">
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
        </div>
        <div class="item" :class="{'show':draweFlags.drawerFlag3}">
          <i class="back" @click="draweFlags.drawerFlag3 = false">返回</i>
          <i class="el-icon-d-arrow-right item-right" @click="handleClode"></i>
          <div class="item-content item6">
            <div class="header">滚动轴承</div>
            <div class="img">
              <p>
                <el-input v-model="item1Form.input1"></el-input>
              </p>
              <p>
                <el-input v-model="item1Form.input2"></el-input>
              </p>
              <p>
                <el-input v-model="item1Form.input3"></el-input>
              </p>
              <p>
                <el-input v-model="item1Form.input4"></el-input>
              </p>
              <p>
                <el-input v-model="item1Form.input4"></el-input>
              </p>
            </div>
            <div class="btn-count">
              <el-button type="primary">计算</el-button>
            </div>
            <div class="tbale-con">
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
        </div>
        <div class="item" :class="{'show':draweFlags.drawerFlag4}">
          <i class="back" @click="draweFlags.drawerFlag4 = false">返回</i>
          <i class="el-icon-d-arrow-right item-right" @click="handleClode"></i>
          <div class="item-content item5">
            <div class="header">泵</div>
            <div class="img">
              <p>
                <el-input v-model="item1Form.input1"></el-input>
              </p>
              <p>
                <el-input v-model="item1Form.input2"></el-input>
              </p>
            </div>
            <div class="btn-count">
              <el-button type="primary">计算</el-button>
            </div>
            <div class="tbale-con">
              <el-table :data="item1Data" border style="width: 100%">
                <el-table-column prop="date" label="RPM（Hz）"></el-table-column>
                <el-table-column prop="name" label="Rotor Speed"></el-table-column>
                <el-table-column prop="address" label="Vane Pass"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="item" :class="{'show':draweFlags.drawerFlag5}">
          <i class="back" @click="draweFlags.drawerFlag5 = false">返回</i>
          <i class="el-icon-d-arrow-right item-right" @click="handleClode"></i>
          <div class="item-content item4">
            <div class="header">风扇/鼓风机</div>
            <div class="img">
              <p>
                <el-input v-model="item1Form.input1"></el-input>
              </p>
              <p>
                <el-input v-model="item1Form.input2"></el-input>
              </p>
            </div>
            <div class="btn-count">
              <el-button type="primary">计算</el-button>
            </div>
            <div class="tbale-con">
              <el-table :data="item1Data" border style="width: 100%">
                <el-table-column prop="date" label="RPM（Hz）"></el-table-column>
                <el-table-column prop="name" label="Rotor Sync."></el-table-column>
                <el-table-column prop="address" label="输出转速"></el-table-column>
                <el-table-column prop="address1" label="皮带转速"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="item" :class="{'show':draweFlags.drawerFlag6}">
          <i class="back" @click="draweFlags.drawerFlag6 = false">返回</i>
          <i class="el-icon-d-arrow-right item-right" @click="handleClode"></i>
          <div class="item-content item3">
            <div class="header">滑动轴承</div>
            <div class="img">
              <p>
                <el-input v-model="item1Form.input1"></el-input>
              </p>
            </div>
            <div class="btn-count">
              <el-button type="primary">计算</el-button>
            </div>
            <div class="tbale-con">
              <el-table :data="item3Data" border style="width: 100%">
                <el-table-column prop="date" label="RPM（Hz）"></el-table-column>
                <el-table-column prop="name" label="Rotor Sync."></el-table-column>
                <el-table-column prop="address" label="输出转速"></el-table-column>
                <el-table-column prop="address1" label="皮带转速"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="item" :class="{'show':draweFlags.drawerFlag7}">
          <i class="back" @click="draweFlags.drawerFlag7 = false">返回</i>
          <i class="el-icon-d-arrow-right item-right" @click="handleClode"></i>
          <div class="item-content item1">
            <div class="header">传动带</div>
            <div class="img">
              <p>
                <el-input v-model="item1Form.input1"></el-input>
              </p>
              <p>
                <el-input v-model="item1Form.input2"></el-input>
              </p>
              <p>
                <el-input v-model="item1Form.input3"></el-input>
              </p>
              <p>
                <el-input v-model="item1Form.input4"></el-input>
              </p>
            </div>
            <div class="btn-count">
              <el-button type="primary">计算</el-button>
            </div>
            <div class="text-con">
              <p>传动比(Transmission Ratio) = 0.00</p>
              <p>皮带长(Belt Length) = 0.00 mm</p>
              <p>带速度(Belt Velocity) =0.00 mm/min</p>
              <p>滑轮驱动器转速(Driver Pulley RPM) = 0.00</p>
              <p>从动皮带轮转速(Driven Pulley RPM) = 0.00</p>
              <p>皮带速度(Belt RPM) = 0.00</p>
            </div>
            <div class="tbale-con">
              <el-table :data="item1Data" border style="width: 100%">
                <el-table-column prop="date" label="RPM（Hz）"></el-table-column>
                <el-table-column prop="name" label="输入转速"></el-table-column>
                <el-table-column prop="address" label="输出转速"></el-table-column>
                <el-table-column prop="address1" label="皮带速度"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="item" :class="{'show':draweFlags.drawerFlag8}">
          <i class="el-icon-d-arrow-right item-right" @click="draweFlags.drawerFlag8 = false"></i>
          888888888888888
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawerOpen: false,
      draweFlags: {
        drawerFlag1: false,
        drawerFlag2: false,
        drawerFlag3: false,
        drawerFlag4: false,
        drawerFlag5: false,
        drawerFlag6: false,
        drawerFlag7: false,
        drawerFlag8: false
      },
      item1Form: {
        input1: "",
        input2: "",
        input3: "",
        input4: ""
      },
      item1Data: [
        { date: "1X", name: "0.00", address: "0.00", address1: "0.00" },
        { date: "2X", name: "0.00", address: "0.00", address1: "0.00" },
        { date: "3X", name: "0.00", address: "0.00", address1: "0.00" },
        { date: "4X", name: "0.00", address: "0.00", address1: "0.00" }
      ],
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
      item7Data: [{}, {}]
    };
  },
  methods: {
    handleChange(type) {
      for (let key in this.draweFlags) {
        if (key === type) {
          this.draweFlags[key] = true;
        } else {
          this.draweFlags[key] = false;
        }
      }
    },
    handleClode() {
      this.drawerOpen = false;
      for (let key in this.draweFlags) {
        this.draweFlags[key] = false;
      }
    }
  }
};
</script>

<style lang='scss'>
.drawer-box {
  position: relative;
  z-index: 111;
  .model {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
  }
  .icon-left {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 10;
  }

  .drawer-module {
    width: 460px;
    height: 640px;
    background-color: #fff;
    position: fixed;
    top: 50%;
    right: -465px;
    transform: translateY(-50%);
    transition: all 0.15s;
    z-index: 10;
    &.open {
      right: 0;
    }

    .nav-list {
      width: 100%;
      height: 100%;
      background: url("../assets/images/1.png") no-repeat center;
      position: relative;
      .close-drawer {
        position: absolute;
        top: 5px;
        right: 5px;
        padding: 5px;
        cursor: pointer;
        i {
          font-size: 20px;
        }
      }

      .link-list {
        position: relative;
        .link-item {
          position: absolute;
          width: 110px;
          height: 110px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          &:nth-child(1) {
            left: 33px;
            top: 100px;
          }
          &:nth-child(2) {
            left: 172px;
            top: 100px;
          }
          &:nth-child(3) {
            left: 313px;
            top: 100px;
          }
          &:nth-child(4) {
            left: 33px;
            top: 262px;
          }
          &:nth-child(5) {
            left: 172px;
            top: 262px;
          }
          &:nth-child(6) {
            left: 313px;
            top: 262px;
          }
          &:nth-child(7) {
            left: 33px;
            top: 425px;
          }
          &:nth-child(8) {
            left: 172px;
            top: 425px;
          }
        }
      }
    }

    .drawer-content {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      .item {
        width: 460px;
        height: 640px;
        position: absolute;
        top: 0;
        left: 465px;
        z-index: 2;
        transition: all 0.15s;
        background-color: #fff;
        .back {
          position: absolute;
          top: 18px;
          left: 10px;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
        &.show {
          left: 0;
          z-index: 3;
        }
        .item-right {
          padding: 5px;
          position: absolute;
          top: 12px;
          right: 5px;
          cursor: pointer;
          color: #fff;
          font-size: 18px;
        }
        .item-content {
          .header {
            height: 50px;
            background: #bdd7ee;
            color: #fff;
            text-align: center;
            line-height: 50px;
            font-size: 22px;
            font-weight: 600;
          }

          .img {
            width: 100%;
            position: relative;
            p {
              width: 72px;
              position: absolute;
              .el-input {
                height: 44px;
                line-height: 44px;
                input {
                  padding: 0 3px;
                  height: 44px;
                  line-height: 44px;
                }
              }
            }
          }

          .btn-count {
            padding: 10px 30px;
            button {
              width: 100%;
            }
          }

          .text-con {
            p {
              height: 20px;
              line-height: 20px;
              text-align: center;
            }
          }

          &.item1 {
            .img {
              height: 240px;
              background: url("../assets/images/2.png") no-repeat center;
            }
            p {
              &:nth-child(1) {
                top: 10px;
                left: 22px;
              }
              &:nth-child(2) {
                top: 17px;
                left: 228px;
              }
              &:nth-child(3) {
                top: 99px;
                left: 315px;
              }
              &:nth-child(4) {
                top: 184px;
                left: 153px;
              }
            }
          }

          &.item2 {
            .img {
              height: 220px;
              background: url("../assets/images/3.png") no-repeat center;
              p {
                width: 96px;
                &:nth-child(1) {
                  top: 9px;
                  left: 58px;
                }
                &:nth-child(2) {
                  top: 9px;
                  left: 214px;
                }
                &:nth-child(3) {
                  top: 87px;
                  left: 268px;
                }
                &:nth-child(4) {
                  top: 144px;
                  left: 44px;
                }
              }
            }
          }

          &.item3 {
            .img {
              height: 155px;
              background: url("../assets/images/4.png") no-repeat center;
              p {
                width: 135px;
                &:nth-child(1) {
                  top: 35px;
                  left: 215px;
                }
              }
            }
          }

          &.item4 {
            .img {
              height: 155px;
              background: url("../assets/images/5.png") no-repeat center;
              p {
                width: 103px;
                &:nth-child(1) {
                  top: 7px;
                  left: 163px;
                }
                &:nth-child(2) {
                  top: 90px;
                  left: 137px;
                }
              }
            }
          }

          &.item5 {
            .img {
              height: 155px;
              background: url("../assets/images/6.png") no-repeat center;
              p {
                width: 103px;
                &:nth-child(1) {
                  top: 10px;
                  left: 160px;
                }
                &:nth-child(2) {
                  top: 93px;
                  left: 135px;
                }
              }
            }
          }

          &.item6 {
            .img {
              height: 305px;
              background: url("../assets/images/7.png") no-repeat center;
              p {
                .el-input {
                  height: 38px;
                  line-height: 38px;
                  input {
                    height: 38px;
                    line-height: 38px;
                  }
                }
                width: 90px;
                &:nth-child(1) {
                  top: 7px;
                  left: 137px;
                }
                &:nth-child(2) {
                  top: 142px;
                  left: 66px;
                }
                &:nth-child(3) {
                  top: 259px;
                  left: 66px;
                }
                &:nth-child(4) {
                  top: 135px;
                  left: 314px;
                }
                &:nth-child(5) {
                  width: 62px;
                  top: 200px;
                  left: 331px;
                }
              }
            }
          }

          &.item7 {
            .img {
              height: 225px;
              background: url("../assets/images/8.png") no-repeat center;
              p {
                width: 103px;
                &:nth-child(1) {
                  top: 9px;
                  left: 75px;
                }
                &:nth-child(2) {
                  top: 73px;
                  left: 340px;
                }
                &:nth-child(3) {
                  top: 103px;
                  left: 59px;
                }
                &:nth-child(4) {
                  top: 153px;
                  left: 276px;
                }
              }
            }
            .item7-table {
              tr {
                td {
                  padding: 0 !important;
                  .cell {
                    padding: 0 !important;
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
              p + p {
                border-top: 1px solid #ebeef5;
                display: flex;
                text-align: center;
                span {
                  flex: 1;
                  & + span {
                    border-left: 1px solid #ebeef5;
                  }
                }
              }
            }
          }

          .el-table__header-wrapper {
            .has-gutter {
              tr {
                th {
                  background: #5b9bd5;
                  padding: 5px;
                  .cell {
                    color: #fff;
                    text-align: center;
                  }
                }
              }
            }
          }
          .el-table__body-wrapper {
            .el-table__row {
              td {
                padding: 5px;
                .cell {
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>