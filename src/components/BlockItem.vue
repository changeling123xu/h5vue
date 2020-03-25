<template>
  <div>
    <el-row type="flex" class="row-bg rowName">
      <el-col :span="10" v-for="(o,index) in cardList" :key="index">
          <div class="grid-content bg-purple rowCard" @click="cardEvent(o)">
            <img :src="o.url" class="image" />
            <div>
              <span>
                <b>{{o.name}}</b>
                {{o.title}}
              </span>
              <div class="bottom clearfix">
                <span class="button">房源</span>
              </div>
              <div>
                <van-icon name="good-job-o" />
                {{o.good}}
                <van-icon name="chat-o" />
                {{o.chat}}
              </div>
            </div>
          </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { Icon } from "vant";

export default {
  data() {
    return {
      currentDate: new Date()
    };
  },
  props: {
    cardList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    cardEvent(item) {
      this.$emit("cardEvent", item);
    }
  },
  components: {
    [Icon.name]: Icon
  }
};
</script>
<style lang="scss" scope>
.rowName {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .rowCard {
    position: relative;
  }
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  position: absolute;
  right: 10px;
  top: 90px;
  padding: 2px 8px 4px 8px;
  border-radius: 4px;
  background: #fff;
}

// .button {
//   padding: 0;
//   float: right;
// }

.image {
  width: 100%;
  display: block;
  border-radius: 10px;
}
</style>
