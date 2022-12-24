<template>
  <div class="table">
    <el-table
      :data="tableData"
      border
      scrollbar-always-on
      empty-text="暂无数据"
      style="width: 100%"
    >
      <template v-if="tableData">
        <el-table-column
          v-for="item in Object.keys(tableData[0])"
          :key="item"
          :label="item"
          :prop="item"
          width="180"
        />
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "tableComp",
  props: {
    tableData: {
      type: Array<Object>,
    },
  },
});
</script>

<style scoped lang="scss"></style>
