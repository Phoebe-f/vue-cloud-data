<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }"></div>
</template>
<script>
import * as echarts from 'echarts'
// require('echarts/theme/macarons') // echarts theme
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
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
    // xchaneg--控制x轴坐标文字的横竖
    setOptions({ dataAxis, value, code, xchaneg } = {}) {
      if (code == 'chongqing') {
        var zoom = [{
          type: 'slider',
          show: true,
          start: 0,
          end: 50,
          handleSize: 8
        },
        {
          type: 'inside',
          start: 0,
          end: 50
        }]
      } else {
        var zoom = [];
      }
      this.chart.setOption({
        color: ['#3398DB'],
        xAxis: [{
          type: 'category',
          data: dataAxis,
          axisLine: {
            lineStyle: {
              color: ['#373A4F'],
            }
          },
          axisLabel: {
            color: "#a0a5b1",
            interval: 0,
            formatter: function (value) {
              if (xchaneg == true) {
                // console.log("xchaneg"+xchaneg)
                return value
              } else {
                return value.split("").join("\n");
              }
            }
          }
        }],
        yAxis: [{
          type: 'value',
          axisLine: {
            show: false
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
        dataZoom: zoom,
        series: [{
          type: 'bar',
          barWidth: '12px',
          data: value,
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = [
                  ['#FF3333', '#FF9900'],
                  ['#FF9900', '#FFFF00'],
                  ['#FF3399', '#FF99CC'],
                  ['#00CC33', '#66FF99'],
                  ['#0066FF', '#33CCFF'],
                  ['#6633CC', '#9999FF'],
                  ['#3399FF', '#66FFFF'],
                  ['#FF3333', '#FF9900'],
                  ['#FF9900', '#FFFF00'],
                  ['#FF3399', '#FF99CC'],
                  ['#00CC33', '#66FF99'],
                  ['#0066FF', '#33CCFF'],
                  ['#6633CC', '#9999FF'],
                  ['#3399FF', '#66FFFF'],
                  ['#FF3333', '#FF9900'],
                  ['#FF9900', '#FFFF00'],
                  ['#FF3399', '#FF99CC'],
                  ['#00CC33', '#66FF99'],
                  ['#0066FF', '#33CCFF'],
                  ['#6633CC', '#9999FF'],
                  ['#3399FF', '#66FFFF'],
                  ['#FF3333', '#FF9900'],
                  ['#FF9900', '#FFFF00'],
                  ['#FF3399', '#FF99CC'],
                  ['#00CC33', '#66FF99'],
                  ['#0066FF', '#33CCFF'],
                  ['#6633CC', '#9999FF'],
                  ['#3399FF', '#66FFFF'],
                  ['#FF3333', '#FF9900'],
                  ['#FF9900', '#FFFF00'],
                  ['#FF3399', '#FF99CC'],
                  ['#00CC33', '#66FF99'],
                  ['#0066FF', '#33CCFF'],
                  ['#6633CC', '#9999FF'],
                  ['#3399FF', '#66FFFF'],
                  ['#FF3333', '#FF9900'],
                  ['#FF9900', '#FFFF00'],
                  ['#FF3399', '#FF99CC'],
                  ['#00CC33', '#66FF99'],
                  ['#0066FF', '#33CCFF'],
                  ['#6633CC', '#9999FF'],
                  ['#3399FF', '#66FFFF'],
                ]
                var index = params.dataIndex;
                return new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: colorList[index][0]
                }, {
                  offset: 1,
                  color: colorList[index][1]
                }], false)
              },
              barBorderRadius: 7
            }
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#ffffff'
            }
          },
        }],
        grid: {
          left: '0',
          right: '0',
          top: '28',
          bottom: '0',
          containLabel: true
        }
      })
    }

  }
}
</script>
