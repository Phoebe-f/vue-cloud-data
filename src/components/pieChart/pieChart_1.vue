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
    setOptions: function ({ likes,views } = {}) {
      this.chart.setOption({
        series: [{
          type: 'pie',
          radius: ['40', '50'],
          hoverAnimation: false,
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = [
                  ['#383d52', '#383d52'],
                  ['#0066FF', '#33CCFF']
                ]
                var index = params.dataIndex;
                return new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: colorList[index][0]
                }, {
                  offset: 1,
                  color: colorList[index][1]
                }], false)
              }
            }
          },
          label: {
            normal: {
              formatter: function (params) {
                var value = params.value > 10000 ? (params.value / 10000).toFixed(0) + '万' : params.value;
                return params.name + ' ' + value + ' ' + params.percent.toFixed(0) + '%';
              },
              color: '#A0A5B1',
              rich: {
                per: {
                  color: '#A0A5B1',
                  padding: [0, 4]
                }
              }
            }
          },
          data: [
            { 'name': '点赞量', 'value':likes },
            { 'name': '浏览量', 'value':views }
          ]
        }]
      })
    }
  }
}
</script>