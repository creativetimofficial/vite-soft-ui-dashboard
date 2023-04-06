<template>
    <div class="movie-manage">
      <div class="movie-manage-header">
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
      <EasyDataTable
        buttons-pagination
        :headers="dataField"
        :items="dataSource"
        :loading="loading"
        table-class-name="customize-table"
        :sort-by="sortBy"
        :sort-type="sortType"
        multi-sort
        :search-field="searchField"
        :search-value="searchValue"
        @click-row="getRowSelected"
      >
        <template #loading>
          <BaseLoading :isLoading="true"></BaseLoading>
        </template>
        <template #item-posterLink="{ posterLink }">
          <base-image-download :linkImg="posterLink"></base-image-download>
        </template>
  
        <template #item-operation="item">
          <div class="operation-wrapper">
            <i class="fas fa-trash-alt fa-lg pl-1" @click="isDeleteMovie()"></i>
            <i class="far fa-edit fa-lg"></i>
          </div>
        </template>
      </EasyDataTable>
      <popup-add-movie v-if="$store.state.IsOpenPopup" @add-click="handleAdd()"></popup-add-movie>
      <popup-delete
        v-if="$store.state.isOpenPopupDelete"
        @delete-click="deleteMovie()"
        :content="rowSelected.movieCode"
      ></popup-delete>
    </div>
  </template>
  
  <script>
  import { fields } from "@/constants/constantsmoviegrids.js";
  import BaseLoading from "./components/BaseLoading.vue";
  import BaseButton from "./components/BaseButton.vue";
  import PopupAddMovie from "./popups/PopupAddMovie.vue";
  import BaseImageDownload from "./components/BaseImageDownload.vue";
  import VsudInput from "../components/VsudInput.vue";
  import PopupDelete from "./popups/PopupDelete.vue";
  export default {
    name: "MovieManager",
    components: {
      BaseLoading,
      BaseButton,
      PopupAddMovie,
      BaseImageDownload,
      VsudInput,
      PopupDelete,
    },
    created() {
      let me = this;
      me.dataField = fields;
      this.$api.post("/Movie/GetListMovie", { TypeFilter: 0 }).then((data) => {
        me.dataSource = data;
      });
    },
    data() {
      return {
        dataField: [],
        dataSource: [],
        itemsSelected: {},
        sortBy: ["fromDate", "toDate"],
        sortType: ["desc", "desc"],
        searchField: ["movieCode", "movieName", "actor", "directions"],
        searchValue: "",
        rowSelected: {},
        checkDelete: false,
      };
    },
    methods: {
      openPopup() {
        this.$store.state.IsOpenPopup = true;
      },
      getRowSelected(item) {
        let me = this;
        this.rowSelected = item;
        console.log(this.rowSelected.movieID);
        if (this.checkDelete) {
          this.checkDelete = false;
          this.$store.state.isOpenPopupDelete = true;
        }
      },
      isDeleteMovie() {
        this.checkDelete = true;
      },
      deleteMovie() {
        let me = this;
        this.$api
          .post("/Movie/DeleteMovie", this.rowSelected.movieID)
          .then(() => {me.loadData(); location.reload()});
      },
      loadData() {
        let me = this;
        this.$api.post("/Movie/GetListMovie", { TypeFilter: 0 }).then((data) => {
          me.dataSource = data;
        });
      },
      handleAdd(){
        this.$store.state.IsOpenPopup= false;
        this.loadData();
      }
    },
  };
  </script>
  <style lang="scss">
  .movie-manage {
    padding: 20px 12px 0;
    .movie-manage-header {
      height: 50px;
      display: flex;
      justify-content: space-between;
    }
  
    #search_movie {
      height: 36px;
    }
  }
  
  .posterLink {
    margin-right: 10px;
    display: inline-block;
    width: 80px;
    height: 80px;
    object-fit: cover;
    box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 10%);
    padding: 3px;
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