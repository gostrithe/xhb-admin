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
            {{ store.state.currentPage }}
          </span>
        </template>
        <template #extra>
          <el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`">
            <el-icon @click="handleFullScreen">
              <FullScreen v-if="!fullscreen" />
              <Fold v-else />
            </el-icon>
          </el-tooltip>
        </template>
      </el-page-header>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { Expand, Fold, FullScreen } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";

const store = useStore();
const router = useRouter();

const fullscreen = ref(false);

const handleCollapse = () => store.commit("setCollapse");

const goback = () => {
  store.commit("setCurrentPage", router.currentRoute.value.fullPath);
  router.go(-1);
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
