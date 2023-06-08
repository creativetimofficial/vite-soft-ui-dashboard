<template>
  <div class="vnpay-checkout-failed">
    <div class="checkout-failed-header">
      <div class="header-left">
        <div class="header-title">THANH TOÁN</div>
      </div>
      <div class="header-right">
        <img :src="vnpayImage" alt="logo vnpay" class="logo-vnpay" />
      </div>
    </div>
    <div class="checkout-failed-main">
      <div class="checkout-failed-container">
        <div class="icon-warning">
          <i class="fas fa-exclamation-triangle" style="color: #f7f022"></i>
        </div>
        <div class="content">Giao dịch không hợp lệ hoặc không tồn tại.</div>
      </div>
    </div>
    <div class="checkout-failed-footer">
      <div class="footer-left"></div>
      <div class="footer-right">
        <el-button type="primary" :icon="Back" @click="rollbackHome">{{ $t('Homepage')}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
const body = document.getElementsByTagName("body")[0];
import router from "@/router/index";
import {
Back
} from '@element-plus/icons-vue'

import vnpayImage from "@/assets/img/Logo-VNPAY-QR.png";
export default {
  setup() {
    return {
      vnpayImage,Back
    };
  },
  created() {},
  methods: {
    rollbackHome(){
        router.push("./")
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
<style lang="scss">
.vnpay-checkout-failed {
  color: #111;

  .checkout-failed-header {
    -webkit-user-select: none;
    user-select: none;
    height: 80px;
    display: flex;
    border-bottom: 1px solid #111;
    margin: 0 20px;
    align-items: center;
    justify-content: space-between;
    .header-left {
      font-size: 32px;
      font-weight: 600;
      margin-left: 20px;
    }

    .header-right {
      .logo-vnpay {
        width: 150px;
        height: 30px;
      }
      margin-right: 20px;
    }
  }

  .checkout-failed-main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 140px);
    .checkout-failed-container {
        -webkit-user-select: none;
    user-select: none;
        height: 450px;
        width: 450px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      .icon-warning {
        font-size: 90px;
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
      }

      .content {
        font-size: 20px;
      }
    }
  }

  .checkout-failed-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    margin: 0 20px;

  }
}
</style>
