<template>
  <!-- <app-header :title="title"></app-header> -->
  <div class="main">
    <div class="main-inner clearfix">
      <div class="left-wrapper fl">
        <div class="main-subox">
          <div class="main-inbox">
            <div class="inbox-top clearfix">
              <span class="tit">
                3D One 近7日使用人次
                <i v-text="sevenDays.total"></i>
              </span>
              <div class="tab">
                今日使用人次
                <a v-text="sevenDays.today"></a>
              </div>
            </div>
            <div class="inbox-cont">
              <div class="chart">
                <bar-chart
                  class="bar-chart"
                  id="bar-chart"
                  width="389px"
                  height="214px"
                  :chart-data="sevenDays"
                ></bar-chart>
              </div>
            </div>
          </div>
        </div>
        <div class="main-subox">
          <div class="main-inbox">
            <div class="inbox-top clearfix">
              <span class="tit">
                3D One 近五月使用人次
                <i v-text="totalUse"></i>
              </span>
            </div>
            <div class="inbox-cont">
              <line-chart
                id="line-chart"
                class="line-chart"
                :chart-data="lineChartData"
                width="389px"
                height="214px"
              ></line-chart>
            </div>
          </div>
        </div>
        <div class="main-subox">
          <div class="main-inbox">
            <div class="inbox-top clearfix">
              <span class="tit">
                3D One 总使用人次
                <i id="year-use" v-text="fiveYears.total"></i>
              </span>
            </div>
            <div class="inbox-cont">
              <multihor-bar
                id="multihor-bar"
                class="multihor-bar"
                width="389px"
                height="200px"
                :chart-data="fiveYears.multiBarData"
              ></multihor-bar>
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
              <span>软件使用人次</span>
              <i id="person-count" v-text="useNum"></i>
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
              <span class="tit">全国省市数据</span>
            </div>
            <div class="inbox-cont">
              <map-chart
                id="map-chart"
                class="map-chart"
                width="580px"
                height="420px"
                :chart-data="mapChange == 0 ? province3 : mapChange == 1 ? province4 : province5"
                :routeName="routeName"
                @clickMap="getProId"
              ></map-chart>
            </div>
          </div>
          <div class="main-inbox fr">
            <div class="inbox-top clearfix">
              <div id="tab1" class="tab" data-type="1">
                <i data-tab="3" :class="{ on: mapChange == 0 }" @click="mapChange = 0">学校</i>
                <i data-tab="4" :class="{ on: mapChange == 1 }" @click="mapChange = 1">作品</i>
                <i data-tab="5" :class="{ on: mapChange == 2 }" @click="mapChange = 2">教师</i>
              </div>
            </div>
            <template v-if="mapChange == 0">
              <div class="inbox-cont province-data-cont">
                <ul class="data-list province-data-list">
                  <li
                    v-for="item in mapDataPage(province3Page, page3Params)"
                    :key="item.id"
                    :class="{ first: item.ranking < 4 }"
                  >
                    <span>
                      <font v-text="item.ranking"></font>
                      <a v-text="item.name"></a>
                    </span>
                    <i>
                      <em v-text="item.value"></em>
                      <em v-text="item.percent + '%'"></em>
                    </i>
                  </li>
                </ul>
                <div class="page">
                  <a class="prev" @click="prevPage(province3Page, page3Params)">
                    <img src="../assets/images/preve.png" title="上一页" />
                  </a>
                  <a class="next" @click="nextPage(province3Page, page3Params)">
                    <img src="../assets/images/next.png" title="下一页" />
                  </a>
                </div>
              </div>
            </template>
            <template v-else-if="mapChange == 1">
              <div class="inbox-cont province-data-cont">
                <ul class="data-list province-data-list">
                  <li
                    v-for="item in mapDataPage(province4Page, page4Params)"
                    :key="item.id"
                    :class="{ first: item.ranking < 4 }"
                  >
                    <span>
                      <font v-text="item.ranking"></font>
                      <a v-text="item.name"></a>
                    </span>
                    <i>
                      <em v-text="item.value"></em>
                      <em v-text="item.percent + '%'"></em>
                    </i>
                  </li>
                </ul>
                <div class="page">
                  <a class="prev" @click="prevPage(province4Page, page4Params)">
                    <img src="../assets/images/preve.png" title="上一页" />
                  </a>
                  <a class="next" @click="nextPage(province4Page, page4Params)">
                    <img src="../assets/images/next.png" title="下一页" />
                  </a>
                </div>
              </div>
            </template>
            <template v-else-if="mapChange == 2">
              <div class="inbox-cont province-data-cont">
                <ul class="data-list province-data-list">
                  <li
                    v-for="item in mapDataPage(province5Page, page5Params)"
                    :key="item.id"
                    :class="{ first: item.ranking < 4 }"
                  >
                    <span>
                      <font v-text="item.ranking"></font>
                      <a v-text="item.name"></a>
                    </span>
                    <i>
                      <em v-text="item.value"></em>
                      <em v-text="item.percent + '%'"></em>
                    </i>
                  </li>
                </ul>
                <div class="page">
                  <a class="prev" @click="prevPage(province5Page, page5Params)">
                    <img src="../assets/images/preve.png" title="上一页" />
                  </a>
                  <a class="next" @click="nextPage(province5Page, page5Params)">
                    <img src="../assets/images/next.png" title="下一页" />
                  </a>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="main-subox course-subox clearfix">
          <div class="course-inbox main-inbox fl">
            <div class="inbox-top clearfix">
              <span class="tit">
                教学成果
                <i v-text="course.courseNum"></i>
              </span>
            </div>
            <div class="inbox-cont">
              <ul class="course-list clearfix">
                <li>
                  <em>学习人次</em>
                  <i v-text="course.viewCount"></i>
                </li>
                <li>
                  <em>下载次数</em>
                  <i v-text="course.downCount"></i>
                </li>
              </ul>
              <div class="three-bar-wrapper">
                <three-bar :barData="threeData"></three-bar>
              </div>
            </div>
          </div>
          <div class="contest-inbox main-inbox fr">
            <div class="inbox-top clearfix">
              <span class="tit">
                大赛
                <i v-text="contest.total"></i>
              </span>
            </div>
            <div class="inbox-cont">
              <ul class="contest-list clearfix">
                <li>
                  <h5>全国大赛</h5>
                  <p v-text="contest.national"></p>
                </li>
                <li>
                  <h5>省市大赛</h5>
                  <p v-text="contest.province"></p>
                </li>
                <li>
                  <h5>官方大赛</h5>
                  <p v-text="contest.official"></p>
                </li>
              </ul>
              <dl class="contest-data clearfix">
                <dd>
                  <p v-text="contest.school"></p>
                  <h6>参赛学校</h6>
                </dd>
                <dd>
                  <p v-text="contest.member"></p>
                  <h6>参赛队伍</h6>
                </dd>
                <dd>
                  <p v-text="contest.tuzhi"></p>
                  <h6>参赛作品</h6>
                </dd>
                <dd>
                  <p v-text="contest.votes"></p>
                  <h6>投票总数</h6>
                </dd>
                <dd>
                  <p v-text="contest.prize"></p>
                  <h6>获奖作品</h6>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div class="right-wrapper fl">
        <div class="main-subox model-subox">
          <div class="main-inbox">
            <div class="inbox-top clearfix">
              <span class="tit">
                3D 作品
                <i id="total-model">2451780</i>
              </span>
              <div id="tab2" class="tab">
                <i :class="{ on: total_mon == 0 }" @click="total_mon = 0">总</i>
                <i :class="{ on: total_mon == 1 }" @click="total_mon = 1">月</i>
              </div>
            </div>
            <div class="inbox-cont model-line-cont">
              <div class="model-line-chart">
                <line-chart
                  id="multi-line"
                  class="multi-line"
                  height="250px"
                  :chart-data="total_mon == 0 ? (modelData2.unitChart) : (modelData1.unitChart)"
                ></line-chart>
              </div>
            </div>
            <div class="inbox-cont model-pie-cont clearfix">
              <pie-top
                id="pie-top"
                class="pie-top"
                :chart-data="total_mon == 0 ? modelData2 : modelData1"
                height="160px"
              ></pie-top>
              <pie-bottom
                id="pie-bottom"
                class="pie-bottom"
                height="130px"
                :chart-data="total_mon == 1 ? modelData2 : modelData1"
              ></pie-bottom>
            </div>
          </div>
        </div>
        <div class="main-subox user-subox">
          <div class="main-inbox user-inbox">
            <div class="inbox-top clearfix">
              <span class="tit">最新动态</span>
            </div>
            <div class="inbox-cont clearfix">
              <div class="active-user fl">
                <div class="user-list" id="active-user">
                  <div
                    class="user-item"
                    v-for="item,index in dynamicRank.rankList "
                    :key="item.userid"
                  >
                    <a>
                      <img :src="item.avatar" :alt="item.nickname" />
                      <span v-text="item.nickname"></span>
                      <i v-cloak>活跃No.{{ index + 1 }} 月作品{{ item.total }}</i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="normal-user fl">
                <div class="user-list" v-if="dynamicRank.dynamics">
                  <div
                    class="swiper-container"
                    id="swiper-container_3"
                    @mouseenter="stopPlay(userSwiper)"
                    @mouseleave="startPlay(userSwiper)"
                  >
                    <div class="swiper-wrapper">
                      <div
                        class="swiper-slide"
                        v-for="(item ,index) in dynamicRank.dynamics"
                        :key="index"
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
                              <i v-cloak>发布了作品{{ item.title }}</i>
                            </a>
                          </div>
                          <div class="line-time fr">
                            <i v-text="item.addtime"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="user-list" v-else>暂无更多数据</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
window._mapData = {
  province: "china",
  proNameZh: "中国",
  proJson: "../../../static/china.json",
}
import * as echarts from 'echarts'

import BarChart from '../components/verticalBar/index'
import LineChart from '../components/lineChart/index'
import MultihorBar from '../components/multiHorBar/index'
import ThreeBar from '../components/threeBar/threeBar'
import PieBottom from '../components/pieChart/pieChart_1'
import PieTop from '../components/pieChart/pieChart_2'
import MapChart from '../components/mapChart/index'
// import '../utils/china.js'

import commMix from '../utils/commMix.js'


export default {
  mixins: [commMix],
  components: {
    // AppHeader,
    BarChart,
    LineChart,
    MultihorBar,
    ThreeBar,
    // MultiLine,
    PieBottom,
    PieTop,
    MapChart
  },
  data() {
    return {
      totalUse: 0,
      mapName: "china",
      chinaChartData: {},
      barTitle: ['书籍', '案例', '课程 '],
      sevenDays: {},
      lineChartData: {
        dataAxis: {},
        values: []
      },
      fiveYears: {
        multiBarData: {
          attaData: [],
          topName: []
        }
      },
      course: {},
      threeData: {},
      contest: {},
      modelData1: {},
      modelData2: {
        unitChart: {
          dataAxis: {},
          values: []
        }
      },
      dynamicRank: {
        unitChart: {
          dataAxis: {},
          values: []
        }
      },
      schoolNum: '',
      useNum: '',
      worksNum: '',
      total_mon: 0,//切换总-月
      userSwiper: '',
      title: { "name": "3D One 数据云图" },
      mapChange: 0,//0--学校 1--作品 2--教师
      province3: {},// 全国数据图--学校
      province4: {},//全国数据图--作品
      province5: {},//全国数据图--教师
      province3Page: [],
      province4Page: [],
      province5Page: [],
      page3Params: {
        total: 3,
        pageSiz: 10,
        pageNo: 1
      },
      page4Params: {
        total: 3,
        pageSiz: 10,
        pageNo: 1
      },
      page5Params: {
        total: 3,
        pageSiz: 10,
        pageNo: 1
      },
      routeName: '',//路由名

    }
  },
  created() {

    this.getData()
    this.mapDataPage(this.province3Page, this.page3Params)
    this.routeName = this.$route.name
  },
  mounted() {

  },
  // 
  methods: {
    getData: function () {
      var that = this
      // https://www.i3done.com/api.php?m=DataCloud&a=getCloudData
      this.$axios.get("/list/api.php?m=DataCloud&a=getCloudData")
        .then((data) => {
          console.log("home")
          if (data.status) {
            var data = data.data
            this.schoolNum = data.schoolCount
            this.useNum = data.personCount
            this.worksNum = data.modelCount
            this.sevenDays = data.sevenDays
            this.sevenDays.code = ''
            this.sevenDays.xchaneg = true
            this.lineChartData = this.handleLineChartData(data.fiveWeeks)
            this.totalUse = this.handelTotalUse(data.fiveWeeks)
            this.fiveYears = this.handleMultiBarData(data.fiveYears)
            this.course = data.course
            this.threeData = this.handleThreeBarData(data.course)
            this.contest = data.contest
            this.modelData1 = data.modelData1
            this.modelData1.unitChart.state = true
            this.modelData2 = data.modelData2
            this.modelData2.unitChart.state = true
            this.dynamicRank = data.dynamicRank
            this.province3 = this.handleMapData(data.province3);
            this.province4 = this.handleMapData(data.province4);
            this.province5 = this.handleMapData(data.province5);
            this.province3Page = data.province3
            this.province4Page = data.province4
            this.province5Page = data.province5
            this.$nextTick(function () {//轮播
              this.userSwiper = this.swiperFun('#swiper-container_3', 50, 1800)
            })
          }
        })
    },
    //获取省份拼音
    getProId: function (params) {
      var province = params.data.pinyin
      if (province == 'taiwan' || province == 'xianggang' || province == 'aomen')
        return false;
      this.$router.push({
        path: `province/${province}`,
      })
    },
    handelTotalUse: function (data) {
      var totalUse = 0;
      for (let key in data.value) {
        totalUse += parseInt(data.value[key])
      }
      return totalUse
    },
    // 教学成果数据处理 
    handleThreeBarData: function (data) {
      // var barTitle = ['书籍', '案例', '课程 ']
      var barData = []
      var bookData = {
        id: 1,
        name: this.barTitle[0],
        total: data.bookTotal,
        per: data.bookPercent + '%'
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
    // line-chart----handelData
    handleLineChartData: function (data) {
      var lineData = {}
      var arr = []
      arr.push(data.value)
      lineData.dataAxis = data.dataAxis
      lineData.values = arr
      return lineData
    },
    // multiBarData----handelData
    handleMultiBarData: function (data) {
      let fiveYears = {}
      fiveYears.maximum = data.maximum
      fiveYears.total = data.total
      fiveYears.multiBarData = {
        attaData: [],
        topName: []
      }
      data.list.forEach(function (item, index) {
        fiveYears.multiBarData.topName.push(item.name)
        fiveYears.multiBarData.attaData.push(item.value)
      });
      // this.testmultiBarData = fiveYears.multiBarData
      return fiveYears
    },
    // 地图数据处理
    handleMapData: function (data) {
      var features = echarts.getMap('china').geoJson.features;
      var provinceData = {}
      var provinceList = [],
        valueList = [],
        provinceMapData = []
      var len = features.length
      for (let i = 0; i < len; i++) {
        provinceList.push(features[i].properties.name)
      }
      for (let j = 0; j < data.length; j++) {
        valueList.push(data[j].value)
        for (let m = 0; m < provinceList.length; m++) {
          if (data[j].name == provinceList[m]) {
            provinceMapData[m] = data[j];
          }
        }
      }
      provinceData.provinceList = provinceList
      provinceData.valueList = valueList
      provinceData.provinceMapData = provinceMapData
      return provinceData
    },
    // 地图数据分页处理
    mapDataPage: function (data, page) {
      var start = (page.pageNo - 1) * page.pageSiz;
      var end = start + page.pageSiz;
      var pageList = data.slice(start, end)
      return pageList
    },
    // 分页按键
    nextPage: function (data, page) {
      if (page.pageNo <= page.total) {
        page.pageNo++
        this.mapDataPage(data, page)
      }
    },
    prevPage: function (data, page) {
      if (page.pageNo > 1) {
        page.pageNo--
        this.mapDataPage(data, page)
      }
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
</style>
