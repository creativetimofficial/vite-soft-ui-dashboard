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
        <div
          class="movie-item"
          v-for="item in dataSource"
          :key="item.movieID"
          v-show="isShowMovie(item)"
        >
          <base-image-download :linkImg="item.posterLink"></base-image-download>
          <div class="movie-trailer" v-if="isOpenTrailer(item.movieID)">
            <iframe
              width="120"
              height="200"
              :src="item.trailerLink"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div class="movie-detail">
            <div class="movie-name">
              <div
                class="movie-content"
                @click="openContent(item.movieName, item.content)"
              >
                {{ item.movieName }} - {{ item.movieCode }}
              </div>
              <div class="group-icon">
                <div
                  class="icon-trailer"
                  v-if="!isOpenTrailer(item.movieID)"
                  @click="openTrailer(item.movieID)"
                >
                  <i class="fas fa-film"></i>
                </div>
                <div
                  class="icon-trailer"
                  v-if="isOpenTrailer(item.movieID)"
                  @click="openTrailer(item.movieID)"
                >
                  <i class="fas fa-times"></i>
                </div>
                <div class="icon-context-container">
                  <div class="icon-trailer" @click="openContext(item.movieID)">
                    <i
                      class="fas fa-caret-down"
                      v-if="!isOpenContext(item.movieID)"
                    ></i>
                    <i
                      class="fas fa-caret-up"
                      v-if="isOpenContext(item.movieID)"
                    ></i>
                  </div>
                  <div
                    class="group-icon-down"
                    v-if="isOpenContext(item.movieID)"
                  >
                    <div class="icon-down" @click="getAlterMovie(item.movieID)">
                      <i class="fas fa-pen"></i>
                    </div>
                    <div
                      class="icon-down"
                      @click="getRowSelected(item.movieID)"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="movie-time-line">Thời lượng: {{ item.timeLine }} phút</div>
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
            <div class="movie-category" :title="item.categoryName">
              Thể loại: {{ item.categoryName }}
            </div>
            <div class="movie-type">Loại phim: {{ item.typeName }}</div>
          </div>
          <div class="movie-detail"></div>
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
      :contentMovie="contentSelected"
      :nameMovie="nameMovie"
    ></popup-show-content>
    <popup-alter-movie
      v-if="$store.state.isOpenPopupAlterMovie"
      :idMovie="rowSelected"
      @add-click="handelAlter()"
    >
    </popup-alter-movie>
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
import PopupAlterMovie from "./popups/PopupAlterMovie.vue";
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
    PopupAlterMovie,
  },
  setup() {
    return { convertDateFormat };
  },
  created() {
    let me = this;
    me.dataField = fields;
    this.$store.state.isShowLoading = true;
    this.$api.post("/Movie/GetListMovie", { TypeFilter: 0 }).then((data) => {
      me.dataSource = data;
    this.$store.state.isShowLoading = false;

    });
  },
  data() {
    return {
      dataField: [],
      dataSource: [],
      itemsSelected: {},
      searchValue: "",
      rowSelected: "",
      checkDelete: false,
      openTrailers: [],
      openContexts: [],
      contentSelected: "",
      nameMovie: "",
    };
  },
  methods: {
    getAlterMovie(item) {
      this.rowSelected = item;
      this.$store.state.isOpenPopupAlterMovie = true;
    },
    isShowMovie(item) {
      return (
        item.movieName.includes(this.searchValue) ||
        item.movieCode.includes(this.searchValue)
      );
    },

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

    isOpenContext(id) {
      return this.openContexts.find((x) => x == id);
    },

    openContext(id) {
      if (this.openContexts.find((x) => x == id)) {
        this.openContexts = this.openContexts.filter((x) => x != id);
      } else {
        this.openContexts.push(id);
      }
    },

    openPopup() {
      this.$store.state.IsOpenPopup = true;
    },
    getRowSelected(item) {
      let me = this;
      this.rowSelected = item;

      this.$store.state.isOpenPopupDelete = true;
    },

    deleteMovie() {
      let me = this;
      this.$api.post("/Movie/DeleteMovie", me.rowSelected).then(() => {
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

    handelAlter(){
      this.$store.state.isOpenPopupAlterMovie = false;
      this.loadData();
    },
    openContent(name, content) {
      this.nameMovie = name;
      this.contentSelected = content;
      this.$store.state.isOpenPopupShowContent = true;
    },
  },
};
</script>
<style lang="scss">
.movie-manage {
  padding: 30px 28px 0;
  .movie-manage-header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    background: #fff;
    border-radius: 10px;
    align-items: center;
    .form-group{
      margin-bottom: 0px!important;
    }
  }

  #search_movie {
    height: 36px;
  }

  .mt-2 {
    margin-top: 10px;
  }

  .button-blue-round {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: none;
    background: #1a72ff;
    color: #fff;
    font-weight: 600;
  }

  .movie-manage-container {
    .movie-manage-main {
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    background: #fff;
    border-radius: 10px;
    padding: 20px 0;
      margin-top: 30px;
      display: flex;
      flex-wrap: wrap;
      min-width: 500px;
      .movie-item {
        background: #fff;
        position: relative;
        margin-left: 20px;
        min-width: 400px;
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

        .movie-category,
        .movie-actor {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 240px;
        }

        .movie-name {
          font-size: 16px;
          font-weight: 600;
          display: flex;
          justify-content: space-between;
          .movie-content {
            &:hover {
              text-decoration: underline;
              opacity: 0.9;
            }
            cursor: pointer;
          }

          .group-icon {
            display: flex;
            .icon-trailer {
              position: relative;
            }
          }
          .icon-context-container {
            position: relative;
            .group-icon-down {
              display: flex;
              top: 30px;
              right: 0;
              flex-direction: column;
              position: absolute;
              .icon-down {
                margin-bottom: 5px;
                height: 24px;
                width: 24px;
                background: #1a72ff;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                border-radius: 50%;
                cursor: pointer;
              }
            }
          }

          .icon-trailer {
            margin-left: 5px;
            height: 24px;
            width: 24px;
            background: #1a72ff;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            border-radius: 50%;
            cursor: pointer;
          }
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
