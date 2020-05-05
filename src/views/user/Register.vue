<template>
  <div class="register">
    <video
      autoplay
      loop
      poster="https://xusu.oss-cn-chengdu.aliyuncs.com/image/login.png"
      id="bgvid"
    >
      <source
        src="https://xusu.oss-cn-chengdu.aliyuncs.com/image/coverr-soap-bubbles-outdoor-1567244523991.mp4"
        type="video/mp4"
      />
    </video>
    <div class="content">
      <van-field
        placeholder="手机号码"
        label="账号："
        v-model="phoneNumber"
        @blur="phoneNumberRight"
        :error-message="phoneNumberError"
      />
      <van-field
        v-if="loginWay==='password'"
        placeholder="输入密码"
        label="密码："
        v-model="password"
        :type="passwordType"
        :error-message="passwordError"
      >
        <van-icon slot="right-icon" @click="switchPasswordType" :name="passwordIcon" />
      </van-field>
      <van-field
        v-if="loginWay==='password'"
        placeholder="确认密码"
        label="确认密码："
        v-model="passwordAgain"
        :type="passwordType"
        :error-message="passwordError"
      >
        <van-icon slot="right-icon" @click="switchPasswordType" :name="passwordIcon" />
      </van-field>
      <!-- <van-field placeholder="短信验证码" v-model="password"  type="text">
        <template #button>
          <van-button size="small" type="primary" @click="sendVerifyCode">{{btnCode}}</van-button>
        </template>
      </van-field>-->
      <div class="button-wrap">
        <van-button size="large" @click="handleLogin" type="info">立即注册</van-button>
      </div>
      <div class="more-wrap">
        <router-link class="link" to="/login">已有账号？去登录</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { Field, Icon, Button, Notify, Toast } from "vant";
import { addUser, login } from "api/user";
import { mapActions } from "vuex";
import md5 from "js-md5";
export default {
  data() {
    return {
      phoneNumber: "",
      password: "",
      passwordAgain: "",
      code: "",
      // btnCode: "SNVYS",
      loginWay: "password",
      passwordType: "password",
      phoneNumberError: "",
      passwordError:''
    };
  },
  computed: {
    passwordIcon: function() {
      return this.passwordType === "password" ? "closed-eye" : "eye";
    }
  },
  methods: {
    switchPasswordType() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
    },
    sendVerifyCode() {
      this.btnCode = "AISNSN";
    },
    phoneNumberRight() {
      let value = this.phoneNumber;
      // 1.1 当输入的手机号大于10位进行验证
      if (value.length > 10) {
        this.phoneNumberError= /[1][3,4,5,6,7,8][0-9]{9}$/.test(value)?'':'手机号输入错误';
      } else {
        this.phoneNumberError='手机号输入错误'
      }
    },
    handleLogin() {
      let config = {
        phoneNumber: this.phoneNumber,
        password: md5(this.password)
      };
      // login(config)

      if (this.password === this.passwordAgain && this.password && this.passwordAgain) {
        if(this.password.length<6){
          this.passwordError='密码长度需大于6位'
          return 
        }
         this.passwordError=''
        addUser(config).then(item => {
          Toast.success('注册成功');
          item?Toast.success('注册成功'):Toast.fail('注册失败');          
          // console.log(item,'item');
          
        });
      }else{
        this.passwordError='密码不一致或密码为空'

      }
    }
  },
  components: {
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Notify.name]: Notify
  }
};
</script>
<style lang="scss" scoped>
.register {
  #bgvid {
    position: absolute;
    z-index: -1;
    height: 100vh;
    width: 100vw;
  }
  .content {
    width: 100%;
    height: auto;
    padding: 0 15px;
    padding-top: 30vh;

    box-sizing: border-box;
    .button-wrap {
      width: 100%;
      height: auto;
      margin-top: 15px;
    }
  }
}
</style>