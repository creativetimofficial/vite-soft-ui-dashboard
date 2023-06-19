<template>
  <div class="ticket-manage">
    <div class="ticket-manage-header">
      <div class="header-left">
        <el-input
          v-model="searchValue"
          class="w-200 m-2"
          size="large"
          :placeholder="$t('Search')"
          :suffix-icon="Search"
          @change="searchMovie"
        />
        <!-- <div class="container-radio">
          <el-radio-group v-model="filterTicket" @change="searchMovie">
            <el-radio-button label="0">{{ $t("All") }}</el-radio-button>
            <el-radio-button label="1">{{ $t("VIP") }}</el-radio-button>
            <el-radio-button label="2">{{ $t("Normal") }}</el-radio-button>
          </el-radio-group>
        </div> -->
      </div>
    </div>
    <div class="ticket-manage-main">
      <div class="main-empty" v-if="listTicket.length < 1">
        {{ $t("Nodata") }}
      </div>
      <div class="ticket-item-container" v-if="checkHide">
        <div class="d-flex" v-for="(group, index) in groupedItems" :key="index">
          <div
            :span="5"
            class="width-5"
            v-for="item in group"
            :key="item.movieID"
          >
            <div class="ticket-container">
              <div class="ticket-item">
                <div class="item-header">
                  <div class="name-cinema">{{ item.cinemaName }}</div>
                  <div class="address">{{ item.cinemaAddress }}</div>
                  <div class="mst">MST: {{ item.mst }}</div>
                  <div class="about">{{ item.about }}</div>
                </div>
                <div class="border-dash"></div>
                <div class="item-main">
                  <div class="name-movie">{{ item.movieName }}</div>
                  <div class="code-movie">
                    {{ $t("No") }}: {{ item.movieCode }}
                  </div>
                  <div class="time-line">
                    {{ $t("Timel") }}: {{ item.timeLine }}
                  </div>
                  <div class="release-date">
                    {{ $t("Releasedate") }}:
                    {{ convertDateFormat(item.releaseDate) }}
                  </div>
                  <div class="language">
                    {{ $t("Languagel") }}: {{ item.language }}
                  </div>
                </div>
                <div class="border-dash"></div>
                <div class="item-footer">
                  <div class="cost">
                    {{ $t("Cost") }}: {{ formatNumber(item.cost) }} VND (VAT)
                  </div>
                  <div class="type">
                    {{ $t("SeatType") }}:
                    {{ item.type == 1 ? $t("Normal") : "VIP" }}
                  </div>
                </div>
                <div class="item-feature" v-if="$store.state.role == 'admin'">
                  <div class="item-change">
                    <base-button
                      :classButton="'button-blue'"
                      :titleButton="$t('Exchangeprice')"
                      @bindEvent="
                        showChangeMoney(item.templateTicketID, item.cost)
                      "
                    ></base-button>
                  </div>

                  <!-- <div
                    class="item-changing"
                    v-if="isShowingChange(item.templateTicketID)"
                  >
                    <base-button
                      :classButton="'button-white'"
                      :titleButton="$t('Cancel')"
                      @bindEvent="
                        () => {
                          item.cost = costSelected;
                          ticketSelected = '';
                        }
                      "
                    ></base-button>
                    <base-button
                      :classButton="'button-blue'"
                      :titleButton="$t('Save')"
                      @bindEvent="
                        saveChangeMoney(item.templateTicketID, item.cost)
                      "
                    ></base-button>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ticket-manage-footer">
      <el-dialog
        v-model="isShowDialog"
        :title="$t('Ticketpricechange')"
        width="300"
      >
        <el-form :model="form">
          <el-form-item :label="$t('Cost')">
            <el-input v-model="costSelected" autocomplete="off" type="number" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="isShowDialog = false">{{
              $t("Cancle")
            }}</el-button>
            <el-button type="primary" @click="saveChangeMoney()">
              {{ $t("Yes") }}
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import VsudInput from "../components/VsudInput.vue";
import { convertDateFormat, formatNumber } from "@/common/commonFunc";
import BaseButton from "./components/BaseButton.vue";
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";
export default {
  components: { VsudInput, BaseButton },
  setup() {
    return {
      convertDateFormat,
      Search,
      formatNumber,
    };
  },
  computed: {
    groupedItems() {
      const groupSize = 5; // Số lượng bản ghi trong mỗi nhóm
      const grouped = [];
      let group = [];

      this.listTicket.forEach((item, index) => {
        group.push(item);
        if (
          (index + 1) % groupSize === 0 ||
          index === this.listTicket.length - 1
        ) {
          grouped.push(group);
          group = [];
        }
      });

      return grouped;
    },
  },
  created() {
    let me = this;
    this.$store.state.isShowLoading = true;

    this.$api
      .post("/Ticket/GetListTemplateTicket", { keyword: this.searchValue })
      .then((data) => {
        me.listTicket = data;
        me.listTicketTemp = data;
        this.$store.state.isShowLoading = false;
      });
  },
  mounted() {},
  data() {
    return {
      listTicket: [],
      ticketSelected: "",
      costSelected: 0,
      searchValue: "",
      filterTicket: "0",
      listTicketTemp: [],
      checkHide: true,
      isShowDialog: false,
    };
  },
  methods: {
    showChangeMoney(id, cost) {
      this.ticketSelected = id;
      this.costSelected = cost;
      this.isShowDialog = true;
    },

    isFilterItem(item) {
      if (this.filterTicket == "0") {
        return true;
      }

      if (this.filterTicket == "1" && item.type != 1) {
        return true;
      }

      if (this.filterTicket == "2" && item.type == 1) {
        return true;
      } else {
        return false;
      }
    },

    isShowingChange(id) {
      if (this.ticketSelected == id) {
        return true;
      } else {
        return false;
      }
    },

    loadData() {
      let me = this;
      this.$store.state.isShowLoading = true;

      this.$api
        .post("/Ticket/GetListTemplateTicket", { keyword: this.searchValue })
        .then((data) => {
          me.listTicket = data;
          me.listTicketTemp = data;
          this.$store.state.isShowLoading = false;
        });
    },

    saveChangeMoney() {
      let me = this;
      if (this.costSelected) {
        this.$api
          .post("/Ticket/UpdateCostOfTicket", {
            templateTicketID: this.ticketSelected,
            cost: this.costSelected,
          })
          .then((data) => {
            if (data) {
              me.ticketSelected = "";
              me.loadData();
              me.$store.dispatch("showToast", this.$t("UpdateSuccessful"));
              me.isShowDialog = false;
            } else {
              me.$store.dispatch(
                "showToast",
                this.$t("Updatefailedpleasetryagain")
              );
            }
          });
      } else {
        me.$store.dispatch("showToast", this.$t("Updatefailedpleasetryagain"));
      }
    },
    searchMovie() {
      let me = this;
      this.checkHide = false;
      this.listTicket = [];

      this.$api
        .post("/Ticket/GetListTemplateTicket", { keyword: this.searchValue })
        .then((data) => {
          me.listTicket = data;
          me.listTicketTemp = data;
          this.$store.state.isShowLoading = false;
        });
    },
  },
};
</script>
<style lang="scss">
.ticket-manage {
  padding: 30px 28px 0;
  .ticket-manage-header {
    min-width: 1500px;

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

    .header-left {
      display: flex;
      align-items: center;
      .filter-movie {
        height: 36px;
        margin-left: 10px;
      }
    }
    label.el-radio-button {
      margin: 0px !important;
    }

    .container-radio {
      height: 40px;
      display: flex;
      align-items: center;
      margin-left: 10px;
    }
  }

  .ticket-manage-main {
    .width-5 {
      width: 20% !important;
      &.el-col-5 {
        width: 20% !important;
        max-width: 20% !important;
      }
    }
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    background: #fff;
    border-radius: 10px;
    padding: 20px 0;
    margin-top: 30px;

    min-width: 1500px;
    .ticket-container {
      margin-left: 20px;
      margin-bottom: 20px;
      height: 400px;
      width: 250px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      .ticket-item {
        color: #111;
        height: 100%;
        width: 100%;
        padding: 10px;
        background: #ded1d8;
        font-size: 13px;
        .name-cinema {
          font-weight: 600;
          font-size: 14px;
        }
        .about {
          font-size: 12px;
          font-style: italic;
        }

        .border-dash {
          height: 1px;
          border-top: 1px dashed #111;
          margin: 3px 0px 10px 0;
        }
        .item-main {
          .name-movie {
            font-weight: 600;
            font-size: 18px;
          }
        }

        .item-footer {
          .cost-ticket {
            outline: none !important;
          }
        }

        .item-feature {
          height: 80px;
          align-items: center;
          display: flex;
          justify-content: center;
          .item-changing {
            width: 180px;
            display: flex;
            justify-content: space-evenly;
          }
        }
      }
    }
  }

  .ticket-manage-footer {
    label {
      padding: 0 5px 0 0;
      margin: 0;
    }

    .el-form-item {
      padding: 0;
      margin: 0;
    }
  }
}
</style>
