<script setup>
import SignUp from "../components/signUp.vue";
</script>

<template>
  <SignUp />
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
};
</script>
