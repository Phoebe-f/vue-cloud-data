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
    setOptions({ dataAxis, useValue } = {}) {
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
          data: useValue,
          type: 'line',
          smooth: true,
          symbolSize: 4,
          lineStyle: {
            color: '#1473FF',
            width: 2
          },
          itemStyle: {
            color: '#fff',
            borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#33CCFF'
            }, {
              offset: 1,
              color: '#0066FF'
            }])
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
            backgroundColor: "#2B2D3C",
            opacity:1,
            color:"#fff",
            formatter: function (params) {
              var value;
              value = params.value > 10000 ? (params.value / 10000).toFixed(2) + '万' : params.value;
              return value;
            }
          }
        }],
        grid: {
          left: '0',
          right: '25',
          bottom: '0',
          containLabel: true
        }
      })
    },
  }
}
</script>