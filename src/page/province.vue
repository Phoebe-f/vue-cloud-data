<template>
  <pro-city :is-province="true" :key="key">
    <!-- <router-view :key="key"></router-view> -->
  </pro-city>
</template>

<script>
import ProCity from './pro-city/pro-city'


export default {
  name: "Province",
  components: {
    ProCity
  },
  data() {
    return {

    }
  },
  computed: {
    key() {
      return this.$route.path + Math.random();
    }
  },
  created() {
    // console.log(this.$route.path)
  },

}
</script>

