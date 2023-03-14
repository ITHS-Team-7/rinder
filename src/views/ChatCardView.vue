<script setup>
import ChatCards from "../components/ChatCards.vue";
</script>

<template>
  <ChatCards
    v-if="islogedin"
    :start="3"
    :gend="gender"
    @openChat="openChat"
  ></ChatCards>
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
