<script>
import data from "../assets/data/users.json";
export default {
  computed: {
    userFilter() {
      if (this.genderpref.length > 0) {
        return this.users.filter((users) =>
          users.gender.includes(this.genderpref)
        );
      } else if (this.genderpref === undefined) {
        return this.users;
      }
      return this.users;
    },
  },
  data() {
    return {
      users: data,
      i: this.start,
      genderpref: this.gend,
    };
  },
  methods: {
    onclick() {
      this.i += 3;
    },
    chatClick(userName) {
      this.$router.push({
        name: "chat",
        params: { userName: userName },
      });
    },
  },
  props: {
    start: Number,
    gend: String,
  },
};
</script>
<template>
  <div class="container-fluid">
    <div class="row justify-content-center" style="padding-top: 10vh">
      <div
        v-for="(user, index) in userFilter.slice(0, i)"
        :key="index"
        class="card col-4 border-0 cardtop"
      >
        <img :src="user.avatar" class="card-img" alt="Profil bild" />
        <div class="card-img-overlay">
          <div class="text-con">
            <div class="text-con2">
              <h4>{{ user.firstName }} {{ user.lastName }}</h4>
              <p>{{ user.description }}</p>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-primary border-0"
            @click="chatClick(user.userName)"
          >
            Chat
          </button>
        </div>
      </div>
      <div class="but">
        <button
          type="button"
          @click="onclick()"
          class="btn btn-primary border-0 ViewMore"
        >
          View More
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card {
  background-color: #ffe1e8;
  max-height: 100%;
}
.cardtop {
  width: 24rem;
  margin-left: 5vw;
  margin-right: 5vw;
  padding-top: 8vh;
}
.btn-primary {
  margin-top: 2%;
  margin-left: auto;
  margin-right: auto;
  background-color: #8843e4;
  min-width: 100px;
  max-width: 200px;
  max-height: 50px;
}
.btn-primary:hover {
  background-color: #8843e4;
}
.card-img-overlay {
  border-radius: 1em;
  display: flex;
  flex-direction: column;
}
.but {
  width: 100vw;
  justify-content: center;
  display: flex;
}
.text-con {
  border-radius: 1em;
  background-color: rgba(255, 255, 255, 0.432);
  min-height: 40%;
  margin-top: 60%;
  display: table;
}
.text-con2 {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
@media screen and (max-width: 650px) {
  .text {
    min-height: 50%;
    margin-top: 45%;
  }
  .btn-primary {
    margin-top: 3%;
  }
}
</style>
