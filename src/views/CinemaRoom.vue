<template>
  <div class="cinema-room-manage">
    <div class="cinema-room-header">
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
    <div class="cinema-room-main"></div>
    <div class="cinema-room-footer"></div>
  </div>
</template>
<script>
import BaseButton from "./components/BaseButton.vue";
import VsudInput from "../components/VsudInput.vue";

export default {
  components:{BaseButton,VsudInput}
};
</script>
<style lang="scss">
.cinema-room-manage {
  padding: 30px 28px 0;
  .cinema-room-header{
    height: 60px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .form-group{
      margin-bottom: 0px;
    }
  }
}
</style>
