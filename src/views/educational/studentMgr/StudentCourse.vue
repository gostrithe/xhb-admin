<template>
  <el-container class="student-course">
    <el-header height="auto">
      <el-form inline label-width="auto">
        <el-form-item label="学员信息">
          <el-input placeholder="学员姓名/手机号码" />
        </el-form-item>
        <el-form-item label="报读课程">
          <el-select placeholder="请选择课程">
            <el-option
              v-for="option of 3"
              :key="option"
              :label="option"
              :value="option"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select placeholder="请选择">
            <el-option
              v-for="option of 3"
              :key="option"
              :label="option"
              :value="option"
            />
          </el-select>
        </el-form-item>
        <template v-if="!isFormCollapse">
          <el-form-item label="所在班级">
            <el-input placeholder="请选择班级" />
          </el-form-item>
          <el-form-item label="上课老师">
            <el-input placeholder="请选择上课老师" />
          </el-form-item>
          <el-form-item label="剩余课时">
            <el-input placeholder="最大值" />~
            <el-input placeholder="最小值" />
          </el-form-item>
          <el-form-item label="有效期天数">
            <el-input placeholder="最大值" />~
            <el-input placeholder="最小值" />
          </el-form-item>
          <el-form-item label="超上课时">
            <el-select placeholder="请选择">
              <el-option label="否" value="否"></el-option>
              <el-option label="是" value="是"></el-option>
            </el-select>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button>重置</el-button>
          <el-button type="primary">查询</el-button>
          <el-button
            link
            type="primary"
            @click="isFormCollapse = !isFormCollapse"
            >{{ isFormCollapse ? "更多搜索" : "收起搜索" }}</el-button
          >
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <div>
        <el-button>批量延期</el-button>
      </div>
      <TableComp :tableData="tableData1" />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import TableComp from "components/TableComp.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "studentCourse",
  data() {
    return {
      isFormCollapse: true,
      tableData1: [
        { label: "在读学员", name: "1" },
        { label: "学员课程", name: "2" },
        { label: "请假申请", name: "3" },
        { label: "试听申请", name: "4" },
      ],
    };
  },
  components: {
    TableComp,
  },
});
</script>

<style lang="scss" scoped></style>
