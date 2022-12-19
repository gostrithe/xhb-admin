<template>
  <div class="table">
    <el-table
      :data="props.tableData"
      border
      scrollbar-always-on
      empty-text="暂无数据"
      style="width: 100%"
    >
      <template v-if="props.tableData">
        <el-table-column
          v-for="item in Object.keys(props.tableData[0])"
          :key="item"
          :label="item"
          :prop="item"
          width="180"
        />
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  tableData: {
    type: Array<Object>,
  },
});
</script>

<style scoped lang="scss"></style>
