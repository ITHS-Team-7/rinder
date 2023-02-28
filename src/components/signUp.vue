<template>
  <div class="login-form-container">
    <div class="login-form">
      <form>
        <h2>Rinder 💗</h2>
        <h3>Sign up and find love today</h3>
        <div class="form-group">
          <label for="email">Email </label>
          <input type="email" class="form-control" id="email" v-model="email" />
        </div>
        <div class="form-group">
          <label for="password">Password </label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
          />
        </div>
        <button type="submit" class="btn" @click.prevent="login()">
          Sign up
        </button>

        <div class="box">
          <h4>Or download our app</h4>
          <button type="submit" class="btn2">Rinder App</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {},
  },
};
</script>

<style scoped>
.login-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  display: flex;
  height: 370px;
  width: 260px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  text-align: center;
  padding: 10px 20px 20px 20px;
  margin: 100px;
  justify-content: center;
}

.btn {
  background-color: #ff4779;
  color: white;
  border-radius: 10px;
  width: 160px;
  height: 30px;
  margin-top: 10px;
}

.btn2 {
  background-color: #ff4779;
  color: white;
  border-radius: 10px;
  width: 160px;
  height: 30px;
}

.box {
  margin-top: 100px;
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
}

.form-group {
  width: 100%;
  padding: 1px 10px;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 20px;
  font-size: 14px;
}

form {
  width: 230px;
}
</style>
