<template>
  <div class="popup-add-movie">
    <div class="popup-container">
      <div class="popup-header">
        <div class="popup-title">Thêm mới phim</div>
        <div class="popup-icon-close">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <div class="popup-main"></div>
      <div class="popup-footer">
        <base-button
          :classButton="'button-white'"
          :titleButton="'Hủy'"
        ></base-button>

        <div class="ml-2"></div>
        <base-button
          :classButton="'button-blue'"
          :titleButton="'Thêm'"
        ></base-button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "../components/BaseButton.vue";
export default {
  components: {
    BaseButton,
  },
  props: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
.popup-add-movie {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  .popup-container {
    height: 600px;
    width: 600px;
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
  }
}
</style>