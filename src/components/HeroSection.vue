<script setup>
import { RouterLink } from "vue-router";
</script>

<script>
export default {
  data() {
    return {
      heroHeader: "Find the one.",
    };
  },
};
</script>
<template>
  <div class="backgroundImg">
    <div class="textContainer">
      <h1 class="heroText">
        {{ heroHeader }}
      </h1>
      <router-link to="/login">
        <input class="signupBtn" type="button" name="" value="Sign up" />
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.textContainer {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.textContainer .signupBtn {
  margin: 0 auto;
  display: block;
}
.heroText {
  color: var(--white);
  font-size: 6.5vw;
  text-align: center;
  margin-bottom: 0.25em;
}
.signupBtn {
  background-color: var(--purple);
  color: var(--white);
  padding: 10px;
  padding-left: 35px;
  padding-right: 35px;
  font-size: 2vw;
  border: none;
  border-radius: 10px;
}

a {
  text-decoration: none;
}

@media screen and (min-width: 1400px) {
  .heroText {
    font-size: 6em;
  }
  .signupBtn {
    font-size: 2em;
  }
}

@media screen and (max-width: 600px) {
  .heroText {
    font-size: 2.4em;
    white-space: nowrap;
    overflow: hidden;
  }
}

@media screen and (max-width: 800px) {
  .signupBtn {
    font-size: 1em;
  }
}
</style>
