<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="潜在学员" name="first">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学员信息">
          <el-input
            v-model="formInline.user"
            placeholder="学员信息/手机号码/卡号"
          />
        </el-form-item>
        <el-form-item label="更进状态">
          <el-select
            v-model="formInline.region"
            placeholder="请选择跟进状态"
            clearable
          >
            <el-option label="待跟进" value="待跟进" />
            <el-option label="跟进中" value="跟进中" />
            <el-option label="已约课" value="已约课" />
            <el-option label="已体验" value="已体验" />
            <el-option label="已失效" value="已失效" />
          </el-select>
        </el-form-item>
        <el-form-item label="跟进人">
          <el-input
            v-model="formInline.followPerson"
            placeholder="请选择更跟进人"
            :prefix-icon="Grid"
            @click="dialogTableVisible = true"
          >
          </el-input>
          <el-dialog v-model="dialogTableVisible" title="请选择跟进人">
            <el-form-item label="员工信息">
              <el-input
                v-model="formInline.user"
                placeholder="姓名/手机号码"
                clearable
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-alert
              title="双击确定所选择选的数据"
              type="info"
              show-icon
              class="alertColor"
            />
            <el-table :data="Employee_Information">
              <el-table-column
                property="Staff_nameMobile"
                label="员工名称"
                width="150"
              />
              <el-table-column
                property="phone_number"
                label="手机号码"
                width="200"
              />
              <el-table-column property="Whether_to_teachs" label="是否授课" />
              <el-table-column property="role" label="角色" />
              <el-table-column property="note" label="备注" />
            </el-table>
            <el-pagination
              background
              layout="total,prev, pager, next, jumper"
              :total="1000"
              class="pagination"
            />
          </el-dialog>
        </el-form-item>
        <el-form-item label="学生来源">
          <el-select
            v-model="formInline.region"
            placeholder="电话邀约"
            clearable
          >
            <el-option label="待跟进" value="待跟进" />
            <el-option label="跟进中" value="跟进中" />
            <el-option label="已约课" value="已约课" />
            <el-option label="已体验" value="已体验" />
            <el-option label="已失效" value="已失效" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="在读学员" name="second">在读学员</el-tab-pane>
    <el-tab-pane label="历史学员" name="third">历史学员</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { TabsPaneContext } from "element-plus";
import { Grid } from "@element-plus/icons-vue";

const activeName = ref("first");
const dialogTableVisible = ref(false);

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

const formInline = reactive({
  user: "",
  region: "",
  followPerson: "",
});

const onSubmit = () => {
  console.log("submit!");
};

const Employee_Information = [
  {
    user
    Staff_nameMobile: "芭莎",
    phone_number: "15900824880",
    Whether_to_teachs: "是",
    role: "是",
    note: "是",
  },
];
</script>

<style lang="scss" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32.0025px;
  color: #6b778c;
  font-size: 32.0025px;
  font-weight: 600;
}
.alertColor {
  background-color: var(--el-bg-color);
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: right;
}
</style>
