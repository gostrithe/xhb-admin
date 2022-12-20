<template>
  <div class="home">
    首页
    <el-date-picker
      type="date"
      placeholder="Pick a day"
      :disabled-date="isDateDisable"
    />
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";

const isDateDisable = (value: Date) =>
  dayjs(value).isBefore(dayjs().startOf("date"));
</script>
