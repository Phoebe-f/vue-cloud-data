<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" :mapComm="mapComm"></div>
</template>

<script>

import * as echarts from 'echarts'
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
    mapComm: {
      type:Object
    }
  },
  data() {
    return {
      chart: null,
      proJson: "",
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
      if (this.routeName == 'home') {
        console.log("P")
        this.loadMap("china", "../../../static/china.json")
        // this.loadMap(this.mapComm.province, "../../../static/china.json")
      } else {
        this.loadMap('shanghai', "../../../static/province/shanghai.json")

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
      var provinces = {
        '上海': '../../../static/province/shanghai.json',
        '河北': '../../../static/province/hebei.json',
        '山西': '../../../static/province/shanxi.json',
        '内蒙古': '.../../../static/province/neimenggu.json',
        '辽宁': '../../../static/province/liaoning.json',
        '吉林': '../../../static/province/jilin.json',
        '黑龙江': '../../../static/province/heilongjiang.json',
        '江苏': '../../../static/province/jiangsu.json',
        '浙江': '../../../static/province/zhejiang.json',
        '安徽': '../../../static/province/anhui.json',
        '福建': '../../../static/province/fujian.json',
        '江西': '../../../static/province/jiangxi.json',
        '山东': '../../../static/province/shandong.json',
        '河南': '../../../static/province/henan.json',
        '湖北': '../../../static/province/hubei.json',
        '湖南': '../../../static/province/hunan.json',
        '广东': '../../../static/province/guangdong.json',
        '广西': '../../../static/province/guangxi.json',
        '海南': '../../../static/province/hainan.json',
        '四川': '../../../static/province/sichuan.json',
        '贵州': '../../../static/province/guizhou.json',
        '云南': '../../../static/province/yunnan.json',
        '西藏': '../../../static/province/xizang.json',
        '陕西': '../../../static/province/shanxi1.json',
        '甘肃': '../../../static/province/gansu.json',
        '青海': '../../../static/province/qinghai.json',
        '宁夏': '../../../static/province/ningxia.json',
        '新疆': '../../../static/province/xinjiang.json',
        '北京': '../../../static/province/beijing.json',
        '天津': '../../../static/province/tianjin.json',
        '重庆': '../../../static/province/chongqing.json',
        '香港': '../../../static/province/xianggang.json',
        '澳门': '../../../static/province/aomen.json',
        '台湾': '../../../static/province/taiwan.json'
      };
      var that = this
      this.chart = echarts.init(document.getElementById(this.id));
      setTimeout(function () {
        that.setOptions(that.chartData)
      }, 800)
      this.chart.on("click", function (params) {
        if (that.routeName == 'home') {
          var province = params.data.pinyin;
          var proNameZh = params.data.name
          var proJson = provinces[proNameZh]
          var proQueryData = {}
          proQueryData.province = province
          proQueryData.proNameZh = proNameZh
          proQueryData.proJson = proJson

          // this.mapName = params.data.name
          // this.proJson = provinces[proNameZh]
          if (province == 'taiwan' || province == 'xianggang' || province == 'aomen')
            return false;
          // that.$emit("getProId", province)
          that.$emit("getProId", proQueryData)
          // that.loadMap(proNameZh, this.proJson)
        } else if (that.routeName == 'exampleSchool') {
          var province2 = params.data.pid;
          if (province2 == 'taiwan' || province2 == 'xianggang' || province2 == 'aomen')
            return false;
          that.$emit("getProId", province2)
        }
      })
      // this.setOptions(this.chartData)
    },
    loadMap: function (name, dataJson) {
      this.axios.get(dataJson).then(function (res) {
        var data = res.data
        echarts.registerMap(name, data)
      })
    },
    setOptions({ provinceMapData, valueList } = {}) {
      // console.log("mapComm" + this.mapComm.province)
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
          map: "china",
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