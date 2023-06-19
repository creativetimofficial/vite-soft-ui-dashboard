<template>
  <div class="popup-approval">
    <div class="popup-container">
      <div class="popup-header">
        <div class="popup-title">{{ $t("Accountapproval") }}</div>
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
        <div class="popup-main-container">
          <div class="main-empty" v-if="!dataAccount.length">
            {{ $t('Nodata') }}
          </div>
          <div
            class="account-item"
            v-for="item in dataAccount"
            :key="item.accountID"
          >
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="$t('Reject')"
              placement="top"
            >
              <div class="icon-deny" @click="denyAccount(item.accountID)">
                <i class="fas fa-ban"></i>
              </div>
            </el-tooltip>

            <div class="approval">
              <h3 class="approval__title">{{ item.name }}</h3>
              <p class="approval__content">
                {{ $t("Account") }}: {{ item.accountName }}
              </p>
              <div class="approval__date">
                {{ convertDateFormat(item.createdDate) }}
              </div>
              <div
                class="approval__arrow"
                @click="approvalAccount(item.accountID)"
              >
                <div class="approval-button">{{ $t("Approve") }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="popup-footer">
        <base-button
          :classButton="'button-white'"
          :titleButton="$t('Close')"
          @bindEvent="closeThisPopup()"
        ></base-button>
      </div>
    </div>
  </div>
</template>

<script>
import VsudInput from "../../components/VsudInput.vue";
import BaseButton from "../components/BaseButton.vue";
import { uuidv4 } from "../../common/uuid";
import { convertDateFormat } from "@/common/commonFunc";

export default {
  emits: ["add-click", "update"],
  components: {
    BaseButton,
    VsudInput,
  },
  setup(props) {
    return {
      convertDateFormat,
    };
  },
  created() {
    let me = this;
    this.loadData();
  },
  props: {},
  data() {
    return {
      dataAccount: [],
    };
  },
  methods: {
    closeThisPopup() {
      this.$store.state.isOpenPopupApprovalList = false;
    },
    loadData() {
      let me = this;
      this.$store.state.isShowLoading = true;
      this.$api.get("/Account/GetAllAccountTemp").then((data) => {
        me.dataAccount = data;
        me.$store.state.isShowLoading = false;
      });
    },
    approvalAccount(id) {
      let me = this;
      this.$store.state.isShowLoading = true;
      this.$api
        .post("/Account/ComfirmAccount", { accountID: id, status: 1 })
        .then((data) => {
          me.$store.state.isShowLoading = false;
          me.loadData();
          me.$emit("update");
          if (data) {
            me.$store.dispatch("showToast", this.$t('Accountapproved'));
          } else {
            me.$store.dispatch("showToast", this.$t('HaveErrorTryAgain'));
          }
        });
    },
    denyAccount(id) {
      let me = this;
      this.$store.state.isShowLoading = true;
      this.$api
        .post("/Account/ComfirmAccount", { accountID: id, status: 2 })
        .then((data) => {
          me.$store.state.isShowLoading = false;
          me.loadData();
          if (data) {
            me.$store.dispatch("showToast", this.$t('Accountdeniedapproval'));
          } else {
            me.$store.dispatch("showToast", this.$t('HaveErrorTryAgain'));
          }
        });
    },
  },
};
</script>

<style lang="scss">
@import "vue-select/dist/vue-select.css";
.popup-approval {
  input::placeholder {
    font-size: 13px;
    color: #c8cace;
  }
  .form-control {
    height: 40px;
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
    height: 600px;
    width: 710px;
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
      overflow-y: auto;
      .popup-main-container {
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        .account-item {
          position: relative;
          .icon-deny {
            position: absolute;
            z-index: 999;
            top: 15px;
            right: 20px;
            color: red;
            cursor: pointer;
            &:hover {
              opacity: 0.6;
            }
          }
        }
        .approval {
          --border-radius: 0.75rem;
          --primary-color: #7257fa;
          --secondary-color: #3c3852;
          width: 210px;
          font-family: "Arial";
          padding: 1rem;
          cursor: pointer;
          border-radius: var(--border-radius);
          background: #f1f1f3;
          box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 3%);
          position: relative;
          margin: 10px 10px;
        }

        .approval-button {
          color: #fff;
          font-size: 12px;
        }

        .approval > * + * {
          margin-top: 1.1em;
        }

        .approval .approval__content {
          color: var(--secondary-color);
          font-size: 0.86rem;
        }

        .approval .approval__title {
          padding: 0;
          font-size: 1.3rem;
          font-weight: bold;
        }

        .approval .approval__date {
          color: #6e6b80;
          font-size: 0.8rem;
        }

        .approval .approval__arrow {
          position: absolute;
          background: var(--primary-color);
          padding: 0.4rem;
          border-top-left-radius: var(--border-radius);
          border-bottom-right-radius: var(--border-radius);
          bottom: 0;
          right: 0;
          transition: 0.2s;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .approval svg {
          transition: 0.2s;
        }

        /* hover */
        .approval:hover .approval__title {
          color: var(--primary-color);
        }

        .approval__arrow:hover {
          background: #111;
          transform: translateX(3px);
        }
      }
    }
  }
}
</style>
