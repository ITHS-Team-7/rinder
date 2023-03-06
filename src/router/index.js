import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ChatView from "../views/ChatView.vue";
<<<<<<< HEAD
import AccountView from "../views/AccountView.vue";
=======
import TermsPage from "../views/TermsPage.vue";
import ContactPage from "../views/ContactView.vue";
>>>>>>> 3b64382ca0cb25f44ea26cc5693a0788a7243366

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/chat",
      name: "chat",
      component: ChatView,
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactPage,
    },
    {
      path: "/terms",
      name: "terms",
      component: TermsPage,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: AccountView,
    },
  ],
});

export default router;
