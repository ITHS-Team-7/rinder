<script setup>
import data from "../assets/data/users.json";
</script>

<template>
  <div class="abouttext">
    <h1>Find your partner today!</h1>
    <p>
      Rinder is the latest way to find you new partner! Check out what a few of
      our users have to say about ther experience:
    </p>
  </div>
  <div class="container-fluid">
    <div class="row justify-content-center" style="padding-top: 5vh">
      <div
        v-for="(user, index) in users.slice(102, 105)"
        :key="index"
        class="card col-sm-4 border-0 cardtop"
      >
        <div class="card border-0 con">
          <img
            :src="user.avatar"
            class="img-fluid rounded-circle"
            alt="Profil bild"
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ user.firstName }} {{ user.lastName }}</h5>
          <p class="card-text">Gender: {{ user.gender }}</p>
          <p class="card-text">Age: {{ user.age }}</p>
          <p class="card-text">{{ user.description }}</p>
          <p class="card-text">Signed up since: {{ user.signupDate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: data,
    };
  },
};
</script>

<style>
.card {
  background-color: #ffe1e8;
  max-height: 100%;
}
.con {
  max-width: 175px;
}
.cardtop {
  width: 24rem;
  margin-left: 5vw;
  margin-right: 5vw;
  padding-top: 8vh;
}
.card-body {
  border-radius: 1em;
  text-align: center;
  background-color: #9747ff;
}
.card-title {
  padding-top: 70px;
}
.img-fluid {
  max-width: 175px;
  position: absolute;
  top: -100px;
  left: 103%;
  transform: translateX(-50%);
}
.cardtop {
  margin-top: 5vh;
  margin-bottom: 5vh;
}
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
@media screen and (max-width: 600px) {
  .cardtop {
    width: 20rem;
  }
  .img-fluid {
    max-width: 150px;
    position: absolute;
    top: -75px;
    left: 85%;
    transform: translateX(-50%);
  }
}
@media screen and (max-width: 325px) {
  .cardtop {
    width: 16rem;
  }
  .img-fluid {
    max-width: 125px;
    position: absolute;
    top: -65px;
    left: 66%;
    transform: translateX(-50%);
  }
}
</style>
