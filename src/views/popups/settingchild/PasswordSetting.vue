<template>
  <div class="cinema-setting">
    <div class="password-info-header">
      {{ $t("PasswordSettingNote") }}
    </div>
    <div class="password-info-container">
      <div class="password-info">
        <div class="info-row">
          <div class="info-label">{{ $t("Entercurrentpassword") }}:</div>
          <div class="info-content">
            <input
              type="password"
              name=""
              id=""
              autocomplete="off"
              v-show="false"
            />

            <el-input
              v-model="presentPassword"
              type="password"
              :placeholder="$t('EnterPassword')"
              show-password
              autocomplete="off"
            />
          </div>
        </div>
        <div class="info-row">
          <div class="info-label">{{ $t("Enteryournewpassword") }}:</div>
          <div class="info-content">
            <el-input
              v-model="newPassword"
              type="password"
              :placeholder="$t('EnterPassword')"
              show-password
              autocomplete="off"
            />
          </div>
        </div>
        <div class="info-row">
          <div class="info-label">{{ $t("Reenterthepassword") }}:</div>
          <div class="info-content">
            <el-input
              v-model="newPasswordTemp"
              type="password"
              :placeholder="$t('EnterPassword')"
              show-password
              autocomplete="off"
            />
          </div>
        </div>
        <div class="info-row">
          <div class="info-label"></div>
          <div class="info-content">
            <el-button type="primary" :dark="true" @click="changePassword()">{{
              $t("Save")
            }}</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { validatePassword } from "@/common/commonFunc";
import jwt from "jsonwebtoken";
export default {
  components: {},
  created() {
    let me = this;
    this.loadData();
  },
  data() {
    return {
      dataAccount: [],
      presentPassword: "",
      newPassword: "",
      newPasswordTemp: "",
    };
  },
  methods: {
    loadData() {
      let me = this;
      const token = sessionStorage.getItem("token");
      this.$store.state.isShowLoading = true;
      this.$api
        .post("/Account/GetAccountByAccountName", {
          accountName: jwt.decode(token).name,
        })
        .then((data) => {
          me.dataAccount = data;
          me.$store.state.isShowLoading = false;
        });
    },

    validateChangePassword() {
      if (this.dataAccount.password != this.presentPassword) {
        this.$store.dispatch("showToast", this.$t('Passwordenteredisincorrect'));
        return false;
      }

      if (!this.newPassword) {
        this.$store.dispatch("showToast", this.$t('Pleaseenteranewpassword'));
        return false;
      }

      if (this.newPassword != this.newPasswordTemp) {
        this.$store.dispatch("showToast", this.$t('Newpassworddoesnotmatch'));
        return false;
      }

      if (!validatePassword(this.newPassword)) {
        this.$store.dispatch(
          "showToast",
          this.$t('PasswordNotTrue')
        );
        return false;
      }

      return true;
    },

    changePassword() {
      let me = this;
      if (this.validateChangePassword()) {
        this.$store.state.isShowLoading = true;

        this.$api
          .post("/Account/UpdatePassword", {
            accountName: me.dataAccount.accountName,
            password: me.newPassword,
          })
          .then((data) => {
            if (!data) {
              me.$store.dispatch(
                "showToast",
                this.$t('HaveErrorTryAgain')
              );
            } else {
              me.presentPassword = "";
              me.newPassword = "";
              me.newPasswordTemp = "";
              me.$store.dispatch("showToast", this.$t('Passwordupdatesuccessful'));
            }
            me.$store.state.isShowLoading = false;
          });
      }
    },
  },
};
</script>
<style lang="scss">
.cinema-setting {
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
