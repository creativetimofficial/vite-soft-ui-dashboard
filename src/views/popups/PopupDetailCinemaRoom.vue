<template>
  <div class="roomcinema-manage">
    <div class="cinemaroom-header">
      <div class="cinemaroom-header-left">
        <i class="fas fa-long-arrow-alt-left" @click="closePopup()"></i>
        <div class="content">Trở lại</div>
      </div>
      <div class="cinemaroom-header-center">
        <div class="content-main">Phòng chiếu {{ codeRoom }}</div>
      </div>
    </div>
    <div class="cinemaroom-main">
      <div class="screen-select-seat">
        <div class="seat-container">
          <div class="seat-row" v-for="item in maxRow" :key="item">
            <div
              class="seat-col"
              :class="[
                getSeat(item, itemCol),
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
      <div class="description-seat">
        <div class="note">Chú thích</div>
        <div class="seat-selected">
          <div class="color-selected"></div>
          <div class="content-selected">Ghế VIP</div>
        </div>
        <div class="seat-unselected">
          <div class="color-unselected"></div>
          <div class="content-unselected">Ghế thường</div>
        </div>
        <div class="seat-unuse">
          <div class="color-unuse"></div>
          <div class="content-unuse">Bảo trì</div>
        </div>
        <div class="seat-selecting">
          <div class="color-selecting"></div>
          <div class="content-selecting">Đang chọn</div>
        </div>
      </div>
    </div>
    <div class="cinemaroom-footer">
      <base-button
        :classButton="'button-white'"
        :titleButton="'Hủy'"
        @bindEvent="closePopup()"
      ></base-button>
      <div class="ml-2"></div>
      <base-button
        :classButton="[
          'button-blue',
          seatsSelecting.length ? '' : ' button-none',
        ]"
        :titleButton="'Cập nhật VIP'"
        @bindEvent="updateVIP()"
      ></base-button>
      <div class="ml-2"></div>
      <base-button
        :classButton="[
          'button-blue',
          seatsSelecting.length ? '' : ' button-none',
        ]"
        :titleButton="'Cập nhật bảo trì'"
        @bindEvent="updateNone()"
      ></base-button>
      <div class="ml-2"></div>
    </div>
  </div>
</template>

<script>
import { listSeat, convertLetter } from "@/constants/constantsdefaults";
import BaseButton from "@/views/components/BaseButton.vue";
import { convertDateFormat, convertTimeFormat } from "@/common/commonFunc";
import { forEach } from "lodash";
export default {
  name: "SeatRoomManage",
  setup() {
    return {
      listSeat,
      convertLetter,
      convertDateFormat,
      convertTimeFormat,
    };
  },
  components: { BaseButton },
  created() {
    let me = this;
    this.loadDataSeat(me.idRoom);
  },
  props: {
    idRoom: {
      type: String,
      required: true,
    },
    codeRoom: {
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
      roomCinmeIDSelected: "",
      dataTemplateTime: [],
    };
  },
  methods: { 
    loadDataSeat(id) {
      let me = this;
      this.$api
        .post("/CinemaRoom/GetListRealSeatByRoom", {
          roomID: id,
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
      let status = this.dataSeat.find(
        (seat) => seat.rowSeat === row && seat.colSeat === col
      ).type;

      if(status == 1){
        return "normal"
      }else if(status == 2){
        return "vip"
      }else{
        return "unuse"
      }
    },

    pushSelectingSeat(row, col) {
      if (this.getSeat(row, col)!="unuse") {
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
            roomID: this.idRoom,
          });
        }
      }
    },

    isSelecting(row, col) {
      return this.seatsSelecting.find(
        (x) => x.rowSeat == row && x.colSeat == col
      );
    },

    updateVIP() {
      let me = this;
      for(let item in me.seatsSelecting){
        me.seatsSelecting[item].type = 2;
      };
      this.$api
        .post("/CinemaRoom/UpdateRealSeat", me.seatsSelecting)
        .then(() => {
          location.reload();
        });
    },

    updateNone() {
      let me = this;
      for(let item in me.seatsSelecting){
        me.seatsSelecting[item].type = 3;
      };
      this.$api
        .post("/CinemaRoom/UpdateRealSeat", me.seatsSelecting)
        .then(() => {
          location.reload();
        });
    },

    closePopup() {
      this.$store.state.isShowDetailCinemaRoom = false;
    },
  },
};
</script>
<style lang="scss">
.roomcinema-manage {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 9999;
  .cinemaroom-header {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    background: #ddefff;
    .cinemaroom-header-left {
      display: flex;
      font-weight: 600;
      font-size: 18px;
      i {
        display: flex;
        align-items: center;
        transform: scale(1.5);
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }

      .content {
        margin-left: 20px;
      }
    }
    .cinemaroom-header-center {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      color: #111;
      font-size: 20px;
      font-weight: 600;
    }
  }

  .template-time-code-main {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    justify-content: center;
    .template-time-card {
      &.selecting {
        background: rgb(195 137 137);
        color: #fff;
        font-weight: 900;
        border-color: #fff;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
          rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        transform: scale(1.1) !important;
      }
      margin: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 4px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      border: 1px solid rgba(0, 0, 0, 0.5);
      border-radius: 4px;
      cursor: pointer;
      -webkit-user-select: none;
      user-select: none;
      &:hover {
        opacity: 0.7;
        transform: scale(1.05);
      }
    }
  }

  .cinemaroom-main {
    height: calc(100vh - 230px);
    padding: 20px 200px;
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
            &.vip {
              background: #17c1e8;
            }

            &.unuse{
              background: rgb(202, 202, 202);
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

    .description-seat {
      -webkit-user-select: none;
      user-select: none;
      position: absolute;
      left: 20px;
      top: 40%;
      transform: translateY(-50%);
      font-size: 12px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      padding: 10px;
      border-radius: 4px;
      .note {
        font-size: 14px;
        color: #111;
        text-align: center;
        margin-bottom: 10px;
      }

      .seat-selected,
      .seat-unselected,
      .seat-selecting,.seat-unuse {
        display: flex;
        padding-bottom: 10px;
      }

      .color-selected,
      .color-unselected,
      .color-selecting,.color-unuse {
        height: 20px;
        width: 20px;
        margin-right: 10px;
        border-radius: 4px;
        &:hover {
          transform: scale(1.5);
        }
      }

      .color-selected {
        background: #17c1e8;
      }

      .color-unselected {
        background: #cb0c9f;
      }

      .color-selecting {
        background: red;
      }

      .color-unuse{
        background: rgb(202, 202, 202);
      }
    }
  }

  .cinemaroom-footer {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    height: 60px;
    .ml-2 {
      margin-left: 10px;
    }
    align-items: center;
    background: #ddefff;
  }

  .button-none {
    pointer-events: none;
    opacity: 0.5;
  }
}
</style>
