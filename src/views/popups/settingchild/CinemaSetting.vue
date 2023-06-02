<template>
  <div class="password-child-setting">
    <div class="password-info-header">
      {{ $t("CinemaSettingContent") }}
    </div>
    <div class="password-info-container">
      <div class="password-info">
        <div class="info-row" v-show="false">
          <div class="info-label">{{ $t("DataName") }}:</div>
          <div class="info-content">
            <el-input
              v-model="dbName"
              type="text"
              :placeholder="$t('DataName')"
              autocomplete="off"
            />
          </div>
        </div>
        <div class="info-row">
          <div class="info-label">{{ $t("CinemaName") }}:</div>
          <div class="info-content">
            <el-input
              v-model="cinemaName"
              type="text"
              :placeholder="$t('CinemaName')"
              autocomplete="off"
            />
          </div>
        </div>
        <div class="info-row">
          <div class="info-label"></div>
          <div class="info-content">
            <el-button type="primary" :dark="true" @click="createNewDB()">{{
              $t("Save")
            }}</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { uuidv4 } from "@/common/uuid";

export default {
  components: {},
  created() {
    this.dbName = uuidv4();
  },
  data() {
    return {
      dbName: "",
      cinemaName: "",
    };
  },
  methods: {
    createNewDB() {
        let me = this;
        let check = this.validateDB();
        if(check){
            this.$store.state.isShowLoading = true;
            this.$api.post('/Account/CreateNewCinema',{
                dbName: me.dbName,
                cinemaName: me.cinemaName
            }).then(data=>{
                me.$store.state.isShowLoading = false;
                me.$store.dispatch("showToast",me.$t('Successfullyaddednew'));
            })
        }
    },
    validateDB(){
        if(this.cinemaName){
            return true;
        }else{
            this.$store.dispatch('showToast',this.$t('WarningBlankCinemaName'));
            return false;
        }
    }
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
