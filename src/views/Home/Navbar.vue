<template>
  <div class="header">
    <!-- <van-loading color="#1989fa" /> -->
    <div class="search">
      <div class="search_home">
        <van-icon
          name="https://xusu.oss-cn-chengdu.aliyuncs.com/mingsu/homeIcon/home.png"
          size="30px"
          color="red"
        />
        <div class="home_icon">
          <van-icon :name="defaultUserImage" round size="30px" @click="drawerRight" />
        </div>
      </div>
    </div>
    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="search-message">
      <van-sticky>
        <form action="/" class="search-input">
          <van-search
            v-model="searchVal"
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
            @focus="onFocus"
          />
        </form>
      </van-sticky>
    </div>
    <div class="eldrawer">
      <el-drawer :visible.sync="drawer" ref="drawer" :modal="true" :with-header="false" size="50%">
        <div class="draweImage">
          <van-image round :src="defaultUserImage" />
        </div>
        <van-cell
          :border="true"
          v-if="flag.islogin"
          title="登陆/注册"
          to="/login"
          @click="$refs.drawer.closeDrawer()"
        />
        <van-cell :border="true" title="我的预定" to @click="$refs.drawer.closeDrawer()" />
        <van-cell :border="true" title="我的信息" to="/message" @click="$refs.drawer.closeDrawer()" />
        <van-cell :border="true" title="联系客服" @click="$refs.drawer.closeDrawer()" />
        <van-cell :border="true" title="帮助" @click="$refs.drawer.closeDrawer()" />
        <van-cell :border="true" v-if="!flag.islogin" title="退出登陆" @click="loginOut" />
      </el-drawer>
    </div>
  </div>
</template>

<script>
import SearchMessage from "./SearchMessage";
import {
  Swipe,
  SwipeItem,
  Icon,
  Sticky,
  Button,
  Search,
  Cell,
  Image,
  Overlay
} from "vant";
import { getToken } from "@/utils/auth";

import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      searchVal: "",
      show: false,
      images: [
        "https://xusu.oss-cn-chengdu.aliyuncs.com/mingsu/shoutRent/ia_10003.jpg",
        "https://xusu.oss-cn-chengdu.aliyuncs.com/mingsu/shoutRent/ia_10004.jpg",
        "https://xusu.oss-cn-chengdu.aliyuncs.com/mingsu/shoutRent/ia_10005.jpg",
        "https://xusu.oss-cn-chengdu.aliyuncs.com/mingsu/shoutRent/ia_10006.jpg"
      ],
      drawer: false,
      flag: {
        islogin: getToken() ? false : true
      },
      defaultUserImage: "https://b.yzcdn.cn/vant/icon-demo-1126.png"
    };
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon,
    [Sticky.name]: Sticky,
    [Search.name]: Search,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Image.name]: Image,
    SearchMessage
  },
  computed: {
    ...mapGetters(["userData"]),
    ...mapMutations({
      logout: "user/LOGOUT"
    }),
    
  },
  mounted(){
    if (this.userData) {
        this.defaultUserImage = this.userData.avatar;
      }
  },
  methods: {
    onSearch() {},
    onCancel() {},
    onFocus() {
      this.$router.push("/searchPage");
    },
    drawerRight() {
      this.show = !this.show;
      this.drawer = !this.drawer;
      if (this.userData) {
        this.defaultUserImage = this.userData.avatar;
      }
    },

    loginOut() {
      this.logout;
      this.$refs.drawer.closeDrawer();
      this.$router.push("/");
      this.defaultUserImage = "https://b.yzcdn.cn/vant/icon-demo-1126.png";
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  // height: 260px;
  // width: 320px;
  // overflow: hidden;
  position: relative;
}
.banner {
  width: 100%;
  height: auto;
  position: relative;
  img {
    width: 100%;
    height: 234px;
    // height: auto;
  }
}
.search {
  position: absolute;
  z-index: 10;
  width: 90%;
  height: 80px;

  .search_home {
    display: flex;
    margin-left: 10%;
    padding-top: 10%;
    justify-content: space-between;
    .home_icon {
        border-radius: 50%;
        overflow: hidden;
      }
  }
}
.search-message {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.01), 0px 3px 18px rgba(0, 0, 0, 0.12);
  position: absolute;
  left: 24px;
  right: 24px;
  // top:210px;
  margin-top: -30px;
  border-radius: 10px;
  overflow: hidden;
  .search-input {
    padding: 0;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.01),
      0px 3px 18px rgba(0, 0, 0, 0.12);
    background: #f7f8fa;
    .van-search {
      // padding: 0;
      // height: 35px;
      
    }
  }
}
.eldrawer {
  .draweImage {
    width: 50px;
    height: 50px;
    margin: 10px auto;
  }
}
</style>
