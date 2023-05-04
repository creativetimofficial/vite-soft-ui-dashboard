<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          is-blur="blur blur-rounded my-3 py-2 start-0 end-0 mx-4 shadow"
          btn-background="bg-gradient-success"
          :dark-mode="true"
        />
      </div>
    </div>
  </div>
  <main class="mt-0 main-content main-content-bg" @keydown.enter="checkEnter()">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-start">
                  <h3 class="font-weight-bolder text-info text-gradient">
                    {{ $t('welcome') }}
                  </h3>
                  <p class="mb-0">{{ $t('signinsub') }}</p>
                </div>
                <div class="card-body">
                  <form role="form" class="text-start">
                    <label>{{ $t('username') }}</label>
                    <vsud-input
                      type="text"
                      placeholder="Email"
                      name="email"
                      v-model="username"
                    />
                    <label>{{ $t('password') }}</label>
                    <vsud-input
                      type="password"
                      placeholder="Password"
                      name="password"
                      v-model="password"
                      :id="'user_login'"
                    />
                    <vsud-switch id="rememberMe" checked
                      >{{ $t('rememberme') }}</vsud-switch
                    >
                  </form>
                  <div class="text-center">
                      <vsud-button
                        class="my-4 mb-2"
                        variant="gradient"
                        color="info"
                        full-width
                        @click="loginAdmin()"
                        :id="'password_login'"
                        >{{ $t('signin') }}</vsud-button
                      >
                    </div>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    {{ $t('donthaveaccount') }}
                    <a
                      href="javascript:;"
                      @click="redirectSignup"
                      class="text-info text-gradient font-weight-bold"
                      >{{ $t('signup') }}</a
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div
                class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8"
              >
                <div
                  class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                  :style="{
                    backgroundImage: `url(${bgImg})`,
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <app-footer />
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import VsudInput from "@/components/VsudInput.vue";
import VsudSwitch from "@/components/VsudSwitch.vue";
import VsudButton from "@/components/VsudButton.vue";
import bgImg from "@/assets/img/curved-images/curved9.jpg";
import router from "@/router/index";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "SigninPage",
  components: {
    Navbar,
    AppFooter,
    VsudInput,
    VsudSwitch,
    VsudButton,
  },
  data() {
    return {
      bgImg,
      username: "",
      password: "",
    };
  },
  methods: {
    loginAdmin() {
      let me = this;
      this.$store.state.isShowLoading = true;
      this.$api
        .post("/UserLogin/login", {
          accountName: me.username,
          password: me.password,
        })
        .then((data) => {
          sessionStorage.setItem("token", data.token);
          router.push("/");
          if(!data.token){
            me.$store.dispatch("showToast","Tài khoản hoặc mật khẩu không đúng!");
          }
          me.$store.state.accountName = me.username;
          this.$store.state.isShowLoading = false;
        });
      this.$store.state.isLoggedIn = true;
    },

    redirectSignup(){
      router.push("/sign-up");
    },

    checkEnter(){
      this.loginAdmin();
    }
  },
  beforeMount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    this.$store.state.IsOutSide = true;
    body.classList.remove("bg-gray-100");
    this.$store.state.isLoggedIn = false;
    sessionStorage.removeItem('token');
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    this.$store.state.IsOutSide = false;
    body.classList.add("bg-gray-100");
  },
};
</script>
