<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }"></div>
</template>

<script>

import * as echarts from 'echarts'
import service from '../../utils/request'
// import '../../utils/china.js'

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
    },
    geoJSON: {
      type: String
    }
  },
  data() {
    return {
      chart: null,
    }
  },
  created() {

  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    },
    geoJSON: {
      deep: true,
      handler(val) {
        this.loadMap(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
      if (this.routeName == 'home' || this.routeName == "exampleSchool") {
        this.loadMap("china", "../../../static/china.json")
      } else if (this.routeName == "Province") {
        // console.log(this.geoJSON)
        this.loadMap(this.geoJSON, `/list/CloudData/json/province/${this.geoJSON}.json`)
      } else {
        this.loadMap(this.geoJSON, `/list/CloudData/json/city/${this.geoJSON}.json`)
      }
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
      setTimeout(() => {
        this.setOptions(this.chartData)
      }, 1000)
      this.chart.on("click", (params) => {
        this.$emit('clickMap', params.data)
      })
    },
    loadMap: function (name, dataJson) {
      // this.$axios.get(dataJson).then(function (res) {
      service({
        url: dataJson
      }).then(function (res) {
        var data = res
        // var data = res.data
        echarts.registerMap(name, data)
      })
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
          map: this.geoJSON ? this.geoJSON : "china",
          // zoom: this.mapComm.province == "china" ? 1.3 : '',
          // layoutCenter: ['50%', '50%'],
          // layoutSize: '100%',
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