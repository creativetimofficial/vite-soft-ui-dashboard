import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";

import SoftUIDashboard from "./soft-ui-dashboard";
import api from "./plugins/api";

import i18n from "@/i18n/config";

const app = createApp(App);
app.use(i18n);
const config = app.config;
config.globalProperties.$t = i18n.global.t;
config.globalProperties.$tc = i18n.global.tc;
config.globalProperties.$te = i18n.global.te;
config.globalProperties.$d = i18n.global.d;
config.globalProperties.$n = i18n.global.n;

app.use(store);
app.use(router);
app.use(SoftUIDashboard);
app.use(api);
app.mount("#app");
