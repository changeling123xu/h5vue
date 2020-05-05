<template>
  <div class="pay_keybord">
    <van-password-input :value="value" :focused="showKeyboard" @focus="showKeyboard = true" />
    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>
<script>
import { NumberKeyboard, PasswordInput ,Toast} from "vant";
export default {
  data() {
    return {
      value: ""
    };
  },
  props: {
    showKeyboard: false
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length == 6) {
        Toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner"
        });
        setTimeout(function(){
        Toast.success('支付成功');
        },1000)
        this.$emit("onsubmit", true);
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  },
  components: {
    [NumberKeyboard.name]: NumberKeyboard,
    [PasswordInput.name]: PasswordInput,
    [Toast.name]:Toast
  }
};
</script>
<style lang="scss" scoped>
.pay_keybord {
  height: 60vh;
}
</style>
