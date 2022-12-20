<template>
  <el-container class="active-student">
    <el-header>
      <el-form :inline="true" label-width="auto">
        <el-form-item label="所在班级">
          <el-input placeholder="请选择班级" />
        </el-form-item>
        <el-form-item label="上课老师">
          <el-select placeholder="请选择上课老师">
            <el-option
              v-for="option of 3"
              :key="option"
              :label="option"
              :value="option"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="上课时间">
          <el-date-picker
            v-model="dateValue"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :style="{ width: '250px' }"
          />
        </el-form-item>
        <el-form-item>
          <el-button>重置</el-button>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <TableComp :tableData="tableData1" />
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import TableComp from "components/TableComp.vue";
import { ref } from "vue";

const dateValue = ref("");
const tableData1 = [
  { label: "在读学员", name: "1" },
  { label: "学员课程", name: "2" },
  { label: "请假申请", name: "3" },
  { label: "试听申请", name: "4" },
];
</script>

<style lang="scss" scoped>
.active-student {
  .el-header {
    margin: 10px;
  }
}
</style>
