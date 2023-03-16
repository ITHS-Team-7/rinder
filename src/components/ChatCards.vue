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
    darkMode() {
      return this.$store.state.Darkmode;
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
    checkDarkMode() {
      if (this.darkMode === true) {
        this.turnOnDarkMode();
      } else {
        this.turnOffDarkMode();
      }
    },
    onclick() {
      this.i += 3;
    },
    chatClick(userName) {
      this.$router.push({
        name: "chat",
        params: { userName: userName },
      });
    },
    turnOnDarkMode() {
      const body = document.querySelector("body");
      const cards = document.querySelectorAll(".card");
      body.style.backgroundColor = "#000000";
      cards.forEach((card) => {
        card.style.backgroundColor = "#000000";
      });
    },
    turnOffDarkMode() {
      const body = document.querySelector("body");
      const cards = document.querySelectorAll(".card");
      body.style.backgroundColor = "#ffe1e8";
      cards.forEach((card) => {
        card.style.backgroundColor = "#ffe1e8";
      });
    },
  },
  mounted() {
    const darkMode = localStorage.getItem("Darkmode");
    if (darkMode === "true") {
      this.turnOnDarkMode();
    } else {
      this.turnOffDarkMode();
    }
  },
  watch: {
    darkMode() {
      if (this.darkMode === true) {
        this.turnOnDarkMode();
      } else {
        this.turnOffDarkMode();
      }
    },
    i(newValue) {
      if (newValue) {
        setTimeout(() => {
          const darkMode = localStorage.getItem("Darkmode");
          if (darkMode === "true") {
            this.turnOnDarkMode();
          } else {
            this.turnOffDarkMode();
          }
        }, 1);
      }
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
  max-height: 100%;
}
.cardtop {
  width: 24rem;
  margin: 5%;
  margin-bottom: 8%;
}
.btn-primary {
  margin-bottom: 5%;
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
  margin-top: 1rem;
}
.text-con {
  border-radius: 1em;
  background-color: #ffffff6e;
  min-height: 32%;
  margin-top: 68%;
  display: table;
  backdrop-filter: blur(12px);
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
