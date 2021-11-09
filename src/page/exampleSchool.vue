<template>
  <div class="main">
    <div class="main-inner clearfix">
      <div class="center-wrapper fl">
        <div class="main-subox map-subox">
          <div class="main-inbox fl">
            <div class="inbox-top clearfix">
              <span class="tit">全国示范校</span>
              <div class="tab" id="school-num">
                <em v-text="schoolTotal[0]"></em>
                <em v-text="schoolTotal[1]"></em>
                <em v-text="schoolTotal[2]"></em>
              </div>
            </div>
            <div class="inbox-cont">
              <div
                id="province-chart"
                style="width: 862px;height:640px; position:relative;top:110px"
              >
                <map-chart
                  id="province-map-chart"
                  class="province-map-chart"
                  width="818px"
                  height="640px"
                  :chart-data="provinceMapData"
                  :routeName="routeName"
                  @getProId="getProId"
                ></map-chart>
              </div>
              <div class="aw-conbox">
                <img src="https://img.i3done.com/statics/images/school/award/aw_1.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-wrapper fr">
        <div class="school-wrap">
          <div class="school-list clearfix">
            <template v-if="schools.length">
              <div v-for="(item) in schools " :key="item.id" class="main-subox course-subox">
                <div class="contest-inbox main-inbox">
                  <div class="inbox-top">
                    <a class="school-info" :href="item.url" target="_blank">
                      <img :src="item.thumb" :title="item.title" />
                      {{ item.title }}
                    </a>
                  </div>
                  <div class="inbox-cont">
                    <ul class="contest-list clearfix">
                      <li>
                        <h5>师生</h5>
                        <p v-text="item.userNum"></p>
                      </li>
                      <li>
                        <h5>作品</h5>
                        <p v-text="item.modelNum"></p>
                      </li>
                      <li>
                        <h5>人气</h5>
                        <p v-text="item.views"></p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="main-subox course-subox">
                <div class="contest-inbox main-inbox">
                  <p class="no-result">本省暂无示范校</p>
                </div>
              </div>
            </template>
          </div>
          <div class="page">
            <a class="prev" :class="{ disabled: prevPage == 0 }" @click="prevPageClick">
              <img src="../assets/images/preve.png" title="上一页" />
            </a>
            <a class="next" :class="{ disabled: nextPage == 0 }" @click="nextPageClick">
              <img src="../assets/images/next.png" title="下一页" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 <script>

import * as echarts from 'echarts'
import MapChart from '../components/mapChart/index'

export default {
  components: {
    MapChart
  },
  data() {
    return {
      title: { "name": "全国示范校" },
      routeName: '',
      proId: '',
      page: 1,
      prevPage: '',
      nextPage: '',
      schoolTotal: [],
      schools: [],
      provinceData: [],
      provinceMapData: {},

    }
  },
  created() {
    this.getData()
    this.routeName = this.$route.name
  },
  methods: {
    getData: function () {
      var that = this
      // https://www.i3done.com/api.php?m=DataCloud&a=getSchoolCloudData
      this.axios.get("/list/api.php?m=DataCloud&a=getSchoolCloudData")
        // this.axios.get("/static/json.json")
        .then(function (data) {
          console.log("example")
          if (data.status) {
            var data = data.data
            that.prevPage = data.prevPage
            that.nextPage = data.nextPage
            that.schoolTotal = data.schoolNum
            that.provinceData = data.provinceData
            that.handleMapData(data.provinceData)
            that.schools = data.schools
          }
        })
    },
    // 获取省份id -- 切换列表
    getProListData: function (id, page) {
      var that = this
      this.axios.get("/list/api.php?m=DataCloud&a=getSchoolCloudData", { params: { pid: id, page: page } })
        .then(function (data) {
          if (data.status) {
            var data = data.data
            that.prevPage = data.prevPage
            that.nextPage = data.nextPage
            that.schools = data.schools
          }
        })
    },
    // 获取省份id
    getProId: function (data) {
      this.proId = data
      this.page = 0
      this.getProListData(this.proId, this.page)
    },
    prevPageClick: function () {
      this.page--
      this.getProListData(this.proId, this.page)
    },
    nextPageClick: function () {
      this.page++
      this.getProListData(this.proId, this.page)
    },
    handleMapData: function (data) {
      var features = echarts.getMap('china').geoJson.features;
      var provinceList = [],
        provinceMapData = [],
        valueList = [];
      var len = features.length
      for (var i = 0; i < len; i++) {
        provinceList.push(features[i].properties.name)
      }
      for (var key in data) {
        valueList.push(data[key].value)
        for (var m = 0; m < provinceList.length; m++) {
          if (data[key].name == provinceList[m]) {
            provinceMapData[m] = data[key];
          }
        }
      }
      this.provinceMapData.provinceList = provinceList
      this.provinceMapData.provinceMapData = provinceMapData
      this.provinceMapData.valueList = valueList
    }
  }
}
</script>
<style scoped>
.center-wrapper .map-subox {
  height: 956px;
}
.main .school-wrap .school-list {
  width: 946px;
  margin-left: -28px;
}
.main .school-wrap .school-list .course-subox {
  float: left;
  margin-left: 28px;
}
.main .school-wrap .school-list .main-inbox {
  height: 138px;
}
.main .school-wrap .school-list .main-inbox .no-result {
  line-height: 138px;
  text-align: center;
  font-size: 16px;
  color: #fff;
}
.main .school-wrap .school-list .school-info {
  display: block;
  font-size: 16px;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.main .school-list .school-info img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50%;
}
.main .school-wrap .page {
  text-align: center;
}
.main .school-wrap .page a {
  display: inline-block;
  width: 80px;
  height: 68px;
  line-height: 68px;
  text-align: center;
  border-radius: 8px;
  background-color: #2b2d3c;
  box-shadow: 0 0 50px 0px #18191e;
}
.main .school-wrap .page a:first-child {
  margin-right: 28px;
}
.main .school-wrap .page img {
  width: 48px;
  height: 48px;
}

/* 示范校牌匾 */
.center-wrapper .map-subox .inbox-cont {
  position: relative;
}
.center-wrapper .map-subox .inbox-cont .aw-conbox {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -140px;
}
.center-wrapper .map-subox .inbox-cont .aw-conbox img {
  display: block;
  width: 280px;
  height: 175px;
}
</style>