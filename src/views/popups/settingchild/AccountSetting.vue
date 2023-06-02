<template>
  <div class="account-child-setting">
    <div class="account-info-header">
      {{ $t("AccountSettingNote") }}
    </div>
    <div class="account-info-container">
      <div class="account-info">
        <div class="info-row">
          <div class="info-label">{{$t('AccountName')}}:</div>
          <div class="info-content">{{ dataAccount.accountName }}</div>
        </div>
        <div class="info-row">
          <div class="info-label">{{ $t('Fullname') }}:</div>
          <div class="info-content">{{ dataAccount.name }}</div>
        </div>
        <div class="info-row">
          <div class="info-label">{{ $t('Gender') }}:</div>
          <div class="info-content">
            {{
              dataAccount.gender == 1
                ? $t('Male')
                : dataAccount.gender == 2
                ? $t('Female')
                : $t("Other")
            }}
          </div>
        </div>
        <div class="info-row">
          <div class="info-label">{{ $t('Email') }}:</div>
          <div class="info-content">{{ dataAccount.email ?dataAccount.email: $t("EmptyL") }}</div>
        </div>
        <div class="info-row">
          <div class="info-label">{{$t('PhoneNumber')}}:</div>
          <div class="info-content">{{ dataAccount.phoneNumber ? dataAccount.phoneNumber: $t("EmptyL") }}</div>
        </div>
        <div class="info-row">
          <div class="info-label">{{$t('AccountType')}}:</div>
          <div class="info-content">
            {{
              dataAccount.role == 1
                ? $t("Admin")
                : dataAccount.role == 2
                ? $t("Employee")
                : $t("Manager")
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
  },
};
</script>
<style lang="scss">
.account-child-setting {
  .account-info-header {
    font-style: italic;
    font-size: 12px;
    text-align: center;
    padding: 10px;
  }
  height: 100%;
  width: 100%;
  .account-info-container {
    margin-top: 100px;
    .account-info {
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
        }
        padding-top: 10px;
      }
    }
  }
}
</style>
