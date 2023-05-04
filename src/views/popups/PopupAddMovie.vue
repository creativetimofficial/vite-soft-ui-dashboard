<template>
  <div class="popup-add-movie">
    <div class="popup-container">
      <div class="popup-header">
        <div class="popup-title">{{ $t('Newmovies') }}</div>
        <div class="popup-icon-close" @click="closeThisPopup()">
          <i class="fas fa-times"></i>
        </div>
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
            />
          </div>
          <div class="popup-input">
            <label>{{ $t("MovieName") }}</label>
            <vsud-input
              type="text"
              :placeholder="$t('MovieName')"
              name="password"
              v-model="dataMovie.movieName"
              :id="'movie_name'"
              :isRequired="true"
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
              v-model="dataMovie.direction"
              :id="'movie_name'"
            />
          </div>
        </div>
        <div class="popup-row-1">
          <div class="popup-input popup-date">
            <label>{{ $t("FromDate") }}</label>
            <el-date-picker
              v-model="dataMovie.fromdate"
              type="date"
              :placeholder="$t('PickADay')"
              :size="size"
            />
          </div>
          <div class="popup-input popup-date">
            <label>{{ $t("ToDate") }}</label>
            <el-date-picker
              v-model="dataMovie.todate"
              type="date"
              :placeholder="$t('PickADay')"
              :size="size"
            />
          </div>
          <div class="popup-input popup-date">
            <label>{{ $t("ReleaseDate") }}</label>
            <el-date-picker
              v-model="dataMovie.releasedate"
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
              ></base-upload-firebase>
            </div>
          </div>
          <div class="popup-input popup-date group-combobox">
            <label>{{ $t("TypeMovie") }}</label>
            <v-select
              label="typeName"
              :options="dataMovie.typeMovie"
              :placeholder="$t('PTypeMovie')"
              v-model="dataMovie.selectedTypeMovie"
              :reduce="(typeName) => typeName.typeID"
            ></v-select>
          </div>
          <div class="popup-input popup-date group-combobox">
            <label>{{ $t("CategoryMovie") }}</label>
            <v-select
              label="categoryName"
              :options="dataMovie.categoryMovie"
              :placeholder="$t('PCategoryMovie')"
              v-model="dataMovie.selectedCategory"
              :reduce="(categoryName) => categoryName.categoryID"
              multiple
            ></v-select>
          </div>
        </div>
        <div class="popup-row-1">
          <div class="popup-input">
            <label>{{ $t("Trailer") }}</label>
            <vsud-input
              type="text"
              :placeholder="$t('Trailer')"
              name="password"
              v-model="dataMovie.trailerLink"
              :id="'trailer-link'"
            />
          </div>
          <div class="popup-input popup-date">
            <label>{{ $t("TimeLine") }}</label>
            <vsud-input
              type="text"
              :placeholder="$t('TimeLine')"
              name="password"
              v-model="dataMovie.timeLine"
              :id="'lang-movie'"
            />
          </div>
          <div class="popup-input popup-date">
            <label>{{ $t("Language") }}</label>
            <vsud-input
              type="text"
              :placeholder="$t('Language')"
              name="password"
              v-model="dataMovie.language"
              :id="'lang-movie'"
            />
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
          :titleButton="$t('Add')"
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
    this.$api.post("/Movie/GetListTypeMovie").then((data) => {
      me.dataMovie.typeMovie = data;
    });

    this.$api.post("/Movie/GetListCategoryMovie").then((data) => {
      me.dataMovie.categoryMovie = data;
    });
  },
  props: {},
  data() {
    return {
      dataMovie: {
        fromdate: "",
        todate: "",
        releasedate: "",
        typeMovie: [],
        categoryMovie: [],
        selectedTypeMovie: null,
        selectedCategory: null,
        content: null,
        movieCode: null,
        movieName: null,
        actor: null,
        direction: null,
        urlImage: null,
        linkTrailer: null,
        language: null,
        timeLine: null
      },
    };
  },
  methods: {
    closeThisPopup() {
      this.$store.state.IsOpenPopup = false;
    },
    catchUrl(value) {
      this.dataMovie.urlImage = value;
    },
    postMovie() {
      let me = this;
      let dataParam = {
        movieID: uuidv4(),
        movieCode: this.dataMovie.movieCode,
        movieName: this.dataMovie.movieName,
        releaseDate: this.dataMovie.releasedate,
        actor: this.dataMovie.actor,
        directions: this.dataMovie.direction,
        typeID: this.dataMovie.selectedTypeMovie,
        language: this.dataMovie.language,
        trailerLink: this.dataMovie.trailerLink,
        posterLink: this.dataMovie.urlImage,
        content: this.dataMovie.content,
        fromDate: this.dataMovie.fromdate,
        toDate: this.dataMovie.todate,
        categoryIDs: this.dataMovie.selectedCategory,
        timeLine: this.dataMovie.timeLine
      };
      this.$api
        .post("/Movie/InsertMovie", dataParam)
        .then(() => me.$emit("add-click"));
    },
  },
};
</script>

<style lang="scss">
@import "vue-select/dist/vue-select.css";
.popup-add-movie {
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

      .group-combobox{
        margin: auto 0;
      }
    }
  }
}
</style>
