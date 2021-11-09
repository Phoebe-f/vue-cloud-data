<template>
  <div class="three-bar-con">
    <dl>
      <dd>
        <p class="text">
          {{barTitle[0]}}
          <em>{{ barData.num_1 }}</em>
        </p>
        <p class="progress">
          <span class="probar" :style="{ width: barData.per_1 + '%' }"></span>
        </p>
      </dd>
      <dd>
        <p class="text">
          {{barTitle[1]}}
          <em>{{ barData.num_2 }}</em>
        </p>
        <p class="progress">
          <span class="probar" :style="{ width: barData.per_2+ '%' }"></span>
        </p>
      </dd>
      <dd>
        <p class="text">
          {{barTitle[2]}}
          <em>{{ barData.num_3 }}</em>
        </p>
        <p class="progress">
          <span class="probar" :style="{ width: barData.per_3 + '%' }"></span>
        </p>
      </dd>
    </dl>
  </div>
</template>
<script>

export default {
  props: ['barData','barTitle'],
  data() {
    return {

    }
  },
  created() {
    
  }
}
</script>

<style coped>
.three-bar-con p {
  text-align: center;
  font-size: 12px;
  color: #a0a5b1;
}
.three-bar-con p em {
  margin-left: 5px;
}
.three-bar-con p.text {
  margin: 11px 0;
}
.three-bar-con p.progress {
  margin: auto;
  width: 320px;
}
.three-bar-con .probar {
  display: inline-block;
  height: 14px;
  border-radius: 14px;
  max-width: 100%;
}
.three-bar-con dd:first-child .probar {
  background: -webkit-linear-gradient(left, #33ccff, #0066ff);
  background: -moz-linear-gradient(left, #33ccff, #0066ff);
  background: -o-linear-gradient(left, #33ccff, #0066ff);
  background: linear-gradient(90deg, #33ccff, #0066ff);
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType = 0, startColorstr = #33CCFF, endColorstr = #0066FF);
}
.three-bar-con dd:nth-child(2) .probar {
  background: -webkit-linear-gradient(left, #9999ff, #6633cc);
  background: -moz-linear-gradient(left, #9999ff, #6633cc);
  background: -o-linear-gradient(left, #9999ff, #6633cc);
  background: linear-gradient(90deg, #9999ff, #6633cc);
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType = 0, startColorstr = #9999FF, endColorstr = #6633CC);
}
.three-bar-con dd:nth-child(3) .probar {
  background: -webkit-linear-gradient(left, #ff3333, #ff9900);
  background: -moz-linear-gradient(left, #ff3333, #ff9900);
  background: -o-linear-gradient(left, #ff3333, #ff9900);
  background: linear-gradient(90deg, #ff3333, #ff9900);
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType = 0, startColorstr = #FF3333, endColorstr = #FF9900);
}
</style>