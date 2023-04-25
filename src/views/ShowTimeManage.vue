<template>
  <div class="showtime-manage">
    <div class="showtime-main">
      <div
        class="showtime-movie"
        v-for="item in dataSource"
        :key="item.movieID"
      >
        <div class="card-movie" @click="showPopup(item.movieID)">
          <base-image-download :linkImg="item.posterLink"></base-image-download>
          <div class="feature-container">
            <base-button
              :classButton="'button-blue'"
              :titleButton="'Thêm suất chiếu'"
              @bindEvent="openPopupAddShowTime(item.movieID, item.movieName)"
            ></base-button>
            <div class="mt-2"></div>
            <base-button
              :classButton="'button-blue'"
              :titleButton="'Xem suất chiếu'"
              @bindEvent="openPopupSeatCinema(item.movieID, item.movieName)"
            ></base-button>
          </div>
          <div class="name-movie">{{ item.movieName }}</div>
        </div>
      </div>
    </div>
  </div>
  <popup-seat-cinema
    v-if="$store.state.isOpenPopupSeat"
    :nameMovie="movieNameSelected"
    :idMovie="movieIDSelected"
  ></popup-seat-cinema>
  <popup-add-showtime
    v-if="$store.state.isOpenPopupAddShowtime"
    :nameMovie="movieNameSelected"
    :idMovie="movieIDSelected"
  ></popup-add-showtime>
</template>

<script>
import { listSeat, convertLetter } from "@/constants/constantsdefaults";
import BaseButton from "./components/BaseButton.vue";
import PopupSeatCinema from "./popups/PopupSeatCinema.vue";
import CardMovie from "./components/CardMovie.vue";
import BaseImageDownload from "./components/BaseImageDownload.vue";
import PopupAddShowtime from "./popups/PopupAddShowtime.vue";
export default {
  name: "ShowTimeManager",
  setup() {
    return {
      listSeat,
      convertLetter,
    };
  },
  components: {
    BaseButton,
    PopupSeatCinema,
    CardMovie,
    BaseImageDownload,
    PopupAddShowtime,
  },
  created() {
    let me = this;
    this.$api.post("/Movie/GetListMovie", { TypeFilter: 1 }).then((data) => {
      me.dataSource = data;
    });
  },
  data() {
    return {
      dataField: [],
      dataSource: [],
      roomCinmeIDSelected: "ca589116-d5b2-11ed-a44f-907841e9040c",
      movieIDSelected: "",
      movieNameSelected: "",
    };
  },
  methods: {
    loadData() {
      let me = this;
      this.$api.post("/Movie/GetListMovie", { TypeFilter: 0 }).then((data) => {
        me.dataSource = data;
      });
    },
    showPopup() {},
    openPopupAddShowTime(id, name) {
      this.movieIDSelected = id;
      this.movieNameSelected = name;
      this.$store.state.isOpenPopupAddShowtime = true;
    },
    openPopupSeatCinema(id, name) {
      this.movieIDSelected = id;
      this.movieNameSelected = name;
      this.$store.state.isOpenPopupSeat = true;
    },
  },
};
</script>
<style lang="scss">
.showtime-manage {
  .mt-2 {
    margin-top: 10px;
  }
  padding: 30px 28px 0;
  .showtime-main {
    display: flex;
    flex-wrap: wrap;
    .showtime-movie {
      .card-movie {
        cursor: pointer;
        border-radius: 10px;
        box-shadow: 0px 5px 10px 0px rgba(0, 255, 255, 0.7);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 10px;
        width: 250px;
        .posterLink {
          height: 250px;
          width: 200px;
          padding: 0;
          margin: 10px 10px;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          border-radius: 4px;
        }

        .feature-container {
          height: 250px;
          width: 200px;
          padding: 0;
          margin: 10px 10px;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          border-radius: 4px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          display: none;
        }

        .name-movie {
          font-size: 16px;
          font-weight: 600;
          color: #111;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 200px;
        }

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0px 10px 20px 2px rgba(0, 255, 255, 0.7);
          .feature-container {
            display: flex !important;
          }

          .posterLink {
            display: none !important;
          }
        }
      }
    }
  }
}
</style>
