<template>
  <DxDataGrid
    :data-source="dataSource"
    :allow-column-resizing="true"
    :ref="'dxtable'"
    @selection-changed="onSelectionChanged"
    @row-click="dataTrans"
    :noDataText="$t('Nodata')"
    :hoverStateEnabled="true"
    :key-expr="keyExpr"
    v-model:selected-row-keys="selectedRowKeys"
    :height="heightTable"
  >
    <DxPaging :page-size="pageSize" :page-index="1" />
    <DxPager :visible="false" />
    <DxLoadPanel :enabled="false" />
    <DxSelection
      v-if="isHasSelection"
      :select-all-mode="'page'"
      :show-check-boxes-mode="'always'"
      mode="multiple"
    />
    <template v-for="item in dataField" :key="item">
      <DxColumn
        :data-field="item.dataField"
        :caption="item.dataName"
        :cell-template="'grid-cell'"
        :alignment="item.alignment"
        :width="item.width"
      >
      </DxColumn>
    </template>

    <template #grid-cell="{ data }">
      <slot name="slotTable" :data="data"></slot>
    </template>
  </DxDataGrid>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxSelection,
  DxLoadPanel,
  DxPaging,
  DxPager,
} from "devextreme-vue/data-grid";
const dataGridRef = "dxtable";
export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxLoadPanel,
    DxSelection,
    DxPaging,
    DxPager,
  },
  emits: ["data-transfer", "open-popup-update", "bind-data-selected","bind-multiple-data-selected"],
  setup() {
    return {};
  },
  computed: {
    dataGrid: function () {
      return this.$refs[dataGridRef].instance;
    },
  },
  watch: {
    dataSelected: function (value) {
      this.selectedRowsData = value;
      this.selectedRowKeys = this.selectedRowsData.map(
        (res) => res[this.keyExpr]
      );
    },
  },
  props: {
    /** Prop xác định số bản ghi trên 1 trang table */
    pageSize: [String, Number],

    /** Prop xác địnhh table có checkbox chọn dòng */
    isHasSelection: Boolean,

    /** Prop xác định trường làm key */
    keyExpr: {
      type: [Array, String, Object],
      required: false,
    },

    /** Prop xác định data của table */
    dataSource: {
      type: [Array, String, Object],
      required: false,
    },

    /** Prop xác định các trường của table */
    dataField: {
      type: [Array, String, Object],
      required: false,
    },

    /** Prop xác định chiều cao của table */
    heightTable: {
      type: String,
      required: false,
    },

    /** Prop xác định data được chọn sẵn */
    dataSelected: {
      type: [Array, String, Object],
      required: false,
    },
  },
  data() {
    return {
      /** Biến làm ẩn icon của table */
      displayIconButton: "dis-none",

      /** Biến chứa data của các dòng đang được chọn trong table */
      selectedRowsData: [],

      /** Biến chứa id của data đang được chọn trong table */
      selectedRowKeys: [],
    };
  },
  methods: {
    /**
     * Hàm thực hiện bỏ chọn tất cả các dòng trong table
     * Author: Công Đoàn (02/09/2022)
     */
    clearSelection() {
      // const dataGrid = this.$refs.dxtable.instance;

      this.dataGrid.clearSelection();
    },

    /**
     * Hàm thực hiện truyền data của các dòng đang được chọn
     * Author: Công Đoàn (02/09/2022)
     */
    dataTrans(e) {
      this.$emit("data-transfer", e.data);
    },

    /**
     * Hàm thực hiện lấy data của các dòng đang được chọn
     * Author: Công Đoàn (02/09/2022)
     */
    onSelectionChanged(e) {
      this.selectedRowsData = e.selectedRowsData;
      this.selectedRowKeys = this.selectedRowsData.map(
        (res) => res[this.keyExpr]
      );
      this.$emit("bind-data-selected", this.selectedRowsData);
      this.$emit("bind-multiple-data-selected", {selectedRowsData: e.selectedRowsData,dataAdd: e.currentSelectedRowKeys,dataDelete: e.currentDeselectedRowKeys});
    },
  },
};
</script>

<style lang="css">
</style>