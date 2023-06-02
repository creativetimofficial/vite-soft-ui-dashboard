<template>
  <div class="popup-detail-type-movie">
    <div class="overlay" @click="closeThisPopup()"></div>
    <div class="popup-container">
      <div class="popup-header">
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="$t('Close')"
          placement="top"
        >
          <div class="icon-close" @click="closeThisPopup()">
            <i class="fas fa-times"></i>
          </div>
        </el-tooltip>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="$t('Addnew')"
          placement="top"
        >
          <div
            class="icon-add"
            @click="showUpdate()"
            v-if="$store.state.role == 'admin'"
          >
            <i class="far fa-plus-square fa-lg"></i>
          </div>
        </el-tooltip>
        <div class="header-title">{{ $t("TypeMovie") }}</div>
        <div class="line-space"></div>
      </div>
      <div class="popup-main">
        <div class="popup-get">
          <table id="table-type-movie">
            <thead>
              <th class="category-code">{{ $t("Typemoviecode") }}</th>
              <th class="category-name">{{ $t("Typemoviename") }}</th>
            </thead>
            <tbody>
              <tr v-for="item in dataType" :key="item.categoryID">
                <td class="category-code">{{ item.typeCode }}</td>
                <td class="category-name">{{ item.typeName }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="popup-update" v-if="isOpenUpdate">
          <div class="line-space"></div>
          <div class="update-title">{{ $t("Addnewmovietype") }}</div>
          <div class="input-content">
            <div class="popup-input">
              <label>{{ $t("TypeCode") }}</label>
              <vsud-input
                type="text"
                :placeholder="$t('TypeCode')"
                v-model="typeCode"
                :id="'movie_name'"
                :isRequired="true"
              />
            </div>
            <div class="ml-1"></div>
            <div class="popup-input">
              <label>{{ $t("TypeName") }}</label>
              <vsud-input
                type="text"
                :placeholder="$t('TypeName')"
                v-model="typeName"
                :id="'movie_name'"
                :isRequired="true"
              />
            </div>
          </div>
          <div class="button-content">
            <base-button
              :classButton="'button-white'"
              :titleButton="$t('Close')"
              @bindEvent="closeUpdate()"
            ></base-button>

            <div class="ml-1"></div>
            <base-button
              :classButton="'button-blue'"
              :titleButton="$t('Save')"
              @click="saveTypeMovie()"
            ></base-button>
          </div>
        </div>
      </div>
      <div class="popup-footer"></div>
    </div>
  </div>
</template>
<script>
import VsudInput from "../../components/VsudInput.vue";
import BaseButton from "../components/BaseButton.vue";
export default {
  components: {
    VsudInput,
    BaseButton,
  },
  created() {
    let me = this;
    this.loadData();
  },
  data() {
    return {
      dataType: [],
      typeCode: "",
      typeName: "",
      isOpenUpdate: false
    };
  },
  methods: {
    closeThisPopup() {
      this.$store.state.isOpenDetailTypeMovie = false;
    },
    loadData() {
      let me = this;
      this.$api.get("/Movie/GetListTypeMovie").then((data) => {
        this.dataType = data;
      });
    },
    showUpdate() {
      this.isOpenUpdate = true;
    },

    closeUpdate() {
      this.isOpenUpdate = false;
    },

    saveTypeMovie() {
      let me = this;
      this.$store.state.isShowLoading = true;
      if (me.typeCode && me.typeName) {
        this.$api
          .post("/Dictionary/InsertTypeMovie", {
            typeCode: me.typeCode,
            typeName: me.typeName,
          })
          .then((data) => {
            if (data) {
              me.$store.dispatch("showToast", this.$t("Savesuccessfully"));
              me.typeCode = "";
              me.typeName = "";
              me.isOpenUpdate = false;
              me.loadData();
              me.$store.state.isShowLoading = false;
            } else {
              me.$store.dispatch("showToast", this.$t("HaveErrorTryAgain"));
              me.$store.state.isShowLoading = false;
            }
          });
      } else {
        me.$store.dispatch("showToast", this.$t("Notenoughinformation"));
        me.$store.state.isShowLoading = false;
      }
    },
  },
};
</script>
<style lang="scss">
.popup-detail-type-movie {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
  }
  .popup-container {
    position: absolute;
    box-shadow: 0 8px 26px -4px rgba(20, 20, 20, 0.15),
      0 8px 9px -5px rgba(20, 20, 20, 0.06) !important;
    top: 0;
    bottom: 0;
    right: 0;
    width: 500px;
    background: #fff;
    z-index: 10;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    .popup-header {
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      color: #111;
      font-size: 20px;
      flex-direction: column;
      font-weight: 700;
      .icon-close {
        position: absolute;
        top: 10px;
        right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20px;
        width: 20px;
        opacity: 0.8;
        cursor: pointer;
        &:hover {
          opacity: 0.5;
        }

        &:active {
          opacity: 1;
        }
      }
      .header-title {
        height: 59px;
        display: flex;
        align-items: center;
      }
      .line-space {
        border-bottom: 1px rgba($color: #000000, $alpha: 0.1) solid;
        width: 350px;
      }
    }

    .popup-main {
      display: flex;
      height: calc(100% - 60px);
      justify-content: center;

      #table-type-movie {
        margin-top: 20px;
        .category-code {
          width: 200px;
          text-align: center;
        }

        .category-name {
          width: 200px;
          text-align: center;
        }

        tr {
          cursor: pointer;
          th {
            border-bottom: 1px rgba($color: #000000, $alpha: 0.1) solid;
          }

          th:first-child,
          td:first-child {
            border-right: 1px rgba($color: #000000, $alpha: 0.1) solid;
          }
        }

        tbody {
          tr {
            &:hover {
              background: rgba($color: #000000, $alpha: 0.1);
            }
          }
        }
      }
    }
  }
}
</style>
