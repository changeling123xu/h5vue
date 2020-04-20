<template>
  <div class="order">
    <van-nav-bar class="customBack" title="订单详情" left-text="返回" left-arrow @click-left="onBack" />
    <div class="order-card">
      <van-card
        :price="houseOrder.price"
        :desc="houseOrder.introduce2"
        :title="houseOrder.introduce"
        :thumb="url+houseOrder.houseUrl+'.jpg'"
      />''
      <van-cell title="起租时间" :value="rentDate.star" />
      <van-cell title="到期时间" :value="rentDate.end" />
      <van-cell
        title="优惠金额"
        is-link
        :value="-(houseOrder.couponValue)/100+'元'"
        value-class="rightClass"
      />
      <van-cell title="隐私政策" is-link @click="privacy=true" value-class="rightClass" />
      <van-action-sheet v-model="privacy" title="隐私政策">
        <div
          class="content"
        >发布房源前，您应当已经依法取得所发布房源的房屋所有权或合法转租权，并应向“自如民宿”提供相关法律证明文件，包括但不限于身份证明、营业执照、房屋产所有权证、购房协议与发票、租赁协议、使用协议、经营资质等，并保证所提供的法律证明文件真实、有效。如您未能提供上述证明文件的，平台有权拒绝发布房源。</div>
      </van-action-sheet>
      <van-cell title="支付方式" is-link :value="payMethod.name" @click="show=true" />
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
      <van-action-sheet v-model="payList" :title="payMethod.name">
        <div class="content">
          <pay :showKeyboard="payList"  />
        </div>
      </van-action-sheet>
    </div>

    <van-submit-bar
      :price="houseOrder.totalPrice"
      button-text="提交订单"
      :loading="false"
      @submit="onSubmit"
    />
  </div>
</template>
<script>
import { SubmitBar, NavBar, Card, Cell, ActionSheet } from "vant";
import { getHouseOrder } from "api/house";
import { translateTime } from "utils/index";
import pay from "./pay";
export default {
  data() {
    return {
      houseOrder: {},
      url: "https://xusu.oss-cn-chengdu.aliyuncs.com/mingsu/shoutRent/",
      rentDate: {},
      show: false,
      actions: [
        { name: "支付宝" },
        { name: "微信" },
        { name: "QQ支付", id: "描述信息" }
      ],
      payMethod: {},
      privacy: false,
      payList: false
    };
  },
  mounted() {
    this.getHouseOrder();
  },
  computed: {
    order() {
      this.houseOrder;
      return new Date();
    }
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    onSubmit() {
      this.payList = true;
    },
    async getHouseOrder() {
      let config = 2;
      // let config= this.$route.params.id
      let { data } = await getHouseOrder({ id: config });
      this.houseOrder = data;
      this.houseOrderData(data);
      console.log(data);
    },
    houseOrderData(data) {
      let day = (data.rentend - data.rentStar) / 1000 / 60 / 60 / 24;
      this.houseOrder.totalPrice = day * data.price * 100 - data.couponValue;
      this.rentDate.star = translateTime(data.rentStar - 0);
      this.rentDate.end = translateTime(data.rentend - 0);
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.payMethod = item;
      console.log(item);

      this.show = false;
    }
  },

  components: {
    [SubmitBar.name]: SubmitBar,
    [NavBar.name]: NavBar,
    [Card.name]: Card,
    [Cell.name]: Cell,
    [ActionSheet.name]: ActionSheet,

    pay
  }
};
</script>
<style lang="scss" scoped>
$color-red: #ee0a24;
.order {
  .order-card {
    width: 95vw;
    margin: 0 auto;
    border: 1px solid rgba($color: #000000, $alpha: 0.1) {
      radius: 20px;
    }
    border-radius: 20px;
    .rightClass {
      color: $color-red;
    }
    .img-icon {
      height: 20px;
    }
    .content {
      height: 50vh;
    }
  }
}
</style>
