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
        <el-table :data="dataHistoryTemp" style="width: 100%; height: 100%; color: #111;">
          <el-table-column prop="createdDate" :label="$t('Day')" width="150">
            <template #default="scope">
              {{ convertDateFormat(scope.row.createdDate) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="customerName"
            :label="$t('Customer')"
            width="200"
            :fit="true"
          >
            <template #default="scope">
              {{
                scope.row.customerName
                  ? scope.row.customerName
                  : $t("Incognito")
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="phoneNumber"
            :label="$t('PhoneNumber')"
            width="120"
          />
          <el-table-column prop="movieName" :label="$t('Movie')" width="350" />
          <el-table-column prop="roomCode" :label="$t('Room')" width="120" />
          <el-table-column prop="seatName" :label="$t('Seat')" width="120" />
          <el-table-column prop="showDate" :label="$t('Showat')" width="120">
            <template #default="scope">
              {{ convertDateFormat(scope.row.showDate) }}
            </template>
          </el-table-column>
          <el-table-column prop="type" :label="$t('TypeTicket')" width="120">
            <template #default="scope">
              {{ scope.row.type == 1 ? $t("Normal") : "VIP" }}
            </template>
          </el-table-column>
          <el-table-column prop="totalAmount" :label="$t('Cost')" width="120">
            <template #default="scope">
              {{ formatNumber(scope.row.totalAmount) + " VND" }}
            </template>
          </el-table-column>

          <el-table-column fixed="right" :label="$t('Print')" width="80" :align="'center'">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click.prevent="getItemSelect(scope.row)"
              >
                <el-icon :size="20">
                  <Printer />
                </el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div
        class="history-paging d-flex align-items-center justify-content-between"
      >
        <div class="total-record" style="color: #111">
          Tổng số bản ghi: <span class="fw-bold">{{ totalRecord }}</span>
        </div>
        <el-pagination
          v-model:current-page="pageIndex"
          v-model:page-size="pageSize"
          :page-sizes="pageSizes"
          :small="false"
          :disabled="false"
          :background="true"
          layout=" prev, pager, next,sizes, jumper"
          :total="totalRecord"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>

  <el-dialog
    v-model="isShowDialog"
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
          <BaseTicketCard
            :dataTicket="itemSelect"
            ref="componentToPrint"
          ></BaseTicketCard>
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
</template>
<script>
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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
  Search,
  Ticket,
  Printer,
  Star,
} from "@element-plus/icons-vue";
export default {
  components: { VsudInput, BaseButton, BaseTicketCard },
  setup() {
    return { convertDateFormat, Search, formatNumber, Ticket, Printer };
  },
  created() {
    let me = this;
    this.loadHistoryPaging();
    this.loadCinemaRoom();
  },
  mounted() {},
  computed: {
    startIndex() {
      return (this.pageIndex - 1) * this.pageSize;
    },
    datePicker() {
      if (this.dateSelected) {
        // Tạo đối tượng Date từ chuỗi thời gian cụ thể
        const date = new Date(this.dateSelected);
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      } else {
        return this.dateSelected;
      }
    },
  },
  watch: {
    searchValue(newVal, oldVal) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      // Tạo timeout mới để thực hiện tìm kiếm sau 500ms khi ngừng nhập
      this.searchTimeout = setTimeout(() => {
        this.pageIndex = 1;
        this.loadHistoryPaging();
      }, 500);
    },
  },
  data() {
    return {
      ID_ALL: "8ef432ed-faa9-11ed-a12b-88aedd095151",
      dataHistory: [],
      dataHistoryTemp: [],
      searchValue: "",
      searchTimeout: null,
      iconSearch: "icon-search",
      rooms: [],
      roomSelected: "Tất cả",
      dateSelected: null,
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

      pageIndex: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 50, 100],
      totalRecord: 0,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageIndex = 1;

      this.loadHistoryPaging();
    },
    handleCurrentChange(val) {
      this.loadHistoryPaging();
    },

    print() {
      const componentToPrint = this.$refs.componentToPrint.$el;

      html2canvas(componentToPrint).then((canvas) => {
        const imageData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4"); // Tạo tệp PDF với kích thước A4

        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight); // Thêm hình ảnh vào tệp PDF

        const contentWidth = pdf.internal.pageSize.getWidth();
        const contentHeight = pdf.internal.pageSize.getHeight();

        const positionX = (contentWidth - imgWidth) / 2; // Tính toán vị trí căn giữa theo trục X
        const positionY = (contentHeight - imgHeight) / 2 - 25.4; // Thêm cách lề trên 1 inch (25.4 mm)

        // Thêm nội dung text căn giữa vào tệp PDF

        pdf.save("filename.pdf"); // Tải xuống tệp PDF
      });
    },

    exportToPDF() {
      const pdf = new jsPDF();

      // Lấy đối tượng HTML của component
      const component = this.$refs.componentToPrint.$el;

      // Sử dụng html2canvas để chụp ảnh của component
      html2canvas(component).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        // Thiết lập kích thước của PDF theo kích thước của ảnh chụp
        const pdfWidth = canvas.width * 0.75;
        const pdfHeight = canvas.height * 0.75;

        // Thêm ảnh vào PDF
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        // Xuất ra file PDF
        pdf.save("file.pdf");
      });
    },
    closeThisTicket() {
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
    getMouseMouve(id) {
      this.idTemp = id;
    },

    getMouseLeave() {
      this.idTemp = "";
    },

    checkOpen(id) {
      return id == this.idTemp;
    },

    getItemSelect(item) {
      this.itemSelect = item;
      this.isShowDialog = true;
    },

    filterByRoom() {
      this.pageIndex = 1;
      this.loadHistoryPaging();
    },

    loadHistoryPaging() {
      let me = this;
      me.$store.state.isShowLoading = true;
      this.$api
        .post("/History/GetHistoryPaging", {
          pageIndex: me.pageIndex,
          pageSize: me.pageSize,
          dateFilter: me.datePicker,
          keyword: me.searchValue,
          roomCode: me.roomSelected,
        })
        .then((data) => {
          me.dataHistory = data.history;
          me.dataHistoryTemp = data.history;
          me.totalRecord = data.totalRecord;
          me.$store.state.isShowLoading = false;
        });
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
    min-width: 1400px;
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
    .el-scrollbar {
      width: 100%;
      height: calc(100vh - 370px) !important;

      .el-scrollbar__wrap {
        height: calc(100vh - 330px) !important;
      }
    }

    .el-table__cell{
      color: #111;
    }

    height: calc(100vh - 250px);
    .history-container {
      width: 100%;
      min-width: 1400px;
      padding: 0 20px;
      height: calc(100vh - 325px);
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

    .history-paging {
      width: 100%;
      padding: 10px 20px;
      .total-record {
        font-size: 13px;
      }
      .el-pagination {
        font-weight: 600 !important;
        justify-content: flex-end;

        .el-pagination__total {
          font-weight: 600 !important;
          color: #111 !important;
        }

        .el-pagination__jump {
          font-weight: 600 !important;
          color: #111 !important;
        }
      }
    }
  }
}
</style>
