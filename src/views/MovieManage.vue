<template>
  <div class="movie-manage">
    <div class="movie-manage-header">
      <div class="header-left">
        <!-- <vsud-input
          type="text"
          :placeholder="$t('Search')"
          name="search_movie"
          v-model="searchValue"
          :id="'search_movie'"
        /> -->
        <el-input
          v-model="searchValue"
          class="w-200 m-2"
          size="large"
          :placeholder="$t('Search')"
          :suffix-icon="Search"
        />
        <div class="filter-movie">
          <el-select
            v-model="typeFilter"
            class="m-2"
            placeholder="Select"
            size="large"
            @change="loadData"
          >
            <el-option
              v-for="item in filterMovie"
              :key="item.value"
              :label="$t(item.name)"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="header-right">
        <base-button
          :classButton="'button-blue'"
          :titleButton="$t('Addnew')"
          @bindEvent="openPopup()"
        ></base-button>
      </div>
    </div>
    <div class="movie-manage-container">
      <div class="movie-manage-main">
        <div class="main-empty" v-if="dataSource.length < 1">
          {{ $t("Nodata") }}
        </div>
        <div
          class="movie-item"
          v-for="item in dataSource"
          :key="item.movieID"
          v-show="isShowMovie(item)"
        >
          <base-image-download
            :linkImg="item.posterLink"
            v-if="!isOpenTrailer(item.movieID)"
          ></base-image-download>
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
              <el-tooltip
                class="box-item"
                effect="dark"
                :content="item.movieName + ' - ' + item.movieCode"
                placement="top"
              >
                <div
                  class="movie-content"
                  @click="openContent(item.movieName, item.content)"
                >
                  {{ item.movieName }} - {{ item.movieCode }}
                </div>
              </el-tooltip>

              <div class="group-icon">
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  :content="
                    isOpenTrailer(item.movieID) ? $t('Close') : $t('Trailer')
                  "
                  placement="top"
                >
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
                </el-tooltip>

                <div class="icon-context-container">
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="
                      isOpenContext(item.movieID)
                        ? $t('Close')
                        : $t('Moreoptions')
                    "
                    placement="top"
                  >
                    <div
                      class="icon-trailer"
                      @click="openContext(item.movieID)"
                    >
                      <i
                        class="fas fa-caret-down"
                        v-if="!isOpenContext(item.movieID)"
                      ></i>
                      <i
                        class="fas fa-caret-up"
                        v-if="isOpenContext(item.movieID)"
                      ></i>
                    </div>
                  </el-tooltip>

                  <div
                    class="group-icon-down"
                    v-if="isOpenContext(item.movieID)"
                  >
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      :content="$t('Edit')"
                      placement="top"
                    >
                      <div
                        class="icon-down"
                        @click="getAlterMovie(item.movieID)"
                      >
                        <i class="fas fa-pen"></i>
                      </div>
                    </el-tooltip>

                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      :content="$t('Delete')"
                      placement="top"
                    >
                      <div
                        class="icon-down"
                        @click="getRowSelected(item.movieID)"
                      >
                        <i class="fas fa-trash-alt"></i>
                      </div>
                    </el-tooltip>
                  </div>
                </div>
              </div>
            </div>
            <div class="movie-time-line">
              {{ $t("RunningTime") }}: {{ item.timeLine }} {{ $t("Min") }}
            </div>
            <div class="movie-from-date">
              {{ $t("nShowDate") }}: {{ convertDateFormat(item.fromDate) }}
            </div>
            <div class="movie-to-date">
              {{ $t("nEndDate") }}: {{ convertDateFormat(item.toDate) }}
            </div>
            <div class="movie-release-date">
              {{ $t("Releasedate") }}: {{ convertDateFormat(item.releaseDate) }}
            </div>
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="$t('nActor') + ': ' + item.actor"
              placement="top"
            >
              <div class="movie-actor">
                {{ $t("nActor") }}: {{ item.actor }}
              </div>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="$t('Director') + ': ' + item.directions"
              placement="top"
            >
              <div class="movie-direction">
                {{ $t("Director") }}: {{ item.directions }}
              </div>
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="$t('CategoryMovie') + ': ' + item.categoryName"
              placement="top"
            >
              <div class="movie-category" :title="item.categoryName">
                {{ $t("CategoryMovie") }}: {{ item.categoryName }}
              </div>
            </el-tooltip>

            <div class="movie-type">
              {{ $t("TypeMovie") }}: {{ item.typeName }}
            </div>
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
import { filterMovie } from "@/constants/constantsdefaults.js";
import BaseLoading from "./components/BaseLoading.vue";
import BaseButton from "./components/BaseButton.vue";
import PopupAddMovie from "./popups/PopupAddMovie.vue";
import BaseImageDownload from "./components/BaseImageDownload.vue";
import VsudInput from "../components/VsudInput.vue";
import PopupDelete from "./popups/PopupDelete.vue";
import { convertDateFormat } from "@/common/commonFunc";
import PopupShowContent from "./popups/PopupShowContent.vue";
import PopupAlterMovie from "./popups/PopupAlterMovie.vue";
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";
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
    return { convertDateFormat, filterMovie, Search };
  },
  created() {
    let me = this;
    me.dataField = fields;
    this.$store.state.isShowLoading = true;
    this.$api
      .post("/Movie/GetListMovie", { TypeFilter: me.typeFilter })
      .then((data) => {
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
      typeFilter: 1,
    };
  },
  methods: {
    getAlterMovie(item) {
      this.rowSelected = item;
      this.$store.state.isOpenPopupAlterMovie = true;
    },
    isShowMovie(item) {
      return (
        item.movieName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        item.movieCode.toLowerCase().includes(this.searchValue.toLowerCase())
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

    async openPopup() {
      if (await this.$store.dispatch("checkRole", "admin")) {
        this.$store.state.IsOpenPopup = true;
      }
    },
    getRowSelected(item) {
      let me = this;
      this.rowSelected = item;

      this.$store.state.isOpenPopupDelete = true;
    },

    deleteMovie() {
      let me = this;
      this.$api.post("/Movie/DeleteMovie", me.rowSelected).then(() => {
        me.loadData();
        me.$store.dispatch("showToast", me.$t("Deletesuccessfully"));
      });
    },
    loadData() {
      let me = this;
      this.$store.state.isShowLoading = true;
      this.$api
        .post("/Movie/GetListMovie", { TypeFilter: me.typeFilter })
        .then((data) => {
          me.dataSource = data;
          me.$store.state.isShowLoading = false;
        });
    },
    handleAdd() {
      this.$store.state.IsOpenPopup = false;
      this.loadData();
    },

    handelAlter() {
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
    min-height: calc(100vh - 275px);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    background: #fff;
    border-radius: 10px;
    .movie-manage-main {
      padding: 20px 20px 0 0;
      margin-top: 30px;
      display: flex;
      flex-wrap: wrap;
      min-width: 500px;
      .movie-item {
        background: #fff;
        position: relative;
        margin-left: 20px;
        min-width: 400px;
        width: 420px;
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
        .movie-actor,
        .movie-direction {
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
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 200px;
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
