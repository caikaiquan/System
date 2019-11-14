<template>
  <div class="drawer-box">
    <div class="icon-left" @click="drawerOpen = true" v-show="!drawerOpen">
      <i class="el-icon-d-arrow-left"></i>
    </div>
    <div class="drawer-module" :class="{'open':drawerOpen}">
      <div class="nav-list">
        <div class="close-drawer" @click="drawerOpen = false">
          <i class="el-icon-d-arrow-right"></i>
        </div>
        <div class="link-list">
          <!-- <div class="link-item">电机</div>
                   <div class="link-item">齿轮</div>
                   <div class="link-item">滚动轴承</div>
                   <div class="link-item">泵</div>
                   <div class="link-item">风机风扇</div>
                   <div class="link-item">滑动轴承</div>
                   <div class="link-item">传动带</div>
          <div class="link-item">振动参照</div>-->
          <div class="link-item" @click='handleChange("drawerFlag1")'>1</div>
          <div class="link-item" @click='handleChange("drawerFlag2")'>2</div>
          <div class="link-item" @click='handleChange("drawerFlag3")'>3</div>
          <div class="link-item" @click='handleChange("drawerFlag4")'>4</div>
          <div class="link-item" @click='handleChange("drawerFlag5")'>5</div>
          <div class="link-item" @click='handleChange("drawerFlag6")'>6</div>
          <div class="link-item" @click='handleChange("drawerFlag7")'>7</div>
          <div class="link-item" @click='handleChange("drawerFlag8")'>8</div>
        </div>
      </div>
      <div class="drawer-content">
        <div class="item" :class="{'show':draweFlags.drawerFlag1}">
            <i class="el-icon-d-arrow-right item-right" @click="draweFlags.drawerFlag1 = false"></i>
            111111
        </div>
        <div class="item" :class="{'show':draweFlags.drawerFlag2}">
            <i class="el-icon-d-arrow-right item-right" @click="draweFlags.drawerFlag2 = false"></i>
            2222222
        </div>
        <div class="item" :class="{'show':draweFlags.drawerFlag3}">
            <i class="el-icon-d-arrow-right item-right" @click="draweFlags.drawerFlag3 = false"></i>
            3333333
        </div>
        <div class="item" :class="{'show':draweFlags.drawerFlag4}">
            <i class="el-icon-d-arrow-right item-right" @click="draweFlags.drawerFlag4 = false"></i>
            44444444444
        </div>
        <div class="item" :class="{'show':draweFlags.drawerFlag5}">
            <i class="el-icon-d-arrow-right item-right" @click="draweFlags.drawerFlag5 = false"></i>
            55555555555555
        </div>
        <div class="item" :class="{'show':draweFlags.drawerFlag6}">
            <i class="el-icon-d-arrow-right item-right" @click="draweFlags.drawerFlag6 = false"></i>
            6666666666666
        </div>
        <div class="item" :class="{'show':draweFlags.drawerFlag7}">
            <i class="el-icon-d-arrow-right item-right" @click="draweFlags.drawerFlag7 = false"></i>
            7777777777777777
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
      }
    }
  },
  methods:{
      handleChange(type){
          for(let key in this.draweFlags){
              if(key === type){
                  this.draweFlags[key] = true;
              }else{
                  this.draweFlags[key] = false;
              }
          }
      }
  }
};
</script>

<style lang='scss'>
.drawer-box {
  .icon-left {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    cursor: pointer;
    background-color: #fff;
    i {
      font-size: 30px;
    }
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
    &.open {
      right: 0;
    }

    .nav-list {
      width: 100%;
      height: 100%;
      // background: url('../assets/images/1.png') no-repeat center;
      position: relative;
      .close-drawer {
        position: absolute;
        top: 0;
        right: 0;
        padding: 5px;
        cursor: pointer;
        i {
          font-size: 16px;
        }
      }

      .link-list {
        display: flex;
        flex-wrap: wrap;
        .link-item {
          width: 100px;
          height: 100px;
          border: 1px solid #000;
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
        &.show {
          left: 0;
          z-index: 3;
        }
        .item-right{
            padding: 5px;
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
        }
      }
    }
  }
}
</style>