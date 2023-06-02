<template>
  <div class="account-manage">
    <div class="account-header">
      <el-input
        v-model="searchValue"
        class="w-200 m-2"
        size="large"
        :placeholder="$t('Search')"
        :suffix-icon="Search"
      />
      <div class="button-container">
        <base-button
          :classButton="'button-blue'"
          :titleButton="$t('Addnew')"
          @bindEvent="openPopupAddAccount()"
        ></base-button>
        <div class="ml-1"></div>
        <base-button
          :classButton="'button-blue'"
          :titleButton="$t('Approve')"
          @bindEvent="openPopupApprovalList()"
        ></base-button>
      </div>
    </div>
    <div class="account-main">
      <div class="account-container-admin">
        <div class="container-header">{{ $t("Systemaccount") }}</div>
        <div class="container-main">
          <div
            class="account-item"
            v-for="item in dataAccountAdmin"
            :key="item.AccountID"
          >
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="$t('Deleteaccount')"
              placement="top"
            >
              <div class="icon-delete" @click="showDeletePopup(item.accountID)">
                <i class="fas fa-trash-alt" style="color: #ffffff"></i>
              </div>
            </el-tooltip>

            <div class="account-item-border-top"></div>
            <div class="img">
              <base-image-download
                :linkImg="item.avatar"
                v-if="item.avatar"
              ></base-image-download>
              <base-image-download
                :linkImg="urlAvatarDefault()"
                v-if="!item.avatar"
              ></base-image-download>
            </div>
            <span> {{ item.name }}</span>
            <p class="job">
              {{ item.accountName }} -
              {{
                item.role == 1
                  ? "admin"
                  : item.role == 2
                  ? "employee"
                  : "manager"
              }}
            </p>
            <button @click="openPopupDetail(item.accountID)">
              {{ $t("Detail") }}
            </button>
          </div>
        </div>
      </div>
      <div class="account-container-user">
        <div class="container-header">{{ $t("Customeraccount") }}</div>
        <div class="container-main">
          <div
            class="account-item"
            v-for="item in dataAccountUser"
            :key="item.AccountID"
          >
            <div class="account-item-border-top"></div>
            <div class="img">
              <base-image-download
                :linkImg="item.avatar"
                v-if="item.avatar"
              ></base-image-download>
              <base-image-download
                :linkImg="urlAvatarDefault()"
                v-if="!item.avatar"
              ></base-image-download>
            </div>
            <span> {{ item.name }}</span>
            <p class="job">{{ item.accountName }}</p>
            <!-- <button>{{ $t('Detail') }}</button> -->
          </div>
        </div>
      </div>
    </div>
    <div class="account-footer"></div>
  </div>
  <popup-approval-list
    v-if="$store.state.isOpenPopupApprovalList"
    @update="loadData"
  ></popup-approval-list>
  <popup-add-account
    v-if="$store.state.isOpenPopupAddAccount"
    @update="loadData"
  ></popup-add-account>
  <popup-delete
    v-if="$store.state.isOpenPopupDelete"
    @delete-click="deleteAccount()"
    :contentCustom="$t('DeleteAccountContent')"
  ></popup-delete>
  <popup-detail-account
    v-if="$store.state.isOpenDetailAccount"
    :idAccount="accountIDSelected"
    @update="loadData"
  ></popup-detail-account>
</template>

<script>
import VsudInput from "../components/VsudInput.vue";
import BaseButton from "./components/BaseButton.vue";
import BaseImageDownload from "./components/BaseImageDownload.vue";
import { urlAvatarDefault } from "@/common/uuid";
import PopupApprovalList from "./popups/PopupApprovalList.vue";
import PopupAddAccount from "./popups/PopupAddAccount.vue";
import PopupDelete from "./popups/PopupDelete.vue";
import PopupDetailAccount from "./popups/PopupDetailAccount.vue";
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";
export default {
  components: {
    VsudInput,
    BaseButton,
    BaseImageDownload,
    PopupApprovalList,
    PopupAddAccount,
    PopupDelete,
    PopupDetailAccount,
  },
  setup(props) {
    return {
      urlAvatarDefault,
      Search,
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
      dataAccountAdmin: [],
      dataAccountUser: [],
      accountIDSelected: "",
    };
  },
  methods: {
    openPopupDetail(id) {
      this.accountIDSelected = id;
      this.$store.state.isOpenDetailAccount = true;
    },
    loadData() {
      let me = this;
      this.$store.state.isShowLoading = true;
      this.$api.get("/Account/GetAllAccount").then((data) => {
        me.dataAccount = data;
        if (me.dataAccount.length) {
          me.dataAccountAdmin = me.dataAccount.filter(
            (x) => x.role === 1 || x.role === 2 || x.role === 3
          );
          me.dataAccountUser = me.dataAccount.filter((x) => x.role === 5);
        }
        this.$store.state.isShowLoading = false;
      });
    },

    openPopupApprovalList() {
      this.$store.state.isOpenPopupApprovalList = true;
    },

    openPopupAddAccount() {
      this.$store.state.isOpenPopupAddAccount = true;
    },

    showDeletePopup(id) {
      let me = this;
      this.accountIDSelected = id;
      this.$store.state.isOpenPopupDelete = true;
    },

    deleteAccount() {
      let me = this;
      this.$store.state.isShowLoading = true;

      this.$api
        .post("/Account/DeleteAccount", { accountID: me.accountIDSelected })
        .then((data) => {
          if (data) {
            me.$store.dispatch("showToast", this.$t("Accountdeletionsuccessful"));
          } else {
            me.$store.dispatch("showToast", this.$t('DeletefailedPleasetryagain'));
          }
          this.$store.state.isShowLoading = false;

          me.loadData();
        });
    },
  },
};
</script>

<style lang="scss">
.account-manage {
  padding: 30px 28px 0;
  .posterLink {
    height: 80px;
    width: 70px;
    border-radius: 15px;
  }

  .account-header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    background: #fff;
    border-radius: 10px;
    align-items: center;
    .form-group {
      margin-bottom: 0px !important;
    }

    .ml-1 {
      margin-left: 10px;
    }

    .button-container {
      display: flex;
    }
  }
  #search_movie {
    height: 36px;
  }
  .account-main {
    display: flex;

    .account-container-admin,
    .account-container-user {
      width: 50%;
      margin: 10px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      background: #fff;
      border-radius: 10px;
      padding: 20px 0;
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      min-width: 500px;
      .container-header {
        display: flex;
        justify-content: center;
        height: 40px;
        margin-bottom: 10px;
        color: #111;
        font-size: 18px;
        font-weight: 600;
      }

      .container-main {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .account-item {
          width: 190px;
          height: 254px;
          background: #17c1e8;
          border-radius: 15px;
          box-shadow: 1px 5px 60px 0px #100a886b;
          margin: 20px;
          position: relative;

          .icon-delete {
            position: absolute;
            top: 10px;
            right: 10px;
            height: 25px;
            width: 25px;
            border: 1px solid #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.9;
            box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
              rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
            cursor: pointer;
            &:hover {
              opacity: 0.6;
            }

            &:active {
              opacity: 1;
            }
          }
        }

        .account-item .account-item-border-top {
          width: 60%;
          height: 3%;
          margin: auto;
          border-radius: 0px 0px 15px 15px;
        }

        .account-item span {
          font-weight: 600;
          color: white;
          text-align: center;
          display: block;
          padding-top: 10px;
          font-size: 16px;
        }

        .account-item .job {
          font-weight: 400;
          color: white;
          display: block;
          text-align: center;
          padding-top: 3px;
          font-size: 12px;
        }

        .account-item .img {
          width: 70px;
          height: 80px;
          background: #1a72ff;
          border-radius: 15px;
          margin: auto;
          margin-top: 25px;
        }

        .account-item button {
          padding: 8px 25px;
          display: block;
          margin: auto;
          border-radius: 8px;
          border: none;
          margin-top: 30px;
          background: #1a72ff;
          color: white;
          font-weight: 600;
          font-size: 13px;
        }

        .account-item button:hover {
          background: #534bf3;
        }
      }
    }
  }
}
</style>
