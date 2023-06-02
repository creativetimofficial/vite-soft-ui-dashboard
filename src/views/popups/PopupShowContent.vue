<template>
  <div class="movie-content-manage">
    <div class="movie-content-container">
      <div class="movie-content-header">{{$t('MovieContent') + " "}} {{ nameMovie }}</div>
      <div class="movie-content-main">
        {{ contentMovie ?? $t('Nomoviecontent') }}
      </div>
      <div class="movie-content-footer">
        <base-button
          :classButton="'button-blue'"
          :titleButton="$t('Close')"
          @bindEvent="closePopup()"
        ></base-button>
      </div>
    </div>
  </div>
</template>

<script>
import { listSeat, convertLetter } from "@/constants/constantsdefaults";
import BaseButton from "@/views/components/BaseButton.vue";
import { convertDateFormat, convertTimeFormat } from "@/common/commonFunc";
export default {
  name: "MovieContentManage",
  setup() {
    return {
      listSeat,
      convertLetter,
      convertDateFormat,
      convertTimeFormat,
    };
  },
  components: { BaseButton },
  created() {},
  props: {
    nameMovie: String,
    contentMovie: String,
  },
  data() {
    return {};
  },
  methods: {
    closePopup(){
      this.$store.state.isOpenPopupShowContent = false;
    }
  },
};
</script>
<style lang="scss">
.movie-content-manage {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  .movie-content-container {
    height: 600px;
    width: 600px;
    background: #fff;
    border-radius: 10px;
    .movie-content-header {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ddefff;
      color: #111;
      font-size: 18px;
      font-weight: 600;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .movie-content-main {
      height: 480px;
      padding: 10px;
      text-align: justify;
      overflow: auto;
      color: #111;
    }

    .movie-content-footer {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 20px;
      background: #ddefff;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
}
</style>
