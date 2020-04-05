<template>
  <div class="custom">
    <van-swipe class="custom-swipe" @change="onChange" :autoplay="3000">
      <van-swipe-item v-for="(item, index) in houseMessage.houseImage" :key="index">
        <img v-lazy="item" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/{{houseMessage.houseImage.length}}</div>
      </template>
    </van-swipe>
    <div class="custom-card">
      <div class="custom-tag">
        <van-tag type="warning">标签</van-tag>
        <van-tag
          v-for="(item ,index) in houseMessage.houseDetail.titleTagList"
          :key="index"
          plain
          type="primary"
        >{{item}}</van-tag>
      </div>
      <div class="custom-title">
        <van-row>
          <van-col span="18">
            <div class="titlebars">
              <span>{{houseMessage.houseDetail.title}}</span>
            </div>
            <span class="price">
              {{houseMessage.houseDetail.price}}
              <span>元/天</span>
            </span>
          </van-col>
          <van-col span="6">
            <div class="title-zan">
              <van-tag type="warning">赞</van-tag>
              <p>{{houseMessage.houseDetail.score}}</p>
              <p>查看评论</p>
            </div>
          </van-col>
        </van-row>
        <van-row class="custom-introduce">
          <van-col
            v-for="(item,index) in houseMessage.houseDetail.introduce"
            :key="index"
            span="12"
          >
            <van-icon name="success" color="red" />
            {{item}}
          </van-col>
        </van-row>
        <div>
          <van-cell title="选择日期区间" :value="date" @click="show = true" />
          <!-- <van-calendar v-model="show" color="##FFFFFF" /> -->
          <van-calendar v-model="show" type="range" @confirm="onConfirmDate" color="#1989fa" />
          <!-- 优惠券单元格 -->
          <van-coupon-cell
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            @click="showList = true"
          />
          <!-- 优惠券列表 -->
          <van-popup
            v-model="showList"
            round
            position="bottom"
            style="height: 90%; padding-top: 4px;"
          >
            <van-coupon-list
              :coupons="coupons"
              :chosen-coupon="chosenCoupon"
              :disabled-coupons="disabledCoupons"
              @change="onChanges"
              @exchange="onExchange"
            />
          </van-popup>
        </div>
      </div>
    </div>
    <houser />
    <booking-notice />
    <book />
    <div class="footer">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="房东" />
        <van-goods-action-icon icon="shop-o" text="电话" />
        <van-goods-action-button color="#ff5000" type="warning" text="立即预定" />
      </van-goods-action>
    </div>
  </div>
</template>
<script>
import {
  Swipe,
  SwipeItem,
  Tag,
  Row,
  Col,
  Rate,
  Calendar,
  Cell,
  CouponList,
  CouponCell,
  Popup,
  Icon,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Steps,
  Step
} from "vant";
import { getHouseDetail } from "api/house";
import TitleBar from "components/TitleBar";
import Book from "./Book"
import BookingNotice from "./BookingNotice"
import Houser from "./Houser"

export default {
  data() {
    const coupon = {
      available: 1,
      condition: "无使用门槛\n最多优惠100元",
      reason: "",
      value: 150,
      name: "九折优惠",
      startAt: 1689104000,
      endAt: 1714592000,
      valueDesc: "1.5",
      unitDesc: "元"
    };
    return {
      current: 0,
      houseId: this.$route.query.houseId ||"h0001",
      show: false,
      date: "",
      day: "",
      houseMessage: {
        houseDetail: {},
        houseImage:[]
      },
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList: false
    };
  },
  mounted() {
    this.getHouseDetail();
  },
  computed: {
    config() {
      return {
        houseId: this.houseId
      };
    }
  },
  methods: {
    async getHouseDetail() {
      let { data } = await getHouseDetail(this.config);
      this.houseMessage.houseDetail = data.houseDetail[0];
      this.houseMessage.houseDetail.titleTagList = data.houseDetail[0].titleTagList.split(
        ","
      );
      this.houseMessage.houseDetail.introduce = data.houseDetail[0].introduce.split(
        "·"
      );
      this.houseMessage.houseImage=data.houseImage.map(item=>{
        return 'https://xusu.oss-cn-chengdu.aliyuncs.com/mingsu/shoutRent/'+item.houser_image+'.jpg'
      })
    },
    onChange(index) {
      this.current = index;
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirmDate(date) {
      const [start, end] = date;
      this.show = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
      this.day = (end.valueOf() - start.valueOf()) / 1000 / 60 / 60 / 24;
      debugger;
    },
    onChanges(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Tag.name]: Tag,
    [Row.name]: Row,
    [Col.name]: Col,
    [Rate.name]: Rate,
    [Calendar.name]: Calendar,
    [Cell.name]: Cell,
    [CouponCell.name]: CouponCell,
    [Popup.name]: Popup,
    [CouponList.name]: CouponList,
    [Icon.name]: Icon,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [Steps.name]:Steps ,
    [Step.name]: Step,

    TitleBar,
    Book,
    BookingNotice,
    Houser
  }
};
</script>
<style lang="scss" scope>
.custom {
  p {
    margin: 0;
    padding: 0;
  }
  .custom-swipe {
    width: 100%;
    height: auto;
    position: relative;
    z-index: 10;
    img {
      width: 100%;
      height: 234px;
      // height: auto;
    }
    .custom-indicator {
      position: absolute;
      right: 50%;
      bottom: 20px;
      padding: 2px 5px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .custom-card {
    border-radius: 10px;
    height: auto;
    width: 90%;
    margin: 0 auto;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.01),
      0px 3px 18px rgba(0, 0, 0, 0.12);
    margin-top: -15px;
    position: relative;
    z-index: 11;
    .custom-tag {
      padding-top: 20px;
      padding-left: 10px;
    }
    .custom-title {
      // display: flex;
      .price {
        padding-left: 10px;
        font-size: 30px;
        color: #ff552e;
        font-weight: 900;
        span {
          font-size: 20px;
        }
      }
      .titlebars {
        margin-top: 20px;
        padding-left: 10px;
        font-size: 20px;
        font-weight: 500;
      }
      .title-zan {
        margin-top: 20px;
        text-align: center;
        width: 80%;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.01),
          0px 3px 18px rgba(0, 0, 0, 0.12);
        padding-bottom: 10px;
      }
      .custom-introduce {
        text-align: center;
        width: 90%;
        margin: 0 auto;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
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
        width: calc(100% - 67px);
        font-size: 14px;
        color: #333;
        line-height: 24px;
      }
    }
  }
}
</style>
