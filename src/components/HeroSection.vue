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
    <h1 class="heroText">
      {{ heroHeader }}
    </h1>
    <input class="signupBtn" type="button" name="" value="Sign up">
  </div>
</template>

<style scoped>
.backgroundImg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("../assets/dating.jpg");
  background-color: black;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
width: 100%;
height: 100%
}

</style>
