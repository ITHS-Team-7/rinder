<template>
  <div v-if="showLogIn" class="login-form-box">
    <div class="login-form">
      <h2>Rinder 💗</h2>
      <h3>Log in and find love today</h3>
      <form>
        <div class="form-input">
          <label for="email">Email </label>
          <input type="email" class="form-text" id="email" v-model="email" />
        </div>
        <div class="form-input">
          <label for="password">Password </label>
          <input
            type="password"
            class="form-text"
            id="password"
            v-model="password"
          />
        </div>
        <button type="submit" class="button" @click.prevent="login()">
          Log in
        </button>
        <h4>
          Don't have an account? Sign up
          <a @click="onClick" href="#"><b>here</b></a>
        </h4>
      </form>
      <h5>Or download our app</h5>
      <button type="submit" class="button2">Rinder App</button>
    </div>
  </div>
  <div v-else class="signup">
    <div class="signup-form-box">
      <div class="signup-form">
        <h2>Rinder 💗</h2>
        <h3>Sign up and find love today</h3>
        <div class="su-input">
          <label for="firstName">First Name </label>
          <input
            type="text"
            class="su-text"
            id="firstName"
            v-model="firstName"
          />
        </div>
        <div class="su-input">
          <label for="lastname">Last Name </label>
          <input type="text" class="su-text" id="lastName" v-model="lastName" />
          <div class="su-input">
            <label for="email">Email </label>
            <input type="email" class="su-text" id="email" v-model="email" />
          </div>
          <div class="su-input">
            <label for="password">Password </label>
            <input
              type="password"
              class="su-text"
              id="password"
              v-model="password"
            />
            <div class="choose">
              <label for="gender">Choose your gender </label>
              <select name="gender" id="gender">
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
        <p>I am looking for</p>
        <div>
          <input type="radio" id="female" name="choice" value="FEMALE" /><label
            for="female"
            >Female
          </label>
          <input type="radio" id="male" name="choice" value="MALE" /><label
            for="male"
            >Male
          </label>
          <input type="radio" id="all" name="choice" value="ALL" /><label
            for="all"
            >All
          </label>
        </div>
        <div class="birthday">
          <label for="age">Fill in your birthday </label>
          <input type="date" id="age" name="birthday" />
        </div>
        <button type="submit" class="subutton">Sign up now!</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      showLogIn: true,
    };
  },
  methods: {
    login() {
      if (
        this.email === "richardcarlsson@hotmail.se" &&
        this.password === "12345"
      ) {
        this.$store.commit("SetGender", "Female");
        this.$store.commit("Login", true);
        this.$router.push({ name: "newchat" });
      } else {
        alert("Invalid password or email");
      }
    },
    onClick: function () {
      this.showLogIn = false;
    },
  },
};
</script>

<style scoped>
.login-form-box {
  display: flex;
  justify-content: center;
}
.login-form {
  height: 550px;
  width: 350px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  text-align: center;
  padding: 10px 20px 20px 20px;
  justify-content: center;
}
.button {
  background-color: #ff4779;
  color: white;
  border-radius: 10px;
  width: 160px;
  height: 30px;
  margin-top: 10px;
  border: 0;
  margin-bottom: 10px;
}
button:hover {
  background-color: white;
  color: #ff4779;
}
.button2 {
  background-color: #ff4779;
  color: white;
  border-radius: 10px;
  width: 160px;
  height: 30px;
  border: 0;
  margin-top: 5px;
}
.button2:hover {
  background-color: white;
  color: #ff4779;
}
h2 {
  font-size: 10px;
  text-align: left;
  top: 0;
  margin: 0;
  padding: 0;
}
h3 {
  font-size: 16px;
  margin-top: 10px;
}
h4 {
  font-size: 13px;
  margin: 0;
}
h5 {
  margin-top: 150px;
}
form {
  margin-top: 50px;
}
.form-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1px 10px;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 15px;
  font-size: 14px;
}
.form-text {
  height: 35px;
  border-radius: 10px;
  width: 200px;
  border: none;
}
.login-form-box {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.signup-form-box {
  display: flex;
  justify-content: center;
}
.signup-form {
  height: 550px;
  width: 350px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  text-align: center;
  padding: 10px 20px 20px 20px;
  justify-content: center;
}
.subutton {
  background-color: #ff4779;
  color: white;
  border-radius: 10px;
  width: 160px;
  height: 30px;
  margin-top: 25px;
  border: 0;
}
.subutton:hover {
  background-color: white;
  color: #ff4779;
}
.su-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1px 10px;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 15px;
  font-size: 14px;
}
.su-text {
  height: 35px;
  border-radius: 10px;
  width: 200px;
  border: none;
}
input[type="radio"] {
  margin-right: 10px;
  margin-left: 10px;
}
p {
  margin-top: 12px;
  margin-bottom: 0;
}
.choose {
  margin-top: 12px;
}
.choose label {
  margin-right: 10px;
}
.birthday {
  margin-top: 12px;
}
.birthday label {
  margin-right: 10px;
}
.signup {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
