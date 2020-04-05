<template>
  <div class="checkinNotes">
    <div class="checkinNotes-div">
      <title-bar :title="'入住须知'" />

      <div class="checkinNotes-item">
        <label>入住时间</label>
        <span>14:00后入住/12:00前退房</span>
      </div>
      <div class="checkinNotes-item">
        <label>接待时间</label>
        <span>08:00-22:00</span>
      </div>
      <div class="checkinNotes-item">
        <label>卫生打扫</label>
        <span>1客1扫</span>
      </div>
      <div class="checkinNotes-item">
        <label>提供床品</label>
        <span>免费提供</span>
      </div>
      <div class="checkinNotes-item">
        <label>接待要求</label>
        <span>
          <div :span="12" v-for="(item,index) in allow" :key="index" :class="!item.isAllow && 'delete'">{{item.text}}</div>
          <!-- <div class="delete">允许携带宠物</div>
          <div class="delete">允许接待老人</div>
          <div class="delete">适合做饭</div>
          <div class>适合男人</div>
          <div class="delete">允许聚会</div>
          <div class="delete">适合女性</div>

          <div class="delete">允许商业拍摄</div>

          <div class="delete">允许吸烟</div>

          <div class="delete">接待外宾</div> -->
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import {} from "vant";
import TitleBar from "components/TitleBar";
export default {
  data() {
    return {
      allow: [
        {
          isAllow: true,
          text: "允许接待儿童",
          id:'1'
        },
        {
          isAllow: false,
          text: "允许携带宠物",
          id:'2'
        },
        {
          isAllow: false,
          text: "允许接待老人",
          id:"3"
        },
        {
          isAllow: false,
          text: "适合做饭",
          id:"4"
        },
        {
          isAllow: false,
          text: "适合男人",
          id:"5"
        },
        {
          isAllow: false,
          text: "允许聚会",
          id:"6"
        },
        {
          isAllow: false,
          text: "允许商业拍摄",
          id:"7"
        },
        {
          isAllow: false,
          text: "适合女性",
          id:"8"
        }
      ]
    };
  },
  methods: {},
  components: {
    TitleBar
  }
};
</script>
<style lang="scss" scope>
.checkinNotes {
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.01), 0px 3px 18px rgba(0, 0, 0, 0.12);
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 15px;
  margin-top: 10px;
  padding: 20px 15px 15px;
  .checkinNotes-div {
    .checkinNotes-item {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 10px;
      margin-left: 10px;
      label {
        width: 60px;
        font-size: 14px;
        font-weight: 300;
        color: #333;
        text-align: justify;
        max-height: 20px;
        margin-right: 14px;
        line-height: 24px;
      }
      span {
        display: inline-block;
        // width: calc(100% - 67px);
        font-size: 14px;
        color: #333;
        line-height: 24px;
      }
      .delete {
        text-decoration-line: line-through;
        color: #c7cacb;
      }
    }
  }
}
</style>
