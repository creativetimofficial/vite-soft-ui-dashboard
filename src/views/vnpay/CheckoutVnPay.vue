<template>
    <div class="vnpay-checkout">
        <div class="checkout-header">
            <div class="header-left">
                <div class="header-title">
                    THANH TOÁN
                </div>
            </div>
            <div class="header-right">
                <img :src="vnpayImage" alt="logo vnpay" class="logo-vnpay" >
            </div>
        </div>
        <div class="checkout-main">
            <div class="info-customer">

            </div>
        </div>
        <div class="checkout-footer">

        </div>
    </div>
</template>
<script>
const body = document.getElementsByTagName("body")[0];
import vnpayImage from "@/assets/img/Logo-VNPAY-QR.png"
export default {
    setup() {
        return{
            vnpayImage
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
}
</script>
<style lang="scss">
    .vnpay-checkout{
        .checkout-header{
            height: 80px;
            display: flex;
            border-bottom: 1px solid #111;
            margin: 0 20px;
            align-items: center;
            justify-content: space-between;
            .header-left{
                font-size: 32px;
                font-weight: 600;
                margin-left: 20px;
            }

            .header-right{
                .logo-vnpay{
                    width: 150px;
                    height: 30px;
                }
                margin-right: 20px;
            }
        }

        .checkout-main{

        }

        .checkout-footer{

        }
    }
</style>