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
      <input class="signupBtn" type="button" name="" value="Sign up" />
    </div>
  </div>
</template>

<style scoped>
.backgroundImg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("../assets/dating.jpg");
  background-color: black;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  width: 100%;
  height: 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
}

.textContainer {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.textContainer .signupBtn {
  margin: 0 auto;
  display: block;
}
.heroText {
  color: var(--white);
  font-family: sans-serif;
  font-size: 7vw;
  text-align: center;
  margin-bottom: 0.5em;
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
    font-size: 2.6em;
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
