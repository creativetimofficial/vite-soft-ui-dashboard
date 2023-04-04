<template>
  <div class="popup-add-movie">
    <div class="popup-container">
      <div class="popup-header">
        <div class="popup-title">Thêm mới phim</div>
        <div class="popup-icon-close">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <div class="popup-main">
        <div class="popup-row-1">
          <div class="popup-input">
            <label>{{ $t("MovieCode") }}</label>
            <vsud-input
              type="text"
              :placeholder="$t('MovieCode')"
              name="password"
              v-model="password"
              :id="'movie_name'"
            />
          </div>
          <div class="popup-input">
            <label>{{ $t("MovieName") }}</label>
            <vsud-input
              type="text"
              :placeholder="$t('MovieName')"
              name="password"
              v-model="password"
              :id="'movie_name'"
            />
          </div>
          <div class="popup-input">
            <label>{{ $t("Actor") }}</label>
            <vsud-input
              type="text"
              :placeholder="$t('Actor')"
              name="password"
              v-model="password"
              :id="'movie_name'"
            />
          </div>
          <div class="popup-input">
            <label>{{ $t("Direction") }}</label>
            <vsud-input
              type="text"
              :placeholder="$t('Direction')"
              name="password"
              v-model="password"
              :id="'movie_name'"
            />
          </div>
        </div>
        <div class="popup-row-1">
          <div class="popup-input popup-date">
            <label>{{ $t("FromDate") }}</label>
            <el-date-picker
              v-model="fromdate"
              type="date"
              :placeholder="$t('PickADay')"
              :size="size"
            />
          </div>
          <div class="popup-input popup-date">
            <label>{{ $t("ToDate") }}</label>
            <el-date-picker
              v-model="todate"
              type="date"
              :placeholder="$t('PickADay')"
              :size="size"
            />
          </div>
          <div class="popup-input popup-date">
            <label>{{ $t("ReleaseDate") }}</label>
            <el-date-picker
              v-model="releasedate"
              type="date"
              :placeholder="$t('PickADay')"
              :size="size"
            />
          </div>
        </div>
        <div class="popup-row-1">
          <div class="popup-input popup-date">
            <label>{{ $t("Content") }}</label>
            <vsud-input
              type="text"
              :placeholder="$t('Content')"
              name="password"
              v-model="password"
              :id="'movie_content'"
              :isMultiple="true"
            />
          </div>
          <div class="popup-input popup-date">
            <label>{{ $t("Poster") }}</label>
            <base-upload :idUpload="'movie-image-upload'" :typeImage="'.jpg,.png'"></base-upload>
          </div>
          <div class="popup-input popup-date">
            <label>{{ $t("ReleaseDate") }}</label>
            <base-upload-firebase></base-upload-firebase>
          </div>
        </div>
      </div>
      <div class="popup-footer">
        <base-button
          :classButton="'button-white'"
          :titleButton="'Hủy'"
        ></base-button>

        <div class="ml-2"></div>
        <base-button
          :classButton="'button-blue'"
          :titleButton="'Thêm'"
        ></base-button>
      </div>
    </div>
  </div>
</template>

<script>
import VsudInput from "../../components/VsudInput.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseUpload from '../components/BaseUpload.vue';
import BaseUploadFirebase from "../components/BaseUploadFirebase.vue";
export default {
  components: {
    BaseButton,
    VsudInput,BaseUpload,BaseUploadFirebase
  },
  props: {},
  data() {
    return { fromdate: "", todate: "", releasedate: "" };
  },
  methods: {},
};
</script>

<style lang="scss">
@import "vue-select/dist/vue-select.css";
.popup-add-movie {
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
    height: 600px;
    width: 900px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .popup-header {
      height: 60px;
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
      height: 60px;
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
    }
  }
}
</style>
