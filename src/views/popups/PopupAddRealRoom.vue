<template>
  <div class="popup-add-real-room">
    <div class="popup-container">
      <div class="popup-header">
        <div class="popup-title">{{ $t("Moremovieroom") }}</div>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="$t('Close')"
          placement="top"
        >
          <div class="popup-icon-close" @click="closeThisPopup()">
            <i class="fas fa-times"></i>
          </div>
        </el-tooltip>
      </div>
      <div class="popup-main">
        <div class="popup-row-1 mt-2">
          <div class="popup-input popup-date">
            <label>{{ $t("RoomName") }}</label>
            <vsud-input
              type="text"
              :placeholder="$t('EnterRoomName')"
              name="search_movie"
              v-model="roomCode"
              :id="'search_movie'"
              :isRequired="true"
            />
          </div>
          <div class="popup-input popup-date">
            <label>{{ $t("RowNumber") }}</label>
            <vsud-input
              type="number"
              :placeholder="$t('EnterTheRowNumber')"
              name="search_movie"
              v-model="rowSeat"
              :id="'search_movie'"
              :isRequired="true"
            />
          </div>
          <div class="popup-input popup-date">
            <label>{{ $t("ColNumber") }}</label>
            <vsud-input
              type="number"
              :placeholder="$t('EnterTheColNumber')"
              name="search_movie"
              v-model="colSeat"
              :id="'search_movie'"
              :isRequired="true"
            />
          </div>
        </div>
      </div>
      <div class="popup-footer">
        <base-button
          :classButton="'button-white'"
          :titleButton="$t('Cancel')"
          @bindEvent="closeThisPopup()"
        ></base-button>

        <div class="ml-2"></div>
        <base-button
          :classButton="'button-blue'"
          :titleButton="$t('Add')"
          @click="createNewRoomCinema()"
        ></base-button>
      </div>
    </div>
  </div>
</template>

<script>
import VsudInput from "../../components/VsudInput.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseUpload from "../components/BaseUpload.vue";
import BaseUploadFirebase from "../components/BaseUploadFirebase.vue";
import { uuidv4 } from "../../common/uuid";
import { convertDateTime } from "@/common/commonFunc.js";
export default {
  emits: ["add-click"],
  components: {
    BaseButton,
    VsudInput,
    BaseUpload,
    BaseUploadFirebase,
  },
  created() {},
  props: {
    listRoom: {
      type: Array,
    },
  },
  watch: {},
  data() {
    return {
      dataRoom: [],
      dataRoomSelected: null,
      showTemplate: false,
      roomCode: "",
      colSeat: 0,
      rowSeat: 0,
    };
  },
  methods: {
    closeThisPopup() {
      this.$store.state.isShowPopupAddRealRoom = false;
    },
    createNewRoomCinema() {
      let me = this;
      let check = this.validateExistRoom();
      if (check) {
        this.$store.state.isShowLoading = true;
        this.$api
          .post("/CinemaRoom/CreateNewRealRoom", {
            roomCode: me.roomCode,
            colSeat: me.colSeat,
            rowSeat: me.rowSeat,
          })
          .then(() => {
            me.$emit("add-click");
            me.$store.state.isShowLoading = false;
            me.$store.state.isShowPopupAddRealRoom = false;
            me.$store.dispatch("showToast", this.$t("Successfullyaddednew"));
          });
      }
    },

    validateExistRoom() {
      let check = this.listRoom.find((x) => x.roomCode == this.roomCode);
      if (check) {
        this.$store.dispatch("showToast", this.$t("Roomnamealreadyexists"));
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss">
.popup-add-real-room {
  input::placeholder {
    font-size: 13px;
    color: #c8cace;
  }
  .form-control {
    height: 40px;
  }

  .mt-2 {
    margin-top: 10px;
  }
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  .popup-container {
    height: 350px;
    width: 550px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .popup-header {
      min-height: 60px;
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 18px 0;
      background: #ddefff;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      .popup-title {
        font-weight: 700;
        font-size: 18px;
        color: #111;
      }
      .popup-icon-close {
        position: absolute;
        top: 10px;
        right: 10px;
        height: 20px;
        width: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }

    .popup-footer {
      min-height: 60px;
      padding: 0 18px 0;
      display: flex;
      background: #ddefff;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .ml-2 {
        margin-left: 10px;
      }
    }

    .popup-main {
      padding: 0 18px 0;
      .popup-input {
        padding: 0 8px 0;
      }
      .pt-25 {
        padding-top: 25px;
      }
      .popup-row-1 {
        display: flex;
        .form-control {
          padding-left: 0.75rem !important;
        }
        .el-input__wrapper {
          border-radius: 10px !important;
        }

        .el-input--prefix {
          margin-bottom: 1rem;
        }

        .el-input {
          height: 40px !important;
        }

        .popup-date {
          width: 250px !important;
        }
      }
      #movie_content {
        max-height: 100px;
        width: 200px;
        height: 100px;
      }

      #trailer-link {
        width: 600px;
      }

      .group-combobox {
        margin: auto 0;
        width: 100%;
      }
    }
  }
}
</style>
