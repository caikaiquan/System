<template>
  <div class="spectrum-analysis">
    <header>
      <el-button
        :type="showStatus === 'pp'?'primary':''"
        @click="handleShowStatus('pp')"
        size="small"
      >频谱图</el-button>
      <el-button
        :type="showStatus === 'pb'?'primary':''"
        @click="handleShowStatus('pb')"
        size="small"
      >瀑布图</el-button>
    </header>
    <div class="containter">
      <div class="left open" :class="collapseShow?'open':'close'">
        <i class="iconfont icon-caidan" @click="collapseShow = !collapseShow"></i>
        <div class="time-list" :style="'height:'+timeList*24+'px'">
          <el-collapse-transition>
            <div v-show="collapseShow && showStatus === 'pp'">
              <el-radio-group v-model="timeRadio" @change="getDrawData">
                <el-radio
                  :label="item.value"
                  v-for="(item,index) in timeList"
                  :key="index"
                >{{item.value}}</el-radio>
              </el-radio-group>
            </div>
          </el-collapse-transition>
          <el-collapse-transition>
            <div v-show="collapseShow && showStatus === 'pb'">
              <el-checkbox-group v-model="checkList" @change="handleChangeCheckList">
                <el-checkbox
                  :label="item.value"
                  v-for="(item,index) in timeList"
                  :key="index"
                  :value="item.value"
                ></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-collapse-transition>
        </div>
      </div>
      <div class="right" :class="collapseShow?'small':'big'">
        <div class="select-box">
          <div class="cjq">
            采集器：
            <el-select v-model="CollectorId" placeholder="请选择" @change="handleCollectorNote">
              <el-option
                v-for="item in selectOption"
                :key="item.CollectorId"
                :label="item.CollectorNote"
                :value="item.CollectorId"
              ></el-option>
            </el-select>
          </div>
          <div class="td">
            通道：
            <el-select v-model="ChannelId" placeholder="请选择" @change="handleChangeTd">
              <el-option
                v-for="item in ChannelNotes"
                :key="item.ChannelId"
                :label="item.ChannelNote"
                :value="item.ChannelId"
              ></el-option>
            </el-select>
          </div>
          <div class="time">
            时间
            <el-date-picker
              v-model="timeQuantum"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '12:00:00']"
              @change="getPointsOfDate"
            ></el-date-picker>
          </div>
        </div>
        <div class="spectrogram" v-show="showStatus === 'pp'">
          <div class="spectrogram-map"></div>
          <div class="spectrogram-data side-data">
            <div class="item" v-show="spectrogramData.DataCount">
              <p>采样点数</p>
              <p>{{spectrogramData.DataCount}}</p>
            </div>
            <div class="item" v-show="spectrogramData.Rate">
              <p>采样频率</p>
              <p>{{spectrogramData.Rate}}</p>
            </div>
          </div>
        </div>
        <div class="time-domain-diagram" v-show="showStatus === 'pp'">
          <div class="time-domain-diagram-map"></div>
          <div class="diagram-data side-data">
            <div class="item" v-show="diagramData.M">
              <p>谱线数</p>
              <p>{{diagramData.M}}</p>
            </div>
            <div class="item" v-show="diagramData.RotationRate">
              <p>转速</p>
              <p>{{diagramData.RotationRate}}</p>
            </div>
            <div class="item" v-show="diagramData.Temprature">
              <p>温度</p>
              <p>{{diagramData.Temprature}}</p>
            </div>
          </div>
        </div>
        <div class="waterfall-plot" v-show="showStatus === 'pb'">
          <div class="waterfall-plot-map"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      showStatus: "pp",
      timeQuantum: "", // 选择的时间段 timeQuantum
      CollectorId: "", // 采集器
      selectOption: null,
      ChannelId: "", // 选择的通道
      ChannelNotes: [], // 选择的通道数组
      timeList: [
        // { value: "2019-10-19 12:12:00" },
        // { value: "2019-10-16 12:12:00" },
        // { value: "2019-10-13 12:12:00" },
        // { value: "2019-10-11 12:12:00" },
        // { value: "2019-10-10 12:12:00" }
      ], // 可选的时间段
      timeRadio: "", // 当前选择的时间段
      collapseShow: false,
      spectrogramData: {}, // 时域图右侧显示
      diagramData: {}, // 频谱图右侧显示
      checkList: [], // 瀑布图日期复选数组
      // fallPlotEachrt:null,
      pbRate: 1, // 屏幕尺寸1920 是1
      syEchart: null, // 时域图的echart对象
      ppEchart: null, // 频谱图的echart对象
      pbEachrt: null // 瀑布图的echart对象
    };
  },
  created() {
    // 计算瀑布图的缩放尺寸
    let winWidth = window.innerWidth || document.body.clientWidth;
    this.pbRate = (winWidth * 1.2) / 1920;
    if (winWidth > 1600) {
      this.pbRate = winWidth / 1920;
    } else if (winWidth > 1400) {
      this.pbRate = (winWidth * 1.35) / 1920;
    } else if (winWidth > 1300) {
      this.pbRate = (winWidth * 1.5) / 1920;
    } else {
      this.pbRate = (winWidth * 1.8) / 1920;
    }
  },
  beforeMount() {
    // if(this.timeQuantum){
    //   this.timequantum = this.timeQuantum
    // }
  },
  mounted() {
    // this.drawSpectrogram();
    // this.drawTimeDomainDiagram();
    this.getGetAllCollector();
  },
  computed: {
    ...mapGetters({
      // selectOption: "getAllCollector",
      // CollectorId:"getCollectorId",
      // ChannelNotes:"getChannelNotes",
      // ChannelId:"getChannelId",
      // timeQuantum:"getTimeQuantum",
    })
  },
  methods: {
    ...mapActions([
      "setAllCollector",
      "setCollectorId",
      "setChannelNotes",
      "setChannelId",
      "setTimeQuantum"
    ]),
    // 获取所有采集器信息
    getGetAllCollector() {
      if (this.getAllCollector) {
      } else {
        let GetAllCollector = window["YZ_GetAllCollector"];
        if (GetAllCollector) {
          GetAllCollector({}, (res, data) => {
            if (res == 0 && data) {
              data = JSON.parse(data);
              // 获取到的采集器数据缓存
              this.setAllCollector(data);
              // this.console.log("获取采集器数据", data);
              this.selectOption = data;
              this.CollectorId = data[0].CollectorId;
              // this.setCollectorId(data[0].CollectorId)
              // console.log("默认第一个选择采集器", this.CollectorId);
              if (data.length && data[0].ChannelNotes.length) {
                // this.setChannelNotes(data[0].ChannelNotes);
                this.ChannelNotes = data[0].ChannelNotes;
                // this.setChannelId(data[0].ChannelNotes[0].ChannelId);
                this.ChannelId = this.ChannelNotes[0].ChannelId;
                // console.log("设置通道数据", this.ChannelNotes);
                // console.log("默认选中第一个通道", this.ChannelId);
                console.log(
                  "vuex",
                  JSON.parse(JSON.stringify(this.$store.state))
                );
              }
            }
          });
        }
      }
    },

    handleCollectorNote() {
      this.ChannelNotes = [];
      this.ChannelId = "";
      let [filterChannelNotes] = this.selectOption.filter(
        item => item.CollectorId === this.CollectorId
      );
      if (filterChannelNotes) {
        this.ChannelNotes = filterChannelNotes.ChannelNotes;
        this.ChannelId = this.ChannelNotes[0].ChannelId;
      }
      this.timeList = [];
      this.timeRadio = "";
      this.drawSpectrogram();
      this.drawTimeDomainDiagram();
      if (this.timeQuantum && this.timeQuantum.length) {
        this.getPointsOfDate();
        console.log("这里是切换采集器触发获取时间段");
      }
    },

    handleChangeTd() {
      this.timeList = [];
      this.timeRadio = "";
      this.drawSpectrogram();
      this.drawTimeDomainDiagram();
      if (this.timeQuantum && this.timeQuantum.length) {
        this.getPointsOfDate();
        console.log("这里是切换通道");
      }
    },

    // 获取指定采集器，指定通道，指定时间段所有采集数据时间点
    getPointsOfDate() {
      if (!this.timeQuantum) {
        this.timeList = [];
        this.timeRadio = "";
        this.drawSpectrogram();
        this.drawTimeDomainDiagram();
        return;
      }
      this.setTimeQuantum(this.timeQuantum);
      let ThePointsOfDate = window["YZ_ThePointsOfDate"];
      if (ThePointsOfDate) {
        let option = {
          CollectorId: this.CollectorId,
          ChannelId: this.ChannelId,
          StartDate: this.timeQuantum[0],
          EndDate: this.timeQuantum[1]
        };
        ThePointsOfDate(option, (res, data) => {
          console.log("获取时间段参数", option);
          if (res == 0 && data) {
            data = JSON.parse(data);
            console.log("根据筛选条件获取时间段", option, data);
            if (data.DatePoint) {
              this.timeList = data.DatePoint.map(item => ({ value: item }));
              this.collapseShow = true;
              console.log("获取到时间段列表", this.timeList);
            }
          } else {
            this.collapseShow = false;
            console.log(res, data, "没有获取到时间段数据");
          }
        });
      }
    },
    // 切换radio的时间选择
    getDrawData() {
      this.getSpectrogram();
      this.getDomainDiagram();
    },
    // 获取时域图制图数据
    getSpectrogram() {
      this.spectrogramData = {};
      console.log(this.timeRadio);
      let GetTimeDomainPlotData = window["YZ_GetTimeDomainPlotData"];
      let data;
      if (GetTimeDomainPlotData) {
        let option = {
          CollectorId: this.CollectorId,
          ChannelId: this.ChannelId,
          DatePoint: this.timeRadio
        };
        GetTimeDomainPlotData(option, (res, data) => {
          if (res == 0 && data) {
            data = JSON.parse(data);
            console.log("获取到制图数据", data);
            this.drawSpectrogram(data);
            this.spectrogramData.DataCount = data.DataCount;
            this.spectrogramData.Rate = data.Rate;
            this.$forceUpdate();
          } else {
            this.drawSpectrogram();
          }
        });
      }
    },
    // 绘制时域图
    drawSpectrogram(res) {
      let echarts = this.$echarts.init(
        document.querySelector(".spectrogram-map")
      );
      echarts.clear();
      this.syEchart = null;
      if (!res) {
        this.spectrogramData.DataCount = "";
        this.spectrogramData.Rate = "";
        return;
      }
      let data = res.Points;
      // console.log("绘制时域图的制图数据", JSON.stringify(data));
      let option = {
        title: [
          {
            left: "center",
            top: 20,
            text: "时域图",
            textStyle: {
              fontSize: "15",
              fontWeight: 600,
              color: "#409EFF"
            }
          }
        ],
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          data: data.map(function(item) {
            return item[0];
          })
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        dataZoom: [
          {
            // startValue: "2014-06-01",
            // endValue:"2012-09-01"
          },
          {
            type: "inside"
          }
        ],
        grid: [
          {
            left: "40",
            right: "40"
          }
        ],
        series: {
          name: "G",
          type: "line",
          lineStyle:{
            width:1,
          },
          data: data.map(function(item) {
            return item[1];
          }),
          markLine: {
            silent: true,
            data: [
              {
                yAxis: 50
              },
              {
                yAxis: 100
              },
              {
                yAxis: 150
              },
              {
                yAxis: 200
              },
              {
                yAxis: 300
              }
            ]
          }
        }
      };
      this.syEchart = echarts;
      echarts.setOption(option);
    },
    // 获取频谱图数据
    getDomainDiagram() {
      this.diagramData = {};
      let GetSpectrogramData = window["YZ_GetSpectrogramData"];
      if (GetSpectrogramData) {
        let option = {
          CollectorId: this.CollectorId,
          ChannelId: this.ChannelId,
          DatePoint: this.timeRadio
        };
        GetSpectrogramData(option, (res, data) => {
          if (data && res == 0) {
            data = JSON.parse(data);
            this.drawTimeDomainDiagram(data);
            this.diagramData.M = data.M;
            this.diagramData.RotationRate = data.RotationRate;
            this.diagramData.Temprature = data.Temprature;
            this.$forceUpdate();
          } else {
            this.drawTimeDomainDiagram();
          }
        });
      }
    },
    drawTimeDomainDiagram(res) {
      let echarts = this.$echarts.init(
        document.querySelector(".time-domain-diagram-map")
      );
      echarts.clear();
      this.ppEchart = null;
      if (!res) {
        // this.diagramData = {};
        this.diagramData.M = "";
        this.diagramData.RotationRate = "";
        this.diagramData.Temprature = "";
        return;
      }
      let data = res.Points;

      let option = {
        title: [
          {
            left: "center",
            top: 20,
            text: "频谱图",
            textStyle: {
              fontSize: "15",
              fontWeight: 600,
              color: "#409EFF"
            }
          }
        ],
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          data: data.map(function(item) {
            return item[0];
          })
        },
        yAxis: {
          splitLine: {
            show: false
          }
        },
        dataZoom: [
          {
            // startValue: "2014-06-01"
          },
          {
            type: "inside"
          }
        ],
        grid: [
          {
            left: "40",
            right: "40"
          }
        ],
        series: {
          name: "G",
          type: "line",
          lineStyle:{
            width:1,
          },
          data: data.map(function(item) {
            return item[1];
          }),
          markLine: {
            silent: true,
            data: [
              {
                yAxis: 50
              },
              {
                yAxis: 100
              },
              {
                yAxis: 150
              },
              {
                yAxis: 200
              },
              {
                yAxis: 300
              }
            ]
          }
        }
      };

      this.ppEchart = echarts;
      echarts.setOption(option);
    },
    // 复选框勾选
    handleChangeCheckList() {
      console.log(this.checkList);
      if (!this.checkList.length) {
        this.drawWaterfallPlot();
        return;
      }

      // this.drawWaterfallPlot('res');
      let GetWaterfallPlotData = window["YZ_GetWaterfallPlotData"];
      if (GetWaterfallPlotData) {
        let option = {
          CollectorId: this.CollectorId,
          ChannelId: this.ChannelId,
          JsonDatePoint: JSON.stringify(this.checkList)
        };
        console.log("chanshu", option);
        GetWaterfallPlotData(option, (res, data) => {
          if (res == 0 && data) {
            data = JSON.parse(data);
            console.log("获取到瀑布图制图数据", res, data);
            data = data.map(item => {
              item.Points = item.Points.map(v => {
                let [a, c] = v;
                v = [a, item.DatePoint, c];
                return v;
              });
              return item;
            });
            console.log("获取到瀑布图制图数据", res, data);
            this.drawWaterfallPlot(data);
          }
        });
      } else {
        let data = require("./1.json");
        console.log("获取到瀑布图数据", data);
        data.forEach(item => {
          item.Points = item.Points.map(v => {
            let [a, b, c] = v;
            if (c < 1) {
              c = Math.ceil(Math.random() * 200);
            }
            v = [a, b, c];
            return v;
          });
        });

        console.log(JSON.stringify(data));
        if (this.checkList.length === 1) {
          data = data.filter((item, index) => index === 0);
        }
        this.drawWaterfallPlot(data);
      }
    },
    // 获取瀑布图制图数据

    drawWaterfallPlot(res) {
      let echarts = this.$echarts.init(
        document.querySelector(".waterfall-plot-map")
      );
      echarts.clear();
      if (!res) {
        return;
      }
      let seriesOption = {
        name: "one",
        type: "line3D",
        data: "data1",
        stack: "总量",
        //ITEMSTYLE: {
        //     OPACITY: 0.4
        // },
        emphasis: {
          label: {
            textStyle: {
              fontSize: 12
            }
          },
          itemStyle: {
            color: "#900"
          }
        },
        lineStyle: {
          width: 1
        }
      };

      let seriesData = res.map(item => {
        let data = item.Points;
        let series = JSON.parse(JSON.stringify(seriesOption));
        series.data = data;
        return series;
      });
      let option = (option = {
        tooltip: {},
        visualMap: {
          // max: 'auto',
          inRange: {
            color: [
              "#313695",
              "#4575b4",
              "#74add1",
              "#abd9e9",
              "#e0f3f8",
              "#ffffbf",
              "#fee090",
              "#fdae61",
              "#f46d43",
              "#d73027",
              "#a50026"
            ]
          },
          alpha: 0
        },
        xAxis3D: {
          type: "value"
          // data: hours
        },
        yAxis3D: {
          type: "category"
          // data: days
        },
        zAxis3D: {
          type: "value"
          // data: hours
        },
        grid3D: {
          boxWidth: 220 * this.pbRate,
          boxDepth: 90 * this.pbRate,
          boxHeight: 80 * this.pbRate,
          light: {
            main: {
              intensity: 1.2
            },
            ambient: {
              intensity: 0.3
            }
          },
          viewControl: {
            alpha: 5,
            beta: 10
          }
        },
        series: seriesData
      });
      echarts.setOption(option);
    },
    handleShowStatus(type) {
      if (type === this.showStatus) {
        return;
      }
      this.showStatus = type;
    }
  }
};
</script>

<style lang='scss'>
@import "../assets/css/base.scss";
.spectrum-analysis {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  header {
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    // display: flex;
    background: #fff;
    border-bottom: 1px solid #ccc;
  }
  .containter {
    width: calc(100vw - 120px);
    .left {
      float: left;
      background: #fff;
      position: relative;
      height: calc(100vh - 60px);
      &.open {
        width: 190px;
      }

      &.close {
        width: 30px;
      }
      & > i {
        position: absolute;
        top: 200px;
        right: 5px;
        transform: rotate(90deg);
        cursor: pointer;
      }

      .time-list {
        margin-top: 40px;
        max-width: 190px;
        padding-left: 10px;
        min-height: calc(100vh - 110px);
        overflow-y: auto;
        overflow-x:hidden;
        @extend .scroll_bar_mixin;
        .el-radio {
          height: 24px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }
    }
    .right {
      float: right;
      // overflow: auto;
      // @extend .scroll_bar;
      overflow: hidden;
      padding-left: 20px;
      padding-bottom: 20px;
      &.big {
        width: calc(100vw - 150px);
      }

      &.small {
        width: calc(100vw - 310px);
      }
    }
    .select-box {
      display: flex;
      margin-top: 10px;
      .cjq {
        .el-select {
          width: 140px;
        }
      }
      .td {
        margin-left: 20px;
        .el-select {
          width: 140px;
        }
      }
      .time {
        margin-left: 20px;
        .el-date-editor {
          margin-left: 10px;
          .el-range-input::placeholder {
            line-height: 18px;
          }
        }
      }
    }

    .side-data {
      position: absolute;
      top: 5vh;
      right: 0;
      width: 100px;
      height: calc(50vh - 100px);
      .item {
        width: 100%;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 3px;
        & + .item {
          margin-top: 2vh;
        }
        p {
          height: 30px;
          line-height: 30px;
          text-align: center;
          & + p {
            border-top: 1px solid #999;
          }
        }
      }
    }

    .spectrogram {
      width: calc(100% - 20px);
      // margin-top: 20px;
      position: relative;
      // margin-bottom: 50px;
      .spectrogram-map {
        width: calc(100% - 100px);
        height: calc(50vh - 80px);
        padding: 0 20px;
        // border: 1px solid #ccc;
      }
    }
    .time-domain-diagram {
      margin-top: 2vh;
      min-width: 500px;
      width: calc(100% - 20px);
      // width: calc(100vw - 440px);
      position: relative;
      .time-domain-diagram-map {
        // min-width:600px;
        width: calc(100% - 100px);
        height: calc(50vh - 80px);
        padding: 0 20px;
        // border: 1px solid #ccc;
      }
    }

    .waterfall-plot {
      margin-top: 40px;
      width: calc(100% - 20px);
      .waterfall-plot-map {
        min-width: 500px;
        height: calc(100vh - 300px);
        box-sizing: border-box;
        padding: 0 20px;
      }
    }
  }
}
</style>