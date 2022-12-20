<template>
  <TabsComp :tabPane="tabPane">
    <template #default="fromTabs">
      <ActiveStudent v-if="fromTabs.status === '1'" />
      <StudentCourse v-if="fromTabs.status === '2'" />
      <AbsenceStudent v-if="fromTabs.status === '3'" />
      <AuditionStudent v-if="fromTabs.status === '4'" />
    </template>
  </TabsComp>
</template>

<script lang="ts" setup>
import TabsComp from "components/TabsComp.vue";
import ActiveStudent from "components/educational/studentMgr/ActiveStudent.vue";
import StudentCourse from "components/educational/studentMgr/StudentCourse.vue";
import AbsenceStudent from "components/educational/studentMgr/AbsenceStudent.vue";
import AuditionStudent from "components/educational/studentMgr/AuditionStudent.vue";

const tabPane = [
  { label: "在读学员", name: "1" },
  { label: "学员课程", name: "2" },
  { label: "请假申请", name: "3" },
  { label: "试听申请", name: "4" },
];
</script>

<style lang="scss" scoped></style>
