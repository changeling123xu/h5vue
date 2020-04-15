<template>
  <div class="checkinNot">
    <div class="custom-card">
      <title-bar :title="'预定须知'" />
      <div class="bookingInfo-item">
        <label>闪订</label>
        <span>提交订单后，需要房东确认订单</span>
      </div>
      <div class="bookingInfo-item">
        <label>线下押金</label>
        <span>100元</span>
      </div>
      <div class="bookingInfo-item">
        <label>提供发票</label>
        <span>开具发票需与房东协商</span>
      </div>
      <div class="bookingInfo-item">
        <label>退订规则</label>
        <span>预订成功后取消或提前离店，订单金额不退还。</span>
      </div>
      <van-steps direction="vertical" :active="0">
        <van-step>
          <h3>现在预定</h3>
          <p>预定成功后不支持退订</p>
        </van-step>
        <van-step>
          <h3>退租12:00前</h3>
          <p>过时改天</p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>
<script>
import { Step, Steps } from 'vant'
import TitleBar from "components/TitleBar";

export default {
  data(){
    return{}
  },
  components:{
    [Steps.name]:Steps,
    [Step.name]:Step,
    TitleBar

  }
};
</script>
<style lang="scss" scope>
.checkinNot {
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.01), 0px 3px 18px rgba(0, 0, 0, 0.12);
  position: relative;
  z-index: -10;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 15px;
  margin-top: 30px;
  .custom-card {
  padding: 20px 15px 15px;

    .bookingInfo-item {
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
    }
  }
}

</style>
