import { createApp } from "vue";
import App from "./App.vue";

import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
import router from "@/router";

const app = createApp(App);

app.use(router);

app.mount("#app");
