<script setup>
import ChatComponent from "../components/ChatComponent.vue";
</script>

<template>
  <chat-component
    v-if="isloggedin"
    :openChatUsernameOnLoad="$route.params.userName"
    :openLastChatOnLoad="false"
  ></chat-component>
  <div class="con" v-else>
    You need to sign in in order to chat with other users
  </div>
  <div class="con"></div>
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
    darkMode() {
      return this.$store.state.Darkmode;
    },
  },
  data() {
    return {
      chat: 0,
    };
  },
  watch: {
    darkMode() {
      if (this.darkMode === true) {
        this.turnOnDarkMode();
      } else {
        this.turnOffDarkMode();
      }
    },
  },
  methods: {
    checkDarkMode() {
      if (this.darkMode === true) {
        this.turnOnDarkMode();
      } else {
        this.turnOffDarkMode();
      }
    },
    turnOnDarkMode() {
      const body = document.querySelector("body");
      const text = document.querySelector(".con");
      body.style.backgroundColor = "#8843e4";
      text.style.color = "#ffe1e8";
    },
    turnOffDarkMode() {
      const body = document.querySelector("body");
      const text = document.querySelector(".con");
      body.style.backgroundColor = "#ffe1e8";
      text.style.color = "#000000";
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

  darkMode() {
    if (this.darkMode === true ) {
      this.turnOnDarkMode();
    } else {
      this.turnOffDarkMode();
    }
  },
};

</script>

<style scoped>
.con {
  padding-top: 10vh;
  text-align: center;
  font-size: 2.2rem;
}
@media screen and (max-width: 800px) {
  .con {
    font-size: 1.5rem;
  }
}
#chat {
  margin: 5rem auto 0 auto;
}
</style>
