<template>
  <div v-if="isShowChart">
    <apexchart
      :width="widthChart"
      :type="typeChart"
      :options="chartOptions"
      :series="series"
      :height="heightChart"
    ></apexchart>
  </div>
</template>
<script>
export default {
  props: {
    typeChart: {
      type: String,
      default: "bar",
    },
    widthChart: {
      type: String,
      default: "500",
    },
    heightChart:{
      type: String,
      default: "500"
    },
    titleY: {
      type: String,
      default: ""
    },
    titleX: {
      type: String,
      default: ""
    },
    dataValue: {
      type: [Array, Object],
    },
  },
  created() {
    this.series = this.dataValue.series;
    this.chartOptions.xaxis.categories = this.dataValue.xaxis.categories;
    this.chartOptions.yaxis.title.text = this.titleY ?? "";
    this.chartOptions.xaxis.title.text = this.titleX ?? "";
  },
  watch: {
    dataValue(newVal) {
      this.isShowChart = false;
      this.series = this.dataValue.series;
      this.chartOptions.xaxis.categories = this.dataValue.xaxis.categories;
      this.isShowChart = true;
    },
  },
  data: function () {
    return {
      isShowChart: false,
      chartOptions: {
        xaxis: {
          categories: [],
          title: {
            text: "",
          },
        },
        yaxis: {
          title: {},
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
        {
          name: "series-2",
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
      ],
    };
  },
  methods: {
    getDataChart(Xaxis, Yaxis, name) {
      return {
        series: [
          {
            name: name,
            data: Yaxis,
          },
        ],
        xaxis: {
          categories: Xaxis,
        },
      };
    },
  },
};
</script>
