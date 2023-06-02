<template>
  <div class="popup-add-movie">
    <div class="popup-container">
      <div class="popup-header">
        <div class="popup-title">{{ $t("Newmovies") }}</div>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="$t('Close')"
          placement="top"
        >
          <div class="popup-icon-close" @click="closeThisPopup()">
            <i class="fas fa-times"></i>
          </div>
        </el-tooltip>
      </div>
      <div class="popup-main">
        <div class="popup-row-1 pt-25">
          <div class="popup-input">
            <label>{{ $t("MovieCode") }}</label>
            <vsud-input
              type="text"
              :placeholder="$t('MovieCode')"
              name="password"
              v-model="dataMovie.movieCode"
              :id="'movie_name'"
              :isRequired="true"
              :readonly="true"
            />
          </div>
          <div class="popup-input">
            <label>{{ $t("MovieName") }} *</label>
            <vsud-input
              type="text"
              :placeholder="$t('MovieName')"
              name="password"
              v-model="dataMovie.movieName"
              :id="'movie_name'"
              :isRequired="true"
              :customToast="$t('BlankMovieName')"
              ref="moviename"
            />
          </div>
          <div class="popup-input">
            <label>{{ $t("Actor") }}</label>
            <vsud-input
              type="text"
              :placeholder="$t('Actor')"
              name="password"
              v-model="dataMovie.actor"
              :id="'movie_name'"
            />
          </div>
          <div class="popup-input">
            <label>{{ $t("Direction") }}</label>
            <vsud-input
              type="text"
              :placeholder="$t('Direction')"
              name="password"
              v-model="dataMovie.directions"
              :id="'movie_name'"
            />
          </div>
        </div>
        <div class="popup-row-1">
          <div class="popup-input popup-date">
            <label>{{ $t("FromDate") }} *</label>
            <el-date-picker
              v-model="dataMovie.fromDate"
              type="date"
              :placeholder="$t('PickADay')"
              :size="size"
              ref="fromdate"
              @blur="checkEmptyFromDate()"
              :class="isEmptyFromDate ? 'isEmpty' : ''"
            />
          </div>
          <div class="popup-input popup-date">
            <label>{{ $t("ToDate") }} *</label>
            <el-date-picker
              v-model="dataMovie.toDate"
              type="date"
              :placeholder="$t('PickADay')"
              :size="size"
              ref="todate"
              @blur="checkEmptyToDate()"
              :class="isEmptyToDate ? 'isEmpty' : ''"
            />
          </div>
          <div class="popup-input popup-date">
            <label>{{ $t("ReleaseDate") }}</label>
            <el-date-picker
              v-model="dataMovie.releaseDate"
              type="date"
              :placeholder="$t('PickADay')"
              :size="size"
            />
          </div>
        </div>
        <div class="popup-row-1">
          <div class="popup-input popup-date">
            <label>{{ $t("Content") }}</label>
            <vsud-input
              type="text"
              :placeholder="$t('Content')"
              name="password"
              v-model="dataMovie.content"
              :id="'movie_content'"
              :isMultiple="true"
            />
          </div>
          <div class="popup-input">
            <div class="group-typemovie">
              <label>{{ $t("Poster") }}</label>
              <base-upload-firebase
                :idUpload="'image-movie-upload'"
                @url-bind="catchUrl"
                :urlLink="dataMovie.urlImage"
              ></base-upload-firebase>
            </div>
          </div>

          <div class="mx-2"></div>
          <div class="popup-input popup-date group-combobox">
            <label>{{ $t("TypeMovie") }} *</label>
            <el-select
              v-model="dataMovie.typeID"
              clearable
              :placeholder="$t('PTypeMovie')"
              @blur="checkEmptyTypeMovie(dataMovie.typeID)"
              :class="isEmptyTypeMovie ? 'isEmpty' : ''"
            >
              <el-option
                v-for="item in dataMovie.typeMovie"
                :key="item.typeID"
                :label="item.typeName"
                :value="item.typeID"
              />
            </el-select>
          </div>
          <div class="popup-input popup-date group-combobox">
            <label>{{ $t("CategoryMovie") }} *</label>
            <el-select
              v-model="dataMovie.categoryID"
              multiple
              collapse-tags
              collapse-tags-tooltip
              :placeholder="$t('PCategoryMovie')"
              @blur="checkEmptyCategoryMovie(dataMovie.categoryID)"
              :class="isEmptyCategoryMovie ? 'isEmpty' : ''"
            >
              <el-option
                v-for="item in dataMovie.categoryMovie"
                :key="item.categoryID"
                :label="item.categoryName"
                :value="item.categoryID"
              />
            </el-select>
          </div>
        </div>
        <div class="popup-row-1">
          <div class="popup-input">
            <label>{{ $t("Trailer") }}</label>
            <vsud-input
              type="text"
              :placeholder="$t('Trailer')"
              name="password"
              v-model="dataMovie.linkTrailer"
              :id="'trailer-link'"
            />
          </div>
          <div class="popup-input popup-date">
            <label>{{ $t("RunningTime") }}</label>
            <vsud-input
              type="number"
              :placeholder="$t('RunningTime')"
              name="password"
              v-model="dataMovie.timeLine"
              :id="'lang-movie'"
            />
          </div>
          <div class="popup-input popup-date">
            <label>{{ $t("Language") }}</label>
            <el-select
              v-model="dataMovie.language"
              :placeholder="$t('Language')"
            >
              <el-option
                v-for="item in listLanguage"
                :key="item.languageCode"
                :label="item.languageName"
                :value="item.languageCode"
                clearable
              >
                <span style="float: left">{{ item.languageName }}</span>
                <span
                  style="
                    float: right;
                    color: var(--el-text-color-secondary);
                    font-size: 13px;
                  "
                  >{{ item.languageCode }}</span
                >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="popup-footer">
        <base-button
          :classButton="'button-white'"
          :titleButton="$t('Cancel')"
          @bindEvent="closeThisPopup()"
        ></base-button>

        <div class="ml-2"></div>
        <base-button
          :classButton="'button-blue'"
          :titleButton="$t('Save')"
          @click="postMovie()"
        ></base-button>
      </div>
    </div>
  </div>
</template>

<script>
import VsudInput from "../../components/VsudInput.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseUpload from "../components/BaseUpload.vue";
import BaseUploadFirebase from "../components/BaseUploadFirebase.vue";
import { uuidv4 } from "../../common/uuid";
export default {
  emits: ["add-click"],
  components: {
    BaseButton,
    VsudInput,
    BaseUpload,
    BaseUploadFirebase,
  },
  created() {
    let me = this;
    this.$store.state.isShowLoading = true;
    this.$api
      .post("/Movie/GetMovieAlterByMovieID", { movieID: me.idMovie })
      .then((data) => {
        (me.dataMovie.fromDate = data.fromDate),
          (me.dataMovie.toDate = data.toDate),
          (me.dataMovie.releaseDate = data.releaseDate),
          (me.dataMovie.typeID = data.typeID ?? ""),
          (me.dataMovie.categoryID = JSON.parse(data.categoryIDs) ?? []),
          (me.dataMovie.content = data.content),
          (me.dataMovie.movieCode = data.movieCode),
          (me.dataMovie.movieName = data.movieName),
          (me.dataMovie.actor = data.actor),
          (me.dataMovie.directions = data.directions),
          (me.dataMovie.urlImage = data.posterLink),
          (me.dataMovie.linkTrailer = data.trailerLink),
          (me.dataMovie.language = data.language),
          (me.dataMovie.timeLine = data.timeLine);
        me.$store.state.isShowLoading = false;
      });
    this.$api.get("/Movie/GetListTypeMovie").then((data) => {
      me.dataMovie.typeMovie = data;
    });

    this.$api.get("/Movie/GetListCategoryMovie").then((data) => {
      me.dataMovie.categoryMovie = data;
    });

    this.$api.get("/Dictionary/GetListLanguage").then((data) => {
      me.listLanguage = data;
    });
  },
  props: {
    idMovie: {
      type: String,
    },
  },
  data() {
    return {
      dataMovie: {
        fromDate: "",
        toDate: "",
        releaseDate: "",
        typeMovie: [],
        categoryMovie: [],
        typeID: null,
        categoryID: null,
        content: null,
        movieCode: null,
        movieName: null,
        actor: null,
        directions: null,
        urlImage: null,
        linkTrailer: null,
        language: null,
        timeLine: null,
      },

      listLanguage: [],
      isEmptyFromDate: false,
      isEmptyToDate: false,
      isEmptyTypeMovie: false,
      isEmptyCategoryMovie: false,
      isEmptyMovieName: false,
      isEmptyLinkPoster: false,
    };
  },
  methods: {
    closeThisPopup() {
      this.$store.state.isOpenPopupAlterMovie = false;
    },
    catchUrl(value) {
      this.dataMovie.urlImage = value;
    },
    postMovie() {
      let me = this;
      let check = this.validateMovie();
      if (check) {
        let dataParam = {
          movieID: this.idMovie,
          movieCode: this.dataMovie.movieCode,
          movieName: this.dataMovie.movieName,
          releaseDate: this.dataMovie.releaseDate,
          actor: this.dataMovie.actor,
          directions: this.dataMovie.directions,
          typeID: this.dataMovie.typeID,
          language: this.dataMovie.language,
          trailerLink: this.dataMovie.linkTrailer,
          posterLink: this.dataMovie.urlImage,
          content: this.dataMovie.content,
          fromDate: this.dataMovie.fromDate,
          toDate: this.dataMovie.toDate,
          categoryIDs: JSON.stringify(this.dataMovie.categoryID),
          timeLine: this.dataMovie.timeLine,
        };
        this.$api.post("/Movie/AlterMovieByID", dataParam).then(() => {
          me.$emit("add-click");
          me.$store.dispatch("showToast", me.$t("UpdateSuccessful"));
        });
      }
    },

    checkEmptyMovieName() {
      this.$refs.moviename.checkRequired();
      if (this.dataMovie.movieName) {
        this.isEmptyMovieName = false;
      } else {
        this.isEmptyMovieName = true;
      }
    },

    checkEmptyFromDate() {
      setTimeout(() => {
        this.isEmptyFromDate = !this.dataMovie.fromDate ? true : false;
        if (this.isEmptyFromDate) {
          this.$store.dispatch("showToast", this.$t("BlankStartDate"));
        }
      }, 100);
    },

    checkEmptyToDate() {
      this.isEmptyToDate = !this.dataMovie.toDate ? true : false;
      if (this.isEmptyToDate) {
        this.$store.dispatch("showToast", this.$t("BlankToDate"));
      }
    },

    checkEmptyCategoryMovie() {
      setTimeout(() => {
        if (this.dataMovie.categoryID.length) {
          this.isEmptyCategoryMovie = false;
        } else {
          this.isEmptyCategoryMovie = true;
          this.$store.dispatch("showToast", this.$t("BlankCategoryMovie"));
        }
      }, 100);
    },

    checkEmptyTypeMovie() {
      setTimeout(() => {
        if (this.dataMovie.typeID) {
          this.isEmptyTypeMovie = false;
        } else {
          this.isEmptyTypeMovie = true;
          this.$store.dispatch("showToast", this.$t("BlankTypeMovie"));
        }
      }, 100);
    },

    checkEmptyPoster() {
      if (this.dataMovie.urlImage) {
        this.isEmptyLinkPoster = false;
      } else {
        this.isEmptyLinkPoster = true;
        this.$store.dispatch("showToast", this.$t("BlankPoster"));
      }
    },

    checkRequireMovie() {
      if (
        this.isEmptyCategoryMovie ||
        this.isEmptyFromDate ||
        this.isEmptyToDate ||
        this.isEmptyMovieName ||
        this.isEmptyLinkPoster ||
        this.isEmptyTypeMovie
      ) {
        return false;
      } else {
        return true;
      }
    },

    validateMovie() {
      let check = true;
      this.checkEmptyMovieName();
      this.checkEmptyFromDate();
      this.checkEmptyToDate();
      this.checkEmptyPoster();
      this.checkEmptyTypeMovie();
      this.checkEmptyCategoryMovie();
      check = this.checkRequireMovie();
      return check;
    },
  },
};
</script>

<style lang="scss">
@import "vue-select/dist/vue-select.css";
.popup-alter-movie {
  input::placeholder {
    font-size: 13px;
    color: #c8cace;
  }
  .form-control {
    height: 40px;
  }
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  .popup-container {
    height: 600px;
    width: 900px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .popup-header {
      height: 60px;
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 18px 0;
      background: #ddefff;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      .popup-title {
        font-weight: 700;
        font-size: 18px;
        color: #111;
      }
      .popup-icon-close {
        position: absolute;
        top: 10px;
        right: 10px;
        height: 20px;
        width: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }

    .popup-footer {
      height: 60px;
      padding: 0 18px 0;
      display: flex;
      background: #ddefff;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .ml-2 {
        margin-left: 10px;
      }
    }

    .popup-main {
      height: 480px;
      padding: 0 18px 0;
      .popup-input {
        padding: 0 8px 0;
      }
      .pt-25 {
        padding-top: 25px;
      }
      .popup-row-1 {
        display: flex;
        .form-control {
          padding-left: 0.75rem !important;
        }
        .el-input__wrapper {
          border-radius: 10px !important;
        }

        .el-input--prefix {
          margin-bottom: 1rem;
        }

        .el-input {
          height: 40px !important;
        }

        .popup-date {
          width: 250px !important;
        }
      }
      #movie_content {
        max-height: 100px;
        width: 200px;
        height: 100px;
      }

      #trailer-link {
        width: 600px;
      }

      .group-combobox {
        margin: auto 0;
      }
    }
  }
}
</style>
