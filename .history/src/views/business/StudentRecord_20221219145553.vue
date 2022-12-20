<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="潜在学员" name="first">潜在学员</el-tab-pane>
    <el-tab-pane label="在读学员" name="second">在读学员</el-tab-pane>
    <el-tab-pane label="历史学员" name="third">历史学员</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { TabsPaneContext } from ‘;

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
