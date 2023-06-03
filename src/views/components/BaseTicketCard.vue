<template>
  <div class="template-ticket-container">
    <div class="ticket-item">
      <div class="item-header">
        <div class="name-cinema">{{ dataCinema.cinemaName }}</div>
        <div class="address">{{ dataCinema.cinemaAddress }}</div>
        <div class="mst">MST: {{ dataCinema.mst }}</div>
        <div class="about">{{ dataCinema.about }}</div>
      </div>
      <div class="border-dash"></div>
      <div class="item-main">
        <div class="name-movie">{{ dataTicket.movieName }}</div>
        <div class="code-movie">
          {{ $t("No") }}:
          {{
            dataMovie.movieCode +
            " - Phòng: " +
            dataTicket.roomCode +
            " - Ghế: " +
            dataTicket.seatName
          }}
        </div>
        <div class="time-line">
          {{ $t("Timel") }}: {{ dataMovie.timeLine + " " + $t("Min") }}
        </div>
        <div class="release-date">
          {{ $t("Releasedate") }}:
          {{ dataMovie.releaseDate }}
        </div>
        <div class="language">
          {{ $t("Languagel") }}: {{ dataMovie.language }}
        </div>
      </div>
      <div class="border-dash"></div>
      <div class="item-footer">
        <div class="cost">
          {{ $t("Cost") }}: {{ formatNumber(dataTicket.totalAmount) }} VND (VAT)
        </div>
        <div class="type">
          {{ $t("SeatType") }}:
          {{ dataTicket.type == 1 ? $t("Normal") : "VIP" }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  convertDateFormat,
  convertDateString,
  formatNumber,
} from "@/common/commonFunc";
import { nextTick } from "vue";
export default {
  setup() {
    return { convertDateFormat, formatNumber };
  },
  created() {
    nextTick(() => {
      this.loadDataCinema();
      this.loadDataMovie();
    });
  },
  mounted() {
    this.$store.state.isShowLoading = false;
  },
  watch: {
    dataTicket(newVal) {
      this.cost = formatNumber(this.dataTicket.totalAmount);
    },
  },
  props: {
    dataTicket: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dataCinema: {},
      dataMovie: {},
      cost: "",
    };
  },
  methods: {
    async loadDataMovie() {
      let me = this;
      this.$store.state.isShowLoading = true;
      await this.$api
        .post("/Movie/GetMovieAlterByMovieID", {
          movieID: this.dataTicket.movieID,
        })
        .then((data) => {
          me.dataMovie = data;
          me.dataMovie.releaseDate = convertDateFormat(
            me.dataMovie.releaseDate
          );
          this.$store.state.isShowLoading = false;
        });
    },

    async loadDataCinema() {
      let me = this;
      this.$store.state.isShowLoading = true;
      await this.$api.get("/Dictionary/GetCinemaInfo").then((data) => {
        me.dataCinema = data;
        this.$store.state.isShowLoading = false;
      });
    },
  },
};
</script>
<style lang="scss">
.template-ticket-container {

  .ticket-item {
    color: #111;
    height: 100%;
    width: 300px;
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
</style>
