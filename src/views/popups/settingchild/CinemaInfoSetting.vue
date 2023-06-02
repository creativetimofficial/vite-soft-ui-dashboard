<template>
  <div class="cinemainfo-child-setting">
    <div class="password-info-header">
      {{ $t("CinemaInfoSettingContent") }}
    </div>
    <div class="password-info-container">
      <div class="password-info">
        <div class="info-row">
          <div class="info-label">{{ $t("Cinemacode") }}:</div>
          <div class="info-content">
            <el-input
              v-model="cinemaInfo.cinemaCode"
              type="text"
              :placeholder="$t('Cinemacode')"
              autocomplete="off"
              disabled
            />
          </div>
        </div>
        <div class="info-row">
          <div class="info-label">{{ $t("Cinemaname") }}:</div>
          <div class="info-content">
            <el-input
              v-model="cinemaInfo.cinemaName"
              type="text"
              :placeholder="$t('Cinemaname')"
              autocomplete="off"
              disabled
            />
          </div>
        </div>
        <div class="info-row">
          <div class="info-label">{{ $t("Cinemaaddress") }}:</div>
          <div class="info-content">
            <el-input
              v-model="cinemaInfo.cinemaAddress"
              type="text"
              :placeholder="$t('Cinemaaddress')"
              autocomplete="off"
              :disabled="isEdit"
              ref="cinemaCodeInfo"

            />
          </div>
        </div>
        <div class="info-row">
          <div class="info-label">{{ $t("Hotline") }}:</div>
          <div class="info-content">
            <el-input
              v-model="cinemaInfo.hotline"
              type="text"
              :placeholder="$t('Hotline')"
              autocomplete="off"
              :disabled="isEdit"
            />
          </div>
        </div>
        <div class="info-row">
          <div class="info-label">{{ $t("MST") }}:</div>
          <div class="info-content">
            <el-input
              v-model="cinemaInfo.mst"
              type="text"
              :placeholder="$t('MST')"
              autocomplete="off"
              :disabled="isEdit"
            />
          </div>
        </div>
        <div class="info-row">
          <div class="info-label">{{ $t("AboutCinema") }}:</div>
          <div class="info-content">
            <el-input
              v-model="cinemaInfo.about"
              type="text"
              :placeholder="$t('AboutCinema')"
              autocomplete="off"
              :disabled="isEdit"
            />
          </div>
        </div>
        <div class="info-row">
          <div class="info-label"></div>
          <div class="info-content me-3">
            <el-popconfirm
              width="300"
              :confirm-button-text="$t('Yes')"
              :cancel-button-text="$t('Cancle')"
              :icon="InfoFilled"
              :title="$t('Warningchangeinfocinema')"
              @confirm="updateCinemaInfo"
            >
              <template #reference>
                <el-button type="primary" :dark="true" :disabled="isEdit">{{
                  $t("Save")
                }}</el-button>
              </template>
            </el-popconfirm>
          </div>
          <div class="info-content">
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="$t('Edit')"
              placement="top"
            >
              <el-button
                type="primary"
                v-show="isEdit"
                :icon="Edit"
                circle
                @click="editThis"
              />
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Edit } from "@element-plus/icons-vue";
import { validateNumberToString } from "@/common/commonFunc";

export default {
  components: {},
  setup() {
    return {
      Edit,
    };
  },
  created() {
    this.loadData();
  },
  data() {
    return {
      isEdit: true,
      cinemaInfo: {},
    };
  },
  methods: {
    createNewDB() {},
    validateDB() {},
    updateCinemaInfo() {
      let me = this;
      let check = this.validateData();
      if (check) {
        me.$store.state.isShowLoading = true;
        this.$api
          .post("/Dictionary/UpdateCinemaInfo", {
            cinemaID: this.cinemaInfo.cinemaID,
            cinemaCode: this.cinemaInfo.cinemaCode,
            cinemaName: this.cinemaInfo.cinemaName,
            cinemaAddress: this.cinemaInfo.cinemaAddress,
            about: this.cinemaInfo.about,
            hotline: this.cinemaInfo.hotline,
            mst: this.cinemaInfo.mst,
          })
          .then((data) => {
            me.$store.state.isShowLoading = false;
            me.$store.dispatch("showToast", this.$t("UpdateSuccessful"));
            me.loadData();
          });
      }
    },
    validateData() {
      let check = true;
      if (
        !this.cinemaInfo.cinemaCode ||
        !this.cinemaInfo.cinemaName ||
        !this.cinemaInfo.cinemaName ||
        !this.cinemaInfo.cinemaAddress ||
        !this.cinemaInfo.hotline ||
        !this.cinemaInfo.mst
      ) {
        this.$store.dispatch("showToast", this.$t("enterenoughinfo"));
        check = false;
      }

      if(!validateNumberToString(this.cinemaInfo.hotline) && !this.cinemaInfo.hotline && check){
        this.$store.dispatch("showToast", this.$t("formattruenumber"));
        check = false;
      }

      return check;


    },

    editThis() {
      this.isEdit = false;
      this.$refs.cinemaCodeInfo.focus();
    },
    loadData() {
      let me = this;
      this.$store.state.isShowLoading = true;
      this.$api.get("Dictionary/GetCinemaInfo").then((data) => {
        me.cinemaInfo = data;
        me.$store.state.isShowLoading = false;
        me.isEdit = true;
      });
    },
  },
};
</script>
<style lang="scss">
.cinemainfo-child-setting {
  .el-input__inner {
    color: #000 !important;
  }
  .password-info-header {
    font-style: italic;
    font-size: 12px;
    text-align: center;
    padding: 10px;
  }
  height: 100%;
  width: 100%;
  .password-info-container {
    margin-top: 100px;
    .password-info {
      height: 500px;
      .info-row {
        display: flex;
        justify-content: flex-start;
        .info-label {
          width: 50%;
          display: flex;
          justify-content: flex-end;
          font-weight: 600;
          margin-right: 5px;
          align-items: center;
        }
        padding-top: 10px;
      }
    }
  }
}
</style>
