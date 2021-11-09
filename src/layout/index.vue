<template>
  <div>
    <div class="header">
      <div class="header-inner">
        <div class="header-logo fl">
          <a href="https://www.i3done.com" target="_blank">
            <img src="../assets/images/logo.svg" />
            <span>中望教育</span>
            <span class="header-link">www.i3done.com</span>
          </a>
        </div>
        <div class="header-tit" v-text="title"></div>
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
                <a id="index" @click="title = '3D One 数据云图', meunChange = true">
                  <router-link to="/home">3D One 数据云图</router-link>
                </a>
              </li>
              <li>
                <a id="schools" @click="title = '全国示范校', meunChange = true">
                  <router-link to="/exampleSchool">全国示范校</router-link>
                </a>
              </li>
              <li>
                <a id="province" @click="dialogVisible = true, meunChange = true">各省数据云图</a>
              </li>
            </ul>
          </div>
          <a @click="location.reload()">
            <div class="refresh fr">
              <img src="../assets/images/refresh.svg" />刷新
            </div>
          </a>
        </div>
      </div>
      <el-dialog :visible.sync="dialogVisible">
        <div class="province-list level_1 clearfix">
          <a
            v-for="item in provinceData.top_4"
            :key="item.id"
            @click="handelTitle(item), dialogVisible = false"
          >
            {{ item.name }}
            <!-- <router-link :to="{ name: 'province', query: { id: title } }" v-text="item.name"></router-link> -->
          </a>
        </div>
        <div class="province-list level_2 clearfix">
          <a
            v-for="item in provinceData.rest"
            :key="item.id"
            @click="handelTitle(item), dialogVisible = false"
          >
            {{ item.name }}
            <!-- <router-link :to="{ name: 'province', query: { id: title } }" v-text="item.name"></router-link> -->
          </a>
        </div>
      </el-dialog>
    </div>
    <app-main />
  </div>
</template>

<script>
import AppMain from './components/AppMain'

export default {
  name: 'Layout',
  // props: ["title"],
  components: {
    AppMain
  },
  data() {
    return {
      time: '',
      meunChange: true,
      dialogVisible: false,
      title: "3D One 数据云图",
      routeName: undefined,
      provinceData: {
        top_4: [
          {
            id: "top_1",
            name: "广东省"
          },
          {
            id: "top_2",
            name: "安徽省"
          },
          {
            id: "top_3",
            name: "福建省"
          },
          {
            id: "top_4",
            name: "四川省"
          },
        ],
        rest: [
          {
            id: 1,
            name: "新疆"
          },
          {
            id: 2,
            name: "湖南省"
          },
          {
            id: 3,
            name: "哈尔滨"
          },
          {
            id: 4,
            name: "云南"
          },
        ]
      }
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/province/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created: function () {
    this.getBreadcrumb()
    this.getTime();
    setInterval(this.getTime, 1000)
  },
  methods: {
    handelTitle: function (item) {
      this.title = item.name
      document.title = item.name
      this.$router.push({
        path: `/province/${this.title}`,
        // name: 'province',
        // params: {
        //   id: this.title
        // }
        //  path: 'province', query: { id: this.title }
      })
    },
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      this.title = matched.filter(item => item.meta && item.meta.title)[0].meta.title
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