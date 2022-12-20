<template>
  <TabsComp :tabPane="tabPane">
    <template #main>
      <TableComp v-if="tabPane" :tableData="tableData"> </TableComp>
    </template>
  </TabsComp>
</template>

<script lang="ts" setup>
import TabsComp from "@/components/TabsComp.vue";
import TableComp from "@/components/TableComp.vue";
const tabPane = [
  { label: "在读学员", name: "1" },
  { label: "学员课程", name: "2" },
  { label: "请假申请", name: "3" },
  { label: "试听申请", name: "4" },
];
const tableData = [
  { label: "在读学员", name: "1" },
  { label: "学员课程", name: "2" },
  { label: "请假申请", name: "3" },
  { label: "试听申请", name: "4" },
];
</script>

<style lang="scss" scoped></style>
