<template>
  <div class="seatroom-manage">
    <div class="seatroom-header">
      <div class="seatroom-header-left">
        <i class="fas fa-long-arrow-alt-left" @click="closePopup()"></i>
        <div class="content">Trở lại</div>
      </div>
    </div>
    <div class="seatroom-main">
      <div class="screen-select-seat">
        <div class="seat-container">
          <div class="seat-row" v-for="item in maxRow" :key="item">
            <div
              class="seat-col"
              :class="[
                !getSeat(item, itemCol) ? 'selected' : '',
                isSelecting(item, itemCol) ? 'selecting' : '',
              ]"
              v-for="itemCol in maxCol"
              :key="itemCol"
              @click="pushSelectingSeat(item, itemCol)"
            >
              {{ convertLetter(item) + itemCol }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="seatroom-footer">
      <base-button
        :classButton="'button-white'"
        :titleButton="'Hủy'"
        @bindEvent="SaveState()"
      ></base-button>
      <div class="ml-2"></div>
      <base-button
        :classButton="'button-blue'"
        :titleButton="'Thêm mới'"
        @bindEvent="SaveState()"
      ></base-button>
      <div class="ml-2"></div>
    </div>
  </div>
</template>

<script>
import { listSeat, convertLetter } from "@/constants/constantsdefaults";
import BaseButton from "@/views/components/BaseButton.vue";

export default {
  name: "SeatRoomManage",
  setup() {
    return {
      listSeat,
      convertLetter,
    };
  },
  components: { BaseButton },
  created() {
    this.loadDataSeat();
  },
  props: {
    roomCinmeIDSelected: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dataSeat: [],
      seatsSelecting: [],
      maxRow: 0,
      maxCol: 0,
    };
  },
  methods: {
    loadDataSeat() {
      let me = this;
      this.$api
        .post("/Movie/GetListSeatCinemaRoom", {
          roomCinemaID: me.roomCinmeIDSelected,
        })
        .then((data) => {
          me.dataSeat = data;
          this.getLastRowCol(me.dataSeat);
        });
    },

    getLastRowCol(dataSeat) {
      const lastSeat = dataSeat[dataSeat.length - 1]; // Lấy ghế cuối cùng trong danh sách
      this.maxRow = lastSeat.rowSeat; // Số hàng lớn nhất
      this.maxCol = lastSeat.colSeat; // Số cột lớn nhất
    },

    getSeat(row, col) {
      return this.dataSeat.find(
        (seat) => seat.rowSeat === row && seat.colSeat === col
      ).status;
    },

    pushSelectingSeat(row, col) {
      if (this.getSeat(row, col)) {
        if (
          this.seatsSelecting.find((x) => x.rowSeat == row && x.colSeat == col)
        ) {
          this.seatsSelecting = this.seatsSelecting.filter(
            (item) => item.rowSeat !== row || item.colSeat !== col
          );
        } else {
          this.seatsSelecting.push({
            rowSeat: row,
            colSeat: col,
            roomCinemaID: this.roomCinmeIDSelected,
          });
        }
      }
    },

    isSelecting(row, col) {
      console.log(
        this.seatsSelecting.find((x) => x.rowSeat == row && x.colSeat == col)
      );
      return this.seatsSelecting.find(
        (x) => x.rowSeat == row && x.colSeat == col
      );
    },

    SaveState() {
      let me = this;
      this.$api
        .post("/Movie/UpdateSeatRoomCinema", me.seatsSelecting)
        .then(() => {
          location.reload();
        });
    },

    closePopup() {
      this.$store.state.isOpenPopupSeat = false;
    },
  },
};
</script>
<style lang="scss">
.seatroom-manage {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 9999;
  .seatroom-header {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    .seatroom-header-left {
      display: flex;
      font-weight: 600;
      font-size: 18px;
      i {
        display: flex;
        align-items: center;
        transform: scale(1.5);
        cursor: pointer;
      }

      .content {
        margin-left: 20px;
      }
    }
  }

  .seatroom-main {
    height: calc(100vh - 120px);
    padding: 20px;
    .screen-select-seat {
      .seat-container {
        .seat-row {
          display: flex;
          justify-content: center;
          .seat-col {
            height: 50px;
            width: 50px;
            background: #cb0c9f;

            color: #fff;
            margin: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 4px;
            box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
              rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
            font-weight: 600;
            cursor: pointer;
            &.selected {
              background: #17c1e8;

              cursor: no-drop;
            }

            &.selecting {
              background: red;
            }

            -webkit-user-select: none;
            user-select: none;
          }
        }
      }
    }
  }

  .seatroom-footer{
    display: flex;
    justify-content: flex-end;
    height: 60px;
    .ml-2{
        margin-left: 10px;
    }
    align-items: center;
    background: #ddefff;
  }
}
</style>
