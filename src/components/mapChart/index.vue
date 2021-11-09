<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }"></div>
</template>

<script>

import * as echarts from 'echarts'
// import { Table } from 'element-ui'
import '../../utils/china.js'

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
    },
    routeName: {
      type: String
    }
  },
  data() {
    return {
      chart: null,
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
      var that = this
      this.chart = echarts.init(document.getElementById(this.id));
      setTimeout(function () {
        that.setOptions(that.chartData)
      }, 800)
      this.chart.on("click", function (params) {
        if (that.routeName == 'home') {
          var province = params.data.pinyin;
          if (province == 'taiwan' || province == 'xianggang' || province == 'aomen')
            return false;
          that.$emit("getProId", province)
        } else if (that.routeName == 'exampleSchool') {
          var province2 = params.data.pid;
          if (province2 == 'taiwan' || province2 == 'xianggang' || province2 == 'aomen')
            return false;
          that.$emit("getProId", province2)
        }
      })
      // this.setOptions(this.chartData)
    },
    setOptions({ provinceMapData, valueList } = {}) {
      this.chart.setOption({
        visualMap: {
          min: 0,
          max: Math.max.apply(null, valueList),
          calculable: false,
          inRange: {
            color: ['#6633CC', '#9999FF', '#0066FF', '#33CCFF', '#00CC33', '#66FF99', '#FF9900', '#FF3333']
          },
          right: 0,
          textStyle: {
            color: '#fff'
          }
        },
        series: {
          type: 'map',
          map: 'china',
          zoom: 1.3,
          layoutCenter: ['50%', '50%'],
          layoutSize: '100%',
          label: {
            normal: {
              show: true,
              textStyle: {
                fontFamily: "Microsoft YaHei",
                color: "#fff",
                fontSize: 10,
              },
            },
            emphasis: {
              show: true,
              textStyle: {
                fontFamily: "Microsoft YaHei",
                color: "#f9ff00",
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#2B2D3C',
              borderWidth: 0.5,
            },
            emphasis: {
              areaColor: '#505684'
            }
          },
          data: provinceMapData,
        }
      })
    }
  }
}
</script>