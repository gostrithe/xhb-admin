<template>
  <div class="tabs">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="pane of props.tabPane"
        :key="pane.label + pane.name"
        :label="pane.label"
        :name="pane.name"
      >
        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="main">
          <slot name="main"></slot>
        </div>git
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";
import type { TabsPaneContext } from "element-plus";

interface TabPane {
  label: string;
  name: string;
}

const activeName = ref("1");
const props = defineProps({
  tabPane: {
    type: Array<TabPane>,
    default() {
      return [{ label: "first", name: "1" }];
    },
  },
});
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<style scoped lang="scss">
.el-tabs {
  padding: 20px;
  background-color: #fff;
}
</style>
