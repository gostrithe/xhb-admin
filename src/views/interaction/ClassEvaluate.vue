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
        <el-table-column label="操作" align="center" width="80">
          <template #default="{ row }">
            <span
              style="color: #1890ff; cursor: pointer"
              @click="getDetail(row)"
              >查看</span
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- drawer抽屉 -->
      <el-drawer v-model="drawer" title="课次评价详情">
        <template #default>
          <el-form :model="rowData">
            <el-form-item
              :label="rowData['className']"
              class="form-header"
            ></el-form-item>
            <div class="form-body" style="padding-left: 30px">
              <el-form-item label="上课时间">
                {{ rowData["classTime"] }}
              </el-form-item>
              <el-form-item label="上课老师">
                {{ rowData["teachersDesc"] }}
              </el-form-item>
              <el-form-item label="上课教室"></el-form-item>
              <el-form-item label="所属课程">
                {{ rowData["courseListDesc"] }}
              </el-form-item>
            </div>
            <el-form-item label="学员信息" class="form-header form-table">
              <el-table :data="studentTableData" style="width: 380px" border>
                <el-table-column
                  prop="studentName"
                  label="学生姓名"
                  width="80"
                ></el-table-column>
                <el-table-column
                  prop="studentCheckStatusDesc"
                  label="到课状态"
                  width="80"
                >
                  <template #default="{ row }">
                    <el-tag type="info" effect="plain">{{
                      row.studentCheckStatusDesc
                    }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="evaluateCount" label="评价数" width="80">
                  <template #default="{ row }">
                    <el-tag
                      type="danger"
                      effect="plain"
                      style="padding: 0px 4px"
                      >{{
                        row.evaluateCount == "0" ? "未评价" : row.evaluateCount
                      }}</el-tag
                    >
                  </template>
                </el-table-column>
                <el-table-column
                  prop="evaluateReadCount"
                  label="已读评价数"
                  width="80"
                ></el-table-column>
                <el-table-column
                  label="操作"
                  width="80"
                  fixed="right"
                  align="center"
                >
                  <template #default="{ row }">
                    <span
                      @click="onComment(row)"
                      style="color: #1890ff; cursor: pointer"
                      >点评</span
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </template>
      </el-drawer>
      <!-- 点评dialog -->
      <el-dialog v-model="dialogTableVisible" class="commentDialog">
        <template #header>
          <div>
            {{ dialogTitle }}
          </div>
        </template>
        <template #default>
          <div>
            <el-row>
              <el-col :span="12">
                <div class="commentLeft">
                  <el-image src="/empty_data.png"></el-image>
                  <span>未点评</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="commentRight">
                  <el-input
                    v-model="textarea"
                    :rows="4"
                    type="textarea"
                    placeholder="请输入评语,500字以内"
                  />
                  <span style="color: #1890ff; cursor: pointer">常用评语</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </template>
        <template #footer>
          <div>
            <el-button>取消</el-button>
            <el-button type="primary">提交</el-button>
          </div>
        </template>
      </el-dialog>

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
import { fetchTableData, getStudentTableData } from "api/commentsAfterClassApi";

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

const drawer = ref(false);
const rowData = ref({});
const studentTableData = ref([]);
const getDetail = async (row) => {
  drawer.value = true;
  rowData.value = row;
  // @ts-ignore
  const { resultData } = await getStudentTableData(row.classRecordId);
  studentTableData.value = resultData;
};

const dialogTableVisible = ref(false);
const dialogTitle = ref("学员点评");
const onComment = ({ studentName }) => {
  dialogTableVisible.value = true;
  dialogTitle.value = `学员点评 - ${studentName}`;
};

const textarea = ref("");
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

.form-header {
  :deep(.el-form-item__label) {
    font-size: 16px;
    color: #303133;
  }
}

:deep(.el-drawer__header) {
  margin-bottom: 20px;
  :deep(.el-drawer__title) {
    font-size: 14px;
  }
}
:deep(.el-drawer__body) {
  padding-left: 30px;
}

.form-table {
  flex-direction: column;
  align-items: flex-start;
  :deep(.el-form-item__content) {
    padding-left: 14px;
  }
  :deep(th .cell) {
    font-size: 12px;
  }
}

:deep(.commentDialog) {
  .el-dialog__body {
    border-bottom: 1px solid #e8e8e8;
    border-top: 1px solid #e8e8e8;
  }
}

.commentLeft {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.commentRight {
  display: flex;
  flex-direction: column;
  span {
    padding-top: 6px;
    align-self: flex-end;
  }
}
</style>
