<template>
  <div class="fixed-plugin">
    <a
      class="draggable"
      :style="{ left: position.x + 'px', top: position.y + 'px' }"
      @mousedown="startDrag"
      :class="checkTransaction"
      @click="toggle"
    >
      <i class="py-2 fa fa-cog"></i>
    </a>

    <div class="shadow-lg card blur">
      <div class="pt-3 pb-0 bg-transparent card-header">
        <div class="float-start">
          <h5 class="mt-3 mb-0">{{ $t("appconfig") }}</h5>
          <p>{{ $t("subappconfig") }}</p>
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
          <h6 class="mb-0">{{ $t("sidebarcolors") }}</h6>
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
          <h6 class="mb-0">{{ $t("sidenavtype") }}</h6>
          <p class="text-sm">{{ $t("subsidenavtype") }}</p>
        </div>
        <div class="d-flex">
          <button
            id="btn-transparent"
            class="px-3 mb-2 btn bg-gradient-success w-100"
            :class="ifTransparent === 'bg-transparent' ? 'active' : ''"
            @click="sidebarType('bg-transparent')"
          >
            {{ $t("transparent") }}
          </button>
          <button
            id="btn-white"
            class="px-3 mb-2 btn bg-gradient-success w-100 ms-2"
            :class="ifTransparent === 'bg-white' ? 'active' : ''"
            @click="sidebarType('bg-white')"
          >
            {{ $t("white") }}
          </button>
        </div>
        <p class="mt-2 text-sm d-xl-none d-block"></p>
        <!-- Navbar Fixed -->
        <div class="mt-3">
          <h6 class="mb-0">{{ $t("navbarfixed") }}</h6>
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
          <h6 class="mb-0">{{ $t("languages") }}</h6>
          <div class="form-check form-switch ps-0 d-flex align-items-center">
            <el-switch
              v-model="languague"
              class="ml-2"
              inline-prompt
              style="
                --el-switch-on-color: #409eff;
                --el-switch-off-color: #409eff;
              "
              active-text="VI"
              inactive-text="EN"
              @change="setLanguage()"
            />

            <div class="lang">{{ $t("lang") }}</div>
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
      languague: true,
      isDragging: false,
      startPosition: { x: 0, y: 0 },
      position: { x: 0, y: 0 },
      checkTransaction: "",
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
  created() {
    this.languague =
      localStorage.getItem("locale") == "vi" || !localStorage.getItem("locale");

    this.position.x = this.calculateWidth90vw();
    this.position.y = this.calculateHeight90vh();
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

    startDrag(event) {
      this.checkTransaction = "";
      this.isDragging = true;
      this.startPosition.x = event.clientX;
      this.startPosition.y = event.clientY;
      // this.position.x = event.clientX;
      // this.position.y = event.clientY;
      window.addEventListener("mousemove", this.drag);
      window.addEventListener("mouseup", this.stopDrag);
    },
    drag(event) {
      if (this.isDragging) {
        const deltaX = event.clientX - this.startPosition.x;
        const deltaY = event.clientY - this.startPosition.y;
        this.position.x += deltaX;
        this.position.y += deltaY;
        this.startPosition.x = event.clientX;
        this.startPosition.y = event.clientY;
      }
    },
    stopDrag() {
      this.isDragging = false;
      this.checkTransaction = "trans-css";
      window.removeEventListener("mousemove", this.drag);
      window.removeEventListener("mouseup", this.stopDrag);
    },

    calculateHeight90vh() {
      var viewportHeight = window.innerHeight; // Lấy chiều cao viewport
      var height90vh = (viewportHeight * 90) / 100; // Tính chiều cao của 80vh

      return height90vh;
    },

    calculateWidth90vw() {
      var viewportHeight = window.innerWidth; // Lấy chiều cao viewport
      var height90vw = (viewportHeight * 95) / 100; // Tính chiều cao của 80vh

      return height90vw;
    },

    /**
     * Hàm thực hiện đổi ngôn ngữ
     */
    setLanguage() {
      if (
        localStorage.getItem("locale") == "vi" ||
        localStorage.getItem("locale") == "vi" ||
        !localStorage.getItem("locale")
      ) {
        localStorage.locale = "en";
        this.$i18n.locale = "en";
      } else {
        localStorage.locale = "vi";
        this.$i18n.locale = "vi";
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
.fixed-plugin {
  .card-body {
    flex: unset;
  }
  .lang {
    margin-left: 12px;
  }

  .draggable {
    position: fixed;
    background-color: #fff;
    color: #344767 !important;
    text-align: center;
    user-select: none;
    cursor: grab;
    font-size: 1.25rem;
    z-index: 5000;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.16);
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
    padding-right: 1rem !important;
    padding-left: 1rem !important;
    border-radius: 50%;
  }

  .trans-css {
    transition: 0.5s;
  }
}
</style>
