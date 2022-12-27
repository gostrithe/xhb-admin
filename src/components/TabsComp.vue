<template>
  <div class="tabs">
    <el-tabs v-model="activeName">
      <el-tab-pane
        v-for="pane of props.tabPane"
        :key="pane.name"
        :label="pane.label"
        :name="pane.name"
      >
        <slot :status="activeName"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";

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
</script>

<style scoped lang="scss">
.el-tabs {
  padding: 20px;
  background-color: #fff;
}
</style>
