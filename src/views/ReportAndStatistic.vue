<template>
  <div class="report-manage">
    <div class="report-manage-header">
      <vsud-input
        type="text"
        :placeholder="$t('Search')"
        name="search_movie"
        v-model="searchValue"
        :id="'search_movie'"
      />
      <base-button
        :classButton="'button-blue'"
        :titleButton="'Thêm mới'"
        @bindEvent="openPopup()"
      ></base-button>
    </div>
    <div class="report-manage-main">
      <div class="report-manage-container">
        <div class="report-by-day">
          <div class="lable">Thống kê theo ngày</div>
          <BaseChart
            :typeChart="'bar'"
            :widthChart="'500'"
            :dataValue="chartDayByMovie"
            :titleX="'Phim'"
          ></BaseChart>
        </div>
        <div class="report-by-day">
          <div class="lable">Thống kê theo ngày</div>
          <BaseChart
            :typeChart="'bar'"
            :widthChart="'500'"
            :dataValue="chartThisMonth"
            :titleX="'Phim'"
          ></BaseChart>
        </div>
        <div class="report-by-day">
          <div class="lable">Thống kê theo ngày</div>
          <BaseChart
            :typeChart="'bar'"
            :widthChart="'500'"
            :dataValue="chartThisYearByMonth"
            :titleX="'Ngày'"
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

export default {
  components: {
    BaseChart,
    BaseButton,
    VsudInput,
  },
  setup(props) {
    return {
      getDataChart,
    };
  },
  created() {
    let me = this;
    this.chartDayByMovie = initDataChart;
    me.loadAllData();
  },
  data: function () {
    return {
      chartThisMonth: initDataChart,
      chartThisYearByMonth: initDataChart,
      chartDayByMovie: initDataChart,
      isShowDay: false,
    };
  },
  methods: {
    loadAllData() {
      this.loadDataDay();
      this.loadDataMonth();
      this.loadDataYear();
    },
    loadDataMonth() {
      let me = this;
      this.$store.state.isShowLoading = true;
      this.$api.post("/Report/GetDataChartThisMonth").then((data) => {
        me.chartThisMonth = getDataChart(data.name, data.amount, "chart-month");
        me.$store.state.isShowLoading = false;
      });
    },

    loadDataYear() {
      let me = this;
      this.$store.state.isShowLoading = true;
      this.$api.post("/Report/GetDateChartThisYearByMonth").then((data) => {
        me.chartThisYearByMonth = getDataChart(
          data.month,
          data.amount,
          "chart-year"
        );
        me.$store.state.isShowLoading = false;
      });
    },

    loadDataDay() {
      let me = this;
      this.$store.state.isShowLoading = true;
      this.$api.post("/Report/GetDataChartDayByMovie").then((data) => {
        me.chartDayByMovie = getDataChart(data.name, data.amount, "chart-day");
        me.$store.state.isShowLoading = false;
      });
    },
  },
};
</script>
<style lang="scss">
.report-manage {
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
  }

  .report-manage-main {
    .report-manage-container {
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      background: #fff;
      border-radius: 10px;
      padding: 20px 0;
      margin-top: 30px;
      display: flex;
      flex-wrap: wrap;
      min-width: 500px;
    }
  }
}
</style>
