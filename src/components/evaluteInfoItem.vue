<template>
  <el-scrollbar height="500px">
    <ul style="max-height: 500px; width: 90%; list-style: none">
      <li
        v-for="item in data"
        :key="item.id"
        style="
          margin-bottom: 10px;
          padding: 6px;
          border: 1px dashed #e6ebf5;
          border-radius: 4px;
        "
      >
        <div class="publisher">
          <div class="left">
            <img
              src="https://pxboss.xiaohebang.cn/system/material/pc/etms-image/avatarDefault.png"
            />
          </div>
          <div class="right">
            <p style="color: rgb(144, 147, 153)">{{ item.evaluateUserName }}</p>
            <p style="font-size: 12px; color: rgb(144, 147, 153)">
              {{ item.evaluateOt }}
            </p>
          </div>
          <div
            class="del"
            @click="onItemDelete(item.id)"
            style="cursor: pointer"
          >
            <el-icon><Delete /></el-icon>
          </div>
        </div>
        <div class="content">
          <div class="sentence">{{ item.evaluateContent }}</div>
          <div class="media" v-if="item.evaluateMedias">
            <img
              v-for="(src, index) in item.evaluateMedias.split(',')"
              :key="index"
              :src="src"
            />
          </div>
        </div>
      </li>
    </ul>
  </el-scrollbar>
</template>

<script lang="ts">
import { deleteEvaluteItem } from "@/api/commentsAfterClassApi";

export default {
  props: ["data"],
  emits: ["onDelete"],
  methods: {
    async onItemDelete(id) {
      const res = await deleteEvaluteItem(id);
      console.log(res);
      this.$emit("onDelete", res);
    },
  },
};
</script>

<style lang="scss" scoped>
.publisher {
  display: flex;
  position: relative;
  height: 40px;
  img {
    width: 40px;
    height: 40px;
  }
  .right {
    padding-left: 10px;
    p {
      margin: 0;
    }
  }
  .del {
    position: absolute;
    top: 0;
    right: 0;
  }
}
.content {
  padding: 0 0 10px 50px;
  margin-top: 10px;
  .media {
    margin-top: 6px;
    display: flex;
    img {
      width: 100px;
      height: 100px;
      margin-right: 6px;
    }
  }
}
</style>
