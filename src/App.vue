<template>
  <sidenav
    v-if="$store.state.showSidenav"
    :custom_class="$store.state.mcolor"
    :class="[
      $store.state.isTransparent,
      $store.state.isRTL ? 'fixed-end' : 'fixed-start',
    ]"
  />
  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
    :style="$store.state.isRTL ? 'overflow-x: hidden' : ''"
  >
    <!-- nav -->
    <navbar
      v-if="$store.state.showNavbar"
      :class="[navClasses]"
      :text-white="$store.state.isAbsolute ? 'text-white opacity-8' : ''"
      :min-nav="navbarMinimize"
    />
    <router-view />
    <app-footer v-show="$store.state.showFooter" />
    <configurator
      :toggle="toggleConfigurator"
      :class="[
        $store.state.showConfig ? 'show' : '',
        $store.state.hideConfigButton ? 'd-none' : '',
      ]"
    />
  </main>
  <base-loading :isLoading="$store.state.isShowLoading"></base-loading>
  <popup-setting v-if="$store.state.isShowSetting"></popup-setting>
</template>
<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Sidenav from "./examples/Sidenav/index.vue";
import Configurator from "@/examples/Configurator.vue";
import Navbar from "@/examples/Navbars/Navbar.vue";
import AppFooter from "@/examples/Footer.vue";
import BaseLoading from "./views/components/BaseLoading.vue";
import BaseToast from "./views/components/BaseToast.vue";
import { mapMutations } from "vuex";
import jwt from "jsonwebtoken";
import PopupSetting from "./views/popups/PopupSetting.vue";

export default {
  name: "App",
  components: {
    Sidenav,
    Configurator,
    Navbar,
    AppFooter,
    BaseLoading,
    PopupSetting,
    BaseToast,
  },
  created() {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const decodedToken = jwt.decode(token);
      this.$store.state.role = jwt.decode(token).role;
      this.$store.state.thisAccountName = jwt.decode(token).name;
      console.log( this.$store.state.thisAccountName);
      this.$store.state.isLoggedIn = true;
      this.$store.state.cinemaName = decodedToken.cinemaName;
    }

    this.$i18n.locale = localStorage.getItem('locale')??'vi';


  
  },
  computed: {
    navClasses() {
      return {
        "position-sticky blur shadow-blur mt-4 left-auto top-1 z-index-sticky":
          this.$store.state.isNavFixed,
        "position-absolute px-4 mx-0 w-100 z-index-2":
          this.$store.state.isAbsolute,
        "px-0 mx-4 mt-4": !this.$store.state.isAbsolute,
      };
    },
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";
  },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize"]),
  },
};
</script>
<style lang="scss">
@import url("@/assets/scss/main/main.scss");
</style>
