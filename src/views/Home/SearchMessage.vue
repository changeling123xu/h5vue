<template>
  <div class="searchMessage">
    <van-card

      v-for="item in houseList"
      :key="item.houseId"
      :price="item.price"
      :title="item.title"
      :thumb="item.thumb+'.jpg'"
      @click="getMessageId(item.houseId)"
    >
      <template #desc>
        <p>{{item.introduce1}}</p>
        <span>{{item.introduce}}</span>
      </template>
      <template #tags>
        <div class="housetag" style="margin:5px 0">
          <van-tag plain  type="primary" v-for="index in item.titleTagList" :key="index">{{index}}</van-tag>
        </div>
      </template>
    </van-card>
  </div>
</template>
<script>
import { Button, Search, Card, Tag } from "vant";
export default {
  props: {
    houseList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      container: null,
      searchVal: "",
    };
  },
  components: {
    [Card.name]: Card,
    [Search.name]: Search,
    [Tag.name]: Tag,
    [Button.name]: Button
  },
  computed: {
    houseMessage() {
      this.houseList;
      return Date + 1;
    }
  },
  methods: {
    scroll(offset, isFixed) {
      console.log(offset, isFixed);
    },
    onCancel() {
      console, log(this.searchVal);
    },
    getMessageId(e){
      this.$emit('event',e)
    }
  },
  mounted() {
    this.container = this.$refs.container;
  }
};
</script>
<style lang="scss" scope>
.searchMessage {
  p{
    margin: 5px 0;
    padding: 0;
  }
  .searchMessage_card {
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.01),
      0px 3px 18px rgba(0, 0, 0, 0.12);
    border-radius: 20px;

  }
}
</style>

