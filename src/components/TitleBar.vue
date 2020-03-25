<template>
  <div class="titlebar">
    <div class="titlebar_div">
      <span>{{title}}</span>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss" scope>
.titlebar{
  margin-top: 20px;
  padding-left: 10px;
  margin-bottom: 20px;
  .titlebar_div {
  font-size: 18px;
  font-weight: 700;
  line-height: 26px;
}
}
</style>
