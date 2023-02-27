<template>
  <div id="chat">
    <h3>Chat</h3>
    <p>This is the chat component...</p>
    <div id="messagesContainer">
      <div v-for="message in chatLog" :class="'chatMessage ' + message.type">
        {{ message.time }} {{ message.message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatComponent",
  data() {
    return {
      chatLog: [
        { time: "20:35:41", message: "Hej :)", type: "sent" },
        {
          time: "20:36:22",
          message: "Hej och välkommen! Hur kan jag hjälpa dig idag?",
          type: "received",
        },
      ],
    };
  },
};
</script>

<style scoped>
#chat {
  border: 0.1rem solid red;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  background: #fff;
  color: #000;
}

#messagesContainer {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.chatMessage {
  background: #00bd7e;
  color: #fff;
}

.sent {
  margin-left: auto;
}

.received {
  margin-right: auto;
}
</style>
