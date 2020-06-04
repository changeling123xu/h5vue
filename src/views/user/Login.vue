<template>
  <div>
    <video autoplay loop poster="https://xusu.oss-cn-chengdu.aliyuncs.com/image/login.png" id="bgvid">
      <source
        src="https://xusu.oss-cn-chengdu.aliyuncs.com/image/coverr-soap-bubbles-outdoor-1567244523991.mp4"
        type="video/mp4"
      />
    </video>
    <div class="header">
      <div class="logo">
        <img src="http://img.cixi518.com/ljh_logo.jpeg" alt="default_logo" />
      </div>
    </div>
    <div class="content">
      <!-- <div class="logo">
        <img src="http://img.cixi518.com/ljh_logo.jpeg" alt="default_logo" />
      </div> -->
      <van-field
        placeholder="手机号码"
        v-model="phoneNumber"
        left-icon="phone-o"
        @blur="phoneNumberRight"
        :error-message="phoneNumberError"
      />
      <!-- eye -->
      <van-field
        v-if="loginWay==='password'"
        placeholder="登录密码"
        v-model="password"
        left-icon="lock"
        :type="passwordType"
        :error-message="passwordError"
      >
        <van-icon slot="right-icon" @click="switchPasswordType" :name="passwordIcon" />
      </van-field>
      <van-field v-else placeholder="短信验证码" v-model="code" left-icon="comment-o" type="text">
        <template #button>
          <van-button size="small" type="primary" @click="sendVerifyCode">{{btnCode}}</van-button>
        </template>
      </van-field>
      <div class="button-wrap">
        <van-button size="large" @click="handleLogin" type="info">登录</van-button>
      </div>
      <div class="more-wrap">
        <router-link class="link" to="/register">没有账号？去注册</router-link>
        <div class="switch-way" @click="switchLoginWay">{{loginWayObj.toggleMsg}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Field, Icon, Button, Notify } from "vant";
import { mapActions } from "vuex";
import VerifyCodeBtn from "@/components/VerifyCodeBtn";
import md5 from "js-md5";

export default {
  name: "Login",
  data() {
    return {
      phoneNumber: "15700486454",
      password: "editor123",
      code: '',
      btnCode: "发送验证码",
      loginWay: "password",
      passwordType: "password",
      phoneNumberError: "",
      passwordError:''
    };
  },
  methods: {
    sendVerifyCode() {
      let code =''
      if (this.phoneNumber.length === 11 && this.phoneNumberRight) {
        // 根据需求做判断
        code=parseInt(Math.random()*1000000)
        let timeCode = 60;
        let timer = setInterval(() => {
          let t = timeCode - 1;
          this.btnCode = "已发送" + t + "s";
          timeCode--;
          if (timeCode <= 1) {
            clearInterval(timer);
          }
        }, 1000);
        this.$notify({
          message: `您的手机验证码为：${code}，验证码30分钟内有效，请勿泄露给任何人`,
          color: "#ad0000",
          background: "#ffe1e1"
        });
      } else {
        this.phoneNumberError = "请输入正确的手机号";
      }
    },
    switchPasswordType() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
    },
    switchLoginWay() {
      this.password = this.code = "";
      this.loginWay = this.loginWay === "password" ? "verifyCode" : "password";
    },
    handleLogin() {
      const data = {
        phoneNumber: this.phoneNumber,
        password: md5(this.password),
        $router: this.$router,
        $route: this.$route
      };
      
      if(this.password && this.phoneNumber){
        this.login(data);
      }
    },
    ...mapActions({
      login: "user/login"
    })
  },
  computed: {
    loginWayObj: function() {
      if (this.loginWay === "password") {
        return {
          icon: "closed-eye",
          toggleMsg: "验证码登录"
        };
      }
      return {
        icon: "eye",
        toggleMsg: "密码登录"
      };
    },
    phoneNumberRight() {
      let value = this.phoneNumber;
      // 1.1 当输入的手机号大于10位进行验证
      if (value.length > 10) {
        return /[1][3,4,5,6,7,8][0-9]{9}$/.test(value);
      } else {
        return false;
      }
    },
    passwordIcon: function() {
      return this.passwordType === "password" ? "closed-eye" : "eye";
    }
  },
  components: {
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Notify.name]: Notify,
    VerifyCodeBtn
  }
};
</script>
<style lang="scss" scoped>
#bgvid{
    position: absolute;
    z-index: -1;
    height: 100vh;
    width: 100vw;
}
.header {
  width: 100%;
  height: 165px;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
}
.content {
  width: 100%;
  height: auto;
  padding: 0 15px;
  box-sizing: border-box;
  // background-color: rgb(66, 60, 60);
  .logo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .button-wrap {
    width: 100%;
    height: auto;
    margin-top: 15px;
  }
}
.more-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  font-size: 14px;
  a.link {
    color: #1989fa;
  }
  .switch-way {
    color: #333;
  }
}
</style>
