<template>
  <div class="message">
    <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft">
    </van-nav-bar>
    <div class="message-image">
      <div class="image-desc">
        <van-image round width="3rem" height="3rem" :src="userData.avatar" />
        <div id="message-names" class="message-name">
          <van-uploader :after-read="afterRead">
            <van-button plain hairline type="info" size="small">更改头像</van-button>
          </van-uploader>
        </div>
      </div>
    </div>
    <el-collapse v-model="activeNames" @change="handleChange" accordion>
      <el-collapse-item :title="'名称 :  '+userData.name" name="2">
        <div>
          <van-field v-model="userData.name" type="tel" label="更改名称:">
            <!-- <template #button>
              <van-button size="small" type="primary">确定修改</van-button>
            </template>-->
          </van-field>
        </div>
      </el-collapse-item>
      <el-collapse-item :title="'联系方式 :  '+userData.phone" name="1">
        <div>
          <van-field v-model="userData.phone" type="tel" label="更改手机号:">
            <!-- <template #button>
              <van-button size="small" type="primary">确定修改</van-button>
            </template>-->
          </van-field>
        </div>
      </el-collapse-item>

      <el-collapse-item title="个人介绍" name="3">
        <div>
          <!-- {{userData.introduction}} -->
          <van-field
            v-model="userData.introduction"
            rows="1"
            autosize
            type="textarea"
            placeholder="请输入留言"
          />
        </div>
      </el-collapse-item>
      <van-button plain hairline type="info" size="large" @click="subMit">提交更改</van-button>
    </el-collapse>
  </div>
</template>

<script>
import { Image, Field, Button, NavBar, Uploader } from "vant";
import FooterTabbar from "components/FooterTabbar";
import { mapGetters, mapActions } from "vuex";
import { updateInfo, userUploadImage } from "api/user";
export default {
  data() {
    return {
      show: true,
      activeNames: 1,
      user: {}
    };
  },
  computed: {
    ...mapGetters(["userData"]),
    ...mapActions({
      getInfo: "user/getInfo"
    })
  },
  methods: {

    onClickLeft() {
      // this.$router.push({ path: "/" });
      this.$router.go(-1)
    },
    handleChange(val) {
      this.user.phone = this.userData.phone;
      this.user.introduction = this.userData.introduction;
      console.log(this.user);
    },
    afterRead(option) {
      let files = option.content;
      let formData = new FormData();
      formData.append("avantFile", option.file);
      this.user.avatar = option.content;
      userUploadImage(formData).then(data => {
        this.userData.avatar = data.imageUrl;
      });
    },
    subMit() {
      console.log(this.userData);
      updateInfo(this.userData).then(data => {
        this.getInfo;
      });
    }
  },
  components: {
    [Image.name]: Image,
    [Field.name]: Field,
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Uploader.name]: Uploader,
    FooterTabbar
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.message {
  width: 90%;
  margin: 0 auto;
  .message-image {
    padding-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    .image-desc {
      .message-name {
        font-size: 18px;
        font-weight: 400;
        text-align: center;
      }
    }
  }
}
</style>
