<script>
import data from "../assets/data/users.json";
export default {
  data() {
    return {
      users: data,
    };
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="row justify-content-center" style="padding-top: 10vh">
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
<style>
html {
  overflow-y: scroll;
}
.card {
  background-color: #ffe1e8;
  max-height: 100%;
}
.con {
  max-width: 175px;
}
.cardtop {
  width: 24rem;
  margin: auto;
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
