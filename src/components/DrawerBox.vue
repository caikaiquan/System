<template>
  <div class="drawer-box">
    <div class="model" v-show="drawerOpen"></div>
    <div class="icon-left" @click="drawerOpen = true" v-show="!drawerOpen">
      <img src="../assets/images/VibCal.png" alt />
    </div>
    <div class="drawer-module" :class="{'open':drawerOpen}">
      <div class="nav-list">
        <div class="title">设备振动频率计算</div>
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
                <el-input v-model="item1Form.NumberOfPoles"></el-input>
              </p>
              <p>
                <el-input v-model="item1Form.RotorRpm"></el-input>
              </p>
              <p>
                <el-input v-model="item1Form.LineFrequency"></el-input>
              </p>
              <p>
                <el-input v-model="item1Form.NumberOfRotorBars"></el-input>
              </p>
            </div>
            <div class="btn-count">
              <el-button type="primary" @click="handleVibCalToolMotor">计算</el-button>
            </div>
            <div class="text-con">
              <p>马达转速(RPM) = {{item1Res.MotorSpeed | numberFilter}}</p>
              <p>同步速度(CPM) = {{item1Res.SynchronousSpeed | numberFilter}}</p>
              <p>Slip(CPM) = {{item1Res.Slip_CPM | numberFilter}}</p>
              <p>Slip(%) = {{item1Res.Slip | numberFilter}}</p>
              <p>PPF(CPM) = {{item1Res.PPF_CPM | numberFilter}}</p>
              <p>RBPF(CPM) = {{item1Res.RBPF_CPM | numberFilter}}</p>
            </div>
            <div class="tbale-con">
              <el-table :data="item1Data" border style="width: 100%">
                <el-table-column prop="Xn" label="RPM（Hz）"></el-table-column>
                <el-table-column prop="RPM" label="RPM">
                  <template slot-scope="scope">
                    <p>{{scope.row.RPM | numberFilter}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="PPF" label="PPF">
                  <template slot-scope="scope">
                    <p>{{scope.row.PPF | numberFilter}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="RBPF" label="RBPF">
                  <template slot-scope="scope">
                    <p>{{scope.row.RBPF | numberFilter}}</p>
                  </template>
                </el-table-column>
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
                <el-input v-model="item2Form.NumberOfTeeth"></el-input>
              </p>
              <p>
                <el-input v-model="item2Form.OutputSpeed"></el-input>
              </p>
              <p>
                <el-input v-model="item2Form.InputSpeed"></el-input>
              </p>
              <p>
                <el-input v-model="item2Form.InputNumberOfTeeth"></el-input>
              </p>
            </div>
            <div class="btn-count">
              <el-button type="primary" @click="handleVibCalToolGears">计算</el-button>
            </div>
            <div class="text-con">
              <p>输入速度(Input Speed) = {{item2Res.InputSpeed | numberFilter}}</p>
              <p>输出速度(Input Speed) = {{item2Res.OutputSpeed | numberFilter}}</p>
              <p>输入齿数(Input# of Teeth) = {{item2Res.InputOfTeeth | numberFilter}}</p>
              <p>输出齿数(Onput# of Teeth) = {{item2Res.OutputOfTeeth | numberFilter}}</p>
            </div>
            <div class="tbale-con">
              <el-table :data="item2Data" border style="width: 100%" class="item7-table">
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
                  <template slot-scope="scope">
                    <div class="item7-cell1">
                      <p>{{(scope.row.INPUT_GEAR_1X || scope.row.OUTPUT_GEAR_1X) | numberFilter}}</p>
                      <p>
                        <span>{{scope.row['-1xSB-1X'] | numberFilter}}</span>
                        <span>{{scope.row['+1xSB-1X'] | numberFilter}}</span>
                      </p>
                      <p>
                        <span>{{scope.row['-2xSB-1X'] | numberFilter}}</span>
                        <span>{{scope.row['+2xSB-1X'] | numberFilter}}</span>
                      </p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="address" label="2X">
                  <template slot-scope="scope">
                    <div class="item7-cell1">
                      <p>{{(scope.row.INPUT_GEAR_2X || scope.row.OUTPUT_GEAR_2X) | numberFilter}}</p>
                      <p>
                        <span>{{scope.row['-1xSB-2X'] | numberFilter}}</span>
                        <span>{{scope.row['+1xSB-2X'] | numberFilter}}</span>
                      </p>
                      <p>
                        <span>{{scope.row['-2xSB-2X'] | numberFilter}}</span>
                        <span>{{scope.row['+2xSB-2X'] | numberFilter}}</span>
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
                <el-input v-model="item3Form.ContactAngle"></el-input>
              </p>
              <p>
                <el-input v-model="item3Form.PitchDiameter"></el-input>
              </p>
              <p>
                <el-input v-model="item3Form.RollingElementDiameter"></el-input>
              </p>
              <p>
                <el-input v-model="item3Form.RPM"></el-input>
              </p>
              <p>
                <el-input v-model="item3Form.NumberOfRollingElements"></el-input>
              </p>
            </div>
            <div class="btn-count">
              <el-button type="primary" @click="handleVibCalToolRollBearings">计算</el-button>
            </div>
            <div class="tbale-con">
              <el-table :data="item3Data" border style="width: 100%">
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
                <el-input v-model="item4Form.NumberOfVanes"></el-input>
              </p>
              <p>
                <el-input v-model="item4Form.RotorRPM"></el-input>
              </p>
            </div>
            <div class="btn-count">
              <el-button type="primary" @click="handleVibCalToolPumps">计算</el-button>
            </div>
            <div class="tbale-con">
              <el-table :data="item4Data" border style="width: 100%">
                <el-table-column prop="Xn" label="RPM（Hz）"></el-table-column>
                <el-table-column prop="RotorSpeed" label="Rotor Speed">
                  <template slot-scope="scope">
                    <p>{{scope.row.RotorSpeed | numberFilter}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="VanePass" label="Vane Pass">
                  <template slot-scope="scope">
                    <p>{{scope.row.VanePass | numberFilter}}</p>
                  </template>
                </el-table-column>
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
                <el-input v-model="item5Form.NumberOfBlades"></el-input>
              </p>
              <p>
                <el-input v-model="item5Form.RotorRpm"></el-input>
              </p>
            </div>
            <div class="btn-count">
              <el-button type="primary" @click="handleVibCalToolFans">计算</el-button>
            </div>
            <div class="tbale-con">
              <el-table :data="item5Data" border style="width: 100%">
                <el-table-column prop="X0" label="RPM（Hz）">
                  <template slot-scope="scope">
                    <p>{{scope.row.X0 || scope.row.Xn}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="RotorSync" label="Rotor Sync.">
                  <template slot-scope="scope">
                    <p>{{scope.row.RotorSync | numberFilter}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="MotorSpeed" label="输出转速">
                  <template slot-scope="scope">
                    <p>{{scope.row.MotorSpeed | numberFilter}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="BladePass" label="皮带转速">
                  <template slot-scope="scope">
                    <p>{{scope.row.BladePass | numberFilter}}</p>
                  </template>
                </el-table-column>
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
                <el-input v-model="item6Form.RotorRPM"></el-input>
              </p>
            </div>
            <div class="btn-count">
              <el-button type="primary" @click="handleVibCalToolJourBearings">计算</el-button>
            </div>
            <div class="tbale-con">
              <el-table :data="item6Data" border style="width: 100%">
                <el-table-column prop="Xn" label="RPM（Hz）"></el-table-column>
                <el-table-column prop="RotorSync" label="Rotor Sync.">
                  <template slot-scope="scope">
                    <p>{{scope.row.RotorSync | numberFilter}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="OilWhirl" label="输出转速">
                  <template slot-scope="scope">
                    <p>{{scope.row.OilWhirl | numberFilter}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="Wear" label="皮带转速">
                  <template slot-scope="scope">
                    <p>{{scope.row.Wear | numberFilter}}</p>
                  </template>
                </el-table-column>
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
                <el-input v-model="item7Form.DiamBig"></el-input>
              </p>
              <p>
                <el-input v-model="item7Form.DiamSmall"></el-input>
              </p>
              <p>
                <el-input v-model="item7Form.RPM"></el-input>
              </p>
              <p>
                <el-input v-model="item7Form.Interval"></el-input>
              </p>
            </div>
            <div class="btn-count">
              <el-button type="primary" @click="handleVibCalToolBelts">计算</el-button>
            </div>
            <div class="text-con">
              <p>传动比(Transmission Ratio) = {{item7Res.TransmissionRatio | numberFilter}}</p>
              <p>皮带长(Belt Length) = {{item7Res.BeltLength | numberFilter}} mm</p>
              <p>带速度(Belt Velocity) = {{item7Res.BeltVelocity | numberFilter}} mm/min</p>
              <p>滑轮驱动器转速(Driver Pulley RPM) = {{item7Res.DriverPulleyRPM | numberFilter}}</p>
              <p>从动皮带轮转速(Driven Pulley RPM) = {{item7Res.DrivenPulleyRPM | numberFilter}}</p>
              <p>皮带速度(Belt RPM) = {{item7Res.BeltRPM | numberFilter}}</p>
            </div>
            <div class="tbale-con">
              <el-table :data="item7Data" border style="width: 100%">
                <el-table-column prop="Xn" label="RPM（Hz）"></el-table-column>
                <el-table-column prop="RPM_IN" label="输入转速">
                  <template slot-scope="scope">
                    <p>{{scope.row.RPM_IN | numberFilter}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="RPM_OUT" label="输出转速">
                  <template slot-scope="scope">
                    <p>{{scope.row.RPM_OUT | numberFilter}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="BELT_RPM" label="皮带速度">
                  <template slot-scope="scope">
                    <p>{{scope.row.BELT_RPM | numberFilter}}</p>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="item" :class="{'show':draweFlags.drawerFlag8}">
          <i class="el-icon-d-arrow-right item-right" @click="draweFlags.drawerFlag8 = false"></i>
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
        // 电机输入表单
        NumberOfPoles: "",
        RotorRpm: "",
        NumberOfRotorBars: "",
        LineFrequency: ""
      },
      item1Res: {
        // 电机数据
        MotorSpeed: null, // 马达转速(RPM)
        SynchronousSpeed: null, // 同步速度(CPM)
        Slip: null, // Slip(%)
        Slip_CPM: null, // Slip(CPM)
        PPF_CPM: null, // PPF(CPM)
        RBPF_CPM: null // RBPF(CPM)
      },
      item1Data: [], // 电机表格数据
      item2Form: {
        // 齿轮输入表单  NumberOfTeeth:1.0, InputSpeed:2.0, OutputSpeed:3.0, InputNumberOfTeeth:4.0
        NumberOfTeeth: "",
        InputSpeed: "",
        OutputSpeed: "",
        InputNumberOfTeeth: ""
      },
      item2Res: {
        InputSpeed: "", // 输入速度
        OutputSpeed: "", // 输出速度
        InputOfTeeth: "", // 输入齿数
        OutputOfTeeth: "" // 输出齿数
      },
      item2Data: [], // 齿轮表格数据
      // ContactAngle:1.0, PitchDiameter:2.0, RollingElementDiameter:3.0, RPM:4.0, NumberOfRollingElements:5.0
      item3Form: {
        // 滚动轴承表单
        ContactAngle: "",
        PitchDiameter: "",
        RollingElementDiameter: "",
        RPM: "",
        NumberOfRollingElements: ""
      },
      item4Form: {
        // 泵的表单
        NumberOfVanes: "", // 叶片数
        RotorRPM: "" // 转数
      },
      item4Data: [], //泵的表格数据
      item5Form: {
        // 风机风扇
        NumberOfBlades: "", //叶片数
        RotorRpm: "" //马达转速
      },
      item5Data: [], // 风机表格数据
      item6Form: {
        // 滑动轴承表单
        RotorRPM: ""
      },
      item6Data: [], // 滑动轴承表格数据
      item3Data: [], // 滚动轴承表格数据
      item7Form: {
        // 传送带的表单 DiamBig:1.0, DiamSmall:2.0, Interval:3.0, RPM:4.0
        DiamBig: "",
        DiamSmall: "",
        Interval: "",
        RPM: ""
      },
      item7Res: {
        // 传送带数据
        TransmissionRatio: "",
        BeltLength: "",
        BeltVelocity: "",
        DriverPulleyRPM: "",
        DrivenPulleyRPM: "",
        BeltRPM: ""
      },
      item7Data: [], // 传送带表格数据
      errorMsg: "请检查输入框的值" // 输入框的值校验
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
    },
    // 数据校验
    handleCheckForm(formData) {
      return new Promise((resolve, reject) => {
        for (let key in formData) {
          if ((!formData[key] && formData[key] == 0) || formData[key] <= 0) {
            this.$message.error(this.errorMsg);
            return;
          }else{
            formData[key] = formData[key] - 0;
          }
        }
        resolve();
      });
    },
    // 清空表单数据
    handleClearForm(form) {
      for (let key in form) {
        form[key] = "";
      }
    },
    // 计算电机数据
    handleVibCalToolMotor() {
      this.handleCheckForm(this.item1Form).then(() => {
        let VibCalToolMotor = window["YZ_VibCalToolMotor"];
        if (VibCalToolMotor) {
          YZ_VibCalToolMotor(this.item1Form, (res, data) => {
            if (res) {
              res = JSON.parse(res);
              console.log("计算电机表单提交返回的数据", res);
              if (res.ListData) {
                this.item1Data = res.ListData;
                this.handleClearForm(this.item1Form);
              }
              this.item1Res.MotorSpeed = res.MotorSpeed;
              this.item1Res.SynchronousSpeed = res.SynchronousSpeed;
              this.item1Res.Slip = res.Slip;
              this.item1Res.Slip_CPM = res.Slip_CPM;
              this.item1Res.PPF_CPM = res.PPF_CPM;
              this.item1Res.RBPF_CPM = res.RBPF_CPM;
            }
          });
        }
      });
    },
    // 计算齿轮数据
    handleVibCalToolGears() {
      this.handleCheckForm(this.item2Form).then(() => {
        let VibCalToolGears = window["YZ_VibCalToolGears"];
        if (VibCalToolGears) {
          VibCalToolGears(this.item2Form, res => {
            if (res) {
              res = JSON.parse(res);
              console.log(
                "计算齿轮获取到的数据",
                JSON.parse(JSON.stringify(res))
              );
              this.item2Data = res.ListData;
              this.item2Res.InputSpeed = res.InputSpeed;
              this.item2Res.OutputSpeed = res.OutputSpeed;
              this.item2Res.InputOfTeeth = res.InputOfTeeth;
              this.item2Res.OutputOfTeeth = res.OutputOfTeeth;
              this.handleClearForm(this.item2Form);
            }
          });
        }
      });
    },
    // 计算滚动轴承
    handleVibCalToolRollBearings() {
      this.handleCheckForm(this.item3Form).then(() => {
        let VibCalToolRollBearings = window["YZ_VibCalToolRollBearings"];
        if (VibCalToolRollBearings) {
          VibCalToolRollBearings(this.item3Form, res => {
            console.log("滚动轴承计算返回数据", res);
            res = JSON.parse(res);
            // 模拟数据
            this.item3Data = [
              { date: "1X", name: "0.000", address: "0.000" },
              { date: "2X", name: "0.000", address: "0.000" },
              { date: "3X", name: "0.000", address: "0.000" },
              { date: "4X", name: "0.000", address: "0.000" },
              { date: "5X", name: "0.000", address: "0.000" },
              { date: "6X", name: "0.000", address: "0.000" },
              { date: "7X", name: "0.000", address: "0.000" },
              { date: "0.4-0.48X", name: "0.000", address: "0.000" }
            ];
            // 清空输入框
            this.handleClearForm(this.item3Form);
          });
        }
      });
    },
    // 计算泵
    handleVibCalToolPumps() {
      this.handleCheckForm(this.item4Form).then(() => {
        let VibCalToolPumps = window["YZ_VibCalToolPumps"];
        if (VibCalToolPumps) {
          VibCalToolPumps(this.item4Form, res => {
            if (res) {
              res = JSON.parse(res);
              console.log("点击计算获取泵的数据", res);
              this.item4Data = res.ListData;
              this.handleClearForm(this.item4Form);
            }
          });
        }
      });
    },
    // 计算风机
    handleVibCalToolFans() {
      this.handleCheckForm(this.item5Form).then(() => {
        let VibCalToolFans = window["YZ_VibCalToolFans"];
        if (VibCalToolFans) {
          VibCalToolFans(this.item5Form, res => {
            if (res) {
              res = JSON.parse(res);
              console.log("计算风机获取到的数据", res);
              this.item5Data = res.ListData;
              this.handleClearForm(this.item5Form);
            }
          });
        }
      });
    },
    // 计算滑动轴承
    handleVibCalToolJourBearings() {
      this.handleCheckForm(this.item6Form).then(() => {
        let VibCalToolJourBearings = window["YZ_VibCalToolJourBearings"];
        if (VibCalToolJourBearings) {
          VibCalToolJourBearings(this.item6Form, res => {
            if (res) {
              res = JSON.parse(res);
              console.log("计算滑动轴承获取的数据", res);
              this.item6Data = res.ListData;
              this.handleClearForm(this.item6Form);
            }
          });
        }
      });
    },
    // 计算传动带
    handleVibCalToolBelts() {
      this.handleCheckForm(this.item7Form).then(() => {
        let VibCalToolBelts = window["YZ_VibCalToolBelts"];
        VibCalToolBelts(this.item7Form, res => {
          if (res) {
            res = JSON.parse(res);
            console.log('计算传送带获取的数据',res)
            this.item7Data = res.ListData;
            this.item7Res.TransmissionRatio = res.TransmissionRatio;
            this.item7Res.BeltLength = res.BeltLength;
            this.item7Res.BeltVelocity = res.BeltVelocity;
            this.item7Res.DriverPulleyRPM = res.DriverPulleyRPM;
            this.item7Res.DrivenPulleyRPM = res.DrivenPulleyRPM;
            this.item7Res.BeltRPM = res.BeltRPM;
            this.handleClearForm(this.item7Form);
          }
        });
      });
    },
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
      .title {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 22px;
        font-weight: 600;
        color: #fff;
      }
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

            .el-table__body-wrapper {
              .el-table__row {
                td {
                  .cell {
                    font-size: 12px !important;
                  }
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