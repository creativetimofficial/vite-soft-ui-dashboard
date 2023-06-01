import { createStore } from "vuex";
import { toast } from 'vue3-toastify';

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    isTransparent: "",
    isRTL: false,
    mcolor: "",
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    isOutside: true,
    isVietNamese: true,
    isOpenPopup: false,
    isOpenPopupDelete: false,
    isOpenPopupSeat: false,
    isOpenPopupAddShowtime: false,
    isOpenPopupShowContent: false,
    isOpenPopupAlterMovie: false,
    isShowLoading: false,
    isShowPopupAddRealRoom: false,
    isShowDetailCinemaRoom: false,
    isShowToast: false,
    contentToast: "",
    isLoggedIn: false,
    role: "",
    accountName:"",
    cinemaName: "",
    isOpenPopupApprovalList: false,
    isOpenPopupAddAccount: false,
    isOpenDetailAccount: false,
    isOpenPopupDetailCategoryMovie: false,
    isOpenDetailTypeMovie: false,
    isOpenPopupTemplateTimeCode: false,
    thisAccountName: "",
    isShowAccountSetting: false,
    isShowPasswordSetting: false,
    isShowSetting: false,
    isShowCommonSetting: false,
    isOpenPopupDetailLanguage: false,
    isShowCinemaSetting: false,
    isShowCinemaInfoSetting: false
    
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");
      const sidenav = document.getElementById("sidenav-main");

      if (sidenav_show.classList.contains("g-sidenav-pinned")) {
        sidenav_show.classList.remove("g-sidenav-pinned");
        setTimeout(function () {
          sidenav.classList.remove("bg-white");
        }, 100);
        sidenav.classList.remove("bg-transparent");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-pinned");
        sidenav.classList.add("bg-white");
        sidenav.classList.remove("bg-transparent");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.isTransparent = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    showToast(context,payload){
      toast(payload, {
        transition: toast.TRANSITIONS.BOUNCE,
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    checkRole(context,payload){
      if(context.state.role == payload || context.state.role == "admin"){
        return true;
      }else{
        context.dispatch("showToast","Tài khoản không có quyền");
        return false;
      }
    }
  },
  getters: {},
});
