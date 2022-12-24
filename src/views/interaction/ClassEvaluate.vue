<template>
  <el-tabs class="tabs">
    <el-tab-pane label="评价学员">
      <el-form style="display: flex">
        <el-form-item label="所在班级">
          <el-input
            placeholder="请选择班级"
            style="width: 200px; font-size: 12px"
          >
            <template #prefix>
              <el-icon><Grid /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="上课老师">
          <el-input
            placeholder="请选择上课老师"
            style="width: 200px; font-size: 12px"
          >
            <template #prefix>
              <el-icon><Grid /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="上课时间">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 250px"
          />
        </el-form-item>
        <el-form-item>
          <el-button>重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="btnGroup">
        <el-button style="font-size: 12px">点评记录</el-button>
        <el-button style="font-size: 12px">设置评分维度</el-button>
        <el-button style="font-size: 12px">评语库</el-button>
      </div>

      <el-table
        :data="tableData"
        border
        stripe
        style="font-size: 12px; width: 100%"
      >
        <el-table-column prop="className" label="班级名称" />
        <el-table-column prop="courseListDesc" label="授课课程" />
        <el-table-column prop="classTime" label="上课时间" />
        <el-table-column prop="teachersDesc" label="上课老师" />
        <el-table-column prop="evaluateCount" label="点评情况" />
        <el-table-column label="操作" align="center" width="80"
          ><span style="color: #1890ff">查看</span></el-table-column
        >
      </el-table>

      <div class="tableFooter">
        <el-button>导出当前页</el-button>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 50, 100, 200, 500]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum"
        >
        </el-pagination>
      </div>
    </el-tab-pane>
    <el-tab-pane label="评价老师">评价老师</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Grid } from "@element-plus/icons-vue";
import { ref, watchEffect } from "vue";
import { fetchTableData } from "api/commentsAfterClassApi";

const value1 = ref("");

const tableData = ref([]);

// @ts-nocheck
// onMounted(async () => {
//   const { data, total } = await fetchTableData(
//     `/comments-after-class?$limit=${20}`
//   );
//   data.forEach((item) => {
//     item.evaluateCount = `${item.totalEvaluateCount}/${item.totalNeedEvaluateCount}`;
//     item.classTime = `${item.classOtDesc}(${item.weekDesc})${item.classTimeDesc}`;
//   });
//   totalNum.value = total;
//   tableData.value = data;
// });

async function fetchData(page, size) {
  // @ts-ignore
  const { data, total } = await fetchTableData(
    `/comments-after-class?$limit=${size}&$skip=${(page - 1) * size}`
  );
  data.forEach((item) => {
    item.evaluateCount = `${item.totalEvaluateCount}/${item.totalNeedEvaluateCount}`;
    item.classTime = `${item.classOtDesc}(${item.weekDesc})${item.classTimeDesc}`;
  });
  totalNum.value = total;
  tableData.value = data;
}

const totalNum = ref(0);
const currentPage = ref(1);
const pageSize = ref(20);

watchEffect(async () => {
  await fetchData(currentPage.value, pageSize.value);
});
</script>

<style lang="scss" scoped>
.tabs {
  padding: 20px;
  background: #fff;
}

.el-form-item {
  margin-right: 16px;

  :deep(.el-range-input) {
    font-size: 12px;
  }
}
.tableFooter {
  padding-top: 12px;
  display: flex;
  justify-content: space-between;
}
</style>
