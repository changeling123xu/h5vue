<template>
  <van-tabbar route :safe-area-inset-bottom="true">
    <van-tabbar-item icon="home-o" replace to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="orders-o" replace to="/order">我的订单</van-tabbar-item>
    <van-tabbar-item icon="orders-o" replace to="/message">个人中心</van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name: "FooterTabbar",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
};
</script>
