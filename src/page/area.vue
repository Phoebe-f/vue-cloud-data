<template>
  <div class="main">
    <div class="main-inner clearfix">
      <div class="left-wrapper fl">
        <div class="main-subox city-model-subox">
          <div class="main-inbox city-model-inbox">
            <div class="inbox-top clearfix">
              <span class="tit">
                3D 作品
                <i v-text="tabState == 0 ? total_0 : total_1"></i>
              </span>
              <tab-change
                :tabTxt="['总', '月']"
                :tabState="tabState"
                @tabState_0="tabState_0"
                @tabState_1="tabState_1"
              ></tab-change>
            </div>
            <div class="inbox-cont city-model-line-cont">
              <line-chart
                :chartData="tabState == 0 ? unitChartData_0 : unitChartData_1"
                width="389px"
                height="210px"
              ></line-chart>
            </div>
            <div class="inbox-cont city-model-pie-cont clearfix">
              <multi-pie
                id="multi-pie_1"
                :chartData="tabState == 0 ? mutiPieData_2 : mutiPieData_1"
                widht="389px"
                height="130px"
              ></multi-pie>
            </div>
            <div class="inbox-cont city-model-bar-cont">
              <pie-sin
                :chart-data="tabState == 0 ? pieChart_0 : pieChart_1"
                id="area-pie"
                width="389px"
                height="214px"
              ></pie-sin>
            </div>
          </div>
        </div>
        <div class="main-subox">
          <div class="main-inbox">
            <div class="inbox-top clearfix">
              <span class="tit">作品创作类型 TOP5</span>
            </div>
            <div class="inbox-cont">
              <hor-bar id="area-hor-bar" :chartData="topFiveStr" width="389px" height="200px"></hor-bar>
            </div>
          </div>
        </div>
      </div>
      <div class="center-wrapper fl">
        <div class="main-subox count-list clearfix">
          <dl>
            <dd>
              <span>入驻学校</span>
              <i v-text="schoolCount"></i>
            </dd>
            <dd>
              <span>创客师生</span>
              <i v-text="memberCount"></i>
            </dd>
            <dd>
              <span>3D 作品</span>
              <i v-text="modelCount"></i>
            </dd>
          </dl>
        </div>
        <div class="main-subox ratio-subox ratio-pie-subox">
          <div class="main-inbox">
            <div class="inbox-top clearfix">
              <span class="tit">用户比例</span>
            </div>
            <div class="inbox-cont ratio-pie-cont">
              <pie-chart id="areaPie_1" :chartData="pieData_1" width="290px" height="150px"></pie-chart>
              <pie-chart id="areaPie_2" :chartData="pieData_2" width="290px" height="150px"></pie-chart>
              <pie-chart id="areaPie_3" :chartData="pieData_3" width="290px" height="150px"></pie-chart>
            </div>
          </div>
        </div>
        <div class="main-subox ratio-subox ratio-bar-subox">
          <div class="main-inbox">
            <div class="inbox-top clearfix">
              <span class="tit">用户年级比例</span>
            </div>
            <div class="inbox-cont ratio-bar-cont">
              <double-bar id="double-bar" :chartData="ratioBarData" width="862px" height="216px"></double-bar>
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
                <three-bar :barData="threeBarData"></three-bar>
              </div>
            </div>
          </div>
          <div class="user-rank-subox fr">
            <div class="main-inbox">
              <div class="inbox-top clearfix">
                <span class="tit">优秀创客</span>
                <!-- <div id="tab2" class="tab" data-type="2"><i class="on" data-tab="4">数量</i><i data-tab="3">优秀</i></div> -->
              </div>
              <div class="inbox-cont">
                <ul class="data-list user-data-list clearfix">
                  <li v-for="item,index in goodCreater" :key="index">
                    <span>
                      <font v-text="index + 1"></font>
                      <a>
                        <img :src="item.avatar" :alt="item.nickname" />
                        {{ item.nickname }}
                      </a>
                    </span>
                    <i>
                      <em v-text="item.total"></em>
                    </i>
                  </li>
                </ul>
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
                  <vue-seamless-scroll :data="tutorStr" :class-option="defaultOption">
                    <div
                      class="user-item"
                      v-for="item,index in tutorStr"
                      :key="index"
                      style="height: 50px;"
                    >
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
                  </vue-seamless-scroll>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-subox work-rank-subox">
          <div class="main-inbox">
            <div class="inbox-top clearfix">
              <span class="tit">学校作品榜</span>
              <!-- <div id="tab3" class="tab" data-type="3"><i class="on" data-tab="6">数量</i><i data-tab="5">优秀</i></div> -->
            </div>
            <div class="inbox-cont work-list-cont">
              <ul class="data-list work-data-list">
                <vue-seamless-scroll :data="tutorStr" :class-option="defaultOption">
                  <li v-for="item,index in schoolRankStr" :key="index" style="height: 25px;">
                    <span>
                      <font v-text="index + 1"></font>
                      <a>
                        <img :src="item.thumb" :alt="item.title" />
                        {{ item.title }}
                      </a>
                    </span>
                    <i>
                      <em v-text="item.total"></em>
                    </i>
                  </li>
                </vue-seamless-scroll>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabChange from '../components/tabChange/index.vue'
import LineChart from '../components/lineChart/index.vue'
import PieSin from '../components/pieChart/pieChart_1.vue'
import PieChart from '../components/pieChart/pieChart.vue'
import DoubleBar from '../components/doubleBar/index.vue'
import ThreeBar from '../components/threeBar/threeBar.vue'
import HorBar from '../components/multiHorBar/index.vue'
import multiPie from '../components/pieChart/multiPie.vue'

import service from '../utils/request'
import bus from '../assets/js/evnetBus'

export default {
  name: "Area",
  components: {
    TabChange,
    LineChart,
    PieSin,
    PieChart,
    DoubleBar,
    ThreeBar,
    HorBar,
    multiPie
  },
  data() {
    return {
      tabState: 0,
      projectTitle: "",
      areaID: "",
      total_1: "",
      total_0: "",
      unitChartData_1: {
        dataAxis: [],
        values: []
      },
      unitChartData_0: {
        dataAxis: [],
        values: []
      },
      pieChart_1: {},
      pieChart_0: {},
      schoolCount: "",
      memberCount: "",
      modelCount: "",
      pieData_1: {
        chartData: [],
        pieChartOpt: {
          title: {
            text: '年级比例'
          },
          colorList: [
            ['#FF3333', '#FF9900'],
            ['#0066FF', '#33CCFF'],
            ['#3399FF', '#66FFFF']
          ]
        }
      },
      pieData_2: {
        chartData: [],
        pieChartOpt: {
          title: {
            text: '师生比例'
          },
          colorList: [
            ['#FF3333', '#FF9900'],
            ['#0066FF', '#33CCFF'],
            ['#3399FF', '#66FFFF']
          ]
        }
      },
      pieData_3: {
        chartData: [],
        pieChartOpt: {
          title: {
            text: '男女比例'
          },
          colorList: [
            ['#FF3333', '#FF9900'],
            ['#0066FF', '#33CCFF'],
            ['#3399FF', '#66FFFF']
          ]
        }
      },
      ratioBarData: {},
      courseData: {},
      threeBarData: [],
      goodCreater: [],
      tutorStr: [],
      schoolRankStr: [],
      topFiveStr: {
        topName: [],
        attaData: []
      },
      mutiPieDataTit: ["优秀", "良好", "合格", "鼓励"],
      mutiPieData_1: [],
      mutiPieData_2: []
    }
  },
  watch: {
    projectTitle(val) {
      this.changeTitle()
    },
  },
  computed: {
    defaultOption() {
      return {
        step: 0.5, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  created() {
    this.areaID = this.$route.params.code
    this.getAreaData()
    this.getTitle(this.areaID)
  },
  methods: {
    getAreaData: function () {
      service({
        url: "/list/api.php?m=DataCloud&a=getAreaCloudData&pid=" + this.areaID
      }).then((res) => {
        this.total_1 = res.modelData1.total;
        this.total_0 = res.modelData2.total;
        this.unitChartData_1 = this.handelLieChartData(res.modelData1.unitChart);
        this.unitChartData_0 = this.handelLieChartData(res.modelData2.unitChart);
        this.pieChart_1 = this.handelPieChart(res.modelData1.pieChart)
        this.pieChart_0 = this.handelPieChart(res.modelData2.pieChart)
        this.mutiPieData_1 = this.handelMultPie(res.modelData1)
        this.mutiPieData_2 = this.handelMultPie(res.modelData2)
        this.pieChart_1.state = 0
        this.pieChart_0.state = 0
        this.schoolCount = res.schoolCount
        this.memberCount = res.memberCount
        this.modelCount = res.modelCount
        this.ratioBarData = res.memberRatioData.barRatio
        this.courseData = res.courseData
        this.threeBarData = this.handelthreeBar(res.courseData)
        this.goodCreater = res.memberRankList4
        this.tutorStr = res.tutorList
        this.schoolRankStr = res.schoolRankList6
        this.pieData_1.chartData = res.memberRatioData.pieRatio1;
        this.pieData_2.chartData = res.memberRatioData.pieRatio2;
        this.pieData_3.chartData = res.memberRatioData.pieRatio3;
        this.topFiveStr = this.handelTopFive(res.modelTypeTopFive)
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取标题
    getTitle: function (code) {
      service({
        url: "/list/api.php?m=DataCloud&a=getCloudMapStatus&code=" + code
      }).then((res) => {
        this.projectTitle = res.name
        document.title = res.name
      })
    },
    // handelLieChartData
    handelLieChartData: function (data) {
      var unitChartData = {
        dataAxis: [],
        values: []
      }
      for (var key in data.dataAxis) {
        unitChartData.dataAxis.push(data.dataAxis[key])
      }
      for (var key in data.values) {
        var item = data.values[key];
        var inValue = [];
        for (var m in item) {
          inValue.push(item[m])
        }
        unitChartData.values.push(inValue)
      }
      return unitChartData
    },
    // 
    handelPieChart: function (data) {
      var pieChart = {}
      pieChart.likes = data[0].value
      pieChart.views = data[1].value
      return pieChart
    },
    // 
    handelthreeBar: function (data) {
      var threeBarData = []
      threeBarData[0] = {
        id: 1,
        name: "培训",
        total: data.trainTotal,
        per: (data.trainPercent / 100) * 320 + 'px'
      }
      threeBarData[1] = {
        id: 2,
        name: "案例",
        total: data.newsTotal,
        per: (data.newsPercent / 100) * 320 + 'px'
      }
      threeBarData[2] = {
        id: 3,
        name: "课程",
        total: data.courseTotal,
        per: (data.coursePercent / 100) * 320 + 'px'
      }
      return threeBarData
    },
    // 
    handelTopFive: function (data) {
      var topFiveStr = {
        topName: [],
        attaData: []
      }
      for (let i = 0; i < data.lists.length; i++) {
        topFiveStr.topName.push(data.lists[i].name)
        topFiveStr.attaData.push(data.lists[i].total)
      }
      topFiveStr.topName = topFiveStr.topName.reverse()
      return topFiveStr
    },
    // 
    handelMultPie: function (data) {
      var mutiPieData = []
      var abcd = ['a','b','c','d']
      for (let i = 0; i < this.mutiPieDataTit.length; i++) {
        mutiPieData.push({
          id: i,
          name: this.mutiPieDataTit[i],
          num:data[abcd[i]+'Num'],
          percent:data[abcd[i]+'Percent'],
        })
      }
      // Object.assign(mutiPieData[0], {
      //   num: data.aNum,
      //   percent: data.aPercent,
      // })
      // Object.assign(mutiPieData[1], {
      //   num: data.bNum,
      //   percent: data.bPercent,
      // })
      // Object.assign(mutiPieData[2], {
      //   num: data.cNum,
      //   percent: data.cPercent,
      // })
      // Object.assign(mutiPieData[3], {
      //   num: data.dNum,
      //   percent: data.dPercent,
      // })
      return mutiPieData
    },
    changeTitle: function () {
      bus.$emit("add", this.projectTitle)
    },
    tabState_0: function () {
      this.tabState = 0
    },
    tabState_1: function () {
      this.tabState = 1
    },
  }
}

</script>