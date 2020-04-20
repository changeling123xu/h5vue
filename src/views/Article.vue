<template>
  <div class="Message">
    <van-nav-bar
      class="customBack"
      title="客服"
      fixed
      left-text="返回"
      left-arrow
      @click-left="onBack"
    />
    <div class="chatlist">
      <ul>
        <template v-for="(item,index) in records">
          <li class="chat-mine" v-if="item.type==0" :key="index">
            <div class="chat-user">
              <img :src="userData.avatar" />
            </div>
            <div class="time">
              <cite>
                <i>{{item.time}}</i>
                {{item.name}}
              </cite>
            </div>
            <div class="chat-text">{{item.message}}</div>
          </li>
          <li v-if="item.type==1" :key="index">
            <div class="chat-user">
              <img src="https://xusu.oss-cn-chengdu.aliyuncs.com/mingsu/homeIcon/home.png" />
            </div>
            <div class="time">
              <cite>
                {{item.name}}
                <i>{{item.time}}</i>
              </cite>
            </div>
            <div class="chat-text">{{item.message}}</div>
          </li>
        </template>
      </ul>
    </div>
    <div class="buttonMess">
      <van-tabbar :safe-area-inset-bottom="true">
        <van-field v-model="message" center clearable placeholder="请输入" @keyup.enter='onSubmit'>
          <template #button>
            <van-button size="small" type="primary"  @click="onSubmit">发送</van-button>
          </template>
        </van-field>
      </van-tabbar>
    </div>

    <!-- <button @click="sendMessage">dianwo</button> -->
  </div>
</template>
<script>
import { Form, Field, Button, NavBar, Tabbar } from "vant";
import { translateTime } from "utils/index";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      username: "访客",
      password: "",
      message: "",
      user: {
        username: "访客",
        userId: new Date().getTime(),
        connected: false,
        linked: false,
        isKefu: false,
        type: 0 //0:访客，1：客服
      },
      records: []
    };
  },
  // mounted(){
  //   this.$socket.emit("login",data );
  // },
  sockets: {
    //查看socket是否渲染成功
    connect() {
      this.user.connected = true;
      this.$socket.emit("login", this.user);
      console.log("链接成功");
    },
    linked(name) {
      this.user.connected = true;
      console.log("关联成功！");
    },
    disconnect() {
      console.log("断开链接");
    }, //检测socket断开链接
    reconnect() {
      console.log("重新链接");
    },
    //客户端接收后台传输的socket事件
    message(data) {
      console.log("data", data); //接收的消息
    },
    newMessage(data) {
      console.log("newMessage", data);
      this.records.push({
        name: data.username,
        time: translateTime(new Date().getTime()),
        type: 1,
        message: data.message
      });
    },
    error() {
      this.user.linked = false;
      this.user.connected = false;
      console.log("连接已断开...");
    }
  },
  computed: {
    ...mapGetters(["userData"])
  },

  methods: {
    onBack() {
      this.$router.go(-1);
    },
    onSubmit(values) {
      this.$socket.emit("newMessage", {
        id: this.user.userId,
        message: this.message
      });
      this.records.push({
        name: this.user.username,
        time: translateTime(new Date().getTime()),
        type: this.user.type,
        message: this.message
      });
      this.message = "";
    }
  },
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,

    [NavBar.name]: NavBar,
    [Tabbar.name]: Tabbar
  }
};
</script>
<style lang="scss" scoped>
.Message {
  .chatlist {
    position: absolute;
    top: 60px;
    bottom: 48px;
    left: 0px;
    right: 0px;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 10px;
  }

  .chatlist-bottom {
    bottom: 48px;
  }

  .chatlist-bottom-collapse {
    bottom: 198px;
  }

  .chatlist ul {
    min-height: 300px;
  }

  .chatlist ul .chat-mine {
    text-align: right;
    padding-left: 0;
    padding-right: 60px;
  }

  .chatlist ul li {
    position: relative;
    /*font-size: 0;*/
    margin-bottom: 10px;
    padding-left: 60px;
    min-height: 68px;
  }

  .chat-mine .chat-user {
    left: auto;
    right: 3px;
  }

  .chat-user {
    position: absolute;
    left: 3px;
  }

  .chat-text,
  .chat-user {
    display: inline-block;
    vertical-align: top;
    /*font-size: 14px;*/
  }

  .chat-user img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }

  .time {
    width: 100%;
  }

  cite {
    left: auto;
    right: 60px;
    text-align: right;
  }

  cite {
    font-style: normal;
    line-height: 24px;
    font-size: 12px;
    white-space: nowrap;
    color: #999;
    text-align: left;
  }

  cite i {
    font-style: normal;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 12px;
  }

  .chat-mine .chat-text {
    margin-left: 0;
    text-align: left;
    background-color: #33df83;
    color: #fff;
  }

  .chat-text {
    position: relative;
    line-height: 22px;
    /*margin-top: 25px;*/
    padding: 10px 15px;
    background-color: #eee;
    border-radius: 3px;
    color: #333;
    word-break: break-all;
    max-width: 462px\9;
  }

  .chat-text,
  .chat-user {
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
  }

  .chat-text img {
    max-width: 100%;
    vertical-align: middle;
  }

  .chat-user {
    position: absolute;
    left: 3px;
  }

  .chat-text:after {
    content: "";
    position: absolute;
    left: -10px;
    top: 15px;
    width: 0;
    height: 0;
    border-style: solid dashed dashed;
    border-color: #eee transparent transparent;
    overflow: hidden;
    border-width: 10px;
  }

  .chat-mine .chat-text:after {
    left: auto;
    right: -10px;
    border-top-color: #33df83;
  }
}
</style>
