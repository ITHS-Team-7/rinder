<script setup>
import ChatComponent from "../components/ChatComponent.vue";
</script>

<template>
  <chat-component
    v-if="islogedin"
    :openChatUsernameOnLoad="$route.params.userName"
    :openLastChatOnLoad="false"
  ></chat-component>
  <div class="con" v-else>
    You need to sign in in order to chat with other users
  </div>
</template>

<script>
export default {
  computed: {
    islogedin() {
      return this.$store.state.islogedin;
    },
  },
};
</script>

<style scoped>
.con {
  padding-top: 10vh;
  text-align: center;
  font-size: 2.2rem;
}
@media screen and (max-width: 800px) {
  .con {
    font-size: 1.5rem;
  }
}
</style>
