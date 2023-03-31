<!-- <template>
  <div
    id="sidenav-collapse-main"
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse nav-text="Dashboard" :to="{ name: 'Dashboard' }">
          <template #icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse nav-text="Tables" :to="{ name: 'Tables' }">
          <template #icon>
            <icon name="tables" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse nav-text="Billing" :to="{ name: 'Billing' }">
          <template #icon>
            <icon name="billing" />
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse nav-text="Virtual Reality" :to="{ name: 'Virtual Reality' }">
          <template #icon>
            <icon name="virtual-reality" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse nav-text="Movie Manage" :to="{ name: 'Movie Manage' }">
          <template #icon>
            <icon name="virtual-reality" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse nav-text="RTL" :to="{ name: 'Rtl' }">
          <template #icon>
            <icon name="rtl-page" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="$store.state.isRTL ? 'me-4' : 'ms-2'"
        >PAGES</h6>
      </li>
      <li class="nav-item">
        <sidenav-collapse nav-text="Profile" :to="{ name: 'Profile' }">
          <template #icon>
            <icon name="customer-support" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse nav-text="Sign In" :to="{ name: 'Sign In' }">
          <template #icon>
            <icon name="sign-in" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse nav-text="Sign Up" :to="{ name: 'Sign Up' }">
          <template #icon>
            <icon name="sign-up" />
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
</template> -->

<template>
  <div
    id="sidenav-collapse-main"
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
  >
    <ul class="navbar-nav">
      <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="$store.state.isRTL ? 'me-4' : 'ms-2'"
        >Feature</h6>
      </li>
      <li class="nav-item" v-for="item in dataItem" :key="item.name">
        <sidenav-collapse :nav-text="$t(item.text)" :to="{ name: item.name}">
          <template #icon>
            <icon :name="item.icon" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="$store.state.isRTL ? 'me-4' : 'ms-2'"
        >PAGES</h6>
      </li>
      <li class="nav-item">
        <sidenav-collapse nav-text="Profile" :to="{ name: 'Profile' }">
          <template #icon>
            <icon name="customer-support" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse nav-text="Sign In" :to="{ name: 'Sign In' }">
          <template #icon>
            <icon name="sign-in" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse nav-text="Sign Up" :to="{ name: 'Sign Up' }">
          <template #icon>
            <icon name="sign-up" />
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
</template>
<script>
import Icon from "@/components/Icon.vue";
import SidenavCollapse from "./SidenavCollapse.vue";
import SidenavCard from "./SidenavCard.vue";
import {slideitems} from "@/constants/constantsdefaults.js"

export default {
  name: "SidenavList",
  setup(){
  },
  components: {
    Icon,
    SidenavCollapse,
    SidenavCard,
  },
  props: {
    cardBg: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      title: "Vite Soft UI Dashboard",
      controls: "dashboardsExamples",
      isActive: "active",
      dataItem: slideitems
    };
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
  },
};
</script>
