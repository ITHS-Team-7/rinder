<script setup>
import AboutCards from "../components/AboutCards.vue";
import ChatCards from "../components/ChatCards.vue";
</script>
<script>
export default {
  data() {
    return {
      gender: "",
    };
  },
};
</script>
<template>
  <div class="abouttext">
    <h1>Find your partner today!</h1>
    <p>
      Rinder is the latest way to find you new partner! Check out what a few of
      our users have to say about ther experience:
    </p>
  </div>
  <AboutCards></AboutCards>
  <ChatCards :start="3" :gend="gender"></ChatCards>
</template>

<style scoped>
.abouttext {
  padding-left: 10vw;
  max-width: 800px;
  padding-right: 2vw;
}
.abouttext p {
  margin-top: 6vh;
  font-size: 1.5rem;
}
.abouttext h1 {
  font-size: 3rem;
  margin-top: 5vh;
}
@media screen and (max-width: 800px) {
  .abouttext p {
    font-size: 1.2rem;
  }
  .abouttext h1 {
    font-size: 2.7rem;
  }
}
@media screen and (max-width: 500px) {
  .abouttext p {
    font-size: 1.1rem;
  }
  .abouttext h1 {
    font-size: 1.75rem;
  }
}
</style>
