<template>
  <div class="popup-add-showtime">
    <div class="popup-container">
      <div class="popup-header">
        <div class="popup-title">
          {{ $t("Moremoviescreenings") }} {{ nameMovie }}
        </div>
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
            <label>{{ $t("Choosedate") }}</label>
            <el-date-picker
              v-model="dataMovie.postDate"
              type="date"
              :placeholder="$t('PickADay')"
              :size="size"
              @change="checkHideTemplate"
              :disabled-date="disabledDates"
            />
          </div>
          <div class="popup-input popup-date">
            <label>{{ $t("Chooseascreeningroom") }}</label>
            <!-- <v-select
              label="roomCode"
              :options="dataRoom"
              :placeholder="$t('PTypeMovie')"
              v-model="dataRoomSelected"
              :reduce="(roomCode) => roomCode.roomID"
              @option:deselected="checkHideTemplate()"
            ></v-select> -->

            <el-select
              v-model="dataRoomSelected"
              clearable
              :placeholder="$t('PTypeMovie')"
            >
              <el-option
                v-for="item in dataRoom"
                :key="item.roomID"
                :label="item.roomCode"
                :value="item.roomID"
                @change="checkHideTemplate"
              />
            </el-select>
          </div>
        </div>
        <div class="popup-row-1" v-if="showTemplate">
          <div class="popup-input group-combobox">
            <label>{{ $t("Chooseshowtime") }}</label>
            <!-- <v-select
              label="time"
              :options="dataMovie.templateTime"
              :placeholder="$t('PTypeMovie')"
              v-model="dataMovie.selectTemplateCode"
              :reduce="(time) => time.templateTimeCode"
              multiple
            ></v-select> -->

            <el-select
              v-model="dataMovie.selectTemplateCode"
              multiple
              collapse-tags
              collapse-tags-tooltip
              :placeholder="$t('Selectashowtime')"
              style="width: 470px"
              :no-data-text="$t('BlankShowtimeContent')"
            >
              <el-option
                v-for="item in dataMovie.templateTime"
                :key="item.templateTimeCode"
                :label="item.time"
                :value="item.templateTimeCode"
              />
            </el-select>
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
  created() {
    let me = this;
    this.$api.get("/Movie/GetListRoom").then((data) => {
      me.dataRoom = data;
    });
  },
  props: {
    nameMovie: {
      type: String,
    },
    idMovie: {
      type: String,
    },
  },
  watch: {
    dataRoomSelected(newVal, oldVal) {
      this.dataMovie.selectTemplateCode = null;
      this.checkHideTemplate();
    },
  },
  data() {
    return {
      dataMovie: {
        postDate: "",
        templateTime: [],
        categoryMovie: [],
        selectTemplateCode: null,
      },

      dataRoom: [],
      dataRoomSelected: null,
      showTemplate: false,
    };
  },
  methods: {
    checkHideTemplate() {
      let me = this;
      if (this.dataMovie.postDate && this.dataRoomSelected) {
        this.$api
          .post("/Movie/GetTemplateTimeCodeByMovieID", {
            movieID: me.idMovie,
            postDate: convertDateTime(me.dataMovie.postDate),
            roomID: me.dataRoomSelected,
          })
          .then((data) => {
            me.dataMovie.templateTime = data;
            if (me.dataMovie.templateTime.length == 0) {
              me.dataMovie.selectTemplateCode = null;
            }
            me.showTemplate = true;
          });
      } else {
        me.showTemplate = false;
        me.dataMovie.selectTemplateCode = null;
      }
    },
    closeThisPopup() {
      this.$store.state.isOpenPopupAddShowtime = false;
    },
    createNewRoomCinema() {
      let me = this;
      this.$api
        .post("/Movie/CreateNewRoomCinema", {
          movieID: me.idMovie,
          roomID: me.dataRoomSelected,
          postDate: convertDateTime(me.dataMovie.postDate),
          listTemplateTimeCode: me.dataMovie.selectTemplateCode,
        })
        .then(() => {
          location.reload();
        });
    },
    disabledDates(time) {
      const today = new Date(); // Lấy ngày hiện tại
      today.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây, mili giây thành 0 để so sánh chỉ với ngày
      return time.getTime() < today.getTime(); // Trả về true nếu ngày truyền vào nhỏ hơn ngày hiện tại (bao gồm cả ngày hôm qua)
    },
  },
};
</script>

<style lang="scss">
@import "vue-select/dist/vue-select.css";
.popup-add-showtime {
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
        white-space: nowrap;
        text-align: center;
        text-overflow: ellipsis;
        width: 460px;
        overflow: hidden;
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
      height: 480px;
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
