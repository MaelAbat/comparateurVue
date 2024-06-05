import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "./components/LoginPage.vue";
import Players from "./components/FirstTest.vue";
import Comparison from "./components/Comparison.vue";
import Inscription from "./components/Inscription.vue";
import PlayersForm from "./components/FormPlayer.vue";
import axios from "axios";

const routes = [
  {
    path: "/",
    name: "Players",
    component: Players,
  },
  {
    path: "/comparison",
    name: "Comparison",
    component: Comparison,
    props: (route) => ({
      player1: route.query.player1,
      player2: route.query.player2,
    }),
  },
  {
    path: "/login",
    name: "Connexion",
    component: LoginPage,
  },
  {
    path: "/inscription",
    name: "Inscription",
    component: Inscription,
  },
  {
    path: "/playersgestion/:id?",
    name: "playersgestion",
    component: PlayersForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   // Vérifier si l'utilisateur est connecté avant d'accéder à certaines pages
//   const publicPages = ["/login"];
//   const authRequired = !publicPages.includes(to.path);
//   const token = localStorage.getItem("token");

//   if (authRequired && !token) {
//     return next("/login");
//   }

//   next();
// });

export async function login(credentials) {
  try {
    const response = await axios.post(
      "https://node-api-rosy.vercel.app/auth/login",
      credentials
    );
    const token = response.data.token;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default router;
