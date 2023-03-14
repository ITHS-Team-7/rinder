<script setup>
import { RouterLink } from "vue-router";

import { lightTheme, darkTheme } from 'picmo';
import { createPopup } from "@picmo/popup-picker";

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
          ><img :src="logoFileName" width="238" alt="Rinder"
        /></RouterLink>
     
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
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
            <RouterLink
              class="nav-link"
              aria-current="page"
              to="/contact"
              >Contact
            </RouterLink>
          </li>
          <li>
            <RouterLink class="nav-link" aria-current="page" to="/chat"
              >Chat
            </RouterLink>
          </li>
          <li>
            <RouterLink class="nav-link" to="/login"
              >Log in
            </RouterLink>
          </li>
          <li>
              <RouterLink class="nav-link" to="/login"
              >
              <img
                class="arrow"
                src="../assets/images/arrow-right.svg"
                width="30"
              />
            </RouterLink>
          </li>
      </ul>
    </div>
  </div>
 <div class="clickableIconContainer" @click.stop="toggleDarkMode">
          <font-awesome-icon icon="fa-solid fa-sun" />
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
      darkMode: false
    };
  },
  methods: {
    showMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
      toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
  },
  computed: {
    logoFileName() {
      // Check the route and return the appropriate logo file name
      return this.$route.name === "about" || this.$route.name === "chat"
        ? logoBlack
        : logoPink;
    },
  },
    watch: {
    $route(to, from) {
      let path = to.name;
      const body = document.querySelector("body");
      // clear any styles
      body.style = "";
      console.log(path);
      switch (path) {
        case "home":
        case "terms":
          // default bg-image from main.css
          break;
        case "about":
          body.style.backgroundImage = 'none';
          body.style.backgroundColor = "#ffe1e8";
          break;
        case "chat":
          body.style.backgroundImage = 'none';
          body.style.backgroundColor = "#ffe1e8";
          break;
        case "contact":
          body.style.backgroundImage = 'none';
          body.style.backgroundColor = "#ffe1e8";
          break;
        case "login":
          body.style.backgroundImage = 'none';
          body.style.backgroundColor = "#ff4779";
          break;
        default:
          console.log("Header.vue $route watch - unknown page " + path);

          break;
      }
    },
    darkMode(status) {
      const body = document.querySelector('body')
      body.style.backgroundColor = this.darkMode ? this.bodyDarkModeBgColor : this.bodyBgColor;
    },
  }
};
</script>

<style scoped>
.navbar {
  background: rgb(37, 37, 37);
  background: linear-gradient(180deg, #252525 0%, rgba(0, 0, 0, 0) 100%);
  margin: 0;
}

.navbar-nav .nav-link{
    color: #fff;
    font-size: 20px;
}

.navbar-collapse{
    flex-grow: 0;
}
.arrow {
  vertical-align: middle;
  padding-bottom: 10px;
}

.navbar-toggler{
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
}

#header{
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

  box-shadow: 0 0 20px 3px #ffffff;;
}

/* Mobile version hidden hamburger menu */

@media screen and (max-width: 768px) {
   .arrow {
    width: 20px;
    padding-bottom: 4px;
  }
  .navbar-nav .nav-link{
    color: #fff;
    font-size: 16px;
}
}
</style>
