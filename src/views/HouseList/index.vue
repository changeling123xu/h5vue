<template>
  <div class="houseList">
    <van-nav-bar :title="cityname" left-text="返回" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="search" />
      </template>
    </van-nav-bar>
    <van-dropdown-menu>
      <van-dropdown-item title="位置" ref="item">
        <van-tree-select
          :items="items"
          :active-id.sync="activeId"
          :main-active-index.sync="activeIndex"
          @click-item="clickItem"
          @click-nav="clickNav"
        />
        <van-button block type="info" @click="onConfirm">确认</van-button>
      </van-dropdown-item>
      <van-dropdown-item title="筛选" ref="digit">
        <div class="fieldinput">
          <van-field v-model="digitlow" type="digit" label="最低价格" />
          <van-field v-model="digithigh" type="digit" label="最高价格" />
        </div>
        <div>
          <van-cell title="选择日期区间" :value="date" @click="show = true" />
          <van-calendar v-model="show" type="range" @confirm="onConfirmDate" color="#1989fa" />
        </div>
        <van-button block type="info" @click="onConfirmPrice">确认</van-button>
      </van-dropdown-item>
      <van-dropdown-item v-model="value" @change="priceOption" :options="option" >
      </van-dropdown-item>
    </van-dropdown-menu>
    <div>
        <search-message :houseList="houseData" @event="houseDetail" />
    </div>
    <footer-tabbar></footer-tabbar>
  </div>
</template>
<script>
import SearchMessage from "views/Home/SearchMessage";
import FooterTabbar from "components/FooterTabbar";
import { getLandmark,fetchList } from "api/house";

import {
  NavBar,
  TreeSelect,
  Icon,
  DropdownMenu,
  DropdownItem,
  Button,
  Field,
  Cell,
  Calendar
} from "vant";

export default {
  data() {
    return {
      value: 0,
      date: "",
      show: false,
      digitlow: null,
      digithigh:null,
      option: [
        { text: "默认排序", value: 0 },
        { text: "按价格升序", value: 1 },
        { text: "按价格降序", value: 2 }
      ],
      cityname: this.$route.query.cityname,
      cityidYj:this.$route.query.cityidYj,
      items: [
        // {
        //   // 导航名称
        //   text: '成都',
        //   // 导航节点额外类名
        //   className: 'my-class',
        //   children: [
        //     {
        //       text: '温州',
        //       id: 1,
        //     },
        //     {
        //       text: '杭州',
        //       id: 2
        //     }
        //   ]
        // }
      ],//位置数据
      activeId: 1,
      activeIndex: 0,
      landmarkType: 10,
      houseData:[],//房源数据
      houseDatas:[],//房源数据备份
      search:{
        index:0,
        text:''
      },
      url: "https://xusu.oss-cn-chengdu.aliyuncs.com/mingsu/shoutRent/",

    };
  },
  mounted() {
    this.getLandmark();
    this.getCityId();
    this.getHouseData()
  },
  methods: {
    onClickLeft(){
      this.$router.push({path:'/'});
    },
    getCityId() {
      // this.cityname=this.$route.query.cityname
    },
    async getLandmark() {
      let { data } = await getLandmark(this.config);
      let child = data.oneLevelDirectory.map(item => {
        return {
          id: item.oneLevelId,
          text: item.oneLevelName
        };
      });
      this.items = data.result.map(item => {
        if (this.landmarkType == item.landmarkType) {
          return {
            id: item.landmarkType,
            text: item.landmarkTypeName,
            children: child
          };
        }
        return {
          id: item.landmarkType,
          text: item.landmarkTypeName,
          children: []
        };
      });
    },
    async getHouseData(){
      let {data}=await fetchList({cityId:this.cityidYj})
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
      this.houseData=dataitem
      this.houseDatas=dataitem
    },
    houseDetail(e) {
      this.$router.push({path:'houseDetail',query:{houseId:e}});
      console.log(e, 123);
    },
    clickNav(data) {
      this.landmarkType = this.items[data].id;
      this.getLandmark(this.landmarkType);
      this.search.index=data;

    },
    clickItem(data) {
      this.search.text=data.text
      console.log(data,123);
    },
    onConfirm() {
      let house=this.houseDatas.filter(item=>{
        return item.introduce1===this.search.text
      })
      this.houseData=house;
      this.$refs.item.toggle();
    },
    onConfirmPrice(){
      this.houseData = this.houseData.filter(item=>{
        return item.price>=this.digitlow && item.price<=this.digithigh
      })
      this.$refs.digit.toggle();

    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirmDate(date) {
      const [start, end] = date;
      this.show = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
    priceOption(item){
      if(item===1){
        this.houseData=this.houseData.sort((a,b)=>{
          return (a.price-b.price)
        })
        debugger
      }else if(item===2){
        this.houseData=this.houseData.sort((a,b)=>{
          return (b.price-a.price)
        })
      }
      console.log(item);

    }
  },
  computed: {
    config() {
      return {
        cityId: this.$route.query.cityidYj,
        landmarkType: this.landmarkType
      };
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [TreeSelect.name]: TreeSelect,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Button.name]: Button,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [Calendar.name]: Calendar,

    FooterTabbar,
    SearchMessage
  }
};
</script>
<style lang="scss" scoep>
.houseList {
}
</style>
