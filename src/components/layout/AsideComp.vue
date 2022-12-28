<template>
  <el-menu router unique-opened :collapse="store.state.isCollapse">
    <template v-for="item in menu">
      <el-menu-item v-if="!item.children" :index="item.path" :key="item.path">
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu v-else :index="item.path" :key="item.key">
        <template #title>{{ item.label }}</template>
        <el-menu-item
          v-for="sub in item.children"
          :index="sub.path"
          :key="sub.path"
        >
          {{ sub.label }}
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import menu from "@/menu";
import { useStore } from "vuex";

const store = useStore();
</script>

<style lang="scss"></style>
