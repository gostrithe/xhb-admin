<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="潜在学员" name="first">潜在学员</el-tab-pane>
    <el-tab-pane label="在读学员" name="second">在读学员</el-tab-pane>
    <el-tab-pane label="历史学员" name="third">历史学员</el-tab-pane>
  </el-tabs>
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
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>

  <el-popover placement="right" :width="400" trigger="click">
    <template #reference>
      <el-button style="margin-right: 16px">Click to activate</el-button>
    </template>
    <el-table :data="gridData">
      <el-table-column width="150" property="date" label="date" />
      <el-table-column width="100" property="name" label="name" />
      <el-table-column width="300" property="address" label="address" />
    </el-table>
  </el-popover>

  <el-popover
    :width="300"
    popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
  >
    <template #reference>
      <el-avatar src="https://avatars.githubusercontent.com/u/72015883?v=4" />
    </template>
    <template #default>
      <div
        class="demo-rich-conent"
        style="display: flex; gap: 16px; flex-direction: column"
      >
        <el-avatar
          :size="60"
          src="https://avatars.githubusercontent.com/u/72015883?v=4"
          style="margin-bottom: 8px"
        />
        <div>
          <p
            class="demo-rich-content__name"
            style="margin: 0; font-weight: 500"
          >
            Element Plus
          </p>
        </div>
      </div>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { TabsPaneContext } from "element-plus";

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

const formInline = reactive({
  user: "",
  region: "",
});

const onSubmit = () => {
  console.log("submit!");
};
</script>

<style lang="scss" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
