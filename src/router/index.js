import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Tables from "@/views/Tables.vue";
import Billing from "@/views/Billing.vue";
import VirtualReality from "@/views/VirtualReality.vue";
import Profile from "@/views/Profile.vue";
import Rtl from "@/views/Rtl.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import MovieManage from "@/views/MovieManage.vue";
import ShowTimeManage from "@/views/ShowTimeManage.vue"
import Payment from "@/views/Payment.vue"
import Revenue from "@/views/Revenue.vue"
import History from "@/views/History.vue"
import ReportAndStatistic from "@/views/ReportAndStatistic.vue"
import Ticket from "@/views/Ticket.vue"
import RoomCinema from "@/views/SeatRoomCinema.vue"

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/movie-manage",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/rtl-page",
    name: "Rtl",
    component: Rtl,
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp,
  },
  {
    path: "/movie-manage",
    name: "Movie Manage",
    component: MovieManage,
  },
  {
    path: "/showtime-manage",
    name: "ShowTime Manage",
    component: ShowTimeManage,
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment,
  },
  {
    path: "/revenue",
    name: "Revenue",
    component: Revenue,
  },
  {
    path: "/history",
    name: "History",
    component: History,
  },
  {
    path: "/report-statistic",
    name: "ReportAndStatistic",
    component: ReportAndStatistic,
  },
  {
    path: "/ticket",
    name: "Ticket",
    component: Ticket,
  },
  { 
    path: '/showtime-manage/room-cinema',
    component: RoomCinema,
    name: 'roomcinema-manage'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
