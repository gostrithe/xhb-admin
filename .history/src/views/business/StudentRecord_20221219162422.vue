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
  <el-dialog v-model="dialogFormVisible">
    <el-form>
      <el-form-item label="">
        <el-input
          v-model="formInline.user"
          placeholder="学员信息/手机号码/卡号"
        />
      </el-form-item>
    </el-form>
  </el-dialog>
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

const dialogFormVisible = ref(false);
</script>

<style lang="scss" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
