<template>
  <div class="common-child-setting">
    <div class="common-info-header">Thông tin giá vé mặc định</div>
    <div class="common-info-container">
      <div class="common-info">
        <div class="info-row">
          <div class="info-label">
            <div class="icon-edit" @click="showNormalInput">
              <i class="fas fa-edit"></i>
            </div>
            Vé thường:
          </div>
          <div class="info-content">{{ ticketNormal }}</div>
          <div class="info-content">
            <el-input
              v-if="isShowNormal"
              v-model="ticketNormal"
              type="text"
              placeholder="Nhập giá vé"
              autocomplete="off"
            />
          </div>
        </div>
        <div class="info-row">
          <div class="info-label">
            <div class="icon-edit" @click="showVIPInput">
              <i class="fas fa-edit"></i>
            </div>
            Vé VIP:
          </div>
          <div class="info-content">{{ ticketVip }}</div>
          <div class="info-content">
            <el-input
              v-if="isShowVIP"
              v-model="ticketVip"
              type="text"
              placeholder="Nhập giá vé"
              autocomplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
      this.$api.post("/DBOption/GetAllDBOption").then((data) => {
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
      this.isShowNormal = true;
    },
    showVIPInput() {
      this.isShowVIP = true;
    },
  },
};
</script>
<style lang="scss">
.common-child-setting {
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
