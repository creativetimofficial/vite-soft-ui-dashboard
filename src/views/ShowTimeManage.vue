<template>
  <div class="showtime-manage">
    <div class="showtime-header">
      <div class="header-left">
        <el-input
          v-model="searchValue"
          class="w-200 m-2"
          size="large"
          :placeholder="$t('Search')"
          :suffix-icon="Search"
        />
      </div>
    </div>
    <div class="showtime-main">
      <div class="main-empty" v-if="dataSource.length < 1">
        {{ $t("Nodata") }}
      </div>
      <div
        class="showtime-movie"
        v-for="item in dataSource"
        :key="item.movieID"
      >
        <div
          class="card-movie"
          @click="showPopup(item.movieID)"
          v-show="isShowMovie(item)"
        >
          <base-image-download :linkImg="item.posterLink"></base-image-download>
          <div class="feature-container">
            <base-button
              :classButton="'button-blue'"
              :titleButton="$t('Morescreenings')"
              @bindEvent="openPopupAddShowTime(item.movieID, item.movieName)"
            ></base-button>
            <div class="mt-2"></div>
            <base-button
              :classButton="'button-blue'"
              :titleButton="$t('Seeshowtimes')"
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
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";
export default {
  name: "ShowTimeManager",
  setup() {
    return {
      listSeat,
      convertLetter,
      Search,
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
    this.$store.state.isShowLoading = true;
    this.$api.post("/Movie/GetListMovie", { TypeFilter: 1 }).then((data) => {
      me.dataSource = data;
    me.$store.state.isShowLoading = false;

    });
  },
  data() {
    return {
      dataField: [],
      dataSource: [],
      roomCinmeIDSelected: "ca589116-d5b2-11ed-a44f-907841e9040c",
      movieIDSelected: "",
      movieNameSelected: "",
      searchValue: "",
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
    isShowMovie(item) {
      return (
        item.movieName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        item.movieCode.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    },
  },
};
</script>
<style lang="scss">
.showtime-manage {
  .showtime-header {
    .header-left {
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
  }
  .mt-2 {
    margin-top: 10px;
  }
  padding: 30px 28px 0;
  .showtime-main {
    min-height: calc(100vh - 275px);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    background: #fff;
    border-radius: 10px;
    padding: 20px 10px;
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    min-width: 500px;

    .showtime-movie {
      .card-movie {
        cursor: pointer;
        border-radius: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
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
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
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
