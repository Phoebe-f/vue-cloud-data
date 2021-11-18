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
              <div id="tab1" class="tab">
                <i :class="{ on: total_mon == 0 }" @click="total_mon = 0">总</i>
                <i :class="{ on: total_mon == 1 }" @click="total_mon = 1">月</i>
              </div>
            </div>
            <div class="inbox-cont city-model-line-cont">
              <line-chart
                id="multi-line_1"
                class="multi-line_1"
                height="210px"
                :chart-data="total_mon == 0 ? modelData2.unitChart : modelData1.unitChart"
              ></line-chart>
            </div>
            <div class="inbox-cont city-model-pie-cont clearfix">
              <div class="city-model-pie fl">
                <figure
                  id="good-model-pie"
                  class="pie rendered"
                  data-behavior="pie-chart"
                  style="width: 60px; height: 60px;"
                >
                  <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg">
                    <circle r="30" cx="30" cy="30" />
                    <circle
                      r="15.5"
                      cx="30"
                      cy="30"
                      style="stroke-width: 30px; stroke-dasharray: 2.90283px, 96.7611px;"
                    />
                  </svg>
                </figure>
                <div class="num">
                  优秀
                  <em v-text="total_mon == 0 ? modelData2.aNum : modelData1.aNum"></em>
                </div>
                <div
                  class="percentage"
                  v-text="(total_mon == 0 ? modelData2.aPercent : modelData1.aPercent) + '%'"
                ></div>
              </div>
              <div class="city-model-pie fl">
                <figure
                  id="well-model-pie"
                  class="pie rendered"
                  data-behavior="pie-chart"
                  style="width: 60px; height: 60px;"
                >
                  <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg">
                    <circle r="30" cx="30" cy="30" />
                    <circle
                      r="15.5"
                      cx="30"
                      cy="30"
                      style="stroke-width: 30px; stroke-dasharray: 7.74088px, 96.7611px;"
                    />
                  </svg>
                </figure>
                <div class="num">
                  良好
                  <em v-text="total_mon == 0 ? modelData2.bNum : modelData1.bNum"></em>
                </div>
                <div
                  class="percentage"
                  v-text="(total_mon == 0 ? modelData2.bPercent : modelData1.bPercent) + '%'"
                ></div>
              </div>
              <div class="city-model-pie fl">
                <figure
                  id="pass-model-pie"
                  class="pie rendered"
                  data-behavior="pie-chart"
                  style="width: 60px; height: 60px;"
                >
                  <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg">
                    <circle r="30" cx="30" cy="30" />
                    <circle
                      r="15.5"
                      cx="30"
                      cy="30"
                      style="stroke-width: 30px; stroke-dasharray: 51.2834px, 96.7611px;"
                    />
                  </svg>
                </figure>
                <div class="num">
                  合格
                  <em v-text="total_mon == 0 ? modelData2.cNum : modelData1.cNum"></em>
                </div>
                <div
                  class="percentage"
                  v-text="(total_mon == 0 ? modelData2.cPercent : modelData1.cPercent) + '%'"
                ></div>
              </div>
              <div class="city-model-pie fl">
                <figure
                  id="encoura-model-pie"
                  class="pie rendered"
                  data-behavior="pie-chart"
                  style="width: 60px; height: 60px;"
                >
                  <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg">
                    <circle r="30" cx="30" cy="30" />
                    <circle
                      r="15.5"
                      cx="30"
                      cy="30"
                      style="stroke-width: 30px; stroke-dasharray: 0px, 96.7611px;"
                    />
                  </svg>
                </figure>
                <div class="num">
                  鼓励
                  <em v-text="total_mon == 0 ? modelData2.dNum : modelData1.dNum"></em>
                </div>
                <div
                  class="percentage"
                  v-text="(total_mon == 0 ? modelData2.dPercent : modelData1.dPercent) + '%'"
                ></div>
              </div>
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
                  <div
                    class="swiper-container"
                    id="swiper-container_1"
                    @mouseenter="stopPlay(teacSwiper)"
                    @mouseleave="startPlay(teacSwiper)"
                  >
                    <div class="swiper-wrapper">
                      <div class="swiper-slide" v-for="(item) in teacCreater" :key="item.userid">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-subox work-rank-subox">
          <div class="main-inbox">
            <div class="inbox-top clearfix">
              <span class="tit">学校排行榜</span>
              <div id="tab3" class="tab" data-type="3">
                <i :class="{ on: module_2 == 0 }" @click="module_2 = 0">数量</i>
                <i :class="{ on: module_2 == 1 }" @click="module_2 = 1">优秀</i>
              </div>
            </div>
            <div class="inbox-cont work-list-cont">
              <div class="data-list work-data-list">
                <div
                  class="swiper-container"
                  id="swiper-container_2"
                  @mouseenter="stopPlay(schoolSwiper)"
                  @mouseleave="startPlay(schoolSwiper)"
                >
                  <div class="swiper-wrapper">
                    <div
                      class="swiper-slide"
                      height="40px"
                      v-for="(item,index) in module_2 == 0 ? schoolRank_num : schoolRank_good"
                      :key="item.id"
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
                  </div>
                </div>
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
import LineChart from '../components/lineChart/index'
import BarChart from '../components/verticalBar/index'
import ThreeBar from '../components/threeBar/threeBar'
import MapChart from '../components/mapChart/index'
// import '../utils/china.js'

import commMix from '../utils/commMix.js'



export default {
  mixins: [commMix],
  components: {
    LineChart,
    BarChart,
    ThreeBar,
    MapChart
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
        provinceMapData: [
          { name: '成都市', value: 931, url: '' },
          { name: '自贡市', value: 105, url: '' },
          { name: '攀枝花市', value: 57, url: '' },
          { name: '泸州市', value: 249, url: '' },
          { name: '德阳市', value: 113, url: '' },
          { name: '绵阳市', value: 182, url: '' },
          { name: '广元市', value: 153, url: '' },
          { name: '遂宁市', value: 68, url: '' },
          { name: '内江市', value: 86, url: '' },
          { name: '乐山市', value: 77, url: '' },
        ],
        valueList: [174, 50, 41, 37, 29, 10, 8, 5]
      },
      schoolData: [],
      par_province: "",
      par_city: "",
      proPY: ""
    }
  },
  mounted() {


  },
  created() {
    this.getData(this.proPY)
    this.proPY = this.$route.params.id
    this.cityChart1.code = this.$route.params.id
    this.cityChart2.code = this.$route.params.id
    this.userChart.code = this.$route.params.id
  },
  methods: {
    getData: function () {
      var that = this
      this.$axios.get('../../static/province.json').then(function (data) {
        var data = data.data
        var province = data[that.proPY]
        var provinceId = province.id
        document.title = province.name
        that.$axios.get("/list/api.php?m=DataCloud&a=getProvinceCloudData", { params: { pid: provinceId } })
          .then(function (data) {
            if (data.status) {
              var data = data.data
              // console.log(data.lists)
              that.schoolNum = data.schoolCount
              that.useNum = data.memberCount
              that.worksNum = data.modelCount
              that.courseData = data.courseData
              that.threeBarData = that.handleThreeBarData(data.courseData)
              that.modelData1 = data.modelData1
              that.modelData2 = data.modelData2
              that.cityChart1 = that.handleCityChart(data.modelData1.cityChart)
              that.cityChart2 = that.handleCityChart(data.modelData2.cityChart)
              that.teacCreater = data.tutorList
              that.schoolRank_num = data.schoolRankList6
              that.schoolRank_good = data.schoolRankList5
              that.memberRankList3 = data.memberRankList3
              that.memberRankList4 = data.memberRankList4
              that.userChart = that.handleUserChart(data.userChart)
              that.userChart.xchange = true
              that.lists = data.lists
              data.lists.forEach(function (item, i) {
                that.schoolData.push({
                  name: item.name,
                  value: parseInt(item.total),
                  url: item.url
                })
              })
              that.handelCityMapData(that.schoolData)
              that.$nextTick(function () {//两个轮播
                that.teacSwiper = that.swiperFun("#swiper-container_1", 70, 1800)
                that.schoolSwiper = that.swiperFun("#swiper-container_2", 40, 1800)
              })
            }
          })
      })
    },
    getCityData: function (cityid) {
      var that = this
      // this.$axios.get('../../static/province.json').then(function (data) {
      that.$axios.get("/list/api.php?m=DataCloud&a=getCityCloudData&pid=", { params: { pid: cityid } })
        .then(function (data) {
          if (data.status) {
            var data = data.data
            console.log(data)
            that.schoolNum = data.schoolCount
            that.useNum = data.memberCount
            that.worksNum = data.modelCount
            that.courseData = data.courseData
            that.threeBarData = that.handleThreeBarData(data.courseData)
            that.modelData1 = data.modelData1
            that.modelData2 = data.modelData2
            // that.cityChart1 = that.handleCityChart(data.modelData1.cityChart)
            // that.cityChart2 = that.handleCityChart(data.modelData2.cityChart)
            that.teacCreater = data.tutorList
            that.schoolRank_num = data.schoolRankList6
            that.schoolRank_good = data.schoolRankList5
            that.memberRankList3 = data.memberRankList3
            that.memberRankList4 = data.memberRankList4
            that.userChart = that.handleUserChart(data.userChart)
            that.userChart.xchange = true
            that.lists = data.lists
            data.lists.forEach(function (item, i) {
              that.schoolData.push({
                name: item.name,
                value: parseInt(item.total),
                url: item.url
              })
            })
            that.handelCityMapData(that.schoolData)
            that.$nextTick(function () {//两个轮播
              that.teacSwiper = that.swiperFun("#swiper-container_1", 70, 1800)
              that.schoolSwiper = that.swiperFun("#swiper-container_2", 40, 1800)
            })
          }
        })
      // })
    },
    getProId: function (params) {
      console.log(params)
      if (!params.data.url) {
        alert("本区尚未开通数据云图")
        return false
      }
      var cityCode = params.data.url.slice(params.data.url.indexOf("?") + 6)
      console.log(cityCode)
      this.getCityData(cityCode)
      //  this.$router.push({
      //   path: `${params.data.name}`,
      // })

      // this.proQueryData = data
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

  }
}
</script>

<style scoped>
.swiper-container .swiper-wrapper {
  -webkit-transition-timing-function: linear; /*之前是ease-out*/
  -moz-transition-timing-function: linear;
  -ms-transition-timing-function: linear;
  -o-transition-timing-function: linear;
  transition-timing-function: linear;
}
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