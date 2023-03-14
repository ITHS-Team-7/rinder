<script setup>
import AboutCards from "../components/AboutCards.vue";
<<<<<<< HEAD
import ChatCards from "../components/ChatCards.vue";
import UserGraph from "../components/UserGraph.vue";
</script>
<template>
  <AboutCards></AboutCards>
  <ChatCards :start="3"></ChatCards>
  <UserGraph></UserGraph>
=======
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
>>>>>>> 2fa2efde6a432342e238dddc76c7be7f20a934f9
</template>

<style scoped></style>
