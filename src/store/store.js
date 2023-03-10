import { createStore } from "vuex";

export default createStore({
  state: {
    gender: sessionStorage.getItem("gender") || "",
    islogedin: sessionStorage.getItem("islogedin"),
    Darkmode: localStorage.getItem("Darkmode") || false,
  },
  mutations: {
    SetGender(state, gender) {
      state.gender = gender;
      sessionStorage.setItem("gender", gender);
    },
    Login(state, islogedin) {
      state.islogedin = islogedin;
      sessionStorage.setItem("islogedin", islogedin);
    },
    ToggleDarkmode(state) {
      state.Darkmode = !state.Darkmode;
      localStorage.setItem("Darkmode", state.Darkmode);
    },
  },
});
