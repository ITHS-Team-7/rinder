<script setup>
import AboutCards from "../components/AboutCards.vue";
import UserGraph from "../components/UserGraph.vue";
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
  <UserGraph></UserGraph>
</template>

<style scoped></style>
