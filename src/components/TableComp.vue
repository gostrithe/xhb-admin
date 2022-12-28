<template>
  <div class="table">
    <el-table
      :data="tableData"
      border
      scrollbar-always-on
      empty-text="暂无数据"
      style="width: 100%"
    >
      <template v-if="tableColumn">
        <slot name="selection"></slot>
        <el-table-column
          v-for="item of tableColumn"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          width="120"
        />
        <slot name="operation"></slot>
      </template>
    </el-table>
    <!-- <el-pagination
      v-if="tableData"
      background
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface TableColumn {
  label: string;
  prop: string;
}

export default defineComponent({
  name: "tableComp",
  props: {
    tableData: {
      type: Array<Object>,
    },
    tableColumn: {
      type: Array<TableColumn>,
    },
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
    };
  },
  methods: {
    handleSizeChange(value: number) {
      console.log("size", value);
    },
    handleCurrentChange(value: number) {
      console.log(value);
    },
  },
});
</script>

<style scoped lang="scss">
.table {
  margin-top: 5px;
}
</style>
