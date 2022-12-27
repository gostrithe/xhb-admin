<template>
  <el-container class="active-student">
    <el-header height="auto">
      <el-form inline label-width="auto" ref="mainForm">
        <el-form-item label="学员信息">
          <el-input placeholder="学员姓名/手机号码/卡号" style="width: 183px" />
        </el-form-item>
        <el-form-item label="课程状态">
          <el-select placeholder="请选择" class="myselect">
            <el-option label="正常" value="正常" />
            <el-option label="已停课" value="已停课" />
            <el-option label="已结课" value="已结课" />
          </el-select>
        </el-form-item>
        <template v-if="!isFormCollapsed">
          <el-form-item label="在读课程">
            <el-select placeholder="请选择课程">
              <el-option
                v-for="option of 3"
                :key="option"
                :label="option"
                :value="option"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="所在班级">
            <el-input placeholder="请选择班级" @click="pickClass">
              <template #prefix>
                <el-icon><Grid /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="学管师">
            <el-input placeholder="请选择学管师" @click="pickTutor">
              <template #prefix>
                <el-icon><Grid /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="微信状态">
            <el-select placeholder="家长是否绑定了微信">
              <el-option label="已绑定" value="已绑定" />
              <el-option label="未绑定" value="未绑定" />
            </el-select>
          </el-form-item>
          <el-form-item label="学员来源">
            <el-select placeholder="请选择学员来源">
              <el-option
                v-for="option of [
                  '地推活动',
                  '转介绍',
                  '门店到访',
                  '电话邀约',
                  '家长分享',
                  '抖音',
                  '小红书',
                  '三道幕公众号',
                ]"
                :key="option"
                :label="option"
                :value="option"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="家庭住址">
            <el-input placeholder="请输入家庭住址" />
          </el-form-item>
          <el-form-item label="就读学校">
            <el-input placeholder="目前就读的学校名称" />
          </el-form-item>
          <el-form-item label="就读年级">
            <el-select placeholder="目前在读的年级">
              <el-option label="初培" value="初培" />
              <el-option label="复审" value="复审" />
            </el-select>
          </el-form-item>
          <el-form-item label="标签">
            <el-select placeholder="请选择学员标签">
              <el-option
                v-for="option of 3"
                :key="option"
                :label="option"
                :value="option"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input placeholder="学员年龄" />
          </el-form-item>
          <el-form-item label="生日">
            <el-select placeholder="生日">
              <el-option key="今日生日" label="今日生日" value="今日生日" />
              <el-option
                v-for="option of [7, 15, 30, 60]"
                :key="option + '天内生日'"
                :label="option + '天内生日'"
                :value="option + '天内生日'"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="生日月份">
            <el-select placeholder="请选择学员标签">
              <el-option
                v-for="option of '一二三四五六七八九十'"
                :key="option + '月'"
                :label="option + '月'"
                :value="option + '月'"
              />
              <el-option key="十一月" label="十一月" value="十一月" />
              <el-option key="十二月" label="十二月" value="十二月" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否分班">
            <el-select placeholder="请选择">
              <el-option label="否" value="否"></el-option>
              <el-option label="是" value="是"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否排课">
            <el-select placeholder="请选择">
              <el-option label="否" value="否"></el-option>
              <el-option label="是" value="是"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人脸采集">
            <el-select placeholder="请选择">
              <el-option label="否" value="否"></el-option>
              <el-option label="是" value="是"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input placeholder="备注" />
          </el-form-item>
        </template>
        <el-form-item>
          <el-button>重置</el-button>
          <el-button type="primary">查询</el-button>
          <el-button
            link
            type="primary"
            @click="isFormCollapsed = !isFormCollapsed"
            >{{ isFormCollapsed ? "更多搜索" : "收起搜索" }}</el-button
          >
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-space>
        <el-button>刷卡招学员</el-button>
        <el-button>分配学管师</el-button>
        <el-button>导入学员课程</el-button>
      </el-space>
      <TableComp :tableData="tableData1" />
    </el-main>
  </el-container>

  <el-dialog v-model="isClassDialogOpen" title="请选择学管师">
    <el-form inline>
      <el-form-item label="班级名称">
        <el-input palceholder="请输入班级名称" />
      </el-form-item>
      <el-form-item label="类型">
        <el-select placeholder="请选择">
          <el-option label="一对一" value="一对一" />
          <el-option label="一对多" value="一对多" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <TableComp :tableData="tableData1" />
  </el-dialog>
  <el-dialog v-model="isTutorDialogOpen" title="请选择学管师">
    <el-form inline>
      <el-form-item label="员工信息">
        <el-input palceholder="姓名/手机号码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-alert title="双击确定所选择的数据" type="info" show-icon />
    <TableComp :tableData="tableData1" />
  </el-dialog>
</template>

<script lang="ts">
import TableComp from "components/TableComp.vue";
import { defineComponent } from "vue";
import { Grid } from "@element-plus/icons-vue";

export default defineComponent({
  name: "activeStudent",
  data() {
    return {
      isClassDialogOpen: false,
      isTutorDialogOpen: false,
      isFormCollapsed: true,
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
    Grid,
  },
  methods: {
    pickClass() {
      this.isClassDialogOpen = true;
    },
    pickTutor() {
      this.isTutorDialogOpen = true;
    },
  },
});
</script>

<style lang="scss" scoped></style>
