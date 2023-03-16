<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      message: "",
      submitted: false,
    };
  },
  methods: {
    mounted() {
      const darkMode = localStorage.getItem("Darkmode");
      if (darkMode === "true") {
        this.turnOnDarkMode();
      } else {
        this.turnOffDarkMode();
      }
    },
    onClick() {
      this.submitted = true;
    },
    checkDarkMode() {
      if (this.darkMode === true) {
        this.turnOnDarkMode();
      } else {
        this.turnOffDarkMode();
      }
    },
    turnOnDarkMode() {
      const body = document.querySelector("body");
      const text = document.querySelector(".infoClass");
      body.style.backgroundColor = "#000000";
      text.style.backgroundColor = "#000000";
      text.style.color = "#ffe1e8";
    },
    turnOffDarkMode() {
      const body = document.querySelector("body");
      const text = document.querySelector(".infoClass");
      body.style.backgroundColor = "#ffe1e8";
      text.style.backgroundColor = "#ffe1e8";
      text.style.color = "#252525";
    },
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
  computed: {
    btnDisabled() {
      return (
        this.name.length > 0 && this.email.length > 0 && this.message.length > 0
      );
    },
    darkMode() {
      return this.$store.state.Darkmode;
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
};
</script>

<template>
  <div class="info-container">
    <div id="ett" class="infoClass">
      <h1>GET IN TOUCH</h1>
      <p>
        Write to us with whatever you have in mind <br />
        and we will get back to you as soon as possible :)
      </p>
      <br />

      <h2>Contact</h2>
      <p><a href="mailto: info@rinder.com">info@rinder.com</a></p>
      <br />

      <h2>Based in</h2>
      <p>
        IT-högskolan, <br />
        Stockholm
      </p>
    </div>
    <div id="tva" class="contact-form">
      <form @submit.prevent>
        <div class="inside-form">
          <h1 class="hi-form">Hi.</h1>
          <input
            v-model="name"
            class="inputs"
            type="text"
            placeholder="name"
          /><br />
          <input
            v-model="email"
            class="inputs"
            type="email"
            placeholder="email"
          /><br />
          <textarea
            v-model="message"
            placeholder="message"
            class="inputs"
            rows="4"
          >
          </textarea
          ><br />
          <input
            @click="onClick"
            class="form-button"
            type="submit"
            :style="{ opacity: btnDisabled ? '' : '.6' }"
            value="submit"
            :disabled="!btnDisabled"
          />
          <p class="p-form" v-if="submitted">
            Thank you {{ name }} for your email. We have received it and will
            get back to you at {{ email }} soon!
          </p>
          <p v-else></p>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.dark-mode {
  background-color: black;
  color: white;
}
.infoClass {
  color: #252525;
  margin-top: 1em;
}
form {
  background-color: #8843e4;
  text-align: center;
  border-radius: 10px;
  align-items: center;
  padding: 3em;
  padding-bottom: 5em;
}
.hi-form {
  color: white;
}
.inputs {
  border: none;
  margin-top: 8px;
  width: 15em;
  border-radius: 2px;
}
.inside-form {
  width: 15em;

  margin: auto;
}

.infoClass a {
  color: #8843e4;
}

.emptyinputs {
  color: white;
}
.inside-form .form-button {
  float: right;
}
.form-button {
  background-color: var(--darkPink);
  color: var(--white);
  padding: 10px;
  padding-left: 35px;
  padding-right: 35px;
  font-size: 1vw;
  border: none;
  border-radius: 10px;
}
.p-form {
  margin-top: 4em;
  color: white;
}

.info-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 2em;
  grid-template-areas: "ett tva";
  margin-left: auto;
  margin-right: auto;
  max-width: 50em;
  margin-top: 15vh;
}

#ett {
  grid-area: ett;
}
#tva {
  grid-area: tva;
}

@media screen and (max-width: 823px) {
  .info-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 2em;
    grid-template-areas:
      "ett"
      "tva";
    margin-top: 1em;
    margin-bottom: 5rem;
  }

  #ett {
    grid-area: ett;
    text-align: center;
  }
  #tva {
    grid-area: tva;
    margin-left: auto;
    margin-right: auto;
  }
}
@media screen and (max-width: 1350px) {
  .form-button {
    background-color: var(--darkPink);
    color: var(--white);
    padding: 10px;
    padding-left: 35px;
    padding-right: 35px;
    font-size: 15px;
    border: none;
    border-radius: 10px;
  }
}
</style>
