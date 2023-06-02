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
        />
        <div class="container-radio">
          <el-radio-group v-model="filterTicket">
            <el-radio-button label="0">{{ $t('All') }}</el-radio-button>
            <el-radio-button label="1">{{ $t('VIP') }}</el-radio-button>
            <el-radio-button label="2">{{ $t('Normal') }}</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="ticket-manage-main">
      <div
        class="ticket-container"
        v-for="(item, index) in listTicket"
        :key="index"
        v-show="isShowTicket(item) && isFilterItem(item)"
      >
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
            <div class="code-movie">{{ $t("No") }}: {{ item.movieCode }}</div>
            <div class="time-line">{{ $t("Timel") }}: {{ item.timeLine }}</div>
            <div class="release-date">
              {{ $t("Releasedate") }}: {{ convertDateFormat(item.releaseDate) }}
            </div>
            <div class="language">
              {{ $t("Languagel") }}: {{ item.language }}
            </div>
          </div>
          <div class="border-dash"></div>
          <div class="item-footer">
            <div class="cost">{{ $t("Cost") }}: {{ formatNumber(item.cost) }} VND (VAT)</div>
            <input
              type="text"
              name="cost_ticket"
              v-model="item.cost"
              class="cost-ticket"
              v-if="isShowingChange(item.templateTicketID)"
            />
            <div class="type">
              {{ $t("SeatType") }}: {{ item.type == 1 ? $t("Normal") : "VIP" }}
            </div>
          </div>
          <div class="item-feature" v-if="$store.state.role == 'admin'">
            <div
              class="item-change"
              v-if="!isShowingChange(item.templateTicketID)"
            >
              <base-button
                :classButton="'button-blue'"
                :titleButton="$t('Exchangeprice')"
                @bindEvent="showChangeMoney(item.templateTicketID, item.cost)"
              ></base-button>
            </div>
            <div
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
                @bindEvent="saveChangeMoney(item.templateTicketID, item.cost)"
              ></base-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ticket-manage-footer"></div>
  </div>
</template>
<script>
import VsudInput from "../components/VsudInput.vue";
import { convertDateFormat,formatNumber } from "@/common/commonFunc";
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
      convertDateFormat,Search,formatNumber
    };
  },
  created() {
    let me = this;
    this.$store.state.isShowLoading = true;

    this.$api.get("/Ticket/GetListTemplateTicket").then((data) => {
      me.listTicket = data;
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
    };
  },
  methods: {
    showChangeMoney(id, cost) {
      this.ticketSelected = id;
      this.costSelected = cost;
    },

    isFilterItem(item) {
      if ((this.filterTicket == "0")) {
        return true;
      }

      if ((this.filterTicket == "1" && item.type != 1)) {
        return true;
      }

      if ((this.filterTicket =="2" && item.type == 1)) {
        return true;
      } else {
        return false;
      }
    },

    isShowTicket(item) {
      return (
        item.movieName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        item.movieCode.toLowerCase().includes(this.searchValue.toLowerCase())
      );
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

      this.$api.get("/Ticket/GetListTemplateTicket").then((data) => {
        me.listTicket = data;
        this.$store.state.isShowLoading = false;
      });
    },

    saveChangeMoney(id, cost) {
      let me = this;
      this.$api
        .post("/Ticket/UpdateCostOfTicket", {
          templateTicketID: id,
          cost: cost,
        })
        .then((data) => {
          if (data) {
            me.ticketSelected = "";
            me.loadData();
            me.$store.dispatch("showToast", this.$t('UpdateSuccessful'));
          } else {
            me.$store.dispatch(
              "showToast",
              this.$t('Updatefailedpleasetryagain')
            );
          }
        });
    },
  },
};
</script>
<style lang="scss">
.ticket-manage {
  padding: 30px 28px 0;
  .ticket-manage-header {
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
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    background: #fff;
    border-radius: 10px;
    padding: 20px 0;
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    min-width: 500px;
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
}
</style>
