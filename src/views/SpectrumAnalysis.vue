<template>
  <div class="spectrum-analysis">
    <header>
      <el-button :type="showStatus === 'pp'?'primary':''" @click="handleShowStatus('pp')">频谱图</el-button>
      <el-button :type="showStatus === 'pb'?'primary':''" @click="handleShowStatus('pb')">瀑布图</el-button>
    </header>
    <div class="containter">
      <div class="left open" :class="collapseShow?'open':'close'">
        <i class="iconfont icon-caidan" @click="collapseShow = !collapseShow"></i>
        <div class="time-list" :style="'height:'+timeList*24+'px'">
          <el-collapse-transition >
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
          <el-collapse-transition >
            <div v-show="collapseShow && showStatus === 'pb'">
              <el-checkbox-group v-model="checkList" @change="handleChangeCheckList">
                <el-checkbox :label="item.value" v-for="(item,index) in timeList" :key='index' :value='item.value'></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-collapse-transition>
        </div>
      </div>
      <div class="right" :class="collapseShow?'small':'big'">
        <div class="select-box">
          <div class="cjq">
            采集器：
            <el-select v-model="cjqvalue" placeholder="请选择" @change="handleCollectorNote">
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
            <el-select v-model="tdvalue" placeholder="请选择" @change="handleChangeTd">
              <el-option
                v-for="item in tdOption"
                :key="item.ChannelId"
                :label="item.ChannelNote"
                :value="item.ChannelId"
              ></el-option>
            </el-select>
          </div>
          <div class="time">
            时间
            <el-date-picker
              v-model="timeValue"
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
export default {
  data() {
    return {
      showStatus: "pb",
      timeValue: "", // 选择的时间段
      cjqvalue: "", // 采集器
      selectOption: null,
      cjqOption: [], // 采集器数组
      tdvalue: "", // 选择的通道
      tdOption: [], // 选择的通道数组
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
      checkList:[], // 瀑布图日期复选数组
    };
  },
  mounted() {
    // this.drawSpectrogram();
    // this.drawTimeDomainDiagram();
    this.getGetAllCollector();
    // this.drawWaterfallPlot()
  },
  methods: {
    // 获取所有采集器信息
    getGetAllCollector() {
      let GetAllCollector = window["YZ_GetAllCollector"];
      if (GetAllCollector) {
        GetAllCollector({}, (res, data) => {
          if (res == 0 && data) {
            data = JSON.parse(data);
            console.log("获取采集器数据", data);
            this.selectOption = data;
            this.cjqvalue = data[0].CollectorId;
            console.log("默认第一个选择采集器", this.cjqvalue);
            if (data.length && data[0].ChannelNotes.length) {
              this.tdOption = data[0].ChannelNotes;
              this.tdvalue = this.tdOption[0].ChannelId;
              console.log("设置通道数据", this.tdOption);
              console.log("默认选中第一个通道", this.tdvalue);
            }
          }
        });
      }
    },

    handleCollectorNote() {
      this.tdOption = [];
      this.tdvalue = "";
      let [filtertdOption] = this.selectOption.filter(
        item => item.CollectorId === this.cjqvalue
      );
      if (filtertdOption) {
        this.tdOption = filtertdOption.ChannelNotes;
        this.tdvalue = this.tdOption[0].ChannelId;
      }
      this.timeList = [];
      this.timeRadio = "";
      this.drawSpectrogram();
      this.drawTimeDomainDiagram();
      if (this.timeValue && this.timeValue.length) {
        this.getPointsOfDate();
        console.log("这里是切换采集器触发获取时间段");
      }
    },

    handleChangeTd() {
      this.timeList = [];
      this.timeRadio = "";
      this.drawSpectrogram();
      this.drawTimeDomainDiagram();
      if (this.timeValue && this.timeValue.length) {
        this.getPointsOfDate();
        console.log("这里是切换通道");
      }
    },

    // 获取指定采集器，指定通道，指定时间段所有采集数据时间点
    getPointsOfDate() {
      if (!this.timeValue) {
        this.timeList = [];
        this.timeRadio = "";
        this.drawSpectrogram();
        this.drawTimeDomainDiagram();
        return;
      }
      let ThePointsOfDate = window["YZ_ThePointsOfDate"];
      if (ThePointsOfDate) {
        let option = {
          CollectorId: this.cjqvalue,
          ChannelId: this.tdvalue,
          StartDate: this.timeValue[0],
          EndDate: this.timeValue[1]
        };
        ThePointsOfDate(option, (res, data) => {
          if (res == 0 && data) {
            data = JSON.parse(data);
            console.log("根据筛选条件获取时间段", data);
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
          CollectorId: this.cjqvalue,
          ChannelId: this.tdvalue,
          DatePoint: this.timeRadio
        };
        GetTimeDomainPlotData(option, (res, data) => {
          if (res == 0 && data) {
            data = JSON.parse(data);
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
              fontSize: "26",
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
        // toolbox: {
        //   left: "center",
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: "none"
        //     },
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },
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
        // visualMap: {
        //   top: 10,
        //   left: -40,
        //   pieces: [
        //     {
        //       gt: 0,
        //       lte: 50,
        //       color: "#096"
        //     },
        //     {
        //       gt: 50,
        //       lte: 100,
        //       color: "#ffde33"
        //     },
        //     {
        //       gt: 100,
        //       lte: 150,
        //       color: "#ff9933"
        //     },
        //     {
        //       gt: 150,
        //       lte: 200,
        //       color: "#cc0033"
        //     },
        //     {
        //       gt: 200,
        //       lte: 300,
        //       color: "#660099"
        //     },
        //     {
        //       gt: 300,
        //       color: "#7e0023"
        //     }
        //   ],
        //   outOfRange: {
        //     color: "#999"
        //   }
        // },
        series: {
          name: "G",
          type: "line",
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
      echarts.setOption(option);
    },
    // 获取频谱图数据
    getDomainDiagram() {
      this.diagramData = {};
      let GetSpectrogramData = window["YZ_GetSpectrogramData"];
      if (GetSpectrogramData) {
        let option = {
          CollectorId: this.cjqvalue,
          ChannelId: this.tdvalue,
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
              fontSize: "26",
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
        // toolbox: {
        //   left: "center",
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: "none"
        //     },
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },
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
        // visualMap: {
        //   top: 10,
        //   left: -40,
        //   pieces: [
        //     {
        //       gt: 0,
        //       lte: 50,
        //       color: "#096"
        //     },
        //     {
        //       gt: 50,
        //       lte: 100,
        //       color: "#ffde33"
        //     },
        //     {
        //       gt: 100,
        //       lte: 150,
        //       color: "#ff9933"
        //     },
        //     {
        //       gt: 150,
        //       lte: 200,
        //       color: "#cc0033"
        //     },
        //     {
        //       gt: 200,
        //       lte: 300,
        //       color: "#660099"
        //     },
        //     {
        //       gt: 300,
        //       color: "#7e0023"
        //     }
        //   ],
        //   outOfRange: {
        //     color: "#999"
        //   }
        // },
        series: {
          name: "G",
          type: "line",
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
      echarts.setOption(option);
    },
    // 复选框勾选
    handleChangeCheckList(){
      debugger
      console.log(this.checkList);
      if(!this.checkList.length){
        this.drawWaterfallPlot()
        return
      }

      // this.drawWaterfallPlot('res');
      let GetSpectrogramData = window["YZ_GetSpectrogramData"];
      if (false && GetSpectrogramData) {
        let option = {
          CollectorId: this.cjqvalue,
          ChannelId: this.tdvalue,
          DatePoint: this.checkList
        };
        GetSpectrogramData(option, (res, data) => {

        })
      }else{
        let data = require('./1.json');
        console.log('获取到瀑布图数据',data)
        if(this.checkList.length === 1){
            data = data.filter((item,index) => index === 0)
        }
        debugger
        this.drawWaterfallPlot(data);

      }
    },
    // 获取瀑布图制图数据

    drawWaterfallPlot(res) {
      let echarts = this.$echarts.init(
        document.querySelector(".waterfall-plot-map")
      );
      echarts.clear();
      if(!res){
        return;
      }


      // var hours = [1, 2, 3, 4, 5, 6, 7];
      // var days = ["A", "B", "C", "D", "E", "F"];
      // var data1 = [
      //   [1, 0, 0.1],
      //   [2, 0, 0.2],
      //   [3, 0, 0.0],
      //   [4, 0, 0.2],
      //   [5, 0, 0.4],
      //   [6, 0, 0.5],
      //   [7, 0, 0.0],
      //   [8, 0, 0.4],
      //   [9, 0, 0.2],
      //   [10, 0, 0.5],
      //   [11, 0, 0.9],
      //   [12, 0, 0.5],
      //   [13, 0, 0.3],
      //   [14, 0, 0.2],
      //   [15, 0, 0.0],
      //   [16, 0, 0.5],
      //   [17, 0, 0.1],
      //   [18, 0, 0.2],
      //   [19, 0, 0.0],
      //   [20, 0, 0.2],
      //   [21, 0, 0.4],
      //   [22, 0, 0.5],
      //   [23, 0, 0.0],
      //   [24, 0, 0.4],
      //   [25, 0, 0.2],
      //   [26, 0, 0.5],
      //   [27, 0, 0.0],
      //   [28, 0, 0.5],
      //   [29, 0, 0.3],
      //   [30, 0, 0.2],
      //   [31, 0, 0.0],
      //   [32, 0, 0.5]
      // ];
      // var data2 = [
      //   [1, 2, 0.1],
      //   [2, 2, 0.4],
      //   [3, 2, 0.3],
      //   [4, 2, 0.5],
      //   [5, 2, 0.4],
      //   [6, 2, 0.5],
      //   [7, 2, 0.4],
      //   [8, 2, 0.3],
      //   [9, 2, 0.2],
      //   [10, 2, 0.2],
      //   [11, 2, 0.0],
      //   [12, 2, 0.5],
      //   [13, 2, 0.2],
      //   [14, 2, 0.2],
      //   [15, 2, 0.1],
      //   [16, 2, 0.5],
      //   [17, 2, 0.1],
      //   [18, 2, 0.4],
      //   [19, 2, 0.3],
      //   [20, 2, 0.5],
      //   [21, 2, 0.4],
      //   [22, 2, 0.5],
      //   [23, 2, 0.4],
      //   [24, 2, 0.3],
      //   [25, 2, 0.2],
      //   [26, 2, 0.2],
      //   [27, 2, 0.0],
      //   [28, 2, 0.5],
      //   [29, 2, 0.2],
      //   [30, 2, 0.2],
      //   [31, 2, 0.1],
      //   [32, 2, 0.5]
      // ];
      // var data3 = [
      //   [1, 4, 0.1],
      //   [2, 4, 0.2],
      //   [3, 4, 0.2],
      //   [4, 4, 0.2],
      //   [5, 4, 0.2],
      //   [6, 4, 0.3],
      //   [7, 4, 0.2],
      //   [8, 4, 0.2],
      //   [9, 4, 0.5],
      //   [10, 4, 0.4],
      //   [11, 4, 0.0],
      //   [12, 4, 0.5],
      //   [13, 4, 0.4],
      //   [14, 4, 0.3],
      //   [15, 4, 0.3],
      //   [16, 4, 0.5],
      //   [17, 4, 0.1],
      //   [18, 4, 0.2],
      //   [19, 4, 0.2],
      //   [20, 4, 0.2],
      //   [21, 4, 0.2],
      //   [22, 4, 0.3],
      //   [23, 4, 0.2],
      //   [24, 4, 0.2],
      //   [25, 4, 0.5],
      //   [26, 4, 0.4],
      //   [27, 4, 0.0],
      //   [28, 4, 0.5],
      //   [29, 4, 0.4],
      //   [30, 4, 0.3],
      //   [31, 4, 0.3],
      //   [32, 4, 0.5]
      // ];
      // var counter = 0;
      // for (var i = 33; i < 10000; i++) {
      //   counter++;
      //   var x1 = i;
      //   var y1 = 0;
      //   var z1 = 0;
      //   if (counter > 200) {
      //     z1 = Math.random();
      //   }
      //   data1.push([x1, y1, z1]);
      //   var x2 = i;
      //   var y2 = 2;
      //   var z2 = 0;
      //   if (counter > 200) {
      //     z2 = Math.random();
      //   }
      //   data2.push([x2, y2, z2]);
      //   var x3 = i;
      //   var y3 = 4;
      //   var z3 = 0;
      //   if (counter > 200) {
      //     z3 = Math.random();
      //   }
      //   data3.push([x3, y3, z3]);
      //   if (counter > 200) {
      //     counter = 0;
      //   }
      // }

      let seriesOption =  {
            name: "one",
            type: "line3D",
            data: 'data1',
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

      let seriesData = res.map((item) =>{
         let data = item.Points;
         let series = JSON.parse(JSON.stringify(seriesOption));
         series.data = data;
         return series;
      })

      let option = (option = {
        tooltip: {},
        visualMap: {
          max: 1,
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
          type: "value",
          // data: hours
        },
        yAxis3D: {
          type: "category",
          // data: days
        },
        zAxis3D: {
          type: "value",
          // data: hours
        },
        grid3D: {
          boxWidth: 350,
          boxDepth: 90,
          boxHeight: 90,
          light: {
            main: {
              intensity: 1.2
            },
            ambient: {
              intensity: 0.3
            }
          },
          viewControl: {
            alpha: 0,
            beta: 0
          }
        },
        series:seriesData
        // series: [
        //   {
        //     name: "one",
        //     type: "line3D",
        //     data: data1,
        //     stack: "总量",
        //     //ITEMSTYLE: {
        //     //     OPACITY: 0.4
        //     // },
        //     emphasis: {
        //       label: {
        //         textStyle: {
        //           fontSize: 12
        //         }
        //       },
        //       itemStyle: {
        //         color: "#900"
        //       }
        //     },
        //     lineStyle: {
        //       width: 1
        //     }
        //   },
        //   {
        //     name: "tow",
        //     type: "line3D",
        //     data: data2,
        //     stack: "总量1",
        //     shading: "color",
        //     emphasis: {
        //       label: {
        //         textStyle: {
        //           fontSize: 20,
        //           color: "#FF0"
        //         }
        //       },
        //       itemStyle: {
        //         color: "#000"
        //       }
        //     }
        //   },
        //   {
        //     name: "three",
        //     type: "line3D",
        //     data: data3,
        //     stack: "总量1",
        //     shading: "color",
        //     emphasis: {
        //       label: {
        //         textStyle: {
        //           fontSize: 20,
        //           color: "#000"
        //         }
        //       },
        //       itemStyle: {
        //         color: "#000"
        //       }
        //     }
        //   }
        // ]
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
    width: calc(100vw - 200px);
    .left {
      float: left;
      height: calc(100vh - 60px);
      background: #fff;
      position: relative;
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
        .el-radio {
          height: 24px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }
    }
    .right {
      width: calc(100vw - 390px);
      height: calc(100vh - 60px);
      @extend .scroll_bar;
      float: right;
      overflow: auto;
      padding-left: 20px;
      &.big {
        width: calc(100vw - 230px);
      }

      &.small {
        width: calc(100vw - 390px);
      }
    }
    .select-box {
      min-width: 500px;
      display: flex;
      margin-top: 20px;
      .cjq {
        .el-select {
          width: 110px;
        }
      }
      .td {
        margin-left: 20px;
        .el-select {
          width: 110px;
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
      top: 50px;
      right: 0;
      width: 100px;
      height: 300px;
      .item {
        width: 100%;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 3px;
        & + .item {
          margin-top: 20px;
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
      min-width: 500px;
      width: calc(100% - 20px);
      margin-top: 20px;
      position: relative;
      .spectrogram-map {
        width: calc(100% - 80px);
        height: 370px;
        padding: 0 20px;
        // border: 1px solid #ccc;
      }
    }
    .time-domain-diagram {
      margin-top: 40px;
      min-width: 500px;
      width: calc(100% - 20px);
      // width: calc(100vw - 440px);
      position: relative;
      .time-domain-diagram-map {
        // min-width:600px;
        width: calc(100% - 80px);
        height: 370px;
        padding: 0 20px;
        // border: 1px solid #ccc;
      }
    }

    .waterfall-plot {
      margin-top: 40px;
      width: 100%;
      .waterfall-plot-map {
        min-width: 500px;
        width: calc(100vw - 450px);
        box-sizing: border-box;
        height: 600px;
        padding: 0 20px;
        border: 1px solid #ccc;
      }
    }
  }
}
</style>