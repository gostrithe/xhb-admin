<template>
  <el-row>
    <el-col class="collapse-col" :span="2" @click="handleCollapse">
      <el-button v-if="store.state.isCollapse" :icon="Expand" text />
      <el-button v-else :icon="Fold" text />
    </el-col>
    <el-col :span="22">
      <el-page-header @back="goback">
        <template #title>返回</template>
        <template #content>
          <span :style="{ fontSize: '16px' }">
            {{ getCurrentPage }}
          </span>
        </template>
        <template #extra>
          <el-space>
            <el-tooltip
              effect="dark"
              :content="fullscreen ? `取消全屏` : `全屏`"
            >
              <el-icon @click="handleFullScreen">
                <FullScreen v-if="!fullscreen" />
                <Fold v-else />
              </el-icon>
            </el-tooltip>
            <el-dropdown trigger="click" @command="handleCommand">
              <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="userCenter"
                    >个人账号</el-dropdown-item
                  >
                  <el-dropdown-item command="doLogout"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-space>
        </template>
      </el-page-header>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { Expand, Fold, FullScreen } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import flatMenu from "@/menu/flatMenu";

const store = useStore();
const router = useRouter();
const fullscreen = ref(false);

const handleCollapse = () => store.commit("setCollapse");

const goback = () => router.go(-1);

const getCurrentPage = computed(() => {
  const currentPage = flatMenu.find(
    (item) => item.path === router.currentRoute.value.fullPath
  );
  return currentPage ? currentPage.label : "首页";
});

const handleCommand = (command: string | number | object) => {
  // console.log(command);
  if (command === "doLogout") {
    window.location.href = "/login";
    localStorage.clear();
  }
};

const handleFullScreen = () => {
  let element = document.documentElement;
  fullscreen.value ? document.exitFullscreen() : element.requestFullscreen();
  fullscreen.value = !fullscreen.value;
};
</script>

<style lang="scss">
.el-row {
  height: 100%;
  align-items: center;
}

.collapse-col {
  height: 100%;

  .el-button {
    height: 100%;
    font-size: 20px;
  }
}
</style>
