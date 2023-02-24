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
import {fas} from "@fortawesome/free-solid-svg-icons";


/* add icons to the library */
library.add(faBars)


createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
/*const app = createApp(App);

app.use(router);

app.mount("#app");*/
