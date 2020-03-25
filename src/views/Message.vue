<template>
  <div>
    <van-search
      value="{{ value }}"
      placeholder="请输入搜索关键词"
      show-action
      bind:search="onSearch"
      bind:cancel="onCancel"
    />
  </div>
</template>
<script>
import { Button, Tabbar, TabbarItem, Swipe, SwipeItem, Card } from "vant";

export default {
  data() {
    return {
      imageURL:
        "https://xusu.oss-cn-chengdu.aliyuncs.com/mingsu/shoutRent/ia_10001.jpg"
    };
  },
  components: {
    [Card.name]: Card
  }
};
</script>
