<script setup>
import AboutCards from "../components/AboutCards.vue";
import ChatCards from "../components/ChatCards.vue";
</script>
<template>
  <AboutCards></AboutCards>
  <ChatCards :start="3"></ChatCards>
</template>

<style></style>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
