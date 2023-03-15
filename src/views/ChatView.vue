<script setup>
import ChatComponent from "../components/ChatComponent.vue";
</script>

<template>
  <chat-component
    v-if="$store.state.isloggedin"
    :openChatUsernameOnLoad="$route.params.userName"
    :openLastChatOnLoad="false"
  ></chat-component>
  <div id="notSignedInMessage" v-else>
    You need to sign in in order to chat with other users
  </div>
</template>

<style scoped>
#notSignedInMessage {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 1.2rem;
}

#chat {
  margin: 5rem auto 0 auto;
}
</style>
