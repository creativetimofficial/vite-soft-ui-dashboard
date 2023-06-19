<template>
  <div class="vnpay-checkout-done">
    <div class="checkout-done-header">
      <div class="header-left">
        <div class="header-title">THANH TOÁN</div>
      </div>
      <div class="header-right">
        <img :src="vnpayImage" alt="logo vnpay" class="logo-vnpay" />
      </div>
    </div>
    <div class="checkout-done-main">
      <div class="checkout-done-container">
        <div class="icon-warning" @click="showTicket">
          <i class="fas fa-check" style="color: #409eff"></i>
        </div>
        <div class="content" style="color: #409eff">Thanh toán thành công</div>
      </div>
    </div>
    <div class="checkout-done-footer">
      <div class="footer-left"></div>
      <div class="footer-right">
        <el-button type="primary" :icon="Back" @click="rollbackHome">{{
          $t("Homepage")
        }}</el-button>
      </div>
    </div>
    <el-dialog
      v-model="isShowDialogBooking"
      :title="$t('Ticketbookingsuccessful')"
      width="300"
      center
    >
      <span>
        {{ $t("IsPrintBookingTicket") }}
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialogPrint">{{ $t("Cancel") }}</el-button>
          <el-button type="primary" @click="showDialogPrint">
            {{ $t("Yes") }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="isShowDialogPrint"
      :title="$t('ExportTicket')"
      :show-close="false"
      width="500"
    >
      <template #header>
        <div class="my-header">
          <div class="popup-title">{{ $t("ExportTicket") }}</div>
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="$t('Close')"
            placement="top"
          >
            <div class="popup-icon-close" @click="closeThisTicket">
              <i class="fas fa-times"></i>
            </div>
          </el-tooltip>
        </div>
      </template>
      <el-form :model="form">
        <el-form-item>
          <div class="ticket-base-container">
            <el-scrollbar>
              <div class="scrollbar-flex-content" v-if="isShowDialogPrint">
                <BaseTicketCard
                  v-for="(item, index) in dataCheckout.seat"
                  :key="item"
                  :dataTicket="{
                    roomCode: dataCheckout.history.roomCode,
                    movieName: dataCheckout.history.movieName,
                    seatName: item.SeatName,
                    type: item.Type,
                    totalAmount:
                      item.Type == 1
                        ? dataCheckout.ticket.normalCost
                        : dataCheckout.ticket.vipCost,
                    movieID: dataCheckout.history.movieID,
                  }"
                  :ref="'booking' + index"
                  :classCustom="'me-2'"
                ></BaseTicketCard>
              </div>
            </el-scrollbar>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeThisTicket">{{ $t("Cancle") }}</el-button>
          <el-button type="primary" @click="exportToPDF">
            {{ $t("Export") }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
const body = document.getElementsByTagName("body")[0];
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { listSeat, convertLetter } from "@/constants/constantsdefaults";

import router from "@/router/index";
import { Back } from "@element-plus/icons-vue";
import BaseTicketCard from "../components/BaseTicketCard.vue";
import {
  convertDateFormat,
  convertTimeFormat,
  formatNumber,
} from "@/common/commonFunc";
import vnpayImage from "@/assets/img/Logo-VNPAY-QR.png";
export default {
  setup() {
    return {
      vnpayImage,
      Back,
      listSeat,
      convertLetter,
      convertDateFormat,
      convertTimeFormat,
      formatNumber,
    };
  },
  components: {
    BaseTicketCard,
  },
  created() {
    this.checkData();
  },
  data() {
    return {
      dataCheckout: {},
      isShowDialogPrint: false,
      isShowDialogBooking: false,
    };
  },
  methods: {
    checkData() {
      if (!localStorage.getItem("checkout")) {
        router.push("./");
      } else {
        this.dataCheckout = JSON.parse(localStorage.getItem("checkout"));
        this.callDone();
        localStorage.removeItem("checkout");
      }
    },
    showTicket() {
      this.isShowDialogBooking = true;
    },
    closeThisTicket() {
      this.isShowDialogPrint = false;
    },

    closeDialogPrint() {
      this.isShowDialogBooking = false;
    },
    showDialogPrint() {
      this.isShowDialogBooking = false;
      this.isShowDialogPrint = true;
    },

    async exportToPDF() {
      this.$store.state.isShowLoading = true;
      const pdf = new jsPDF("p", "mm", "a4");
      for (let i = 0; i < this.dataCheckout.seat.length; i++) {
        const componentToPrint = this.$refs["booking" + i][0].$el;
        const canvas = await html2canvas(componentToPrint);
        const imageData = canvas.toDataURL("image/png");

        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addPage();
        pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);

        const contentWidth = pdf.internal.pageSize.getWidth();
        const contentHeight = pdf.internal.pageSize.getHeight();

        const positionX = (contentWidth - imgWidth) / 2;
        const positionY = (contentHeight - imgHeight) / 2 - 25.4;

        // Thêm nội dung text căn giữa vào tệp PDF
      }

      // Xuất ra file PDF
      pdf.save("file.pdf");
      this.isShowDialogPrint = false;
      this.$store.state.isShowLoading = false;
    },

    rollbackHome() {
      router.push("./");
    },
    callDone() {
      let history = this.dataCheckout.history;
      let seatData = this.dataCheckout.seat;
      this.$api.post("/History/InsertIntoHistory", {
        movieID: history.movieID,
        roomCinemaID: history.roomCinemaID,
        customerName: history.customerName,
        phoneNumber: history.phoneNumber,
        templateTimeCode: history.templateTimeCode,
        time: history.time,
        movieName: history.movieName,
        showDate: history.showDate,
        dataTicket: history.dataTicket,
        createdBy: history.createdBy,
        roomCode: history.roomCode,
      });

      this.$api.post("/Movie/UpdateSeatRoomCinema", seatData).then(() => {
        // me.$store.dispatch("showToast", this.$t("Ticketbookingsuccessful"));
        this.isShowDialogBooking = true;
        // me.loadDataSeat(me.roomCinmeIDSelected);
      });
    },
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
.vnpay-checkout-done {
  color: #111;
  .scrollbar-flex-content {
    display: flex;
  }
  .checkout-done-header {
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

  .checkout-done-main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 140px);
    .checkout-done-container {
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

  .checkout-done-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    margin: 0 20px;
  }
}
</style>
