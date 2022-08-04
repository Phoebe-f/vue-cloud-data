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
    // setOptions: function ({ attaName, topName, attaData } = {}) {
    setOptions: function (data) {
      var salvProMax = []; //背景按最大值
      for (var i = 0; i < data.attaData.length; i++) {
        salvProMax.push(data.attaData[0]);
      }
      var attackSourcesColor = [
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: '#EB3B5A' },
          { offset: 1, color: '#FE9C5A' },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: '#FA8231' },
          { offset: 1, color: '#FFD14C' },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: '#F7B731' },
          { offset: 1, color: '#FFEE96' },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: '#395CFE' },
          { offset: 1, color: '#2EC7CF' },
        ]),
      ];
      
      // function contains(arr, dst) {
      //   var i = arr.length;
      //   while ((i -= 1)) {
      //     if (arr[i] == dst) {
      //       return i;
      //     }
      //   }
      //   return false;
      // }
      function attackSourcesDataFmt(sData) {

        var sss = [];
        sData.forEach(function (item, i) {
          
          let itemStyle = {
            color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i],
          };
          sss.push({
            value: item,
            itemStyle: itemStyle,
          });
        });
        return sss;
      }

      this.chart.setOption({
        backgroundColor: '#2B2D3C',
        tooltip: {
          show: false,
          backgroundColor: 'rgba(3,169,244, 0.5)', //背景颜色（此时为默认色）
          textStyle: {
            fontSize: 10,
          },
        },
        // color: ['#F7B731'],
        legend: {
          show: false,
          pageIconSize: [12, 12],
          itemWidth: 20,
          itemHeight: 10,
          textStyle: {
            //图例文字的样式
            fontSize: 10,
            color: '#fff',
          },
          selectedMode: false,
        },
        grid: {
          left: '5%',
          right: '2%',
          width: '80%',
          bottom: '2%',
          top: '8%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',

          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisPointer: {
              label: {
                show: true,
                //margin: 30
              },
            },
            pdaaing: [5, 0, 0, 0],
            postion: 'right',
            // data: data.attaName,
            axisLabel: {
              show: false,
              margin: 30,
              fontSize: 10,
              align: 'left',
              padding: [2, 0, 0, 0],
              color: '#000',
              // formatter: function (value, index) {
              //   // index = contains(data.attaName, value) + 1;
              //   // if (index - 1 < 3) {
              //   //   return ['{nt' + index + '|' + index + '}'].join('\n');
              //   // } else {
              //   //   return ['{nt|' + index + '}'].join('\n');
              //   // }
              // },
            },
          },
          {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            axisLabel: {
              textStyle: {
                color: '#a0a5b1',
                fontSize: '12',
              },
            },
            data: data.attaData
          },
          {
            //名称
            type: 'category',
            offset: 10,
            position: 'left',
            axisLine: {
              show: false,
            },
            inverse: false,
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              interval: 0,
              color: ['#fff'],
              verticalAlign: 'center',
              lineHeight: 50,
              fontSize: 12,
            },
            data: attackSourcesDataFmt(data.topName)
          },
        ],
        series: [
          {
            zlevel: 1,
            name: '',
            type: 'bar',
            barWidth: '14px',
            animationDuration: 1500,
            data: attackSourcesDataFmt(data.attaData),
            align: 'center',
            yAxis: "10px",
            itemStyle: {
              normal: {
                barBorderRadius: 13,
              },
            },
            label: {
              show: false,
              fontSize: 10,
              color: '#fff',
              textBorderWidth: 2,
              padding: [2, 0, 0, 0],
            },
          },
          {
            name: '',
            type: 'bar',
            barWidth: 14,
            barGap: '-100%',
            margin: '20',
            data: salvProMax,
            textStyle: {
              //图例文字的样式
              fontSize: 8,
              color: '#fff',
            },
            itemStyle: {
              normal: {
                color: '#142831',
                //width:"100%",
                fontSize: 8,
                barBorderRadius: 30,
              },
            },
          },
        ],
      })
    }
  }
}
</script>