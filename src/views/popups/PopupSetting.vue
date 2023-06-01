<template>
  <div class="setting-manage">
    <div class="setting-header">
        <div class="icon-close" @click="closeThisPopup">
            <i class="fas fa-times fa-lg"></i>
        </div>
      <div class="header-title">{{ $t(headerName[selection]) }}</div>
    </div>
    <div class="setting-left">
      <div class="left-header">
        <div class="header-title">{{ $t('Setting') }}</div>
      </div>
      <div class="line-space"></div>
      <div class="left-main">
        <div class="setting-item" @click="changeOption(0)" :class="selection==0?' selected':''">
          <div class="item-icon shadow me-3 rounded-2">
            <i class="fas fa-ticket-alt"></i>
          </div>
          <div class="item-content">{{ $t('Ticket') }}</div>
        </div>
        <div class="setting-item" @click="changeOption(1)" :class="selection==1?' selected':''">
          <div class="item-icon shadow me-3 rounded-2">
            <i class="fas fa-user-cog"></i>
          </div>
          <div class="item-content">{{ $t('Account') }}</div>
        </div>
        <div class="setting-item" @click="changeOption(2)" :class="selection==2?' selected':''">
          <div class="item-icon shadow me-3 rounded-2">
            <i class="fas fa-key"></i>
          </div>
          <div class="item-content">{{ $t('Password') }}</div>
        </div>
        <div class="setting-item" @click="changeOption(3)" :class="selection==3?' selected':''" v-if="$store.state.role == 'admin'">
          <div class="item-icon shadow me-3 rounded-2">
            <i class="fas fa-laptop-house"></i>
          </div>
          <div class="item-content">{{ $t('Data') }}</div>
        </div>
        <div class="setting-item" @click="changeOption(4)" :class="selection==4?' selected':''" v-if="$store.state.role == 'admin'">
          <div class="item-icon shadow me-3 rounded-2">
            <i class="fas fa-laptop-house"></i>
          </div>
          <div class="item-content">{{ $t('Cinema') }}</div>
        </div>
      </div>
    </div>
    <div class="setting-main">
      <common-setting
        v-if="selection == 0 && $store.state.isShowCommonSetting"
      ></common-setting>
      <account-setting
        v-if="selection == 1 && $store.state.isShowAccountSetting"
      ></account-setting>
      <password-setting
        v-if="selection == 2 && $store.state.isShowPasswordSetting"
      ></password-setting>
      <cinema-setting
        v-if="selection == 3 && $store.state.isShowCinemaSetting"
      ></cinema-setting>
      <cinema-info-setting
        v-if="selection == 4 && $store.state.isShowCinemaInfoSetting"
      ></cinema-info-setting>
    </div>
  </div>
</template>
<script>
import CinemaInfoSetting from "./settingchild/CinemaInfoSetting.vue";
import CinemaSetting from "./settingchild/CinemaSetting.vue";
import AccountSetting from "./settingchild/AccountSetting.vue";
import PasswordSetting from "./settingchild/PasswordSetting.vue";
import CommonSetting from "./settingchild/CommonSetting.vue";
export default {
  components: {
    AccountSetting,PasswordSetting,CommonSetting,CinemaSetting,CinemaInfoSetting
  },
  mounted() {
    this.$store.state.isShowCommonSetting = true;
  },
  data() {
    return {
      selection: 0,
      headerName: ["TicketInformation", "AccountInformation","Password","Addnewdata","Cinema"],
    };
  },
  methods: {
    changeOption(option) {
      this.selection = option;
      if (option === 1) this.$store.state.isShowAccountSetting = true;
      if(option === 2) this.$store.state.isShowPasswordSetting = true;
      if(option === 0) this.$store.state.isShowCommonSetting = true;
      if(option === 3) this.$store.state.isShowCinemaSetting = true;
      if(option === 4) this.$store.state.isShowCinemaInfoSetting = true;
    },
    closeThisPopup(){
        this.$store.state.isShowSetting = false;
    }
  },
};
</script>
<style lang="scss">
.setting-manage {
  display: flex;
  position: fixed;
  color: #111;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 3000;
  .setting-header {
    height: 60px;
    position: fixed;
    left: 300px;
    right: 0;
    top: 0;
    box-shadow: 0px 10px 10px -15px #111;
    display: flex;
    align-items: center;
    justify-content: center;
    .header-title {
      font-size: 20px;
      font-weight: 600;
    }

    .icon-close{
        position: absolute;
        top: 10px;
        right: 20px;
        cursor: pointer;
        &:hover{
            opacity: 0.7;
        }
    }
  }
  .setting-left {
    height: 100%;
    box-shadow: 5px 0 5px -5px #333;
    width: 300px;
    position: relative;
    .left-header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      .header-title {
        font-size: 20px;
        font-weight: 700;
        color: #111;
      }
    }
    .line-space {
      display: flex;
      justify-content: center;
      height: 1px;
      &:after {
        content: "";
        height: 1px;
        border-top: 1px solid rgba($color: #000000, $alpha: 0.3);
        width: 250px;
      }
    }

    .left-main {
      padding: 10px;
      .setting-item {
        cursor: pointer;
        height: 60px;
        display: flex;
        align-items: center;
        padding-left: 40px;
        padding-top: 10px;
        padding-bottom: 10px;
        margin: 10px 0;
        .item-icon {
          height: 40px;
          width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .item-content {
          font-weight: 600;
        }

        &:hover {
          color: rgb(20, 110, 190);
        }
      }
    }
  }
  .setting-main {
    height: calc(100% - 60px);
    width: 100%;
    margin-top: 60px;
  }

  .selected{
    background: #409eff;
    color: #fff;
    border-radius: 6px;
    .item-icon{
      border: 1px solid #fff;
    }
  }
}
</style>
