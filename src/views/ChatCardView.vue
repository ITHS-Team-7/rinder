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
