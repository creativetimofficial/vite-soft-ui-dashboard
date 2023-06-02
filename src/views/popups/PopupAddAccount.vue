<template>
  <div class="popup-add-account">
    <div class="popup-container">
      <div class="popup-header">
        <div class="popup-title">{{ $t("NewAccount") }}</div>
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
        <div class="popup-row-1 pt-25">
          <div class="popup-input">
            <label>{{ $t("Account") }}</label>
            <vsud-input
              type="text"
              :placeholder="$t('Account')"
              name="password"
              v-model="accountName"
              :is-required="true"
              :autocomplete="'off'"
            />
          </div>
          <div class="popup-input">
            <label>{{ $t("Password") }}</label>
            <vsud-input
              type="password"
              :placeholder="$t('Password')"
              name="password"
              v-model="password"
              :is-required="true"
              :autocomplete="'off'"
            />
          </div>
          <div class="popup-input">
            <label>{{ $t("Name") }}</label>
            <vsud-input
              type="text"
              :placeholder="$t('Name')"
              name="password"
              v-model="name"
              :id="'account_name'"
            />
          </div>
          <div class="popup-input">
            <label>{{ $t("Email") }}</label>
            <vsud-input
              type="text"
              :placeholder="$t('Email')"
              name="password"
              v-model="email"
              :id="'account_name'"
            />
          </div>
        </div>
        <div class="popup-row-1">
          <div class="popup-input popup-date">
            <label>{{ $t("DateOfBirth") }}</label>
            <el-date-picker
              v-model="dateOfBirth"
              type="date"
              :placeholder="$t('DateOfBirth')"
              :size="size"
            />
          </div>
          <div class="popup-input popup-radio">
            <label>{{ $t("Gender") }}</label>
            <!-- <div class="radio-inputs">
              <label class="radio">
                <input type="radio" v-model="gender" :value="1" />
                <span class="name">{{$t('Male')}}</span>
              </label>
              <label class="radio">
                <input type="radio" v-model="gender" :value="2" />
                <span class="name">{{$t('Female')}}</span>
              </label>

              <label class="radio">
                <input type="radio" v-model="gender" :value="3" />
                <span class="name">{{$t('Other')}}</span>
              </label>
            </div> -->
            <el-radio-group v-model="gender" size="large">
              <el-radio-button :label="1">{{ $t("Male") }}</el-radio-button>
              <el-radio-button :label="2">{{ $t("Female") }}</el-radio-button>
              <el-radio-button :label="3">{{ $t("Other") }}</el-radio-button>
            </el-radio-group>
          </div>
          <div class="popup-input popup-date">
            <label>{{ $t("PhoneNumber") }}</label>
            <vsud-input
              type="text"
              :placeholder="$t('PhoneNumber')"
              name="password"
              v-model="phoneNumber"
            />
          </div>
        </div>
        <div class="popup-row-1">
          <div class="popup-input popup-date group-combobox">
            <label>{{ $t("Role") }}</label>
            <!-- <v-select
              label="nameRole"
              :options="listRole"
              :placeholder="$t('Role')"
              v-model="role"
              :reduce="(typeName) => typeName.role"
            ></v-select> -->
            <el-select
              v-model="role"
              collapse-tags
              collapse-tags-tooltip
              :placeholder="$t('Role')"
            >
              <el-option
                v-for="item in listRole"
                :key="item.role"
                :label="item.nameRole"
                :value="item.role"
              />
            </el-select>
          </div>
          <div class="popup-input popup-date group-combobox">
            <label>{{ $t("Cinema") }}</label>
            <!-- <v-select
              label="cinemaName"
              :options="listCinema"
              :placeholder="$t('Cinema')"
              v-model="cinemaID"
              :reduce="(categoryName) => categoryName.cinemaID"
            ></v-select> -->
            <el-select
              v-model="cinemaID"
              collapse-tags
              collapse-tags-tooltip
              :placeholder="$t('Cinema')"
            >
              <el-option
                v-for="item in listCinema"
                :key="item.cinemaID"
                :label="item.cinemaName"
                :value="item.cinemaID"
              />
            </el-select>
          </div>
          <div class="popup-input ml-2">
            <div class="group-typemovie">
              <label>{{ $t("Avatar") }}</label>
              <base-upload-firebase
                :idUpload="'image-movie-upload'"
                @url-bind="catchUrl"
                :pre-url="'avatar/'"
              ></base-upload-firebase>
            </div>
          </div>
        </div>
        <div class="popup-row-1 mt-1"></div>
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
          @click="addAccount()"
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
import { defaultRole } from "@/constants/constantsdefaults";

import { uuidv4 } from "../../common/uuid";
export default {
  emits: ["add-click", "update"],
  components: {
    BaseButton,
    VsudInput,
    BaseUpload,
    BaseUploadFirebase,
  },
  setup(props) {
    return {
      defaultRole,
    };
  },
  created() {
    let me = this;
    this.loadCinemaList();
    this.listRole = defaultRole();
  },
  props: {},
  data() {
    return {
      accountName: "",
      password: "",
      role: null,
      name: "",
      gender: 1,
      dateOfBirth: "",
      email: "",
      cinemaID: "",
      avatar: "",
      phoneNumber: "",
      listCinema: [],
      listRole: [],
    };
  },
  methods: {
    closeThisPopup() {
      this.$store.state.isOpenPopupAddAccount = false;
    },
    catchUrl(value) {
      this.avatar = value;
    },
    loadCinemaList() {
      let me = this;
      this.$api.get("/Account/GetListCinema").then((data) => {
        me.listCinema = data;
      });
    },
    addAccount() {
      let me = this;
      this.$store.state.isShowLoading = true;
      this.$api
        .post("/Account/InsertNewAccount", {
          accountName: me.accountName,
          password: me.password,
          role: me.role,
          name: me.name,
          email: me.email,
          gender: me.gender,
          dateOfBirth: me.dateOfBirth,
          phoneNumber: me.phoneNumber,
          cinemaID: me.cinemaID,
          avatar: me.avatar,
        })
        .then((data) => {
          if (data) {
            me.$store.dispatch("showToast", this.$t('Successfullyaddedaccount'));
          } else {
            me.$store.dispatch("showToast", this.$t('Addingaccountfailed'));
          }
          me.$store.state.isOpenPopupAddAccount = false;
          me.$store.state.isShowLoading = false;
          me.$emit("update");
        });
    },
  },
};
</script>

<style lang="scss">
@import "vue-select/dist/vue-select.css";
.popup-add-account {
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
      .pt-25 {
        padding-top: 25px;
      }

      .mt-1 {
        margin-top: 10px;
      }

      .ml-2 {
        margin-left: 20px;
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

        .popup-radio {
          margin-right: 15px;
          .el-radio-group {
            display: block;
            label {
              margin: 0 !important;
            }
          }
        }

        .radio-inputs {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          border-radius: 0.5rem;
          background-color: #eee;
          box-sizing: border-box;
          box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
          padding: 0.25rem;
          width: 300px;
          height: 40px;
          font-size: 14px;
        }

        .radio-inputs .radio {
          flex: 1 1 auto;
          text-align: center;
        }

        .radio-inputs .radio input {
          display: none;
        }

        .radio-inputs .radio .name {
          display: flex;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          border-radius: 0.5rem;
          border: none;
          padding: 7px 0;
          color: rgba(51, 65, 85, 1);
          transition: all 0.15s ease-in-out;
        }

        .radio-inputs .radio input:checked + .name {
          background-color: #fff;
          font-weight: 600;
        }
      }
      #account_content {
        max-height: 100px;
        width: 200px;
        height: 100px;
      }

      #trailer-link {
        width: 600px;
      }

      .group-combobox {
        margin: auto 0;
      }
    }
  }
}
</style>
