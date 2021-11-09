<template>
  <div class="header">
    <div class="header-inner">
      <div class="header-logo fl">
        <a href="https://www.i3done.com" target="_blank">
          <img src="../../assets/images/logo.svg" />
          <span>中望教育</span>
          <span class="header-link">www.i3done.com</span>
        </a>
      </div>
      <div class="header-tit" v-text="title.name"></div>
      <div class="header-menu fr">
        <span class="header-time fl" id="nowTime">{{ time }}</span>
        <div class="menu">
          <dl
            class="menu-icon"
            @click="meunChange = !meunChange"
            :class="{ active: meunChange == false }"
          >
            <dd></dd>
            <dd></dd>
            <dd></dd>
          </dl>
          <ul class="menu-list" :class="{ active: meunChange == false }">
            <li>
              <a id="index">
                <router-link to="/">3D One 数据云图</router-link>
              </a>
            </li>
            <li>
              <a id="schools">
                <router-link to="/exampleSchool">全国示范校</router-link>
              </a>
            </li>
            <li>
              <a id="province" @click="dialogVisible = true">各省数据云图</a>
            </li>
          </ul>
        </div>
        <!-- <a href="./index.html">
          <div class="refresh fr">
            <img src="../assets/images/refresh.svg" />刷新
          </div>
        </a>-->
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <div class="province-list level_1 clearfix">
        <a
          v-for="item in provinceData.top_4"
          :key="item.id"
          @click="handelTitle(item), dialogVisible = false"
        >
          <router-link to="/province" v-text="item.name"></router-link>
        </a>
      </div>
      <div class="province-list level_2 clearfix">
        <a
          v-for="item in provinceData.rest"
          :key="item.id"
          @click="handelTitle(item), dialogVisible = false"
        >
          <router-link to="/province" v-text="item.name"></router-link>
        </a>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'app-header',
  props: ["title"],
  data() {
    return {
      time: '',
      meunChange: true,
      dialogVisible: false,
      provinceData: {
        top_4: [
          {
            id: "top_1",
            name: "广东省"
          },
          {
            id: "top_2",
            name: "广东省"
          },
          {
            id: "top_3",
            name: "广东省"
          },
          {
            id: "top_4",
            name: "广东省"
          },
        ],
        rest: [
          {
            id: 1,
            name: "安徽省"
          },
          {
            id: 2,
            name: "湖南省"
          },
          {
            id: 3,
            name: "福建省"
          },
          {
            id: 4,
            name: "福建省"
          },
        ]
      }
    }
  },
  created: function () {
    this.getTime();
    setInterval(this.getTime, 1000)
  },
  methods: {
    handelTitle: function (item) {
      this.$emit('changeTit', item.name)
    },
    getTime: function () {
      var now = new Date();
      var year = now.getFullYear();
      var mou = now.getMonth() + 1;
      var day = now.getDate();
      var week = now.getDay();
      var hour = now.getHours();
      var min = now.getMinutes();
      var sec = now.getSeconds();
      this.time = year + '-' + (mou > 9 ? mou : '0' + mou) + '-' + (day > 9 ? day : '0' + day) + ' ' + (hour > 9 ? hour : '0' + hour) + ':' + (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec)
    }
  },
  beforeDestroy: function () {
    clearInterval()
  }
}
</script>
<style>
.el-dialog {
  background-color: #232532;
  box-shadow: 0px 0px 50px rgb(24 25 30);
  width: 31%;
}
</style>
<style scoped>
.province-list a {
  color: #fff;
  float: left;
  margin-left: 10px;
  margin-bottom: 10px;
  width: 128px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  color: #fff;
  border: 1px solid #383d52;
  border-radius: 4px;
}
.province-list.level_1 a {
  margin-left: 0;
  margin-bottom: 0;
  width: 136px;
  height: 48px;
  line-height: 48px;
  background-color: #2b2d3c;
  border-radius: 0;
}
.province-list.level_1 a:nth-of-type(-n + 3) {
  border-right: 0;
}
.province-list.level_2 {
  padding-top: 30px;
}
.province-list.level_2 a:first-of-type {
  margin-left: 0;
}
</style>