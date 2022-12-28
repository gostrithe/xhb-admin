<template>
  <el-tabs class="tabs">
    <el-tab-pane label="评价学员">
      <el-form style="display: flex">
        <el-form-item label="所在班级">
          <el-input
            v-model="clase"
            clearable
            @click="chooseClass"
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
            v-model="teacher"
            @click="chooseTeacher"
            clearable
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
          <el-button @click="reset">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onCheck" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 选择班级dialog -->
      <el-dialog v-model="dialogTableVisible3" class="chooseClass">
        <template #header>
          <div>请选择班级</div>
        </template>
        <template #default>
          <div>
            <el-form>
              <el-form-item label="班级名称">
                <el-input
                  clearable
                  :maxlength="22"
                  placeholder="请输入班级名称"
                  v-model="claseName"
                ></el-input>
              </el-form-item>
              <el-form-item label="类型">
                <el-select v-model="soloValue" clearable placeholder="请选择">
                  <el-option label="一对多" value="一对多"></el-option>
                  <el-option label="一对一" value="一对一"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="claseCheck" type="primary">查询</el-button>
              </el-form-item>
            </el-form>
            <el-alert
              title="双击确定所选择的数据"
              show-icon
              type="info"
            ></el-alert>
            <el-table
              :data="classTableData"
              style="width: 100%"
              empty-text="暂无数据"
              @row-dblclick="onDblClick"
            >
              <el-table-column prop="solo" label="类型"></el-table-column>
              <el-table-column
                prop="className"
                label="班级名称"
              ></el-table-column>
              <el-table-column
                prop="classKind"
                label="班级类别"
              ></el-table-column>
              <el-table-column
                prop="lessons"
                label="关联课程"
              ></el-table-column>
              <el-table-column
                prop="teachers"
                label="班级老师"
              ></el-table-column>
              <el-table-column
                prop="classroom"
                label="上课教室"
              ></el-table-column>
            </el-table>

            <el-pagination
              v-model:current-page="currentPage2"
              background
              layout="total, prev, pager, next, jumper"
              :total="totalNum2"
              style="margin-top: 10px; justify-content: flex-end"
            >
            </el-pagination>
          </div>
        </template>
      </el-dialog>
      <!-- 选择上课老师dialog -->
      <el-dialog v-model="dialogTableVisible4" class="chooseTeacher">
        <template #header>
          <div>请选择上课老师</div>
        </template>
        <template #default>
          <div>
            <el-form>
              <el-form-item label="老师信息">
                <el-input
                  v-model="teacherInfo"
                  clearable
                  :maxlength="22"
                  placeholder="姓名/手机号码"
                  style="width: 200px; margin-right: 12px"
                ></el-input>
                <el-button @click="teacherCheck" type="primary">查询</el-button>
              </el-form-item>
            </el-form>
            <el-alert
              title="双击确定所选择的数据"
              show-icon
              type="info"
            ></el-alert>
            <el-table
              :data="teacherTableData"
              style="width: 100%"
              empty-text="暂无数据"
              @row-dblclick="onDblClick"
            >
              <el-table-column prop="name" label="老师姓名"></el-table-column>
              <el-table-column prop="phone" label="手机号码"></el-table-column>
              <el-table-column prop="nickName" label="昵称"></el-table-column>
              <el-table-column
                prop="officeStatus"
                label="在职状态"
              ></el-table-column>
              <el-table-column prop="goodAt" label="擅长科目"></el-table-column>
              <el-table-column
                prop="lessonsTime"
                label="已上课时"
              ></el-table-column>
              <el-table-column
                prop="lessonsCount"
                label="已上课次"
              ></el-table-column>
            </el-table>

            <el-pagination
              v-model:current-page="currentPage3"
              background
              layout="total, prev, pager, next, jumper"
              :total="totalNum3"
              style="margin-top: 10px; justify-content: flex-end"
            >
            </el-pagination>
          </div>
        </template>
      </el-dialog>

      <div class="btnGroup" style="margin-bottom: 6px">
        <el-button disabled style="font-size: 12px">点评记录</el-button>
        <el-button disabled style="font-size: 12px">设置评分维度</el-button>
        <el-button @click="openCommentStore" style="font-size: 12px"
          >评语库</el-button
        >
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
      <el-dialog v-model="dialogTableVisible" width="70%" class="commentDialog">
        <template #header>
          <div>
            {{ dialogTitle }}
          </div>
        </template>
        <template #default>
          <div>
            <el-row :gutter="40" style="align-items: flex-start">
              <el-col :span="12">
                <div class="commentLeft" v-if="emptyLeft">
                  <el-image src="/empty_data.png"></el-image>
                  <span>未点评</span>
                </div>
                <evaluteInfoItem
                  @on-delete="onDeleteClick"
                  :data="itemData"
                  v-else
                ></evaluteInfoItem>
              </el-col>
              <el-col :span="12">
                <div class="commentRight">
                  <el-input
                    v-model="textarea"
                    :rows="4"
                    type="textarea"
                    placeholder="请输入评语,500字以内"
                  />
                  <span
                    @click="commonComments"
                    style="color: #1890ff; cursor: pointer"
                    >常用评语</span
                  >
                  <div class="uploadGroup">
                    <el-upload
                      action="http://www.wzsqyg.com/attachment/upload"
                      multiple
                      v-model:file-list="fileList"
                      list-type="picture"
                    >
                      <template #trigger>
                        <div
                          style="
                            display: flex;
                            padding: 8px 0;
                            justify-content: space-around;
                            width: 220px;
                            border-radius: 4px;
                            border: 1px dashed #bfbfbf;
                            margin-top: auto;
                          "
                        >
                          <el-icon size="25px"><Headset /></el-icon>
                          <el-icon size="25px"><PictureFilled /></el-icon>
                          <el-icon size="25px"><VideoCameraFilled /></el-icon>
                        </div>
                      </template>
                    </el-upload>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </template>
        <template #footer>
          <div>
            <el-button @click="cancel">取消</el-button>
            <el-button @click="onSubmit" type="primary">提交</el-button>
          </div>
        </template>
      </el-dialog>
      <!-- 常用评语dialog -->
      <el-dialog v-model="dialogTableVisible2" class="commonComments">
        <template #header>
          <div>选择评语</div>
        </template>
        <template #default>
          <div>
            <el-form>
              <el-form-item label="评语">
                <el-input
                  clearable
                  :maxlength="22"
                  style="width: 30%; margin-right: 20px"
                  placeholder="请输入评语标题/内容"
                ></el-input>
                <el-button type="primary">查询</el-button>
              </el-form-item>
            </el-form>
            <el-alert
              title="双击确定所选择的数据"
              show-icon
              type="info"
            ></el-alert>
            <el-table
              :data="commonCommentsTableData"
              style="width: 100%"
              empty-text="暂无数据"
            >
              <el-table-column prop="title" label="评语标题"></el-table-column>
              <el-table-column
                prop="content"
                label="评语内容"
              ></el-table-column>
              <el-table-column prop="creator" label="创建人"></el-table-column>
            </el-table>
          </div>
        </template>
      </el-dialog>

      <div class="tableFooter">
        <el-button disabled>导出当前页</el-button>
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
import {
  updateEvaluateCount,
  fetchTableData,
  getStudentTableData,
  fetchClassData,
  fetchTeacherData,
  getClaseByCondition,
  getTeacherByCondition,
  searchTableData,
  submitEvalute,
  getEvaluteDetail,
} from "api/commentsAfterClassApi";
import { ElMessage } from "element-plus";
import evaluteInfoItem from "@/components/evaluteInfoItem.vue";
import { useRouter } from "vue-router";

const emptyLeft = ref(true);

const value1 = ref("");

const tableData = ref([]);

const currentPage2 = ref(1);
const totalNum2 = ref(0);
const currentPage3 = ref(1);
const totalNum3 = ref(0);

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
    `/evaluate-student?$limit=${size}&$skip=${(page - 1) * size}`
  );
  if (data) {
    data.forEach((item) => {
      item.evaluateCount = `${item.totalEvaluateCount}/${item.totalNeedEvaluateCount}`;
      item.classTime = `${item.classOtDesc}(${item.weekDesc})${item.classTimeDesc}`;
    });
    totalNum.value = total;
    tableData.value = data;
  }
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
  const resultData = await getStudentTableData(row.classRecordId);
  studentTableData.value = resultData;
};

const dialogTableVisible = ref(false);
const dialogTitle = ref("学员点评");
const idFlag = ref();
const itemData = ref([]);
const onComment = async ({ studentName, classRecordStudentId, id }) => {
  const res = await getEvaluteDetail(classRecordStudentId);
  console.log(res);
  if (res?.data.length) {
    emptyLeft.value = false;
    itemData.value = res?.data;
  }

  dialogTableVisible.value = true;
  idFlag.value = classRecordStudentId;
  dialogTitle.value = `学员点评 - ${studentName}`;

  // await updateEvaluateCount(id, {

  // })
  // res.total
};

const textarea = ref("");

const commonCommentsTableData = ref([
  // {
  //   title: "123",
  //   content: "内容",
  //   creator: "cbc",
  // },
]);
const dialogTableVisible2 = ref(false);
const commonComments = () => {
  dialogTableVisible2.value = true;
};

const clase = ref("");
const classTableData = ref([]);
const dialogTableVisible3 = ref(false);
const soloValue = ref("");
const chooseClass = async () => {
  dialogTableVisible3.value = true;
  // @ts-ignore
  const { data, total } = await fetchClassData();
  totalNum2.value = total;
  classTableData.value = data;
};

const teacher = ref("");
const dialogTableVisible4 = ref(false);
const teacherTableData = ref([]);
const chooseTeacher = async () => {
  dialogTableVisible4.value = true;
  // @ts-ignore
  const { data, total } = await fetchTeacherData();
  teacherTableData.value = data;
  totalNum3.value = total;
};

const onDblClick = (row) => {
  row.phone
    ? (teacher.value = row.name) && (dialogTableVisible4.value = false)
    : (clase.value = row.className) && (dialogTableVisible3.value = false);
};

const claseName = ref("");
const claseCheck = async () => {
  console.log(claseName.value, soloValue.value);
  // if (soloValue.value) {
  //   const res = await getClaseByCondition("solo", soloValue.value);
  //   classTableData.value = res;
  // } else if (claseName.value) {
  //   const res = await getClaseByCondition("className", claseName.value);
  //   classTableData.value = res;
  // }

  switch (true) {
    case soloValue.value !== "" && claseName.value !== "":
      getClaseByCondition("solo", soloValue.value).then((res) => {
        console.log(res);
        classTableData.value = res?.data.filter(
          (item) => item.className === claseName.value
        );
        // @ts-ignore
        totalNum2.value = classTableData.value.length;
        // filteredRes.length
        //   ? (classTableData.value = filteredRes)
        //   : (classTableData.value = res);
      });
      break;
    case soloValue.value !== "" && claseName.value === "":
      // @ts-ignore
      getClaseByCondition("solo", soloValue.value).then(({ data, total }) => {
        classTableData.value = data;
        totalNum2.value = total;
      });
      break;
    case soloValue.value === "" && claseName.value !== "":
      getClaseByCondition("className", claseName.value).then(
        // @ts-ignore
        ({ data, total }) => {
          classTableData.value = data;
          totalNum2.value = total;
        }
      );
      break;
    default:
      // @ts-ignore
      fetchClassData().then(({ data, total }) => {
        classTableData.value = data;
        totalNum2.value = total;
      });
      break;
  }
};

const teacherInfo = ref("");
const teacherCheck = async () => {
  let condition = isNaN(Number(teacherInfo.value)) ? "name" : "phone";
  //@ts-ignore
  const { data, total } = await getTeacherByCondition(
    condition,
    teacherInfo.value
  );
  teacherTableData.value = data;
  totalNum3.value = total;
};

const onCheck = async () => {
  const condition = {
    className: clase.value,
    teachersDesc: teacher.value,
    classOtDesc: value1.value,
  };
  // @ts-ignore
  const { data, total } = await searchTableData(condition);
  tableData.value = data;
  totalNum.value = total;
};

const reset = async () => {
  await fetchData(currentPage.value, pageSize.value);
  clase.value = "";
  teacher.value = "";
  value1.value = "";
};

const fileList = ref([]);
const onSubmit = async () => {
  const res = await submitEvalute({
    classRecordStudentId: idFlag.value,
    evaluateContent: textarea.value,
    // @ts-ignore
    evaluateMedias: fileList.value.map((item) => item.response.msg).join(","),
    evaluateOt:
      new Date().toLocaleDateString().split("/").join("-") +
      " " +
      new Date().toLocaleTimeString().split(":").slice(0, -1).join(":"),
    evaluateUserName: "7号",
    evaluateUserAvatar: "",
  });
  // console.log(res);
  dialogTableVisible.value = false;
  // @ts-ignore
  if (res?.id) {
    ElMessage({
      showClose: true,
      message: "评论成功",
      type: "success",
    });
  } else {
    ElMessage({
      showClose: true,
      message: "提交失败",
      type: "error",
    });
  }
  textarea.value = "";
  fileList.value = [];


};

const onDeleteClick = async (payload) => {
  if (payload.id) {
    console.log("删除成功");
    const res = await getEvaluteDetail(idFlag.value);
    itemData.value = res?.data;
  }
};

const router = useRouter();
const openCommentStore = () => {
  router.push("/interaction/commentLib");
};

const cancel = () => {
  dialogTableVisible.value = false;
};
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
:deep(.commonComments) {
  .el-dialog__body {
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

:deep(.el-upload:focus) {
  border-color: #000;
  color: #000;
}

.uploadGroup {
  & > div:first-of-type {
    display: flex;
    flex-direction: column-reverse;
    :deep(ul) {
      display: flex;
      li {
        width: 100px;
        height: 100px;
        margin: 0;
        padding: 0;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        label {
          z-index: 9;
        }
        i.el-icon.el-icon--close {
          z-index: 10;
        }
      }
    }
  }

  :deep(.el-upload-list--picture-card) {
    display: block;
    height: auto;
    .el-upload-list__item {
      display: flex;
      width: 100px;
      height: 100px;
    }
    .el-upload-list__item-thumbnail {
      object-fit: cover;
    }
  }
  :deep(.el-upload--picture-card) {
    --el-upload-picture-card-size: 0;
    border: 0;
    border-radius: 0;
    width: 200px;
    // margin-top: 30px;
  }
  :deep(.el-upload) {
    margin-top: 12px;
    justify-content: flex-start;
  }
}

.chooseClass {
  .el-form {
    display: flex;
  }
}

.el-table {
  font-size: 12px;
}
</style>
