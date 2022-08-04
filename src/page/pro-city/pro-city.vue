<template>
  <div class="main">
    <div class="main-inner clearfix">
      <div class="left-wrapper fl">
        <div class="main-subox city-model-subox">
          <div class="main-inbox city-model-inbox">
            <div class="inbox-top clearfix">
              <span class="tit">
                3D 作品
                <i id="week-model" v-text="modelData1.total"></i>
              </span>
              <tab-change
                :tabTxt="['总', '月']"
                :tabState="total_mon"
                @tabState_0="tabState1_0"
                @tabState_1="tabState1_1"
              ></tab-change>
            </div>
            <div class="inbox-cont city-model-line-cont">
              <line-chart
                id="multi-line_1"
                class="multi-line_1"
                height="215px"
                :chart-data="total_mon == 0 ? modelData2.unitChart : modelData1.unitChart"
              ></line-chart>
            </div>
            <div class="inbox-cont city-model-pie-cont clearfix" style="margin-top:-30px">
              <multi-pie
                id="multi-pie_1"
                :chartData="total_mon == 0 ? mutiPieData_2 : mutiPieData_1"
                widht="389px"
                height="130px"
              ></multi-pie>
            </div>
            <div class="inbox-cont city-model-bar-cont">
              <bar-chart
                class="bar-chart-3"
                id="bar-chart-3"
                height="214px"
                :chart-data="total_mon == 0 ? cityChart2 : cityChart1"
              ></bar-chart>
            </div>
          </div>
        </div>
        <div class="main-subox city-user-subox">
          <div class="main-inbox city-user-inbox">
            <div class="inbox-top clearfix">
              <span class="tit">
                创新教师
                <i id="user-count" v-text="useNum"></i>
              </span>
            </div>
            <div class="inbox-cont city-user-cont">
              <bar-chart
                class="bar-chart-2"
                id="bar-chart-2"
                height="214px"
                :chart-data="userChart"
              ></bar-chart>
            </div>
          </div>
        </div>
      </div>
      <div class="center-wrapper fl">
        <div class="main-subox count-list clearfix">
          <dl>
            <dd>
              <span>入驻学校</span>
              <i id="school-count" v-text="schoolNum"></i>
            </dd>
            <dd>
              <span>创新教师</span>
              <i id="member-count" v-text="useNum"></i>
            </dd>
            <dd>
              <span>3D 作品</span>
              <i id="model-count" v-text="worksNum"></i>
            </dd>
          </dl>
        </div>
        <div class="main-subox map-subox">
          <div class="main-inbox fl">
            <div class="inbox-top clearfix">
              <span class="tit">全省入驻学校排行</span>
            </div>
            <div class="inbox-cont">
              <map-chart
                class="city-map"
                id="city-map"
                width="500px"
                height="417px"
                :chart-data="dataCityMap"
                :routeName="routeName"
                @clickMap="getProId"
                :geoJSON="proPY"
              ></map-chart>
            </div>
          </div>
          <div class="main-inbox sch-rank fr">
            <div class="inbox-cont">
              <div class="data-list-con">
                <ul class="data-list city-data-list">
                  <li v-for="(item,index) in lists" :key="item.id">
                    <span>
                      <font v-text="index + 1"></font>
                      <a :title="item.name" v-text="item.name"></a>
                    </span>
                    <i>
                      <em v-text="item.total"></em>
                      <em v-text="item.percent + '%'"></em>
                    </i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="main-subox course-subox clearfix">
          <div class="course-inbox main-inbox fl">
            <div class="inbox-top clearfix">
              <span class="tit">
                教学成果
                <i v-text="courseData.courseNum"></i>
              </span>
            </div>
            <div class="inbox-cont">
              <ul class="course-list clearfix">
                <li>
                  <em>学习人次</em>
                  <i v-text="courseData.viewCount"></i>
                </li>
                <li>
                  <em>下载次数</em>
                  <i v-text="courseData.downCount"></i>
                </li>
              </ul>
              <div class="progress-wrap">
                <three-bar
                  class="bar-chart-1"
                  id="bar-chart-1"
                  height="174px"
                  :barData="threeBarData"
                ></three-bar>
              </div>
            </div>
          </div>
          <div class="user-rank-subox fr">
            <div class="main-inbox">
              <div class="inbox-top clearfix">
                <span class="tit">优秀创客</span>
                <div id="tab2" class="tab" data-type="2">
                  <i :class="{ on: module_1 == 0 }" @click="module_1 = 0">数量</i>
                  <i :class="{ on: module_1 == 1 }" @click="module_1 = 1">优秀</i>
                </div>
              </div>
              <div class="inbox-cont">
                <div class="data-list user-data-list clearfix">
                  <li
                    v-for="(item,index) in module_1 == 0 ? memberRankList4 : memberRankList3"
                    :key="item.id"
                  >
                    <span>
                      <font v-text="index + 1"></font>
                      <a>
                        <img :src="item.avatar" :alt="item.nickname" v-cloak />
                        {{ item.nickname }}
                      </a>
                    </span>
                    <i>
                      <em v-text="item.total"></em>
                    </i>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-wrapper fr">
        <div class="main-subox course-subox clearfix">
          <div class="user-inbox main-inbox fl">
            <div class="inbox-top clearfix">
              <span class="tit">优秀教师</span>
            </div>
            <div class="inbox-cont clearfix">
              <div class="normal-user star-teach fl">
                <div class="user-list teach-list">
                  <vue-seamless-scroll :data="teacCreater" :class-option="defaultOption">
                    <div
                      v-for="(item) in teacCreater"
                      :key="item.userid"
                      style="height: 50px;"
                    >
                      <div class="user-item">
                        <a class="user-avatar fl">
                          <img :src="item.avatar" :alt="item.nickname" />
                        </a>
                        <div class="user-info fl">
                          <a>
                            <span v-text="item.nickname"></span>
                          </a>
                          <a>
                            <i v-text="item.school"></i>
                          </a>
                        </div>
                        <div class="line-time fr">
                          <ul>
                            <li>
                              <span v-text="item.modelNum"></span>
                              <i>作品</i>
                            </li>
                            <li>
                              <span v-text="item.courseNum"></span>
                              <i>课程</i>
                            </li>
                            <li>
                              <span v-text="item.newsNum"></span>
                              <i>案例</i>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </vue-seamless-scroll>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-subox work-rank-subox">
          <div class="main-inbox">
            <div class="inbox-top clearfix">
              <span class="tit">学校排行榜</span>
              <tab-change
                :tabTxt="['数量', '优秀']"
                :tabState="module_2"
                @tabState_0="tabState_0"
                @tabState_1="tabState_1"
              ></tab-change>
            </div>
            <div class="inbox-cont work-list-cont">
              <div class="data-list work-data-list">
                <vue-seamless-scroll
                  :data="schoolRank_num"
                  class="seamless-warp"
                  :class-option="defaultOption"
                >
                  <div
                    class
                    v-for="(item,index) in module_2 == 0 ? schoolRank_num : schoolRank_good"
                    :key="index"
                  >
                    <li>
                      <span>
                        <font v-text="index + 1"></font>
                        <a>
                          <img :src="item.thumb" :alt="item.title" v-cloak />
                          {{ item.title }}
                        </a>
                      </span>
                      <i>
                        <em v-text="item.total"></em>
                      </i>
                    </li>
                  </div>
                </vue-seamless-scroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import LineChart from '../../components/lineChart/index'
import BarChart from '../../components/verticalBar/index'
import ThreeBar from '../../components/threeBar/threeBar'
import MapChart from '../../components/mapChart/index'
import TabChange from '../../components/tabChange/index.vue'
import MultiPie from '../../components/pieChart/multiPie.vue'

import commMix from '../../utils/commMix.js'

import bus from '../../assets/js/evnetBus.js'

import service from '../../utils/request'

export default {
  name: "pro-city",
  mixins: [commMix],
  components: {
    LineChart,
    BarChart,
    ThreeBar,
    MapChart,
    TabChange,
    MultiPie
  },
  props: {
    isProvince: {
      type: Boolean,
      // default: false
    }
  },
  data() {
    return {
      total_mon: 0,//总-月切换 0-总 1-月
      module_1: 0,//数量-优秀切换===中 0--数量 1 优秀
      module_2: 0,//数量-优秀切换===右 0--数量 1 优秀
      barTitle: ['培训', '案例', '课程 '],
      schoolNum: '',
      useNum: '',
      worksNum: '',
      userChart: {},//创新教师数据
      threeBarData: {},
      courseData: {},
      teacSwiper: "",
      schoolSwiper: "",
      creater: [],//优秀创客
      teacCreater: [],//优秀教师
      schoolRank_num: [],
      schoolRank_good: [],
      memberRankList4: [],//num
      memberRankList3: [],//good
      modelData2: {//total
        unitChart: {
          dataAxis: {},
          values: []
        },
      },
      modelData1: {//mon
        unitChart: {},
      },
      lists: {},
      cityChart1: {},//mon
      cityChart2: {},//total
      dataCityMap: {
        provinceMapData: [],
        valueList: []
      },
      schoolData: [],
      par_province: "",
      par_city: "",
      proPY: "",
      routeName: "",
      projectTitle: "",
      mutiPieDataTit: ["优秀", "良好", "合格", "鼓励"],
      mutiPieData_1: [],
      mutiPieData_2: []
    }
  },
  computed: {
    defaultOption() {
      return {
        step: 0.5, // 数值越大速度滚动越快
        limitMoveNum: 5, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  mounted() { },
  watch: {
    projectTitle(val) {
      this.changeTitle()
    },
  },
  created() {
    this.routeName = this.$route.name
    if (this.routeName == 'Province') {
      this.getData(this.proPY)
      this.proPY = this.$route.params.id
      this.cityChart1.code = this.$route.params.id
      this.cityChart2.code = this.$route.params.id
      this.userChart.code = this.$route.params.id
    } else {
      this.proPY = this.$route.params.code
      this.getCityData(this.proPY)
      this.getCityName(this.proPY)
    }
    // window.location.reload();
    // if (this.isProvince) {
    //   // console.log("province")
    //   // console.log(this.$route)
    //   // console.log(this.isProvince)

    // } else {
    //   // console.log("city")
    //   // console.log(this.$route)
    //   // console.log(this.isProvince )
    //   this.proPY = this.$route.params.code
    //   this.getCityData(this.proPY)
    //   this.getCityName(this.proPY)
    // }
    // if (this.projectTitle) {
    //   this.changeTitle()
    // }
  },
  methods: {
    getData: function () {
      service({ url: '../../../static/province.json' }).then((data) => {
        var province = data[this.proPY]
        var provinceId = province.id
        document.title = province.name
        this.projectTitle = province.name
        service({
          url: "/list/api.php?m=DataCloud&a=getProvinceCloudData&pid=" + provinceId,
        })
          .then((data) => {
            if (data.status) {
              this.schoolNum = data.schoolCount
              this.useNum = data.memberCount
              this.worksNum = data.modelCount
              this.courseData = data.courseData
              this.threeBarData = this.handleThreeBarData(data.courseData)
              this.modelData1 = data.modelData1
              this.modelData2 = data.modelData2
              this.cityChart1 = this.handleCityChart(data.modelData1.cityChart)
              this.cityChart2 = this.handleCityChart(data.modelData2.cityChart)
              this.mutiPieData_1 = this.handleMutiPie(data.modelData1)
              this.mutiPieData_2 = this.handleMutiPie(data.modelData2)
              this.teacCreater = data.tutorList
              this.schoolRank_num = data.schoolRankList6
              this.schoolRank_good = data.schoolRankList5
              this.memberRankList3 = data.memberRankList3
              this.memberRankList4 = data.memberRankList4
              this.userChart = this.handleUserChart(data.userChart)
              this.userChart.xchange = true
              this.lists = data.lists
              data.lists.forEach((item, i) => {
                this.schoolData.push({
                  name: item.name,
                  value: parseInt(item.total),
                  url: item.url
                })
              })
              setTimeout(() => {
                this.handelCityMapData(this.schoolData)
              }, 0)
            }
          }).catch((err) => {
            console.log(err)
          })
      }).catch((err) => {
        console.log(err)
      })
    },
    getCityData: function (cityid) {
      var that = this
      service({
        url: "/list/api.php?m=DataCloud&a=getCityCloudData&pid=" + cityid
      })
        .then((data) => {
          if (data.status) {
            this.schoolNum = data.schoolCount
            this.useNum = data.memberCount
            this.worksNum = data.modelCount
            this.courseData = data.courseData
            this.threeBarData = that.handleThreeBarData(data.courseData)
            this.modelData1 = data.modelData1
            this.modelData2 = data.modelData2
            this.teacCreater = data.tutorList
            this.schoolRank_num = data.schoolRankList6
            this.schoolRank_good = data.schoolRankList5
            this.memberRankList3 = data.memberRankList3
            this.memberRankList4 = data.memberRankList4
            this.userChart = that.handleUserChart(data.userChart)
            this.mutiPieData_1 = this.handleMutiPie(data.modelData1)
            this.mutiPieData_2 = this.handleMutiPie(data.modelData2)
            this.cityChart1 = this.handleCityChart(data.modelData1.areaChart)
            this.cityChart2 = this.handleCityChart(data.modelData2.areaChart)
            this.userChart.xchange = true
            this.lists = data.lists
            data.lists.forEach((item) => {
              this.schoolData.push({
                name: item.name,
                value: parseInt(item.total),
                url: item.url
              })
            })
            setTimeout(() => {
              this.handelCityMapData(this.schoolData)
            }, 0)
          }
        })
      // })
    },
    changeTitle: function () {
      bus.$emit("add", this.projectTitle)
    },
    // 获取城市名
    getCityName: function (data) {
      service({
        url: "/list/api.php?m=DataCloud&a=getCloudMapStatus&code=" + data
      })
        .then((data) => {
          // var data = data.data
          document.title = data.name
          this.projectTitle = data.name
        })
    },
    getProId: function (params) {
      if (!params.url) {
        alert("本区尚未开通数据云图")
        return false
      }
      if (this.routeName == "Province") {
        var cityCode = params.url.slice(params.url.indexOf("?") + 6)
        this.$router.push({
          path: `/region/city/${cityCode}`,
        })
      } else if (this.routeName == "City") {
        var areaCode = params.url.slice(params.url.indexOf("?") + 6)
        this.$router.push({
          path: `/region/area/${areaCode}`,
        })

      }

    },
    // 教学成果--数据处理 
    handleThreeBarData: function (data) {
      var barData = []
      var bookData = {
        id: 1,
        name: this.barTitle[0],
        total: data.trainTotal,
        per: data.trainPercent + '%'
      }
      var courseData = {
        id: 2,
        name: this.barTitle[1],
        total: data.newsTotal,
        per: data.newsPercent + '%'
      }
      var newsData = {
        id: 3,
        name: this.barTitle[2],
        total: data.courseTotal,
        per: data.coursePercent + '%'
      }
      barData.push(bookData, courseData, newsData)
      return barData
    },
    // 创新教师--数据处理
    handleUserChart: function (data) {
      var userChart = {}
      userChart.dataAxis = []
      userChart.value = []
      userChart.xchange = true

      for (let key in data.dataAxis) {
        userChart.dataAxis.push((data.dataAxis[key]))
      }
      for (let key in data.value) {
        userChart.value.push(data.value[key])
      }
      return userChart
    },
    // 3D作品--柱状图--数据处理 
    handleCityChart: function (data) {
      var cityChart = {}
      cityChart.dataAxis = []
      cityChart.value = []

      for (let key in data.dataAxis) {
        cityChart.dataAxis.push((data.dataAxis[key]))
      }
      for (let key in data.value) {
        cityChart.value.push(data.value[key])
      }
      return cityChart
    },
    // 地图数据处理
    handelCityMapData: function (data) {
      var features = echarts.getMap(this.proPY).geoJson.features;
      var cityList = [],
        cityMapData = [],
        valueList = [];
      var len = features.length
      for (var i = 0; i < len; i++) {
        cityList.push(features[i].properties.name)
      }
      for (var j = 0; j < data.length; j++) {
        valueList.push(data[j].value)
        for (var m = 0; m < cityList.length; m++) {
          var reg = new RegExp(data[j].name);
          if (reg.test(cityList[m])) {
            data[j].name = cityList[m];
            cityMapData[m] = data[j];
          }
        }
      }
      // this.dataCityMap.cityList = cityList
      this.dataCityMap.provinceMapData = cityMapData
      this.dataCityMap.valueList = valueList
      this.dataCityMap.code = ""
    },
    // 
    handleMutiPie: function (data) {
      var mutiPieData = []
      for (let i = 0; i < this.mutiPieDataTit.length; i++) {
        mutiPieData.push({
          id: i,
          name: this.mutiPieDataTit[i],
        })
      }
      Object.assign(mutiPieData[0], {
        num: data.aNum,
        percent: data.aPercent,
      })
      Object.assign(mutiPieData[1], {
        num: data.bNum,
        percent: data.bPercent,
      })
      Object.assign(mutiPieData[2], {
        num: data.cNum,
        percent: data.cPercent,
      })
      Object.assign(mutiPieData[3], {
        num: data.dNum,
        percent: data.dPercent,
      })
      return mutiPieData
    },
    tabState_0: function () {
      this.module_2 = 0
    },
    tabState_1: function () {
      this.module_2 = 1
    },
    tabState1_0: function () {
      this.total_mon = 0
    },
    tabState1_1: function () {
      this.total_mon = 1
    },
  }
}
</script>

<style scoped>
 /*之前是ease-out*/
/* .swiper-container .swiper-wrapper {
  -webkit-transition-timing-function: linear;
  -moz-transition-timing-function: linear;
  -ms-transition-timing-function: linear;
  -o-transition-timing-function: linear;
  transition-timing-function: linear;
} */
.center-wrapper .map-subox .inbox-cont .data-list-con {
  width: 260px;
  overflow: hidden;
}
.center-wrapper .map-subox .inbox-cont .data-list-con .data-list {
  padding-right: 20px;
  height: 420px;
  width: 260px;
  overflow: auto;
}
</style>