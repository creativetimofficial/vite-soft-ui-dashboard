<template>
  <div class="password-child-setting">
    <div class="password-info-header">
      Vui lòng nhập mật khẩu hiện tại trước khi thay đổi mật khẩu mới
    </div>
    <div class="password-info-container">
      <div class="password-info">
        <div class="info-row">
          <div class="info-label">Nhập mật khẩu hiện tại:</div>
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
              placeholder="Nhập mật khẩu"
              show-password
              autocomplete="off"
            />
          </div>
        </div>
        <div class="info-row">
          <div class="info-label">Nhập mật khẩu mới:</div>
          <div class="info-content">
            <el-input
              v-model="newPassword"
              type="password"
              placeholder="Nhập mật khẩu"
              show-password
              autocomplete="off"
            />
          </div>
        </div>
        <div class="info-row">
          <div class="info-label">Nhập lại mật khẩu mới:</div>
          <div class="info-content">
            <el-input
              v-model="newPasswordTemp"
              type="password"
              placeholder="Nhập mật khẩu"
              show-password
              autocomplete="off"
            />
          </div>
        </div>
        <div class="info-row">
          <div class="info-label"></div>
          <div class="info-content">
            <el-button color="#626aef" :dark="true" @click="changePassword()"
              >Đồng ý</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { validatePassword } from "@/common/commonFunc";

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
      this.$store.state.isShowLoading = true;
      this.$api
        .post("/Account/GetAccountByAccountName", {
          accountName: me.$store.state.thisAccountName,
        })
        .then((data) => {
          me.dataAccount = data;
          me.$store.state.isShowLoading = false;
        });
    },

    validateChangePassword() {
      if (this.dataAccount.password != this.presentPassword) {
        this.$store.dispatch("showToast", "Mật khẩu nhập không đúng!");
        return false;
      }

      if (!this.newPassword) {
        this.$store.dispatch("showToast", "Vui lòng nhập mật khẩu mới!");
        return false;
      }

      if (this.newPassword != this.newPasswordTemp) {
        this.$store.dispatch("showToast", "Mật khẩu mới không trùng khớp!");
        return false;
      }

      if (!validatePassword(this.newPassword)) {
        this.$store.dispatch(
          "showToast",
          "Mật khẩu phải đủ 8 chữ cái chứa ít nhất một số và 1 ký tự đặc biệt"
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
                "Có lỗi xảy ra vui lòng thử lại!"
              );
            } else {
              me.presentPassword = "";
              me.newPassword = "";
              me.newPasswordTemp = "";
              me.$store.dispatch(
                "showToast",
                "Cập nhật mật khẩu thành công!"
              );
            }
            me.$store.state.isShowLoading = false;
          });
      }
    },
  },
};
</script>
<style lang="scss">
.password-child-setting {
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
