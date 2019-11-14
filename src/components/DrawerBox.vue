<template>
   <div class="drawer-box">
       <div class="icon-left" @click="drawerOpen = true" v-show='!drawerOpen'>
           <i class="el-icon-d-arrow-left"></i>
       </div>
       <div class="drawer-module" :class="{'open':drawerOpen}">
           <div class="nav-list">
               <div class="close-drawer" @click='drawerOpen = false'>
                   <i class="el-icon-d-arrow-right"></i>
               </div>
               <div class="link-list">
                   <div class="link-item">电机</div>
                   <div class="link-item">齿轮</div>
                   <div class="link-item">滚动轴承</div>
                   <div class="link-item">泵</div>
                   <div class="link-item">风机风扇</div>
                   <div class="link-item">滑动轴承</div>
                   <div class="link-item">传动带</div>
                   <div class="link-item">振动参照</div>
               </div>
           </div>
       </div>
   </div>
</template>

<script>
export default {
    data(){
        return {
            drawerOpen:false,
        }
    }
}
</script>

<style lang='scss'>
.drawer-box{
    .icon-left{
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
        i{
            font-size: 30px;
        }
    }

    .drawer-module{
        width: 460px;
        height: 640px;
        background-color: #fff;
        position: fixed;
        top: 50%;
        right: -465px;
        transform:translateY(-50%);
        transition: all 0.15s;
        &.open{
            right: 0;
        }

        .nav-list{
            width: 100%;
            height: 100%;
            // background: url('../assets/images/1.png') no-repeat center;
            position: relative;
            .close-drawer{
                position: absolute;
                top: 0;
                right: 0;
                padding: 5px;
                cursor: pointer;
                i{
                    font-size: 16px;
                }
            }
        }
    }
}
</style>