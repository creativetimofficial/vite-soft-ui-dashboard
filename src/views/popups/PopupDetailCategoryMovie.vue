<template>
  <div class="popup-detail-category-movie">
    <div class="overlay" @click="closeThisPopup()"></div>
    <div class="popup-container">
      <div class="popup-header">
        <div class="icon-close" @click="closeThisPopup()">
          <i class="fas fa-times"></i>
        </div>
        <div class="header-title">{{ $t('CategoryMovie') }}</div>
        <div class="line-space"></div>
      </div>
      <div class="popup-main">
        <div class="popup-get">
          <table id="table-category">
            <thead>
              <th class="category-code">{{ $t('Categorycode') }}</th>
              <th class="category-name">{{$t('Categoryname')}}</th>
            </thead>
            <tbody>
              <tr v-for="item in dataCategory" :key="item.categoryID">
                <td class="category-code">{{ item.categoryCode }}</td>
                <td class="category-name">{{ item.categoryName }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="popup-update"></div>
      </div>
      <div class="popup-footer"></div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    let me = this;
    this.loadData();
  },
  data() {
    return {
      dataCategory: [],
    };
  },
  methods: {
    closeThisPopup() {
      this.$store.state.isOpenPopupDetailCategoryMovie = false;
    },
    loadData() {
      let me = this;
      this.$api.post("/Movie/GetListCategoryMovie").then((data) => {
        this.dataCategory = data;
      });
    },
  },
};
</script>
<style lang="scss">
.popup-detail-category-movie {
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

      #table-category {
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
