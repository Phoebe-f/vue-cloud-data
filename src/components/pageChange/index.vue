<template>
  <div class="page">
    <a class="prev" @click="prevPage()" :class="{disabled:prevPageState==0}">
      <img src="../../assets/images/preve.png" title="上一页"  />
    </a>
    <a class="next" @click="nextPage()" :class="{disabled:nextPageState==0}">
      <img src="../../assets/images/next.png" title="下一页" />
    </a>
  </div>
</template>
<script>
export default {
  props:['prevPageState','nextPageState'],
  methods: {
    prevPage: function () {
      this.$emit('prev')
    },
    nextPage: function () {
      this.$emit('next')
    }
  }
}
</script>