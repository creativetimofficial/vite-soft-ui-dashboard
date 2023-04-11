<template>
  <div class="movie-manage">
    <div class="movie-manage-header">
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
    <div class="movie-manage-container">
      <div class="movie-manage-main">
        <div class="movie-item" v-for="item in dataSource" :key="item.movieID">
          <base-image-download :linkImg="item.posterLink"></base-image-download>
          <div class="movie-trailer" v-if="isOpenTrailer(item.movieID)">
            <iframe
              width="120"
              height="200"
              src="https://www.youtube.com/embed/r4Xstoq18gA"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div class="movie-detail">
            <div class="movie-name">
              {{ item.movieName }} - {{ item.movieCode }}
            </div>
            <div class="movie-time-line">Thời lượng: {{ item.timeLine }}</div>
            <div class="movie-from-date">
              Ngày khởi chiếu: {{ convertDateFormat(item.fromDate) }}
            </div>
            <div class="movie-to-date">
              Ngày kết thúc: {{ convertDateFormat(item.toDate) }}
            </div>
            <div class="movie-release-date">
              Ngày xuất bản: {{ convertDateFormat(item.releaseDate) }}
            </div>
            <div class="movie-actor">Diễn viên: {{ item.actor }}</div>
            <div class="movie-direction">Đạo diễn: {{ item.directions }}</div>
            <div class="movie-category">Thể loại: {{ item.categoryName }}</div>
            <div class="movie-type">Loại phim: {{ item.typeName }}</div>
          </div>
          <div class="movie-detail">
            <base-button
              :classButton="'button-blue-round'"
              :titleButton="
                !isOpenTrailer(item.movieID) ? 'Hiện trailer' : 'Ẩn Trailer'
              "
              @bindEvent="openTrailer(item.movieID)"
              v-if="!isOpenTrailer(item.movieID)"
            ></base-button>
          </div>
        </div>
      </div>
    </div>
    <popup-add-movie
      v-if="$store.state.IsOpenPopup"
      @add-click="handleAdd()"
    ></popup-add-movie>
    <popup-delete
      v-if="$store.state.isOpenPopupDelete"
      @delete-click="deleteMovie()"
      :content="rowSelected.movieCode"
    ></popup-delete>
    <popup-show-content
      v-if="$store.state.isOpenPopupShowContent"
    ></popup-show-content>
  </div>
</template>

<script>
import { fields } from "@/constants/constantsmoviegrids.js";
import BaseLoading from "./components/BaseLoading.vue";
import BaseButton from "./components/BaseButton.vue";
import PopupAddMovie from "./popups/PopupAddMovie.vue";
import BaseImageDownload from "./components/BaseImageDownload.vue";
import VsudInput from "../components/VsudInput.vue";
import PopupDelete from "./popups/PopupDelete.vue";
import { convertDateFormat } from "@/common/commonFunc";
import PopupShowContent from "./popups/PopupShowContent.vue";
export default {
  name: "MovieManager",
  components: {
    BaseLoading,
    BaseButton,
    PopupAddMovie,
    BaseImageDownload,
    VsudInput,
    PopupDelete,
    PopupShowContent,
  },
  setup() {
    return { convertDateFormat };
  },
  created() {
    let me = this;
    me.dataField = fields;
    this.$api.post("/Movie/GetListMovie", { TypeFilter: 0 }).then((data) => {
      me.dataSource = data;
    });
  },
  data() {
    return {
      dataField: [],
      dataSource: [],
      itemsSelected: {},
      searchValue: "",
      rowSelected: {},
      checkDelete: false,
      openTrailers: [],
    };
  },
  methods: {
    isOpenTrailer(id) {
      return this.openTrailers.find((x) => x == id);
    },

    openTrailer(id) {
      if (this.openTrailers.find((x) => x == id)) {
        this.openTrailers = this.openTrailers.filter((x) => x != id);
      } else {
        this.openTrailers.push(id);
      }
    },
    openPopup() {
      this.$store.state.IsOpenPopup = true;
    },
    getRowSelected(item) {
      let me = this;
      this.rowSelected = item;
      console.log(this.rowSelected.movieID);
      if (this.checkDelete) {
        this.checkDelete = false;
        this.$store.state.isOpenPopupDelete = true;
      }
    },
    isDeleteMovie() {
      this.checkDelete = true;
    },
    deleteMovie() {
      let me = this;
      this.$api
        .post("/Movie/DeleteMovie", this.rowSelected.movieID)
        .then(() => {
          location.reload();
        });
    },
    loadData() {
      let me = this;
      this.$api.post("/Movie/GetListMovie", { TypeFilter: 0 }).then((data) => {
        me.dataSource = data;
      });
    },
    handleAdd() {
      this.$store.state.IsOpenPopup = false;
      this.loadData();
    },
  },
};
</script>
<style lang="scss">
.movie-manage {
  padding: 30px 28px 0;
  .movie-manage-header {
    height: 50px;
    display: flex;
    justify-content: space-between;
  }

  #search_movie {
    height: 36px;
  }

  .mt-2 {
    margin-top: 10px;
  }

  .button-blue-round{
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }

  .movie-manage-container {
    .movie-manage-main {
      .movie-item {
        color: #111;
        display: flex;
        height: 220px;
        margin-bottom: 10px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        border-radius: 10px;
        padding: 10px;
        font-size: 13px;
        .posterLink {
          display: inline-block;
          width: 120px;
          height: 200px;
          object-fit: cover;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
          padding: 3px;
          border-radius: 10px;
        }

        .movie-name {
          font-size: 16px;
          font-weight: 600;
        }

        .movie-content-main {
          padding: 0 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          /* justify-content: center; */
          align-items: center;
          .movie-content {
            overflow: auto;
          }
        }

        .movie-trailer {
          iframe {
            border-radius: 10px;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            padding: 3px;
          }
          margin-right: 10px;
        }
      }
    }
  }
}

.operation-wrapper {
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  i:hover {
    opacity: 0.6;
  }
}
</style>
