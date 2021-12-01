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
              <li v-for="menuItem in permission_routes" :key="menuItem.path">
                <template v-if="menuItem.name != 'region'">
                  <a @click="meunChange = true">
                    <router-link :to="menuItem.children[0].path" v-text="menuItem.children[0].meta.title"></router-link>
                  </a>
                </template>
                <template v-else>
                  <a @click="meunChange = true, dialogVisible = true" v-text="menuItem.meta.title"></a>
                </template>
              </li>
            </ul>
          </div>
          <a @click="refresh()">
            <div class="refresh fr">
              <img src="../assets/images/refresh.svg" />刷新
            </div>
          </a>
        </div>
      </div>
      <el-dialog :visible.sync="dialogVisible">
        <div class="province-list level_1 clearfix">
          <!-- <router-link to="{`/region/province/${item.code}`}"/> -->
          <a
            v-for="(item,index) in schoolGreat"
            :key="index"
            @click="handelTitle(item), dialogVisible = false"
          >
            {{ item.title }}
            <!-- <router-link :to="{ name: 'province', query: { id: title } }" v-text="item.name"></router-link> -->
          </a>
        </div>
        <div class="province-list level_2 clearfix">
          <a
            v-for="item,index in schoolNomal"
            :key="index"
            @click="handelTitle(item), dialogVisible = false"
          >
            {{ item.title }}
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
import bus from '../assets/js/evnetBus.js'

import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
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
      schoolGreat: [],
      schoolNomal: [],
    }
  },
  computed: {
    ...mapGetters([
      "permission_routes"
    ])

  },
  watch: {
    // $route(route) {
    //   // if you go to the redirect page, do not update the breadcrumbs
    //   if (route.path.startsWith('/province/')) {
    //     return
    //   }
    //   // this.getBreadcrumb()
    // }
  },
  created: function () {
    bus.$on('add', (message) => {
      this.title = message
    })
    this.getMenu()
    this.getBreadcrumb()
    this.getTime();
    setInterval(this.getTime, 1000)
    setTimeout(() => {
      this.refresh()
    }, 60000 * 15)
  },
  methods: {
    getMenu: function () {
      this.$axios.get('../../static/menu.json').
        then((data) => {
          var data = data.data
          this.schoolGreat = this.handelSchoolList(data.great)
          this.schoolNomal = this.handelSchoolList(data.nomal)
        })
    },
    handelSchoolList: function (data) {
      var arr = []
      for (let key in data) {
        arr.push(data[key])
      }
      return arr
    },

    refresh: function () {
      // this.$router.go(0)
      location.reload()
    },
    handelTitle: function (item) {
      console.log(item)
      var url = item.url
      var params = url.indexOf("?")
      var _id = url.slice(params + 4)
      this.$router.push({
        path: `/region/province/${_id}`,
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
    },
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
  width: 32%;
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
  /* margin-left: 0; */
  margin-bottom: 0;
  width: 128px;
  height: 48px;
  line-height: 48px;
  background-color: #2b2d3c;
  border-radius: 0;
}
.province-list.level_1 a:last-of-type {
  /* border-right: 0; */
}
.province-list.level_2 {
  padding-top: 30px;
}
.province-list.level_2 a:first-of-type {
  /* margin-left: 0; */
}
</style>