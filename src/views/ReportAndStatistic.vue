<template>
  <div class="report-manage">
    <div class="report-manage-header">
      <div class="header-left">
        <div class="filter-report">
          <el-select
            v-model="typeFilter"
            class="m-2"
            :placeholder="$t('SelectChart')"
            size="large"
            @change="loadData"
          >
            <el-option
              v-for="item in filterChart"
              :key="item.value"
              :label="$t(item.name)"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="header-right"></div>
    </div>
    <div class="report-manage-main">
      <div class="report-manage-container">
        <div class="report-by-day" v-if="typeFilter == 0">
          <div class="lable">{{ $t("Statisticsbyday") }}</div>
          <BaseChart
            :typeChart="'bar'"
            :widthChart="'1000'"
            :dataValue="chartDayByMovie"
            :titleX="$t('Movie')"
            :titleY="'VNĐ'"
          ></BaseChart>
        </div>
        <div class="report-by-month" v-if="typeFilter == 1">
          <div class="lable">{{ $t("Statisticsbymonth") }}</div>
          <BaseChart
            :typeChart="'bar'"
            :widthChart="'1000'"
            :dataValue="chartThisMonth"
            :titleX="$t('Movie')"
            :titleY="'VNĐ'"
          ></BaseChart>
        </div>
        <div class="report-by-year" v-if="typeFilter == 2">
          <div class="lable">{{ $t("Statisticsbyyear") }}</div>
          <BaseChart
            :typeChart="'bar'"
            :widthChart="'1000'"
            :dataValue="chartThisYearByMonth"
            :titleX="$t('Month')"
            :titleY="'VNĐ'"
          ></BaseChart>
        </div>
      </div>
    </div>
    <div class="report-manage-footer"></div>
  </div>
</template>
<script>
import BaseChart from "./components/BaseChart.vue";
import VsudInput from "../components/VsudInput.vue";
import BaseButton from "./components/BaseButton.vue";
import { getDataChart, initDataChart } from "@/common/commonFunc";
import { filterChart } from "@/constants/constantsdefaults";

export default {
  components: {
    BaseChart,
    BaseButton,
    VsudInput,
  },
  setup(props) {
    return {
      getDataChart,
      filterChart,
    };
  },
  created() {
    let me = this;
    this.chartDayByMovie = initDataChart;
    me.loadAllData();
    me.loadData();
  },
  data: function () {
    return {
      chartThisMonth: initDataChart,
      chartThisYearByMonth: initDataChart,
      chartDayByMovie: initDataChart,
      isShowDay: false,
      typeFilter: 0,
    };
  },
  methods: {
    loadAllData() {
      // this.loadDataDay();
      // this.loadDataMonth();
      // this.loadDataYear();
    },
    loadDataMonth() {
      let me = this;
      this.$store.state.isShowLoading = true;
      this.$api.get("/Report/GetDataChartThisMonth").then((data) => {
        me.chartThisMonth = getDataChart(data.name, data.amount, "Doanh thu");
        me.$store.state.isShowLoading = false;
      });
    },

    loadDataYear() {
      let me = this;
      this.$store.state.isShowLoading = true;
      this.$api.get("/Report/GetDateChartThisYearByMonth").then((data) => {
        me.chartThisYearByMonth = getDataChart(
          data.month,
          data.amount,
          "Doanh thu"
        );
        me.$store.state.isShowLoading = false;
      });
    },

    loadDataDay() {
      let me = this;
      this.$store.state.isShowLoading = true;
      this.$api.get("/Report/GetDataChartDayByMovie").then((data) => {
        me.chartDayByMovie = getDataChart(data.name, data.amount, "Doanh thu");
        me.$store.state.isShowLoading = false;
      });
    },

    loadData() {
      if (this.typeFilter == 0) {
        this.loadDataDay();
      } else if (this.typeFilter == 1) {
        this.loadDataMonth();
      } else {
        this.loadDataYear();
      }
    },
  },
};
</script>
<style lang="scss">
.report-manage {
  padding: 0 28px 0;
  .report-manage-header {
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
        .el-select {
          margin: 0 !important;
          .el-input__inner,
          .el-input__wrapper {
            height: 36px;
          }
        }
      }
    }
  }

  .report-manage-main {
    .report-manage-container {
      height: calc(100vh - 225px);
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      background: #fff;
      border-radius: 10px;
      padding: 20px 10px;
      margin-top: 30px;
      display: flex;
      flex-wrap: wrap;
      min-width: 500px;
      justify-content: space-around;
      .report-by-day,
      .report-by-month,
      .report-by-year {
        border: 1px solid #111;
        padding: 5px;
        min-width: 600px;
        min-height: 500px;
        margin: 10px;
        .lable {
          display: flex;
          justify-content: center;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
