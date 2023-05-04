<template>
  <div class="history-manage">
    <div class="history-manage-header">
      <vsud-input
        type="text"
        :placeholder="$t('Search')"
        name="search_movie"
        v-model="searchValue"
        :id="'search_movie'"
        @enter-event="searchingEvent"
      />
    </div>
    <div class="history-manage-main">
      <div class="history-container">
        <div
          class="history-item"
          v-for="item in dataHistoryTemp"
          :key="item"
          v-show="item.parentID"
        >
          <span class="bold">Ngày: </span>

          <span class="create-date">{{
            convertDateFormat(item.createdDate)
          }}</span>
          <span class="bold"> Khách hàng: </span>
          <span class="name"
            >{{ item.customerName ? item.customerName : "Ẩn danh"
            }}{{ item.phoneNumber ? " - " + item.phoneNumber : "" }}</span
          >
          <span class="bold"> đã mua Vé phim: </span>
          <span class="name-movie">{{ item.movieName }}</span>
          <span class="bold"> Vị trí ghế: </span>
          <span class="seat-name">{{ item.seatName }}</span>
          <span class="bold"> Phòng: </span>
          <span class="room-code">{{ item.roomCode }}</span
          ><span class="bold"> Chiếu lúc: </span>
          <span class="post-date">{{
            item.time + "-" + convertDateFormat(item.showDate)
          }}</span>
          <span class="bold"> Loại vé: </span>
          <span class="type-seat">{{ item.type == 1 ? $t('Normal') : "VIP" }}</span>
          <span class="bold"> Giá: </span>
          <span class="cost">{{ item.totalAmount + "VND" }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VsudInput from "../components/VsudInput.vue";
import { convertDateFormat } from "@/common/commonFunc";
import BaseButton from "./components/BaseButton.vue";

export default {
  components: { VsudInput, BaseButton },
  setup() {
    return { convertDateFormat };
  },
  created() {
    let me = this;
    this.loadData();
  },
  mounted() {},
  watch: {
    searchValue(oldVal, newVal) {
      this.dataHistoryTemp = this.dataHistory.filter(
        (x) =>
          x.phoneNumber.includes(newVal) ||
          x.movieName.toLowerCase().includes(newVal.toLowerCase()) ||
          x.customerName.toLowerCase().includes(newVal.toLowerCase())
      );

      if (!newVal) {
        this.dataHistoryTemp = this.dataHistory;
      }
    },
  },
  data() {
    return {
      dataHistory: [],
      dataHistoryTemp: [],
      searchValue: "",
    };
  },
  methods: {
    loadData() {
      let me = this;
      this.$store.state.isShowLoading = true;
      this.$api.post("/History/GetHistory").then((data) => {
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

      if (!this.searchValue) {
        this.dataHistoryTemp = this.dataHistory;
      }
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
      min-width: 1400px;
      padding: 0 20px;
      .history-item {
        width: 1350px;
        color: #111;
        padding: 10px;
        margin: 5px 0;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
          rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        .bold {
          font-weight: 600;
        }
      }
    }
  }
}
</style>
