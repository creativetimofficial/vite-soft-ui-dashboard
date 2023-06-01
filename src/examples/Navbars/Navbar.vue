<template>
  <nav
    v-bind="$attrs"
    id="navbarBlur"
    class="shadow-none navbar navbar-main navbar-expand-lg border-radius-xl"
    data-scroll="true"
  >
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs :current-page="currentRouteName" :text-white="textWhite" />
      <div
        id="navbar"
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="$store.state.isRTL ? 'px-0' : 'me-sm-4'"
      >
        <div
          class="pe-md-3 d-flex align-items-center"
          :class="$store.state.isRTL ? 'me-md-auto' : 'ms-md-auto'"
        >
          <div class="input-group">
            <div class="filter-cinema">
              <el-input
                v-model="cinemaSelected"
                readonly
                placeholder="Please input"
              />
            </div>
          </div>
        </div>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-flex align-items-center mx-3" v-if="fullName">
            {{ $t('Hello') }}, <span style="margin-right: 3px;">{{ " " }}</span> <span class="fw-bold">{{fullName }}</span>
          </li>
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="$t('Setting')"
            placement="top"
          >
            <li class="nav-item d-flex align-items-center mx-3 h-opacity" @click="showSetting">
              <i class="fas fa-cog"></i>
            </li>
          </el-tooltip>

          <li class="nav-item d-flex align-items-center h-opacity">
            <router-link
              :to="{ name: 'Sign In' }"
              class="px-0 nav-link font-weight-bold"
              :class="textWhite ? textWhite : 'text-body'"
            >
              <i
                class="fa fa-user"
                :class="$store.state.isRTL ? 'ms-sm-2' : 'me-sm-1'"
              ></i>
              <span class="d-sm-inline d-none">{{
                !fullName ? $t("signin") : $t("Logout")
              }}</span>
            </router-link>
          </li>
          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a
              id="iconNavbarSidenav"
              href="#"
              class="p-0 nav-link text-body"
              @click="toggleSidebar"
            >
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </a>
          </li>
          <li
            class="px-3 nav-item d-flex align-items-center"
            v-if="sessionStorage"
          >
            <a
              class="p-0 nav-link"
              :class="textWhite ? textWhite : 'text-body'"
              @click="showSetting"
            >
              <i class="cursor-pointer fa fa-cog fixed-plugin-button-nav"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapMutations, mapActions } from "vuex";
import { slideitems } from "@/constants/constantsdefaults";

import BaseImageDownload from "../../views/components/BaseImageDownload.vue";
import jwt from "jsonwebtoken";

export default {
  name: "NavbarComponent",

  components: {
    Breadcrumbs,
    BaseImageDownload,
  },
  mounted() {
    let me = this;
    if (jwt.decode(sessionStorage.getItem("token"))) {
      this.fullName = jwt.decode(sessionStorage.getItem("token")).name;
    }
  },
  props: {
    minNav: {
      type: Function,
      default: () => {},
    },
    textWhite: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showMenu: false,
      listCinema: [],
      cinemaSelected: "",
      fullName: "",
    };
  },
  computed: {
    currentRouteName() {
      if (this.$route.name) {
        let temp = slideitems.find((x) => {
          if (x.name == this.$route.name) return x.text;
        });
        if (temp) {
          return this.$t(temp.text);
        } else {
          return "";
        }
      }
      return this.$route.name;
    },
  },
  async created() {
    let me = this;
    this.minNav;
    // this.loadListCinema();
    if (sessionStorage.getItem("token")) {
      this.cinemaSelected = jwt.decode(
        sessionStorage.getItem("token")
      ).cinemaName;
    }
  },
  updated() {
    const navbar = document.getElementById("navbarBlur");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10 && this.$store.state.isNavFixed) {
        navbar.classList.add("blur");
        navbar.classList.add("position-sticky");
        navbar.classList.add("shadow-blur");
      } else {
        navbar.classList.remove("blur");
        navbar.classList.remove("position-sticky");
        navbar.classList.remove("shadow-blur");
      }
    });
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(["toggleSidebarColor"]),

    toggleSidebar() {
      this.toggleSidebarColor("bg-white");
      this.navbarMinimize();
    },

    showSetting() {
      this.$store.state.isShowSetting = true;
    },

    // async loadListCinema() {
    //   let me = this;
    //   await this.$api.post("/Account/GetListCinema").then((data) => {
    //     me.listCinema = data;
    //   });
    // },

    loadData() {
      let me = this;
      this.$api.post("/UserLogin/cinemadb", me.cinemaSelected).then(() => {
        localStorage.setItem("dbname", me.cinemaSelected);
        location.reload();
      });
    },
  },
};
</script>
<style>
#navbar .name-cinema {
  font-size: 20px;
  font-weight: 600;
}
</style>
