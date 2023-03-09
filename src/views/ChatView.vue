<script setup>
import ChatComponent from "../components/ChatComponent.vue";
</script>

<template>
  <chat-component :openChatUsernameOnLoad="$route.query.username" :openLastChatOnLoad="false"></chat-component>
</template>

<script>
export default {
  name: "ChatView",
};
</script>

<style scoped></style>
