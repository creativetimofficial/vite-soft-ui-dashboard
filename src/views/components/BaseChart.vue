<template>
  <div>
    <apexchart
      :width="widthChart"
      :type="typeChart"
      :options="chartOptions"
      :series="series"
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
    categoryChartX: {
      type: Array,
      required: true,
    },
    dataChart: {
      type: Array,
      required: true,
    },
    categoryChartY: {
      type: [Array, Object],
    },
  },
  created() {
    this.series = this.dataChart;
    this.chartOptions.xaxis.categories = this.categoryChartX;
    this.chartOptions.yaxis.title.text = this.categoryChartY??"";
  },
  data: function () {
    return {
      chartOptions: {
        xaxis: {
          categories: [],
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
};
</script>
