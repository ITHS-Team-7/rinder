<script setup>
import { RouterLink, RouterView } from "vue-router";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

</script>

<template>
  <div>
    <div class="nav-menu"> 
        <font-awesome-icon icon="fa-solid fa-bars" @click="showMenu()" />
    <div class="logo">
          <RouterLink to="/"
            ><img src="../assets/images/logo.png" width="238" alt="Rinder"
          /></RouterLink>
        </div>
    <!--<i class="fas fa-bars" @click="showMenu()"> </i> -->
      <div
        class="nav-content"
        :class="this.showMobileMenu ? 'open-menu' : 'closed-menu'"
      >
        
        <ul class="nav-items">
          <li>
            <RouterLink class="nav-link active" aria-current="page" to="/chat"
              >About
</RouterLink
            >
          </li>
          <li><RouterLink class="nav-link" to="/login">Log in <img class="arrow" src="../assets/images/arrow-right.svg" width="41"/> </RouterLink></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMobileMenu: false,
    };
  },
  methods: {
    showMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
  },
};
</script>

<style scoped>
.nav-menu {
  background: rgb(37, 37, 37);
  background: linear-gradient(
    180deg,
    rgba(37, 37, 37, 1) 3%,
    rgba(255, 255, 255, 1) 60%
  );
}
.logo img{
display: block;
  float: left;
  font-size: 2em;
  padding: 10px 20px;
  text-decoration: none;
}

.arrow{
    vertical-align: middle;
    padding-bottom:10px;
}

.nav-content {
  display: flex;
  justify-content: right;
  padding: 10px 30px;
  align-items: center;
  bottom: 2vh;
}

.nav-items {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;

}

.nav-items li {
  padding: 0 10px;
}

.nav-items li a{
  display: block;
  padding: 20px 20px;
  text-decoration: none;
  font-size: 32px;
  color: #fff;
}

.svg-inline--fa {
  display: none;
}
/* Mobile version hidden hamburger menu */

@media screen and (max-width: 768px) {
  .nav-menu {
    padding-top: 10px;
    position: absolute;
    width: 100%;
    text-align: right;
    padding-right: 2rem;
    padding-top: 2rem;
  }

  .open-menu {
    opacity: 1;
    height: 150px;
  }

  .closed-menu {
    opacity: 0;
    height: 0;
    padding: 0;
  }

  .nav-content {
    display: inline-block;
    z-index: 100;
    position: relative;
    transition: all 0.2s ease-out;
    padding:0;
    bottom:5vh;
  }

  .nav-items {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }
.nav-items li a{
    color: #fff;
    font-size: 24px;
}
  .logo img{
    width: 139px;
    position: relative;
    bottom: 5vh;
  }

  .svg-inline--fa {
    display: inline;
    text-align: right;
    padding: 0 10px 10px 0;
}
.arrow{
    width: 30px;
}
}
</style>
