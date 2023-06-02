
<template>
  <div
    id="sidenav-collapse-main"
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
  >
    <ul class="navbar-nav">
      <li class="mt-3 nav-item">
        <!-- <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="$store.state.isRTL ? 'me-4' : 'ms-2'"
        >{{ $t('FEATURE') }}</h6> -->
      </li>
      <li class="nav-item" v-for="item in dataItem" :key="item.name">
        <sidenav-collapse :nav-text="$t(item.text)" :to="{ name: item.name}">
          <template #icon>
            <icon :name="item.icon" />
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
