<template>
  <div class="spectrum-analysis">
    <div class="containter">
      <div class="select-box">
        <el-button type="primary">时域图</el-button>
        <el-button>频谱图</el-button>
        <div class="date">
          时间：
          <el-date-picker v-model="valueDate" type="date" placeholder="选择日期"></el-date-picker>
        </div>
        <div class="time">
          时分：
          <el-select v-model="valueTime" placeholder="请选择">
            <el-option
              v-for="item in timeOption"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="spectrogram" v-show='false'>
        <div class="spectrogram-map"></div>
      </div>
      <div class="time-domain-diagram" v-show='false'>
        <div class="time-domain-diagram-map"></div>
      </div>
      <div class="waterfall-plot">
        <div class="waterfall-plot-map"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valueDate: "2019-10-27",
      valueTime: "",
      timeOption: [
        { value: "00:10" },
        { value: "00:20" },
        { value: "00:30" },
        { value: "00:40" },
        { value: "00:50" },
        { value: "01:00" },
        { value: "01:10" },
        { value: "01:20" },
        { value: "01:20" }
      ],

    };
  },
  mounted(){
    this.drawSpectrogram()
    this.drawTimeDomainDiagram()
    this.drawWaterfallPlot()
  },
  methods: {
    drawSpectrogram() {
      let echarts = this.$echarts.init(
        document.querySelector(".spectrogram-map")
      );

      let data = [
        ["2000-06-05", 116],
        ["2000-06-06", 129],
        ["2000-06-07", 135],
        ["2000-06-08", 86],
        ["2000-06-09", 73],
        ["2000-06-10", 85],
        ["2000-06-11", 73],
        ["2000-06-12", 68],
        ["2000-06-13", 92],
        ["2000-06-14", 130],
        ["2000-06-15", 245],
        ["2000-06-16", 139],
        ["2000-06-17", 115],
        ["2000-06-18", 111],
        ["2000-06-19", 309],
        ["2000-06-20", 206],
        ["2000-06-21", 137],
        ["2000-06-22", 128],
        ["2000-06-23", 85],
        ["2000-06-24", 94],
        ["2000-06-25", 71],
        ["2000-06-26", 106],
        ["2000-06-27", 84],
        ["2000-06-28", 93],
        ["2000-06-29", 85],
        ["2000-06-30", 73],
        ["2000-07-01", 83],
        ["2000-07-02", 125],
        ["2000-07-03", 107],
        ["2000-07-04", 82],
        ["2000-07-05", 44],
        ["2000-07-06", 72],
        ["2000-07-07", 106],
        ["2000-07-08", 107],
        ["2000-07-09", 66],
        ["2000-07-10", 91],
        ["2000-07-11", 92],
        ["2000-07-12", 113],
        ["2000-07-13", 107],
        ["2000-07-14", 131],
        ["2000-07-15", 111],
        ["2000-07-16", 64],
        ["2000-07-17", 69],
        ["2000-07-18", 88],
        ["2000-07-19", 77],
        ["2000-07-20", 83],
        ["2000-07-21", 111],
        ["2000-07-22", 57],
        ["2000-07-23", 55],
        ["2000-07-24", 60]
      ];

      let  dateList = data.map(function(item) {
        return item[0];
      });
      let  valueList = data.map(function(item) {
        return item[1];
      });

      let option = {
        // Make gradient line here
        visualMap: [
          {
            show: false,
            type: "continuous",
            seriesIndex: 0,
            min: 0,
            max: 400
          }
        ],

        title: [
          {
            left: "center",
            top:20,
            text: "时域图",
            textStyle:{
              fontSize:"26",
              fontWeight:600,
              color:'#409EFF'
            }
          }
        ],
        tooltip: {
          trigger: "axis"
        },
        xAxis: [
          {
            data: dateList
          }
        ],
        yAxis: [
          {
            splitLine: { show: false }
          }
        ],
        grid: [
          {
            left:"40",
            right:"40"
          }
        ],
        series: [
          {
            type: "line",
            showSymbol: false,
            data: valueList
          }
        ]
      };
      echarts.setOption(option);
    },
    drawTimeDomainDiagram(){
      let echarts = this.$echarts.init(
        document.querySelector(".time-domain-diagram-map")
      );

      let data = [
        ["2000-06-05", 116],
        ["2000-06-06", 129],
        ["2000-06-07", 135],
        ["2000-06-08", 86],
        ["2000-06-09", 73],
        ["2000-06-10", 85],
        ["2000-06-11", 73],
        ["2000-06-12", 68],
        ["2000-06-13", 92],
        ["2000-06-14", 130],
        ["2000-06-15", 245],
        ["2000-06-16", 139],
        ["2000-06-17", 115],
        ["2000-06-18", 111],
        ["2000-06-19", 309],
        ["2000-06-20", 206],
        ["2000-06-21", 137],
        ["2000-06-22", 128],
        ["2000-06-23", 85],
        ["2000-06-24", 94],
        ["2000-06-25", 71],
        ["2000-06-26", 106],
        ["2000-06-27", 84],
        ["2000-06-28", 93],
        ["2000-06-29", 85],
        ["2000-06-30", 73],
        ["2000-07-01", 83],
        ["2000-07-02", 125],
        ["2000-07-03", 107],
        ["2000-07-04", 82],
        ["2000-07-05", 44],
        ["2000-07-06", 72],
        ["2000-07-07", 106],
        ["2000-07-08", 107],
        ["2000-07-09", 66],
        ["2000-07-10", 91],
        ["2000-07-11", 92],
        ["2000-07-12", 113],
        ["2000-07-13", 107],
        ["2000-07-14", 131],
        ["2000-07-15", 111],
        ["2000-07-16", 64],
        ["2000-07-17", 69],
        ["2000-07-18", 88],
        ["2000-07-19", 77],
        ["2000-07-20", 83],
        ["2000-07-21", 111],
        ["2000-07-22", 57],
        ["2000-07-23", 55],
        ["2000-07-24", 60]
      ];

      let  dateList = data.map(function(item) {
        return item[0];
      });
      let  valueList = data.map(function(item) {
        return item[1];
      });

      let option = {
        // Make gradient line here
        visualMap: [
          {
            show: false,
            type: "continuous",
            seriesIndex: 0,
            min: 0,
            max: 400
          }
        ],

        title: [
          {
            left: "center",
            top:20,
            text: "频谱图",
            textStyle:{
              fontSize:"26",
              fontWeight:600,
              color:'#409EFF'
            }
          }
        ],
        tooltip: {
          trigger: "axis"
        },
        xAxis: [
          {
            data: dateList
          }
        ],
        yAxis: [
          {
            splitLine: { show: false }
          }
        ],
        grid: [
          {
            left:"40",
            right:"40"
          }
        ],
        series: [
          {
            type: "line",
            showSymbol: false,
            data: valueList
          }
        ]
      };
      echarts.setOption(option);
    },
    drawWaterfallPlot(){
      let echarts = this.$echarts.init(
        document.querySelector(".waterfall-plot-map")
      );
      var hours = [1, 2, 3, 4, 5, 6, 7];
      var days = ["A", "B", "C", "D", "E", "F"];
      var data1 = [
        [1, 0, 0.1],
        [2, 0, 0.2],
        [3, 0, 0.0],
        [4, 0, 0.2],
        [5, 0, 0.4],
        [6, 0, 0.5],
        [7, 0, 0.0],
        [8, 0, 0.4],
        [9, 0, 0.2],
        [10, 0, 0.5],
        [11, 0, 0.9],
        [12, 0, 0.5],
        [13, 0, 0.3],
        [14, 0, 0.2],
        [15, 0, 0.0],
        [16, 0, 0.5],
        [17, 0, 0.1],
        [18, 0, 0.2],
        [19, 0, 0.0],
        [20, 0, 0.2],
        [21, 0, 0.4],
        [22, 0, 0.5],
        [23, 0, 0.0],
        [24, 0, 0.4],
        [25, 0, 0.2],
        [26, 0, 0.5],
        [27, 0, 0.0],
        [28, 0, 0.5],
        [29, 0, 0.3],
        [30, 0, 0.2],
        [31, 0, 0.0],
        [32, 0, 0.5]
      ];
      var data2 = [
        [1, 2, 0.1],
        [2, 2, 0.4],
        [3, 2, 0.3],
        [4, 2, 0.5],
        [5, 2, 0.4],
        [6, 2, 0.5],
        [7, 2, 0.4],
        [8, 2, 0.3],
        [9, 2, 0.2],
        [10, 2, 0.2],
        [11, 2, 0.0],
        [12, 2, 0.5],
        [13, 2, 0.2],
        [14, 2, 0.2],
        [15, 2, 0.1],
        [16, 2, 0.5],
        [17, 2, 0.1],
        [18, 2, 0.4],
        [19, 2, 0.3],
        [20, 2, 0.5],
        [21, 2, 0.4],
        [22, 2, 0.5],
        [23, 2, 0.4],
        [24, 2, 0.3],
        [25, 2, 0.2],
        [26, 2, 0.2],
        [27, 2, 0.0],
        [28, 2, 0.5],
        [29, 2, 0.2],
        [30, 2, 0.2],
        [31, 2, 0.1],
        [32, 2, 0.5]
      ];
      var data3 = [
        [1, 4, 0.1],
        [2, 4, 0.2],
        [3, 4, 0.2],
        [4, 4, 0.2],
        [5, 4, 0.2],
        [6, 4, 0.3],
        [7, 4, 0.2],
        [8, 4, 0.2],
        [9, 4, 0.5],
        [10, 4, 0.4],
        [11, 4, 0.0],
        [12, 4, 0.5],
        [13, 4, 0.4],
        [14, 4, 0.3],
        [15, 4, 0.3],
        [16, 4, 0.5],
        [17, 4, 0.1],
        [18, 4, 0.2],
        [19, 4, 0.2],
        [20, 4, 0.2],
        [21, 4, 0.2],
        [22, 4, 0.3],
        [23, 4, 0.2],
        [24, 4, 0.2],
        [25, 4, 0.5],
        [26, 4, 0.4],
        [27, 4, 0.0],
        [28, 4, 0.5],
        [29, 4, 0.4],
        [30, 4, 0.3],
        [31, 4, 0.3],
        [32, 4, 0.5]
      ];
      var counter = 0;
      for (var i = 33; i < 10000; i++) {
        counter++;
        var x1 = i;
        var y1 = 0;
        var z1 = 0;
        if (counter > 200) {
          z1 = Math.random();
        }
        data1.push([x1, y1, z1]);
        var x2 = i;
        var y2 = 2;
        var z2 = 0;
        if (counter > 200) {
          z2 = Math.random();
        }
        data2.push([x2, y2, z2]);
        var x3 = i;
        var y3 = 4;
        var z3 = 0;
        if (counter > 200) {
          z3 = Math.random();
        }
        data3.push([x3, y3, z3]);
        if (counter > 200) {
          counter = 0;
        }
      }

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
          alpha:0
        },
        xAxis3D: {
          type: "value",
          data: hours
        },
        yAxis3D: {
          type: "category",
          data: days
        },
        zAxis3D: {
          type: "value",
          data: hours
        },
        grid3D: {
          boxWidth: 350,
          boxDepth: 90,
          boxHeight:90,
          light: {
            main: {
              intensity: 1.2
            },
            ambient: {
              intensity: 0.3
            },
          },
          viewControl:{
              alpha:0,
              beta:0
          }
        },
        series: [
          {
            name: "one",
            type: "line3D",
            data: data1,
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
          },
          {
            name: "tow",
            type: "line3D",
            data: data2,
            stack: "总量1",
            shading: "color",
            emphasis: {
              label: {
                textStyle: {
                  fontSize: 20,
                  color: "#FF0"
                }
              },
              itemStyle: {
                color: "#000"
              }
            }
          },
          {
            name: "three",
            type: "line3D",
            data: data3,
            stack: "总量1",
            shading: "color",
            emphasis: {
              label: {
                textStyle: {
                  fontSize: 20,
                  color: "#000"
                }
              },
              itemStyle: {
                color: "#000"
              }
            }
          }
        ]
      });
      echarts.setOption(option);
    }

  }
};
</script>

<style scoped lang='scss'>
.spectrum-analysis {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  .containter {
    width: 100%;
    min-width: 824px;
    .select-box {
      display: flex;
      .date {
        margin-left: 20px;
      }
      .time {
        margin-left: 20px;
      }
    }

    .spectrogram {
      margin-top: 40px;

      .spectrogram-map {
        width: 100%;
        height: 400px;
        padding: 0 20px;
        border: 1px solid #ccc;
      }
    }
    .time-domain-diagram {
      margin-top: 40px;
      .time-domain-diagram-map {
        width: 100%;
        height: 400px;
        padding: 0 20px;
        border: 1px solid #ccc;
      }
    }

    .waterfall-plot{
      margin-top: 40px;
      .waterfall-plot-map{
         width: 100%;
        height: 600px;
        padding: 0 20px;
        border: 1px solid #ccc;
      }
    }
  }
}
</style>