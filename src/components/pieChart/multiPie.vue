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
      var colors = [['#389af4', '#383D52'], ['#6633CC', '#383D52'], ['#0066FF', '#383D52'], ['#F94B6C', '#383D52']]
      var titleArr = [], seriesArr = [];
      data.forEach(function (item, index) {
        titleArr.push(
          {
            text: item.name + '  ' + item.num,
            left: index * 25 + 13 + '%',
            top: '80%',
            textAlign: 'center',
            textStyle: {
              fontWeight: 'normal',
              fontSize: '14',
              color: "#a0a5b1",
              textAlign: 'center',
            },
          }
        );
        seriesArr.push(
          {
            name: item.name,
            type: 'pie',
            clockWise: true,
            radius: ['40%', '50%'],
            itemStyle: {
              normal: {
                color: colors[index][0],
                shadowColor: colors[index][0],
                shadowBlur: 0,
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
              }
            },
            hoverAnimation: false,
            center: [index * 25 + 13 + '%', '35%'],
            data: [{
              value: item.percent,
              label: {
                normal: {
                  formatter: function (params) {
                    return item.percent + '%';
                  },
                  position: 'center',
                  show: true,
                  textStyle: {
                    fontSize: '13',
                    fontWeight: 'bold',
                    color: "#fff"
                  }
                }
              },
            }, 
            {
              value: 100 - item.percent,
              name: 'invisible',
              itemStyle: {
                normal: {
                  color: colors[index][1]
                },
                emphasis: {
                  color: colors[index][1]
                }
              }
            }
            ]
          }
        )
      });
      this.chart.setOption({
        title: titleArr,
        series: seriesArr
      })
    }
  }
}
</script>