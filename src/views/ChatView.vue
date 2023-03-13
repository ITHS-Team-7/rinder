<script setup>
import ChatCards from "../components/ChatCards.vue";
import ChatComponent from "../components/ChatComponent.vue";
</script>

<template>
  <ChatCards
    :start="3"
    :gend="gender"
    v-if="islogedin && chat === 0"
    @openChat="openChat"
  ></ChatCards>
  <chat-component
    v-else-if="islogedin && chat === 1"
    :openChatUsernameOnLoad="$route.params.userName"
    :openLastChatOnLoad="false"
  ></chat-component>
  <div v-else>You need to sign in in order to chat with other users</div>
</template>

<script>
export default {
  computed: {
    gender() {
      return this.$store.state.gender;
    },
    islogedin() {
      return this.$store.state.islogedin;
    },
  },
  data() {
    return {
      chat: 0,
    };
  },
  methods: {
    openChat() {
      this.chat = 1;
    },
  },
};
</script>

<style scoped></style>
