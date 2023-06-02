<template>
  <div class="cinema-room-manage">
    <div class="cinema-room-header">
      <el-input
          v-model="searchValue"
          class="w-200 m-2"
          size="large"
          :placeholder="$t('Search')"
          :suffix-icon="Search"
        />
      <div class="button-feature-container">
        <base-button
          :classButton="'button-blue'"
          :titleButton="'Tra cứu phòng trống'"
          @bindEvent="openToast('Thử nghiệm')"
        ></base-button>
        <div class="mr-1"></div>
        <base-button
          :classButton="'button-blue'"
          :titleButton="$t('Addnew')"
          @bindEvent="openPopup()"
        ></base-button>
      </div>
    </div>
    <div class="cinema-room-main">
      <div class="room-main-header">{{ $t('Roomlist') }}</div>
      <div class="room-container">
        <div
          class="room-item"
          v-for="item in rooms"
          :key="item"
          @click="showDetail(item.roomID, item.roomCode)"
        >
          <div class="room-name">
            {{ item.roomCode }}
          </div>
        </div>
      </div>
    </div>
    <div class="cinema-room-footer"></div>
  </div>
  <popup-add-real-room
    v-if="$store.state.isShowPopupAddRealRoom"
    :listRoom="rooms"
    @add-click="loadData()"
  ></popup-add-real-room>
  <popup-detail-cinema-room
    :idRoom="idRoomSelected"
    :codeRoom="codeRoomSelected"
    v-if="$store.state.isShowDetailCinemaRoom"
  ></popup-detail-cinema-room>
</template>
<script>
import BaseButton from "./components/BaseButton.vue";
import VsudInput from "../components/VsudInput.vue";
import PopupAddRealRoom from "./popups/PopupAddRealRoom.vue";
import PopupDetailCinemaRoom from "./popups/PopupDetailCinemaRoom.vue";
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";
export default {
  components: {
    BaseButton,
    VsudInput,
    PopupAddRealRoom,
    PopupDetailCinemaRoom,
  },
  setup() {
    return{
      Search
    }
  },
  created() {
    let me = this;
    this.$store.state.isShowLoading = true;
    this.$api.get("/CinemaRoom/GetListCinemaRoom").then((data) => {
      me.rooms = data;
      me.$store.state.isShowLoading = false;
    });
  },
  data() {
    return {
      rooms: [],
      idRoomSelected: null,
      codeRoomSelected: null,
    };
  },
  methods: {
    openPopup() {
      this.$store.state.isShowPopupAddRealRoom = true;
    },
    openToast(item) {
      this.$store.dispatch("showToast", item);
    },
    loadData() {
      let me = this;
      this.$store.state.isShowLoading = true;
      this.$api.get("/CinemaRoom/GetListCinemaRoom").then((data) => {
        me.rooms = data;
        me.$store.state.isShowLoading = false;
      });
    },
    showDetail(id, code) {
      this.idRoomSelected = id;
      this.codeRoomSelected = code;
      this.$store.state.isShowDetailCinemaRoom = true;
    },
  },
};
</script>
<style lang="scss">
.cinema-room-manage {
  padding: 30px 28px 0;
  .cinema-room-header {
    height: 60px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .mr-1 {
      margin-right: 10px;
    }
    .form-group {
      margin-bottom: 0px;
    }

    .button-feature-container {
      display: flex;
    }
  }
  .cinema-room-main {
    margin-top: 30px;
    background: #fff;
    border-radius: 10px;
    padding: 10px 20px 30px 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    .room-main-header {
      display: flex;
      justify-content: center;
      font-size: 20px;
      color: #111;
      font-weight: 600;
    }
    .room-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .room-item {
        margin: 10px;
        height: 100px;
        width: 100px;

        .room-name {
          color: #fff;
          background: #93bbfb;
          font-size: 30px;
          font-weight: 800;
          height: 100px;
          width: 100px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
            rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
          -webkit-user-select: none;
          user-select: none;
          cursor: pointer;
          &:hover {
            background: #1a72ff;
          }

          &:focus,
          &:active {
            background: #93bbfb;
          }
        }
      }
    }
  }
}
</style>
