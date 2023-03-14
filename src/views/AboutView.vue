<script setup>
import AboutCards from "../components/AboutCards.vue";
</script>
<script>
export default {
  computed: {
    gender() {
      return this.$store.state.gender;
    },
  },
};
</script>
<template>
  <AboutCards></AboutCards>
</template>

<style scoped></style>
