<script setup>
import { RouterLink } from "vue-router";

import logoBlack from "../assets/images/logo_black.png";
import logoPink from "../assets/images/logo.png";
</script>

<template>
  <div
    id="header"
    :class="darkMode ? 'dark' : ''"
    @someEvent="actionForSomeEvent"
  >
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <RouterLink to="/"
          ><img
            :src="
              $store.state.Darkmode ||
              $route.name === 'home' ||
              $route.name === 'login'
                ? logoPink
                : logoBlack
            "
            width="238"
            alt="Rinder"
        /></RouterLink>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li>
              <RouterLink class="nav-link" aria-current="page" to="/about"
                >About
              </RouterLink>
            </li>
            <li>
              <RouterLink class="nav-link" aria-current="page" to="/contact"
                >Contact
              </RouterLink>
            </li>
            <li>
              <RouterLink
                class="nav-link active"
                aria-current="page"
                to="/newchat"
                >Chat
              </RouterLink>
            </li>
            <li class="loggedIn" v-if="isloggedin">
              <RouterLink class="nav-link" to=""
                ><span @click="loggout()">Richard</span>
                <img
                  class="rounded-circle"
                  src="../assets/images/Richard.png"
                  width="41"
                />
              </RouterLink>
            </li>
            <li v-else>
              <RouterLink class="nav-link" to="/login">Log in </RouterLink>
            </li>
          </ul>
          <div class="clickableIconContainer" @click="ToggleDarkmode()">
            <font-awesome-icon icon="fa-solid fa-sun" />
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMobileMenu: false,
      bodyBgColor: "#ffe1e8",
      bodyDarkModeBgColor: "#000",
    };
  },
  methods: {
    showMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    ToggleDarkmode() {
      this.$store.commit("ToggleDarkmode");
    },
    loggout() {
      this.$store.commit("Login", false);
      this.$router.push({ name: "login" });
    },
  },
  computed: {
    logoFileName() {
      // Check the route and return the appropriate logo file name
      return this.$route.name === "about" || this.$route.name === "chat"
        ? logoPink
        : logoPink;
    },
    isloggedin() {
      return this.$store.state.isloggedin;
    },
  },
  watch: {
    $route(to) {
      let path = to.name;
      const body = document.querySelector("body");
      // clear any styles
      body.style = "";
      console.log(path);
      switch (path) {
        case "home":
        case "terms":
        case "login":
          // default bg-image from main.css
          break;
        case "about":
          body.style.backgroundImage = "none";
          body.style.backgroundColor = "#ffe1e8";
          break;
        case "chat":
          body.style.backgroundImage = "none";
          body.style.backgroundColor = "#ffe1e8";
          break;
        case "newchat":
          body.style.backgroundImage = "none";
          body.style.backgroundColor = "#ffe1e8";
          break;
        case "contact":
          body.style.backgroundImage = "none";
          body.style.backgroundColor = "#ffe1e8";
          break;

        default:
          console.log(
            "HeaderComponent.vue $route watch - unknown page " + path
          );

          break;
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  background: rgb(37, 37, 37);
  background: linear-gradient(180deg, #252525 0%, rgba(0, 0, 0, 0) 100%);
  margin: 0;
}

.loggedIn span {
  color: white;
  font-weight: bold;
}

.loggedIn img {
  margin-left: 0.7rem;
}

.navbar-nav {
  align-items: baseline;
}

.navbar-nav .nav-link {
  color: #fff;
  font-size: 20px;
}

.navbar-collapse {
  flex-grow: 0;
}
.arrow {
  vertical-align: middle;
  padding-bottom: 10px;
}

.navbar-toggler {
  background-color: #fff;
}
.clickableIconContainer {
  font-size: 2.3em;
  margin: auto 0;
  cursor: pointer;
  display: inline;
  min-width: 2rem;
  text-align: center;
  color: #fff;
  margin-left: 0.3rem;
}

#header {
  --textColor: #000;
  --bgColor: #fff;
  --iconHoverColor: #3c008d;
  --scrollBarColor: rgba(0, 0, 0, 0.9);
  --scrollBarTrackColor: inset 0 0 6px rgba(136, 136, 136, 0.9);
  --lastMessageColor: #282828;
  --messageInputBg: #fff;
  --messageInputColor: #000;
  --messageInputPlaceholderColor: #555;
  --lastMessageIconColor: #1b7200;
  --profileInfoTypeColor: #003bbf;

  border-radius: 10px;
  color: var(--textColor);
}

#header.dark {
  --textColor: #fff;
  --bgColor: #000;
  --iconHoverColor: #b37aff;
  --scrollBarColor: rgba(255, 255, 255, 0.4);
  --scrollBarTrackColor: inset 0 0 6px rgba(148, 103, 103, 0.9);
  --lastMessageColor: #d5d5d5;
  --messageInputBg: #323232;
  --messageInputColor: #fff;
  --messageInputPlaceholderColor: #d7d7d7;
  --lastMessageIconColor: #2bb302;
  --profileInfoTypeColor: #00c4ff;

  box-shadow: 0 0 20px 3px #ffffff;
}

/* Mobile version hidden hamburger menu */

@media screen and (max-width: 768px) {
  .arrow {
    width: 20px;
    padding-bottom: 4px;
  }
  .navbar-nav .nav-link {
    color: #fff;
    font-size: 16px;
  }
}
</style>
