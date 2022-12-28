<template>
  <el-tabs class="tabs">
    <el-tab-pane label="老师评语库">
      <el-form style="display: flex">
        <el-form-item label="评语">
          <el-input
            v-model="commentSentence"
            clearable
            @click="chooseComment"
            placeholder="请输入评语标题/内容"
            style="width: 200px; font-size: 12px"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input
            v-model="creator"
            @click="chooseCreator"
            clearable
            placeholder="请选择创建人"
            style="width: 200px; font-size: 12px"
          >
            <template #prefix>
              <el-icon><Grid /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button disabled @click="reset">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button disabled @click="onCheck" type="primary">查询</el-button>
        </el-form-item>
      </el-form>

      <el-button @click="addComment" style="margin-bottom: 6px; font-size: 12px"
        >添加评语</el-button
      >

      <el-dialog v-model="showDialog" width="36%" class="pydialog">
        <template #header>
          <div>添加评语</div>
        </template>
        <template #default>
          <el-form :model="ruleForm" ref="formEl" :rules="rules">
            <el-form-item label="评语标题" prop="title">
              <el-input
                v-model="ruleForm.title"
                placeholder="请输入评语标题"
              ></el-input>
            </el-form-item>
            <el-form-item label="评语内容" prop="content">
              <el-input
                v-model="ruleForm.content"
                type="textarea"
                :rows="4"
                maxlength="500"
                placeholder="请输入评语内容(500字以内)"
              ></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div>
            <el-button @click="onCancel">取消</el-button>
            <el-button @click="onSave" type="primary">保存</el-button>
          </div>
        </template>
      </el-dialog>

      <el-table
        :data="tableData2"
        border
        stripe
        style="font-size: 12px; width: 100%"
      >
        <el-table-column prop="title" label="评语标题" />
        <el-table-column prop="content" label="评语内容" />
        <el-table-column prop="creator" label="创建人" />
        <el-table-column label="操作" align="center" width="120px">
          <template #default="{ row }">
            <span style="color: #1890ff; cursor: pointer" @click="edit(row)"
              >编辑(×)</span
            >
            <span style="margin: 0 8px">|</span>
            <span style="color: #1890ff; cursor: pointer" @click="delt(row)"
              >删除</span
            >
          </template>
        </el-table-column>
      </el-table>

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
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import {
  delCommentSentence,
  getCommentSentence,
  addCommentSentence,
} from "@/api/commentsAfterClassApi";
import { ElMessage, ElMessageBox } from "element-plus";

const commentSentence = ref("");
const creator = ref("");
const tableData2 = ref([]);
const currentPage = ref(1);
const pageSize = ref(20);
const totalNum = ref(0);
const showDialog = ref(false);

const chooseComment = () => {};
const chooseCreator = () => {};
const reset = () => {};
const onCheck = () => {};
const addComment = () => {
  showDialog.value = true;
};
const edit = (row) => {};
const delt = async (row) => {
  ElMessageBox.confirm(`确定删除此评语-${row.title}?`, "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    const res = await delCommentSentence(row.id);
    console.log(res);
    // @ts-ignore
    const { data, total } = await getCommentSentence();
    tableData2.value = data;
    totalNum.value = total;
  });
};

const ruleForm = reactive({
  title: "",
  content: "",
});

const rules = reactive({
  title: [
    {
      required: true,
      message: "请输入评语标题",
      trigger: "blur",
    },
  ],
  content: [{ trigger: "blur", required: true, message: "请输入评语内容" }],
});

const formEl = ref();
const onCancel = () => {
  formEl.value.resetFields();
  showDialog.value = false;
};

onMounted(async () => {
  // @ts-ignore
  const { data, total } = await getCommentSentence();
  tableData2.value = data;
  totalNum.value = total;
});

const onSave = async () => {
  const res = await addCommentSentence({
    creator: "7号",
    title: ruleForm.title,
    content: ruleForm.content,
  });
  formEl.value.resetFields();
  showDialog.value = false;
  // @ts-ignore
  if (res.id) {
    ElMessage({
      showClose: true,
      message: "保存成功",
      type: "success",
    });
    // @ts-ignore
    const { data, total } = await getCommentSentence();
    tableData2.value = data;
    totalNum.value = total;
  } else {
    ElMessage({
      showClose: true,
      message: "保存失败",
      type: "error",
    });
  }
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
:deep(.pydialog) {
  .el-dialog__body {
    border-bottom: 1px solid #e8e8e8;
    border-top: 1px solid #e8e8e8;
  }
}
</style>
