<template>
  <div>asd
    <footer-tabbar/>
  </div>
</template>
      <!-- <template #footer>
        <div class="housefooter">
          <span>按钮</span>
          <span>按钮</span>
        </div>
      </template>-->
<script>
import { Button, Tabbar, TabbarItem, Swipe, SwipeItem, Card } from "vant";
import FooterTabbar from "components/FooterTabbar";

export default {
  data() {
    return {
      show: true,
      imageURL:
        "https://xusu.oss-cn-chengdu.aliyuncs.com/mingsu/shoutRent/ia_10001.jpg",
      house: {
        houseId: "h0000",
        introduce: "整租·1室1卫1床·可住2人·30天起租",
        introduce1: "锦江区",
        price: 200,
        thumb:
          "https://xusu.oss-cn-chengdu.aliyuncs.com/mingsu/shoutRent/ia_10000",
        title: "6000/月租【沐舍】精装轻奢LOFT",
        titleTagList: ["优选", "自营", "品牌民宿"]
      }
    };
  },
  components: {
    [Card.name]: Card,
    FooterTabbar
  }
};
</script>
