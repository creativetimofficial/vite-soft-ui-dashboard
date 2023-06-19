<template>
  <div class="popup-detail-language">
    <div class="overlay" @click="closeThisPopup()"></div>
    <div class="popup-container">
      <div class="popup-header">
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="$t('Close')"
          placement="top"
        >
          <div class="icon-close" @click="closeThisPopup()">
            <i class="fas fa-times"></i>
          </div>
        </el-tooltip>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="$t('Addnew')"
          placement="top"
        >
          <div
            class="icon-add"
            @click="showUpdate()"
            v-if="$store.state.role == 'admin'"
          >
            <i class="far fa-plus-square fa-lg"></i>
          </div>
        </el-tooltip>

        <div class="header-title">{{ $t("Language") }}</div>
        <div class="line-space"></div>
      </div>
      <div class="popup-main">
        <div class="popup-get">
          <table id="table-language">
            <thead>
              <th class="category-code">{{ $t("LanguageCode") }}</th>
              <th class="category-name">{{ $t("LanguageName") }}</th>
            </thead>
            <tbody>
              <tr v-for="item in dataTemplate" :key="item.languageCode">
                <td class="category-code">{{ item.languageCode }}</td>
                <td class="category-name">{{ item.languageName }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="popup-update" v-if="isOpenUpdate">
          <div class="line-space"></div>
          <div class="update-title">{{ $t("Addnewlanguage") }}</div>
          <div class="input-content">
            <div class="popup-input">
              <label>{{ $t("LanguageCode") }}</label>
              <vsud-input
                type="text"
                :placeholder="$t('LanguageCode')"
                v-model="languageCode"
                :id="'movie_name'"
                :isRequired="true"
              />
            </div>
            <div class="ml-1"></div>
            <div class="popup-input">
              <label>{{ $t("LanguageName") }}</label>
              <vsud-input
                type="text"
                :placeholder="$t('LanguageName')"
                v-model="languageName"
                :id="'movie_name'"
                :isRequired="true"
              />
            </div>
          </div>
          <div class="button-content">
            <base-button
              :classButton="'button-white'"
              :titleButton="$t('Close')"
              @bindEvent="closeUpdate()"
            ></base-button>

            <div class="ml-1"></div>
            <base-button
              :classButton="'button-blue'"
              :titleButton="$t('Save')"
              @click="saveTemplateTimeCode()"
            ></base-button>
          </div>
        </div>
      </div>
      <div class="popup-footer"></div>
    </div>
  </div>
</template>
<script>
import VsudInput from "../../components/VsudInput.vue";
import BaseButton from "../components/BaseButton.vue";
export default {
  components: {
    VsudInput,
    BaseButton,
  },
  created() {
    let me = this;
    this.loadData();
  },
  data() {
    return {
      dataTemplate: [],
      templateTimeCode: "",
      time: "",
      isOpenUpdate: false,
      languageCode: "",
      languageName: "",
    };
  },
  methods: {
    closeUpdate() {
      this.isOpenUpdate = false;
    },
    showUpdate() {
      this.isOpenUpdate = true;
    },
    closeThisPopup() {
      this.$store.state.isOpenPopupDetailLanguage = false;
    },
    loadData() {
      let me = this;
      this.$store.state.isShowLoading = true;
      this.$api.get("/Dictionary/GetListLanguage").then((data) => {
        me.dataTemplate = data;
        me.$store.state.isShowLoading = false;
      });
    },

    saveTemplateTimeCode() {
      let me = this;
      this.$store.state.isShowLoading = true;
      if (me.languageCode && me.languageName) {
        this.$api
          .post("/Dictionary/InsertLanguage", {
            languageCode: me.languageCode,
            languageName: me.languageName,
          })
          .then((data) => {
            if (data) {
              me.$store.dispatch("showToast", this.$t("Savesuccessfully"));
              me.languageCode = "";
              me.languageName = "";
              me.isOpenUpdate = false;
              me.loadData();
              me.$store.state.isShowLoading = false;
            } else {
              me.$store.dispatch("showToast", this.$t("HaveErrorTryAgain"));
              me.$store.state.isShowLoading = false;
            }
          });
      } else {
        me.$store.dispatch("showToast", this.$t("Notenoughinformation"));
        me.$store.state.isShowLoading = false;
      }
    },
  },
};
</script>
<style lang="scss">
.popup-detail-language {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
  }
  .popup-container {
    position: absolute;
    box-shadow: 0 8px 26px -4px rgba(20, 20, 20, 0.15),
      0 8px 9px -5px rgba(20, 20, 20, 0.06) !important;
    top: 0;
    bottom: 0;
    right: 0;
    width: 500px;
    background: #fff;
    z-index: 10;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    .popup-header {
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      color: #111;
      font-size: 20px;
      flex-direction: column;
      font-weight: 700;
      .icon-close {
        position: absolute;
        top: 10px;
        right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20px;
        width: 20px;
        opacity: 0.8;
        cursor: pointer;
        &:hover {
          opacity: 0.5;
        }

        &:active {
          opacity: 1;
        }
      }

      .icon-add {
        position: absolute;
        top: 20px;
        left: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0.8;
        cursor: pointer;
        &:hover {
          opacity: 0.5;
        }

        &:active {
          opacity: 1;
        }
      }
      .header-title {
        height: 59px;
        display: flex;
        align-items: center;
      }
      .line-space {
        border-bottom: 1px rgba($color: #000000, $alpha: 0.1) solid;
        width: 350px;
        height: 1px;
      }
    }

    .popup-main {
      display: flex;
      height: calc(100% - 60px);
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .popup-get,
      .popup-update {
        flex: 1;
      }

      .popup-update {
        display: flex;
        align-items: center;
        flex-direction: column;

        .line-space {
          border-bottom: 1px rgba($color: #000000, $alpha: 0.1) solid;
          width: 350px;
          height: 1px;
        }

        .update-title {
          font-size: 20px;
          margin-top: 10px;
          font-weight: 700;
          color: #111;
        }

        .input-content {
          display: flex;
          margin-top: 10px;
        }
        .ml-1 {
          margin-left: 10px;
        }
        .button-content {
          display: flex;
          width: 100%;
          justify-content: flex-end;
        }
      }

      #table-language {
        margin-top: 20px;
        .category-code {
          width: 200px;
          text-align: center;
        }

        .category-name {
          width: 200px;
          text-align: center;
        }

        tr {
          cursor: pointer;
          th {
            border-bottom: 1px rgba($color: #000000, $alpha: 0.1) solid;
          }

          th:first-child,
          td:first-child {
            border-right: 1px rgba($color: #000000, $alpha: 0.1) solid;
          }
        }

        tbody {
          tr {
            &:hover {
              background: rgba($color: #000000, $alpha: 0.1);
            }
          }
        }
      }
    }
  }
}
</style>
