import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

import {fas} from "@fortawesome/free-solid-svg-icons";

import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

/* add icons to the library */
library.add(faBars)
library.add(faFacebook)
library.add(faInstagram)



const app = createApp(App);

app.use(router);
app.use(bootstrap)

app.mount("#app");