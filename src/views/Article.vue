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

      // switch (ws.readyState) {
      //   case WebSocket.CONNECTING:
      //     ws.send("Start connecting");
      //     // do something
      //     break;
      //   case WebSocket.OPEN:
      //     // do something
      //     ws.send("Hello Server!");
      //     break;
      //   case WebSocket.CLOSING:
      //     ws.send("is closeing");
      //     // do something
      //     break;
      //   case WebSocket.CLOSED:
      //     // do something
      //     break;
      //   default:
      //     // this never happens
      //     break;
      // }
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
