<template>
    <div class="seatroom-manage">
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
      <base-button
          :classButton="'button-blue'"
          :titleButton="$t('Addnew')"
          @bindEvent="SaveState()"
        ></base-button>
    </div>
  </template>
    
  <script>
  import { listSeat, convertLetter } from "@/constants/constantsdefaults";
  import BaseButton from './components/BaseButton.vue';
  
  export default {
    name: "SeatRoomManage",
    setup() {
      return {
        listSeat,
        convertLetter,
      };
    },
    components: {BaseButton},
    created() {
      this.loadDataSeat();
    },
    data() {
      return {
        dataSeat: [],
        roomCinmeIDSelected: "ca589116-d5b2-11ed-a44f-907841e9040c",
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
            this.seatsSelecting.push({ rowSeat: row, colSeat: col, roomCinemaID: this.roomCinmeIDSelected });
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
  
      SaveState(){
        let me = this;
        this.$api.post('/Movie/UpdateSeatRoomCinema', me.seatsSelecting).then(()=>{
          location.reload();
        });
      }
    },
  };
  </script>
  <style lang="scss">
  .seatroom-manage {
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
  </style>