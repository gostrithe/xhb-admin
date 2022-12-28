<template>
  <el-container>
    <el-header>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="31">
          <el-input placeholder="Approved by" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">Query</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <TableComp :tableData="tableData" />
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import TableComp from "components/TableComp.vue";

const tableData = [
  { label: "在读学员", name: "1" },
  { label: "学员课程", name: "2" },
  { label: "请假申请", name: "3" },
];
</script>

<style lang="scss" scoped></style>
