<template>
  <el-container>
    <el-aside width="auto">
      <!-- 侧边菜单栏 -->
      <AsideComp />
    </el-aside>
    <el-container>
      <el-header>
        <!-- 头部导航栏 -->
        <HeaderComp />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import HeaderComp from "./HeaderComp.vue";
import AsideComp from "./AsideComp.vue";
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #fff;
  padding: 0;
}
.el-aside {
<<<<<<< HEAD
  background-color: rgb(48, 65, 86);
}
.el-main {
  height: calc(100vh - 70px);
  background-color: #f4f4f5;
  overflow-y: auto;
=======
  background-color: #606266;
}
.el-main {
  background-color: #f4f4f;
>>>>>>> feature-Business_center
}
</style>
