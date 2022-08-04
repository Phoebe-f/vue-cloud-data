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
      // type: Object,
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
    setOptions: function (data) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          left: 'right',
          data: [{
            name: '学生',
            textStyle: {
              color: '#fff'
            }
          }, {
            name: '作品',
            textStyle: {
              color: '#fff'
            }
          }]
        },
        xAxis: [{
          type: 'category',
          data: data.dataAxis,
          axisLine: {
            lineStyle: {
              color: ['#373A4F'],
            }
          },
          axisLabel: {
            color: "#a0a5b1"
          },
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
        series: [
          {
            name: '学生',
            type: 'bar',
            barGap: 0.5,
            barWidth: '14px',
            data: data.series1,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#FF9900'
                }, {
                  offset: 1,
                  color: '#FF3333'
                }]),
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
          },
          {
            name: '作品',
            type: 'bar',
            barWidth: '14px',
            data: data.series2,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#66FF99'
                }, {
                  offset: 1,
                  color: '#00CC33'
                }]),
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
          }

        ],
        grid: {
          left: '0',
          right: '0',
          top: '58',
          bottom: '0',
          containLabel: true
        }
      })
    }
  }
}
</script>