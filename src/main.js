import { createApp } from "vue";

import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import SoftUIDashboard from "./soft-ui-dashboard";
import api from "./plugins/api";
import  VueSelect  from "vue-select";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase'
import i18n from "@/i18n/config";
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


  
const app = createApp(App);
app.use(i18n);
app
  .use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  })
const config = app.config;
config.globalProperties.$t = i18n.global.t;
config.globalProperties.$tc = i18n.global.tc;
config.globalProperties.$te = i18n.global.te;
config.globalProperties.$d = i18n.global.d;
config.globalProperties.$n = i18n.global.n;
app.use(
  Vue3Toasity,
  {
    autoClose: 3000,
    // ...
  }
)
app.use(ElementPlus)
app.component("v-select", VueSelect)
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(store);
app.use(router);
app.use(SoftUIDashboard); 
app.use(api);
app.mount("#app");
