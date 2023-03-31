<template>
  <div class="fixed-plugin">
    <a
      class="px-3 py-2 fixed-plugin-button text-dark position-fixed"
      @click="toggle"
    >
      <i class="py-2 fa fa-cog"></i>
    </a>
    <div class="shadow-lg card blur">
      <div class="pt-3 pb-0 bg-transparent card-header">
        <div class="float-start">
          <h5 class="mt-3 mb-0">{{ $t('appconfig') }}</h5>
          <p>{{ $t('subappconfig') }}</p>
        </div>
        <div class="mt-4 float-end" @click="toggle">
          <button class="p-0 btn btn-link text-dark fixed-plugin-close-button">
            <i class="fa fa-close"></i>
          </button>
        </div>
        <!-- End Toggle Button -->
      </div>
      <hr class="my-1 horizontal dark" />
      <div class="pt-0 card-body pt-sm-3" v-show="!$store.state.IsOutSide">
        <!-- Sidebar Backgrounds -->
        <div>
          <h6 class="mb-0">{{ $t('sidebarcolors') }}</h6>
        </div>
        <a href="#" class="switch-trigger background-color">
          <div
            class="my-2 badge-colors"
            :class="$store.state.isRTL ? 'text-end' : ' text-start'"
          >
            <span
              class="badge filter bg-gradient-primary active"
              data-color="primary"
              @click="sidebarColor('primary')"
            ></span>
            <span
              class="badge filter bg-gradient-dark"
              data-color="dark"
              @click="sidebarColor('dark')"
            ></span>
            <span
              class="badge filter bg-gradient-info"
              data-color="info"
              @click="sidebarColor('info')"
            ></span>
            <span
              class="badge filter bg-gradient-success"
              data-color="success"
              @click="sidebarColor('success')"
            ></span>
            <span
              class="badge filter bg-gradient-warning"
              data-color="warning"
              @click="sidebarColor('warning')"
            ></span>
            <span
              class="badge filter bg-gradient-danger"
              data-color="danger"
              @click="sidebarColor('danger')"
            ></span>
          </div>
        </a>
        <!-- Sidenav Type -->
        <div class="mt-3">
          <h6 class="mb-0">{{ $t('sidenavtype') }}</h6>
          <p class="text-sm">{{ $t('subsidenavtype') }}</p>
        </div>
        <div class="d-flex">
          <button
            id="btn-transparent"
            class="px-3 mb-2 btn bg-gradient-success w-100"
            :class="ifTransparent === 'bg-transparent' ? 'active' : ''"
            @click="sidebarType('bg-transparent')"
          >
            {{ $t('transparent') }}
          </button>
          <button
            id="btn-white"
            class="px-3 mb-2 btn bg-gradient-success w-100 ms-2"
            :class="ifTransparent === 'bg-white' ? 'active' : ''"
            @click="sidebarType('bg-white')"
          >
            {{ $t('white') }}
          </button>
        </div>
        <p class="mt-2 text-sm d-xl-none d-block">
          You can change the sidenav type just on desktop view.
        </p>
        <!-- Navbar Fixed -->
        <div class="mt-3">
          <h6 class="mb-0">{{ $t('navbarfixed') }}</h6>
        </div>
        <div class="form-check form-switch ps-0">
          <input
            id="navbarFixed"
            v-model="fixedKey"
            class="mt-1 form-check-input"
            :class="$store.state.isRTL ? 'float-end  me-auto' : ' ms-auto'"
            type="checkbox"
            :checked="$store.state.isNavFixed"
            @change="setNavbarFixed"
          />
        </div>
        <hr class="horizontal dark my-sm-4" />
      </div>
      <div class="pt-0 card-body pt-sm-3">
        <div>
          <h6 class="mb-0">{{ $t('languages') }}</h6>
          <div class="form-check form-switch ps-0">
            <input
              id="languageFixed"
              v-model="languague"
              class="mt-1 form-check-input"
              :class="$store.state.isRTL ? 'float-end  me-auto' : ' ms-auto'"
              type="checkbox"
              :checked="$store.state.isVietNamese"
              @change="setLanguage($store.state.isVietNamese)"
            />

          <div class="lang">{{ $t('lang') }}</div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  name: "ConfiguratorComponent",
  props: {
    toggle: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      fixedKey: "",
      languague: true
    };
  },

  computed: {
    ifTransparent() {
      return this.$store.state.isTransparent;
    },
    sidenavResponsive() {
      return this.sidenavTypeOnResize;
    },
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";
    // Deactivate sidenav type buttons on resize and small screens
    window.addEventListener("resize", this.sidenavTypeOnResize);
    window.addEventListener("load", this.sidenavTypeOnResize);
  },
  methods: {
    ...mapMutations(["navbarMinimize", "sidebarType", "navbarFixed"]),
    ...mapActions(["toggleSidebarColor"]),

    sidebarColor(color = "success") {
      document.querySelector("#sidenav-main").setAttribute("data-color", color);
      this.$store.state.mcolor = `card-background-mask-${color}`;
    },

    /**
     * Hàm thực hiện đổi ngôn ngữ
     */
    setLanguage(isVietNamese) {
      this.$store.state.isVietNamese = !isVietNamese;
      if (this.$store.state.isVietNamese) {
        this.$i18n.locale = "vi";
      } else {
        this.$i18n.locale = "en";
      }
    },

    sidebarType(type) {
      this.toggleSidebarColor(type);
    },

    setNavbarFixed() {
      if (this.$route.name !== "Profile") {
        this.$store.state.isNavFixed = !this.$store.state.isNavFixed;
      }
    },

    sidenavTypeOnResize() {
      let transparent = document.querySelector("#btn-transparent");
      let white = document.querySelector("#btn-white");
      if (window.innerWidth < 1200) {
        transparent.classList.add("disabled");
        white.classList.add("disabled");
      } else {
        transparent.classList.remove("disabled");
        white.classList.remove("disabled");
      }
    },
  },
};
</script>
<style lang="scss">
.fixed-plugin{
  .card-body{
    flex: unset;
  }
  .lang{
    margin-left: 50px;
  }
}
</style>
