<template>
  <TabsComp :tabPane="tabPane">
    <template #default="fromTabs">
      <OneToOne v-if="fromTabs.status === '1'" />
      <OneToMany v-if="fromTabs.status === '2'" />
    </template>
  </TabsComp>
</template>

<script lang="ts" setup>
import TabsComp from "components/TabsComp.vue";
import OneToOne from "./OneToOne.vue";
import OneToMany from "./OneToMany.vue";

const tabPane = [
  { label: "一对一", name: "1" },
  { label: "一对多", name: "2" },
];
</script>

<style lang="scss" scoped></style>
