<template>
  <div>
    <BaseChart
      :typeChart="'bar'"
      :widthChart="'500'"
      :dataChart="series"
      :categoryChartX="chartOptions.xaxis.categories"
    ></BaseChart>
  </div>
</template>
<script>
import BaseChart from "./components/BaseChart.vue";
export default {
  components: {
    BaseChart,
  },
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
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
