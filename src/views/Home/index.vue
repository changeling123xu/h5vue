<template>
  <div class="container">
    <nav-bars></nav-bars>
    <div>
      <div class="houseList" style="height:800px">
        <title-bar :title="'今日推荐'" />
        <search-message :houseList="houseList" @event="houseDetail" />
        <div class="houseBtn">
          <van-button plain hairline type="info" block @click="loadingMore">加载更多</van-button>
        </div>
        <title-bar :title="'民宿故事'" />
        <block-item :cardList="cardLit" @cardEvent="cardEvent"></block-item>
        <div class="houseBtn">
          <van-button plain hairline type="info" block @click="loadingMore">加载更多</van-button>
        </div>
      </div>
    </div>
    <footer-tabbar />
  </div>
</template>

<script>
import {
  Search,
  Button,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Card,
  NavBar,
  Icon
} from "vant";
import { mapActions, mapMutations, mapState } from "vuex"; // createNamespacedHelpers
import { fetchList } from "api/house";
import FooterTabbar from "components/FooterTabbar";
import TitleBar from "components/TitleBar";
import BlockItem from "components/BlockItem";
import NavBars from "./Navbar";
import SearchMessage from "./SearchMessage";
// const { mapActions } = createNamespacedHelpers('test') // 可使用这种方式直接获得test模板

export default {
  name: "home",
  data() {
    return {
      flag: false,
      value: 1,
      value1: "",
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      houseList: [],
      houseListNum: 3,
      url: "https://xusu.oss-cn-chengdu.aliyuncs.com/mingsu/shoutRent/",
      cardLit:[
        {
          name:'北京1',
          title:'房东说，欢迎体验你的 “珠江之夜”。',
          good:12,
          chat:5,
          url:'https://img.yzcdn.cn/vant/apple-1.jpg',
        },{
          name:'北京2',
          title:'房东说，欢迎体验你的 “珠江之夜”。',
          good:12,
          chat:5,
          url:'https://img.yzcdn.cn/vant/apple-1.jpg',
        },
        {
          name:'北京1',
          title:'房东说，欢迎体验你的 “珠江之夜”。',
          good:12,
          chat:5,
          url:'https://img.yzcdn.cn/vant/apple-1.jpg',
        },{
          name:'北京2',
          title:'房东说，欢迎体验你的 “珠江之夜”。',
          good:12,
          chat:5,
          url:'https://img.yzcdn.cn/vant/apple-1.jpg',
        }
      ]
    };
  },
  components: {
    [Search.name]: Search,
    [Button.name]: Button,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Card.name]: Card,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,

    FooterTabbar,
    Search,
    NavBars,
    BlockItem,
    SearchMessage,
    TitleBar
  },
  mounted() {
    this.gethouseList();
  },
  methods: {
    // ...mapActions('home', ['initData', 'plusPage', 'initPage']),
    ...mapActions({
      onePlusAsync: "test/onePlusAsync"
    }),
    ...mapMutations({
      onePlus: "test/onePlus",
      logout: "user/LOGOUT"
    }),
    onClickRight() {},
    onTitle() {
      this.flag = true;
    },
    async gethouseList() {
      let data = await fetchList();
      this.houseListDef(data);
      console.log(data.data);
    },
    houseListDef({ data }) {
      let dataitem = data.map((item, index) => {
        let items = {
          introduce: item.introduce,
          introduce1: item.introduce2,
          title: item.title,
          price: item.price,
          houseId: item.houseId,
          titleTagList: item.titleTagList.split(","),
          thumb: this.url + item.houseUrl
        };
        return items;
      });
      this.houseList = dataitem.filter((item, index) => {
        return index < this.houseListNum;
      });
    },
    houseDetail(e) {
      console.log(e, 123);
    },
    loadingMore() {
      this.houseListNum += 6;
      this.gethouseList();
    },
    cardEvent(item){
      console.log(item);

    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  height: auto;
  width: 100%;
  padding-bottom: 50px;
  .houseList {
    margin-top: 40px;
    .houseBtn{
      background: #f8f8f8;
      width: 90%;
      margin: 5px auto;
      text-align: center;
      margin-top: 5px;
    }
  }
}

.banner {
  width: 100%;
  height: auto;
  img {
    width: 100%;
    height: auto;
  }
}
.now-value {
  padding: 0 15px;
  box-sizing: border-box;
  font-size: 16px;
  // line-height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-list {
  margin: 15px;
  font-size: 24px;
  .icon {
    margin: 0 10px;
  }
}
.buttons {
  padding: 0 15px;
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  a {
    color: #333;
  }
}
</style>
