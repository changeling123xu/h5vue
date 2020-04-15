<template>
  <div>
    <button @click="sendMessage">dianwo</button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    sendMessage() {
      var ws = new WebSocket("ws://localhost:8089/");
      ws.onopen = function (){
        ws.send('123')

      }
      ws.onmessage = function(event) {
        var data = event.data;
        console.log(JSON.parse(data).text);

      };
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
