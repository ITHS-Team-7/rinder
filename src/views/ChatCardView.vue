<script setup>
import ChatCards from "../components/ChatCards.vue";
</script>

<template>
  <ChatCards
    v-if="isloggedin"
    :start="3"
    :gend="gender"
    @openChat="openChat"
  ></ChatCards>
  <div class="con" v-else>
    You need to sign in in order to chat with other users
  </div>
</template>

<script>
export default {
  computed: {
    gender() {
      return this.$store.state.gender;
    },
    isloggedin() {
      return this.$store.state.isloggedin;
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
