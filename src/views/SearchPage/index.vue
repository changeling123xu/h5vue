<template>
  <div class="searchPage">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
      />
    </form>
    <div v-if="show">
      <title-bar :title="'搜索历史记录'" />
      <div class="searchBtn">
        <van-button v-for="(item,index) in 1" :key="index" type="default" icon="clock-o">成都</van-button>
      </div>
      <title-bar :title="'热门城市'" />
      <div class="searchBtn">
        <van-button
          v-for="(item,index) in hotCity"
          :key="index"
          type="default"
          :to="{path:`\houseList?cityid=${item.cityid}&cityname=${item.cityname}&cityidYj=${item.cityidYj}`}"
        >{{item.cityname}}</van-button>
      </div>
    </div>

    <div class="searchPopup" v-if="showMessage">
      <van-cell
        v-for="(item , index) in showMessageData"
        :key="index"
        :title="item.cityname"
        is-link
        :to="{path:`\houseList?cityid=${item.cityid}&cityname=${item.cityname}&cityidYj=${item.cityidYj}`}"
      />
    </div>
  </div>
</template>
<script>
import { Search, Button, Popup, Cell } from "vant";
import { getCityList } from "api/house";
import TitleBar from "components/TitleBar";

export default {
  name:'SearchPage',
  data() {
    return {
      value: "",
      hotCity: [],
      show: true,
      showMessage: false,
      showMessageData: []
    };
  },
  mounted() {
    this.cityList();
  },
  methods: {
    onSearch() {
      this.cityList();
    },
    onCancel() {},
    onFocus() {
      this.show = false;
      // this.shows=true
    },
    onInput() {
      getCityList(this.search).then(({ data }) => {
        this.showMessageData = data;
        this.showMessage = data.length > 0 ? true : false;
      });
    },
    onBlur() {
      this.show = true;
    },
    async cityList() {
      let list = await getCityList(this.search);
      this.hotCity = list.data;
    }
  },
  computed: {
    search() {
      return {
        value: this.value
      };
    }
  },
  components: {
    [Search.name]: Search,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Cell.name]: Cell,

    TitleBar
  }
};
</script>
<style lang="scss" scope>
.searchPage {
  position: relative;
  .searchPopup {
    position: relative;
  }
  .searchBtn {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 10px;
    button {
      margin-bottom: 10px;
    }
  }
  .searchBtn::after {
    content: "";
    flex: auto;
  }
}
</style>
