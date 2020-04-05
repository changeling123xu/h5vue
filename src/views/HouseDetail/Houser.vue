<template>
  <div class="introduction">
    <van-tabs v-model="activeName">
      <van-tab title="房东介绍" name="a">
        <!-- <van-card desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg">
          <template #tags>
            <van-tag plain type="danger">实名认证</van-tag>
            <van-tag plain type="danger">个人房东</van-tag>
          </template>
          <template #footer>
            <span>asdfasdfasdfasdfasdfasdfa</span>
          </template>
        </van-card>-->
        <div class="card">
          <div class="introduction-header">
            <div class="owner-icon">
              <van-image round width="60px" height="60px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div>
            <div class="owner-info">
              <p>{{info.name}}</p>
              <div class="owner-tags">
                <van-tag type="danger" v-for="(i,index) in info.tag" :key="index">{{i}}</van-tag>
              </div>
            </div>
          </div>
          <div class="introduction-comment">
            <div v-for="(item,index) in comment" :key="index">
              <span>{{item.lable}}</span>
              <span>{{item.value}}</span>
            </div>
          </div>
          <div class="introduction-desc">{{desc}}</div>
        </div>
      </van-tab>
      <van-tab title="房源评价" name="b">
        <div class="card">
          <div class="evaluation van-hairline--bottom" v-for="(item,index) in message" :key="index">
            <div class="evaluation-top">
              <div>
                <van-image round width="60px" height="60px" :src="item.url" />
              </div>
              <div class="owner-info">
                <div>
                  <p>{{item.name}}</p>
                  {{item.date}}
                </div>
                <div class="rates">
                  <van-rate v-model="value" readonly size="10px" />
                  <div>{{item.score}}分</div>
                </div>
              </div>
            </div>
            <div class="evaluation-desc">
              <p>{{item.desc}}</p>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Tabs, Tab, Tag, Card, Image, Rate } from "vant";
export default {
  data() {
    return {
      activeName: "a",
      value: 4
    };
  },
  props: {
    comment: {
      type: Array,
      default: () => [
        { lable: "好评率: ", value: "100%" },
        { lable: "回复率: ", value: "100%" },
        { lable: "回复速度: ", value: "很快" }
      ]
    },
    desc: {
      type: String,
      default: "本店开业10年有余，喜迎八方有志青年。"
    },
    info: {
      type: Object,
      default: () => {
        return { name: "有志青年", tag: ["实名认证", "个人房东"] };
      }
    },
    message: {
      type: Array,
      default: () => [
        {
          name: "花果山",
          date: "2-2",
          url: "https://img.yzcdn.cn/vant/cat.jpeg",
          score: "4",
          desc: "房子非常好，住得很开心哦"
        }
      ]
    }
  },
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Tag.name]: Tag,
    [Card.name]: Card,
    [Image.name]: Image,
    [Rate.name]: Rate
  }
};
</script>
<style lang="scss" scope>
.introduction {
  .card {
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.01),
      0px 3px 18px rgba(0, 0, 0, 0.12);
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 15px;
    margin-top: 10px;
    padding: 20px 15px 15px;
    .introduction-header {
      display: flex;
      margin-top: 20px;
      padding-left: 30px;
      width: 90%;
      .owner-icon {
        widows: 60px;
        height: 60px;
      }
      .owner-info {
        padding-left: 20px;
        p {
          font-size: 20px;
          font-weight: 500;
          margin-bottom: 5px;
        }
      }
    }
    .introduction-comment {
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
    }
    .introduction-desc {
      width: 90%;
      margin: 0 auto;
    }
  }
  .evaluation {
    margin-bottom: 10px;
    .evaluation-top {
      display: flex;
      .owner-info {
        padding-left: 20px;
        display: flex;
        width: 100%;
        position: relative;
        p {
          font-size: 20px;
          font-weight: 500;
          margin-bottom: 5px;
        }
        .rates {
          position: absolute;
          right: 10px;
          text-align: center;
          color: #ffd21e;
        }
      }
    }
  }
}
</style>
