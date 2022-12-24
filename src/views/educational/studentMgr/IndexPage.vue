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

<script lang="ts">
import TabsComp from "components/TabsComp.vue";
import ActiveStudent from "./ActiveStudent.vue";
import StudentCourse from "./StudentCourse.vue";
import AbsenceStudent from "./AbsenceStudent.vue";
import AuditionStudent from "./AuditionStudent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "StudentMgr",
  data() {
    return {
      tabPane: [
        { label: "在读学员", name: "1" },
        { label: "学员课程", name: "2" },
        { label: "请假申请", name: "3" },
        { label: "试听申请", name: "4" },
      ],
    };
  },
  components: {
    TabsComp,
    ActiveStudent,
    StudentCourse,
    AbsenceStudent,
    AuditionStudent,
  },
});
</script>

<style lang="scss" scoped></style>
