import { createStore } from "vuex";

export default createStore({
  state: {
    gender: sessionStorage.getItem("gender") || "",
    isloggedin: sessionStorage.getItem("isloggedin"),
    Darkmode: localStorage.getItem("Darkmode") || false,
  },
  mutations: {
    SetGender(state, gender) {
      state.gender = gender;
      sessionStorage.setItem("gender", gender);
    },
    Login(state, isloggedin) {
      state.islogedin = isloggedin;
      sessionStorage.setItem("islogedin", isloggedin);
    },
    ToggleDarkmode(state) {
      state.Darkmode = !state.Darkmode;
      localStorage.setItem("Darkmode", state.Darkmode);
    },
  },
});

