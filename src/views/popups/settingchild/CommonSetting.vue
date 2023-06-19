<template>
  <div class="common-child-setting">
    <div class="common-info-header">{{ $t("TicketSettingNote") }}</div>
    <div class="common-info-container">
      <div class="common-info">
        <div class="info-row">
          <div class="info-label">
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="$t('Edit')"
              placement="top"
            >
              <div class="icon-edit" @click="showNormalInput">
                <i class="fas fa-edit"></i>
              </div>
            </el-tooltip>
            {{ $t("NormalTicket") }}:
          </div>
          <!-- <div class="info-content">{{ ticketNormal }}</div> -->
          <div class="info-content">
            <el-input
              class="color-black"
              v-model="ticketNormal"
              type="text"
              :placeholder="$t('Enterthefare')"
              autocomplete="off"
              :disabled="!isShowNormal"
              ref="ticketnormal"
            />
          </div>
          <div
            class="info-content mx-2"
            v-if="isShowNormal"
            @click="updateTicketNormal"
          >
            <el-button type="primary" :icon="Check" circle />
          </div>
        </div>
        <div class="info-row">
          <div class="info-label">
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="$t('Edit')"
              placement="top"
            >
              <div class="icon-edit" @click="showVIPInput">
                <i class="fas fa-edit"></i>
              </div>
            </el-tooltip>
            {{ $t("VIPTicket") }}:
          </div>
          <!-- <div class="info-content">{{ ticketVip }}</div> -->
          <div class="info-content">
            <el-input
              v-model="ticketVip"
              type="text"
              :placeholder="$t('Enterthefare')"
              autocomplete="off"
              :disabled="!isShowVIP"
              class="color-black"
              ref="ticketvip"
            />
          </div>
          <div
            class="info-content mx-2"
            v-if="isShowVIP"
            @click="updateTicketVIP"
          >
            <el-button type="primary" :icon="Check" circle />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";
export default {
  setup() {
    return {
      Check,
    };
  },
  components: {},
  created() {
    let me = this;
    this.loadData();
  },
  data() {
    return {
      dataTicket: [],
      ticketNormal: 0,
      ticketVip: 0,
      isShowNormal: false,
      isShowVIP: false,
    };
  },
  methods: {
    loadData() {
      let me = this;
      this.$store.state.isShowLoading = true;
      this.$api.get("/DBOption/GetAllDBOption").then((data) => {
        me.dataTicket = data;
        me.ticketNormal = Number(
          data.find((x) => x.keyword == "Default_Seat_Normal").keyValue
        );
        me.ticketVip = Number(
          data.find((x) => x.keyword == "Default_Seat_VIP").keyValue
        );
        me.$store.state.isShowLoading = false;
      });
    },

    showNormalInput() {
      this.isShowNormal = !this.isShowNormal;
      if (this.isShowNormal) {
        this.$refs.ticketnormal.focus();
      }
    },
    showVIPInput() {
      this.isShowVIP = !this.isShowVIP;
      if (this.isShowVIP) {
        this.$refs.ticketvip.focus();
      }
    },

    updateTicketVIP() {
      let me = this;
      this.$store.state.isShowLoading = true;
      this.$api
        .post("/DBOption/UpdateDBOption", {
          keyword: "Default_Seat_VIP",
          keyValue: me.ticketVip,
        })
        .then((data) => {
          this.$store.dispatch("showToast", this.$t("UpdateTicketDone"));
          this.$store.state.isShowLoading = false;
          me.isShowVIP = false;
        });
    },

    updateTicketNormal() {
      let me = this;
      this.$store.state.isShowLoading = true;
      this.$api
        .post("/DBOption/UpdateDBOption", {
          keyword: "Default_Seat_Normal",
          keyValue: me.ticketNormal,
        })
        .then((data) => {
          this.$store.dispatch("showToast", this.$t("UpdateTicketDone"));
          this.$store.state.isShowLoading = false;
          me.isShowNormal = false;
        });
    },
  },
};
</script>
<style lang="scss">
.common-child-setting {
  .color-black {
    color: #000;

    input {
      color: #000 !important;
    }

    .el-input__inner {
      color: #000 !important;
    }
  }
  .common-info-header {
    font-style: italic;
    font-size: 12px;
    text-align: center;
    padding: 10px;
  }
  height: 100%;
  width: 100%;
  .common-info-container {
    margin-top: 100px;
    .common-info {
      height: 500px;
      .info-row {
        display: flex;
        justify-content: flex-start;
        .info-label {
          .icon-edit {
            margin-right: 10px;
            cursor: pointer;
            &:hover {
              opacity: 0.6;
            }
          }
          width: 50%;
          display: flex;
          justify-content: flex-end;
          font-weight: 600;
          margin-right: 5px;
          align-items: center;
        }

        .info-content {
          display: flex;
          align-items: center;
        }
        padding-top: 10px;
      }
    }
  }
}
</style>
