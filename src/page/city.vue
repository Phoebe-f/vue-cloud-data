<template>
  <pro-city :is-province="false" />
</template>

<script>
import ProCity from './pro-city/pro-city'


export default {
  name: "City",
  components: {
    ProCity
  },
  data() {
    return {

    }
  },
}
</script>

