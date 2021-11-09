<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: {
    id: {
      type: String,
      default: "chart"
    },
    className: {
      type: String,
      default: "chart"
    },
    height: {
      type: String,
      default: "100%"
    },
    width: {
      type: String,
      default: "100%"
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      this.setOptions(this.chartData)
    },
    fomatToArr: function (obj) {
      var dataArr = [];
      for (var key in obj) {
        dataArr.push(obj[key])
      }
      return dataArr;
    },
    setOptions: function ({ dataAxis, values, state } = {}) {
      var _this = this
      this.chart.setOption({
        xAxis: [{
          type: 'category',
          data: _this.fomatToArr(dataAxis),
          axisLine: {
            lineStyle: {
              color: ['#373A4F'],
            }
          },
          axisLabel: {
            color: "#a0a5b1"
          },
          boundaryGap: false,
        }],
        yAxis: [{
          type: 'value',
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: "#a0a5b1",
            formatter: function (value, index) {
              var value;
              value < 1000 ? value = value : value = value / 1000 + 'k';
              return value;
            }
          },
          splitLine: {
            lineStyle: {
              color: ['#373A4F'],
            }
          }
        }],
        series: [{
          name: '全部',
          data: _this.fomatToArr(values[0]),
          type: 'line',
          smooth: true,
          symbolSize: 4,
          lineStyle: {
            width: 2,
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: '#0066FF'
            }, {
              offset: 1,
              color: '#33CCFF'
            }])
          },
          itemStyle: {
            color: '#fff',
            formatter: function (value) {
              var value;
              value < 1000 ? value = value : value = parseInt(value / 1000) + 'k';
              return value;
            },
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(0,102,255,.7)',
              }, {
                offset: 1,
                color: 'rgba(51,204,255,0)',
              }],
              globalCoord: true,
              opacity: 0.3
            }
          },
          label: {
            show: true,
            position: 'top',
            align: 'center',
            formatter: function (params) {
              var value;
              value = params.value > 10000 ? (params.value / 10000).toFixed(2) + '万' : params.value;
              return value;
            }
          }
        }, {
          name: '优秀',
          data: _this.fomatToArr(values[1]),
          type: 'line',
          smooth: true,
          symbolSize: 4,
          lineStyle: {
            width: 1,
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: '#FF3333'
            }, {
              offset: 1,
              color: '#FF9900'
            }])
          }
        }, {
          name: '良好',
          data: _this.fomatToArr(values[2]),
          type: 'line',
          smooth: true,
          symbolSize: 4,
          lineStyle: {
            width: 1,
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: '#00CC33'
            }, {
              offset: 1,
              color: '#66FF99'
            }])
          }
        }, {
          name: '合格',
          data: _this.fomatToArr(values[3]),
          type: 'line',
          smooth: true,
          symbolSize: 4,
          lineStyle: {
            width: 1,
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: '#6633CC'
            }, {
              offset: 1,
              color: '#9999FF'
            }])
          }
        }, {
          name: '鼓励',
          data: _this.fomatToArr(values[4]),
          type: 'line',
          smooth: true,
          symbolSize: 4,
          lineStyle: {
            width: 1,
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: '#3399FF'
            }, {
              offset: 1,
              color: '#66FFFF'
            }])
          }
        }],
        legend: {
          show: state,
          data: [{
            name: '全部',
            icon: '../../assets/images/icon_1.png',
          }, {
            name: '优秀',
            icon: '../../assets/images/icon_2.png',
          }, {
            name: '良好',
            icon: '../../assets/images/icon_3.png',
          }, {
            name: '合格',
            icon: '../../assets/images/icon_4.png',
          }, {
            name: '鼓励',
            icon: '../../assets/images/icon_5.png',
          }],
          textStyle: {
            color: '#A0A5B1',
          },
          itemWidth: 10,
          itemHeight: 10,
          bottom: 0,
        },
        grid: {
          left: '40',
          right: '15',
          top: '28',
          bottom: '70',
          containLabel: false
        },
      })
    }
  }
}
</script>