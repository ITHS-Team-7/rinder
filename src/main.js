import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faSun,
  faBars,
  faCircleArrowLeft,
  faUserSecret,
  faPaperPlane,
  faFaceSmile,
  faPhoneVolume,
  faVideo,
  faEllipsisVertical,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import {
  faUser,
  faCircleXmark,
  faCircleUp,
  faCircleDown,
} from "@fortawesome/free-regular-svg-icons";

import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

/* add icons to the library */
library.add(
  faBars,
  faCircleXmark,
  faSun,
  faUser,
  faCircleUp,
  faCircleDown,
  faCircleArrowLeft,
  faFacebook,
  faInstagram,
  faUserSecret,
  faPaperPlane,
  faFaceSmile,
  faPhoneVolume,
  faVideo,
  faEllipsisVertical,
  faTrashCan
);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.use(bootstrap);

app.mount("#app");
