<template>
  <div class="movie-manage">
    <div class="movie-manage-header">
      <base-button
        :classButton="'button-blue'"
        :titleButton="'Thêm mới'"
      ></base-button>
    </div>
    <EasyDataTable
      buttons-pagination
      :headers="dataField"
      :items="dataSource"
      :loading="loading"
      table-class-name="customize-table"
    >
      <template #loading>
        <BaseLoading :isLoading="true"></BaseLoading>
      </template>
      <template #item-posterLink="{ posterLink }">
        <img class="posterLink" :src="posterLink" />
      </template>

      <template #item-operation="item">
        <div class="operation-wrapper">
          <i class="fas fa-trash-alt fa-lg pl-1"></i>
          <i class="far fa-edit fa-lg"></i>
        </div>
      </template>
    </EasyDataTable>
    <popup-add-movie></popup-add-movie>
  </div>
</template>

<script>
import { fields } from "@/constants/constantsmoviegrids.js";
import BaseLoading from "./components/BaseLoading.vue";
import BaseButton from "./components/BaseButton.vue";
import PopupAddMovie from "./popups/PopupAddMovie.vue";
export default {
  name: "MovieManager",
  components: {
    BaseLoading,
    BaseButton,
    PopupAddMovie,
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
    };
  },
};
</script>
<style lang="scss">
.movie-manage {
  padding: 0 12px 0;
  .movie-manage-header {
    height: 50px;
    display: flex;
    justify-content: flex-end;
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