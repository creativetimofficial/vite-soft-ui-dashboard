<template lang="">
  <div>
    <DxDataGrid
      id="gridContainer"
      :data-source="employees"
      key-expr="ID"
      :show-borders="true"
      :show-row-lines="true"
      :show-column-lines="false"
      @exporting="onExporting"
    ></DxDataGrid>
  </div>
</template>
<script>
import { DxDataGrid, DxColumn, DxExport } from "devextreme-vue/data-grid";
export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxExport,
  },
};
</script>

<style lang=""></style>
