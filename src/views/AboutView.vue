<script setup>
import AboutCards from "../components/AboutCards.vue";
</script>
<template>
  <AboutCards></AboutCards>
</template>

<style>
body {
  background-image: none;
  background-color: #ffe1e8;
}
</style>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
