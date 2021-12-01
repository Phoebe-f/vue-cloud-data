<template>
  <div class="tab">
    <!-- <i :class="{ on: total_mon == 0 }" @click="total_mon = 0" v-text="tabTxt[0]"></i>
    <i :class="{ on: total_mon == 1 }" @click="total_mon = 1" v-text="tabTxt[1]"></i> -->
    <i :class="{ on: tabState == 0 }" @click="changeTabState_0()" v-text="tabTxt[0]"></i>
    <i :class="{ on: tabState == 1 }" @click="changeTabState_1()" v-text="tabTxt[1]"></i>
  </div>
</template>
<script>
export default {
  props: ['tabTxt','tabState'],
  methods:{
    changeTabState_0:function(){
      this.$emit("tabState_0")
    },
    changeTabState_1:function(){
      this.$emit("tabState_1")
    },
  }
}

</script>