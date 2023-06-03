<template>
  <div class="history-manage">
    <div class="history-manage-header">
      <div class="header-left">
        <el-input
          v-model="searchValue"
          class="w-200 m-2"
          size="large"
          :placeholder="$t('Search')"
          :suffix-icon="Search"
        />

        <el-tooltip
          class="box-item"
          effect="dark"
          :content="$t('Room')"
          placement="top"
        >
          <el-select
            v-model="roomSelected"
            class="m-2 w-99"
            placeholder="Select"
            size="large"
            @change="filterByRoom"
          >
            <el-option
              v-for="item in rooms"
              :key="item.roomID"
              :label="item.roomCode"
              :value="item.roomCode"
            />
          </el-select>
        </el-tooltip>

        <div class="icon-filter-room">
          <i class="fas fa-couch"></i>
        </div>

        <div class="mx-2"></div>

        <el-tooltip
          class="box-item"
          effect="dark"
          :content="$t('Date')"
          placement="top"
        >
          <el-date-picker
            v-model="dateSelected"
            type="date"
            :placeholder="$t('PickADay')"
            :shortcuts="shortcuts"
            :size="'large'"
            class="w-150 m-2"
            @change="filterByRoom"
          />
        </el-tooltip>
        <div class="icon-date">
          <i class="fas fa-calendar-day"></i>
        </div>
      </div>
    </div>
    <div class="history-manage-main">
      <div class="history-container">
        <div
          class="history-item"
          v-for="item in dataHistoryTemp"
          :key="item"
          v-show="item.parentID"
          @mousemove="getMouseMouve(item.checkoutID)"
          @mouseleave="getMouseLeave()"
         
        >
          <div class="item-feature" v-show="checkOpen(item.checkoutID)">
            <el-button type="primary" :icon="Ticket"  @click="getItemSelect(item)">{{  $t('ExportTicket') }}</el-button>
          </div>
          <div class="item-container" v-show="!checkOpen(item.checkoutID)">
            <span class="normal">{{ $t("Day") }}: </span>

            <span class="create-date">{{
              convertDateFormat(item.createdDate) + " "
            }}</span>
            <span class="normal"> {{ $t("Customer") }}: </span>
            <span class="name"
              >{{ item.customerName ? item.customerName : $t("Incognito") }}
              {{
                +" " + item.phoneNumber ? " - " + item.phoneNumber : " "
              }}</span
            >
            <span class="normal"> {{ " " + $t("boughtmovietickets") }}: </span>
            <span class="name-movie">{{ item.movieName + " " }}</span>
            <span class="normal"> {{ $t("Seatposition") }}: </span>
            <span class="seat-name">{{ item.seatName + " " }}</span>
            <span class="normal"> {{ $t("Room") }}: </span>
            <span class="room-code">{{ item.roomCode + " " }}</span
            ><span class="normal"> {{ $t("Showat") }}: </span>
            <span class="post-date">{{
              item.time + "-" + convertDateFormat(item.showDate) + " "
            }}</span>
            <span class="normal"> {{ $t("TypeTicket") }}: </span>
            <span class="type-seat">{{
              item.type == 1 ? $t("Normal") : "VIP"
            }}</span>
            <span class="normal"> {{ " " + $t("Cost") }}: </span>
            <span class="cost">{{
              formatNumber(item.totalAmount) + " VND"
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <el-dialog v-model="isShowDialog" :title="$t('ExportTicket')" :show-close="false" width="500">
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
          <BaseTicketCard :dataTicket="itemSelect" ref="componentToPrint"></BaseTicketCard>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button  @click="closeThisTicket">{{ $t('Cancle') }}</el-button>
        <el-button type="primary" @click="exportToPDF">
          {{ $t('Export') }}
        </el-button>
      </span>
    </template>
  </el-dialog>


</template>
<script>
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import VsudInput from "../components/VsudInput.vue";
import BaseTicketCard from "./components/BaseTicketCard.vue";
import {
  convertDateFormat,
  convertDateString,
  formatNumber,
} from "@/common/commonFunc";
import BaseButton from "./components/BaseButton.vue";
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,Ticket,
  Star,
} from "@element-plus/icons-vue";
export default {
  components: { VsudInput, BaseButton,BaseTicketCard },
  setup() {
    return { convertDateFormat, Search, formatNumber,Ticket };
  }, 
  created() {
    let me = this;
    this.loadData();
    this.loadCinemaRoom();
  },
  mounted() {},
  watch: {
    searchValue(newVal, oldVal) {
      this.dataHistoryTemp = this.dataHistory.filter(
        (x) =>
          x.phoneNumber.includes(newVal) ||
          x.movieName.toLowerCase().includes(newVal.toLowerCase()) ||
          x.customerName.toLowerCase().includes(newVal.toLowerCase())
      );

      if (!newVal) {
        this.dataHistoryTemp = this.dataHistory;
        this.iconSearch = "icon-search";
      } else {
        this.iconSearch = "";
      }

      if (this.roomSelected != "Tất cả") {
        this.dataHistoryTemp = this.dataHistoryTemp.filter(
          (x) => x.roomCode == this.roomSelected
        );
      }

      if (this.dateSelected) {
        this.dataHistoryTemp = this.dataHistoryTemp.filter(
          (x) =>
            convertDateFormat(x.createdDate) ==
            convertDateFormat(convertDateString(this.dateSelected))
        );
      }
    },

  },
  data() {
    return {
      ID_ALL: "8ef432ed-faa9-11ed-a12b-88aedd095151",
      dataHistory: [],
      dataHistoryTemp: [],
      searchValue: "",
      iconSearch: "icon-search",
      rooms: [],
      roomSelected: "Tất cả",
      dateSelected: "",
      idTemp: "",
      itemSelect: {},
      isShowDialog: false,
      shortcuts: [
        {
          text: "Hôm nay",
          value: new Date(),
        },
        {
          text: "Hôm qua",
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            return date;
          },
        },
        {
          text: "Tuần trước",
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            return date;
          },
        },
      ],
    };
  },
  methods: {
    print() {
      const componentToPrint = this.$refs.componentToPrint.$el;

      html2canvas(componentToPrint).then(canvas => {
        const imageData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // Tạo tệp PDF với kích thước A4

        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imageData, 'PNG', 0, 0, imgWidth, imgHeight); // Thêm hình ảnh vào tệp PDF

        const contentWidth = pdf.internal.pageSize.getWidth();
        const contentHeight = pdf.internal.pageSize.getHeight();

        const positionX = (contentWidth - imgWidth) / 2; // Tính toán vị trí căn giữa theo trục X
        const positionY = (contentHeight - imgHeight) / 2 - 25.4; // Thêm cách lề trên 1 inch (25.4 mm)

 // Thêm nội dung text căn giữa vào tệp PDF

        pdf.save('filename.pdf'); // Tải xuống tệp PDF
      });
    },

    exportToPDF() {
    const pdf = new jsPDF();

    // Lấy đối tượng HTML của component
    const component = this.$refs.componentToPrint.$el;

    // Sử dụng html2canvas để chụp ảnh của component
    html2canvas(component).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      // Thiết lập kích thước của PDF theo kích thước của ảnh chụp
      const pdfWidth = canvas.width * 0.75;
      const pdfHeight = canvas.height * 0.75;

      // Thêm ảnh vào PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Xuất ra file PDF
      pdf.save('file.pdf');
    });
  },
    closeThisTicket(){
      this.isShowDialog = false;
    },
    loadData() {
      let me = this;
      this.$store.state.isShowLoading = true;
      this.$api.get("/History/GetHistory").then((data) => {
        me.dataHistory = data;
        me.dataHistoryTemp = data;
        me.$store.state.isShowLoading = false;
      });
    },
    searchingEvent() {
      this.dataHistoryTemp = this.dataHistory.filter(
        (x) =>
          x.phoneNumber.includes(this.searchValue) ||
          x.movieName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          x.customerName.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    },
    getMouseMouve(id){
      this.idTemp = id;
    },

    getMouseLeave(){
      this.idTemp = "";
    },

    checkOpen(id){
      return id == this.idTemp;
    },

    getItemSelect(item){
      this.itemSelect = item;
      this.isShowDialog = true;
    },

    filterByRoom() {
      let me = this;
      this.searchingEvent();
      if (this.roomSelected != "Tất cả") {
        this.dataHistoryTemp = this.dataHistoryTemp.filter(
          (x) => x.roomCode == this.roomSelected
        );
      }

      if (this.dateSelected) {
        this.dataHistoryTemp = this.dataHistoryTemp.filter(
          (x) =>
            convertDateFormat(x.createdDate) ==
            convertDateFormat(convertDateString(this.dateSelected))
        );
      }
    },

    loadCinemaRoom() {
      let me = this;
      this.rooms = [{ roomID: this.ID_ALL, roomCode: "Tất cả" }];
      this.$api.get("/CinemaRoom/GetListCinemaRoom").then((data) => {
        me.rooms = me.rooms.concat(data);
      });
    },
  },
};
</script>
<style lang="scss">
.history-manage {

  padding: 30px 28px 0;
  .history-manage-header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    background: #fff;
    border-radius: 10px;
    align-items: center;

    .form-group {
      margin-bottom: 0px !important;
    }

    .header-left {
      display: flex;
      align-items: center;
      .icon-search {
        opacity: 0.6;
      }

      .el-input__prefix-inner {
        display: none;
      }
    }
  }

  .history-manage-main {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    background: #fff;
    border-radius: 10px;
    padding: 20px 0;
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    min-width: 1400px;
    .history-container {
      width: 100%;
      min-width: 1400px;
      padding: 0 20px;
      .history-item {
        width: 100%;
        color: #111;
        padding: 10px;
        margin: 5px 0;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
          rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        font-weight: 600;

        .normal {
          font-weight: 500;
        }
      }
    }
  }
}
</style>
