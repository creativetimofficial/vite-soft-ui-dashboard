<template>
  <div class="dictionary-manage">
    <div class="dictionary-header"></div>
    <div class="dictionary-main">
      <div class="movie-main">
        <div class="movie-main-header">{{ $t('Moviedictionary') }}</div>
        <div class="movie-main-main">
          <button class="cta" @click="openPopupDetailTypeMovie">
            <span>{{ $t('TypeMovie') }}</span>
            <svg viewBox="0 0 13 10" height="10px" width="15px">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>

          <button class="cta" @click="openPopupDetailCategoryMovie">
            <span>{{ $t('CategoryMovie') }}</span>
            <svg viewBox="0 0 13 10" height="10px" width="15px">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>

          <button class="cta" @click="openPopupDetailLanguage">
            <span>{{ $t('Language') }}</span>
            <svg viewBox="0 0 13 10" height="10px" width="15px">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
      <div class="line-space"></div>
      <div class="template-main">
        <div class="template-main-header">{{ $t('Showtimedictionary') }}</div>
        <div class="template-main-main">
          <button class="cta" @click="openPopupDetailTemplateTimeCode">
            <span>{{$t('Timeframe')}}</span>
            <svg viewBox="0 0 13 10" height="10px" width="15px">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="dictionary-footer"></div>
    <popup-detail-category-movie
      v-if="$store.state.isOpenPopupDetailCategoryMovie"
    ></popup-detail-category-movie>

    <PopupDetailTypeMovie v-if="$store.state.isOpenDetailTypeMovie">
    </PopupDetailTypeMovie>
    <PopupDetailTemplateTimeCode
      v-if="$store.state.isOpenPopupTemplateTimeCode"
    ></PopupDetailTemplateTimeCode>
    <PopupDetailLanguage
      v-if="$store.state.isOpenPopupDetailLanguage"
    ></PopupDetailLanguage>
  </div>
</template>
<script>
import PopupDetailCategoryMovie from "./popups/PopupDetailCategoryMovie.vue";
import PopupDetailLanguage from './popups/PopupDetailLanguage.vue';
import PopupDetailTemplateTimeCode from "./popups/PopupDetailTemplateTimeCode.vue";
import PopupDetailTypeMovie from "./popups/PopupDetailTypeMovie.vue";
export default {
  components: {
    PopupDetailCategoryMovie,
    PopupDetailTypeMovie,
    PopupDetailTemplateTimeCode,PopupDetailLanguage
  },
  methods: {
    openPopupDetailCategoryMovie() {
      this.$store.state.isOpenPopupDetailCategoryMovie = true;
    },
    openPopupDetailTypeMovie() {
      this.$store.state.isOpenDetailTypeMovie = true;
    },
    openPopupDetailTemplateTimeCode() {
      this.$store.state.isOpenPopupTemplateTimeCode = true;
    },
    openPopupDetailLanguage(){
      this.$store.state.isOpenPopupDetailLanguage = true;
    }
  },
};
</script>
<style lang="scss">
.dictionary-manage {
  padding: 30px 28px 0;
  .dictionary-main {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    background: #fff;
    border-radius: 10px;
    padding: 20px 0;
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    min-width: 500px;
    padding: 20px;
    .line-space {
      height: 500px;
      border-left: 1px solid #111;
      width: 1px;
    }

    .movie-main {
      .movie-main-main {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }
    }

    .cta {
      position: relative;
      padding: 12px 18px;
      transition: all 0.2s ease;
      border: none;
      background: none;
      margin: 10px 0px;
    }

    .template-main-header,
    .movie-main-header {
      color: #234567;
      font-size: 20px;
      font-weight: 900;
      cursor: pointer;
      margin-bottom: 10px;
    }

    .cta:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      border-radius: 50px;
      background: #b1dae7;
      width: 45px;
      height: 45px;
      transition: all 0.3s ease;
    }

    .cta span {
      position: relative;
      font-family: "Ubuntu", sans-serif;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: #234567;
    }

    .cta svg {
      position: relative;
      top: 0;
      margin-left: 10px;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke: #234567;
      stroke-width: 2;
      transform: translateX(-5px);
      transition: all 0.3s ease;
    }

    .cta:hover:before {
      width: 100%;
      background: #b1dae7;
    }

    .cta:hover svg {
      transform: translateX(0);
    }

    .cta:active {
      transform: scale(0.95);
    }
  }
}
</style>
