<template>
  <div id="app">
    <div class="minimize">
      <i class="el-icon-minus" @click="handleMini"></i>
    </div>
    <div class="close-icon">
      <i class="el-icon-close" @click="handleClose"></i>
    </div>

    <div class="drawer-box" v-show="!drawer" @click="drawer = !drawer">
      <i class="el-icon-d-arrow-left"></i>
    </div>
    <el-drawer title="设备振动频率计算" :visible.sync="drawer" size="400px">
      <div class="bg-drawer">
        <div class="item" @click="item1 = true"></div>
        <div class="item" @click="item2 = true"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
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

    <el-dialog title="传动带" :visible.sync="item2" width="500px">
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
          <p>RBPF(CPM)  =0.00</p>
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
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "app",
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
      item2: true
    };
  },
  created() {
    let winWidth = window.innerWidth || document.body.clientWidth;
    this.saveWinWidth(winWidth);
  },
  methods: {
    ...mapActions(["saveWinWidth"]),
    handleMini() {
      let YZ_Min = window["YZ_Min"];
      if (YZ_Min) {
        YZ_Min();
      }
    },
    handleClose() {
      let YZ_Exit = window["YZ_Exit"];
      if (YZ_Exit) {
        YZ_Exit();
      }
    }
  }
};
</script>
<style lang='scss' >
@import "./assets/css/base.scss";
#app {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  @extend .scroll_bar;
  .close-icon,
  .minimize {
    width: 20px;
    height: 20px;
    position: fixed;
    top: 20px;
    right: 20px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    font-weight: bold;
    cursor: pointer;
  }

  .minimize {
    right: 50px;
  }

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
}

.bg-drawer {
  width: 400px;
  height: 550px;
  background: url("./assets/images/1.png") no-repeat center;
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
  .item1-img {
    width: 460px;
    height: 240px;
    background: url("./assets/images/2.png") no-repeat center;
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
    background: url("./assets/images/3.png") no-repeat center;
    position: relative;
    .item-input {
      width: 96px;
      position: absolute;
      top: 0;
      left: 0;
      input{
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
</style>
