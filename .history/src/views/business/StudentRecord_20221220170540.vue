<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="潜在学员" name="first">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学员信息">
          <el-input
            v-model="formInline.user"
            placeholder="学员信息/手机号码/卡号"
          />
        </el-form-item>
        <el-form-item label="更进状态">
          <el-select
            v-model="formInline.region"
            placeholder="请选择跟进状态"
            clearable
          >
            <el-option label="待跟进" value="待跟进" />
            <el-option label="跟进中" value="跟进中" />
            <el-option label="已约课" value="已约课" />
            <el-option label="已体验" value="已体验" />
            <el-option label="已失效" value="已失效" />
          </el-select>
        </el-form-item>
        <el-form-item label="跟进人">
          <el-input
            v-model="employee.followPerson"
            placeholder="请选择更跟进人"
            :prefix-icon="Grid"
            @click="dialogTableVisible = true"
          >
          </el-input>
          <el-dialog v-model="dialogTableVisible" title="请选择跟进人">
            <el-form-item label="员工信息">
              <el-input
                v-model="employee.user"
                placeholder="姓名/手机号码"
                clearable
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-alert
              title="双击确定所选择选的数据"
              type="info"
              show-icon
              class="alertColor"
            />
            <el-table :data="Employee_Information">
              <el-table-column
                property="Staff_nameMobile"
                label="员工名称"
                width="150"
              />
              <el-table-column
                property="phone_number"
                label="手机号码"
                width="200"
              />
              <el-table-column property="Whether_to_teachs" label="是否授课" />
              <el-table-column property="role" label="角色" />
              <el-table-column property="note" label="备注" />
            </el-table>
            <el-pagination
              background
              layout="total,prev, pager, next, jumper"
              :total="1000"
              class="pagination"
            />
          </el-dialog>
        </el-form-item>
        <el-form-item label="学生来源">
          <el-select
            v-model="student.source"
            placeholder="请选择学员来源"
            clearable
          >
            <el-option label="地推活动" value="地推活动" />
            <el-option label="转介绍" value="转介绍" />
            <el-option label="门店到访" value="门店到访" />
            <el-option label="电话邀约" value="电话邀约" />
            <el-option label="家长分享" value="家长分享" />
            <el-option label="抖音" value="抖音" />
            <el-option label="小红书" value="小红书" />
            <el-option label="三道幕公众号" value="三道幕公众号" />
          </el-select>
        </el-form-item>
        <el-form-item label="意向级别">
          <el-select
            v-model="intention.form"
            placeholder="请选择意向级别"
            clearable
          >
            <el-option label="低" value="低" />
            <el-option label="中" value="中" />
            <el-option label="高" value="高" />
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-select
            v-model="tag"
            multiple
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="请选择学员标签"
          >
            <el-option
              v-for="item in options"
              :key="item.tag"
              :label="item.label"
              :value="item.tag"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="生日">
          <el-select v-model="birthday.day" placeholder="生日" clearable>
            <el-option label="今日生日" value="今日生日" />
            <el-option label="7天内生日" value="7天内生日" />
            <el-option label="15天内生日" value="15天内生日" />
            <el-option label="30天内生日高" value="30天内生日" />
            <el-option label="60天内生日" value="60天内生日" />
          </el-select>
        </el-form-item>
        <el-form-item label="生日月份">
          <el-select v-model="birthday.month" placeholder="生日月份" clearable>
            <el-option label="一月" value="一月" />
            <el-option label="二月" value="二月" />
            <el-option label="三月" value="三月" />
            <el-option label="四月" value="四月" />
            <el-option label="五月" value="五月" />
            <el-option label="六月" value="六月" />
            <el-option label="七月" value="七月" />
            <el-option label="八月" value="八月" />
            <el-option label="九月" value="九月" />
            <el-option label="十月" value="十月" />
            <el-option label="十一月" value="十一月" />
            <el-option label="十二月" value="十二月" />
          </el-select>
        </el-form-item>
        <el-form-item label="添加日期">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="remark" placeholder="备注" size="small"/>
        </el-form-item>
        <el-form-item>
          <el-button>重置</el-button>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="在读学员" name="second">在读学员</el-tab-pane>
    <el-tab-pane label="历史学员" name="third">历史学员</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { TabsPaneContext } from "element-plus";
import { Grid } from "@element-plus/icons-vue";

const activeName = ref("first");
const dialogTableVisible = ref(false);

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

const formInline = reactive({
  user: "",
  region: "",
});

const onSubmit = () => {
  console.log("submit!");
};

const employee = reactive({
  user: "",
  followPerson: "",
});

const Employee_Information = [
  {
    user: "",
    Staff_nameMobile: "芭莎",
    phone_number: "15900824880",
    Whether_to_teachs: "是",
    role: "是",
    note: "是",
  },
];

const student = reactive({
  source: "",
});

const intention = reactive({
  form: "",
});

const tag = ref<string[]>([]);
const options = [
  {
    tag: "企业年卡",
    label: "企业年卡",
  },
  {
    tag: "企业次卡",
    label: "企业次卡",
  },
  {
    tag: "次卡会员",
    label: "次卡会员",
  },
  {
    tag: "年卡会员",
    label: "年卡会员",
  },
  {
    tag: "散客",
    label: "散客",
  },
];

const birthday = reactive({
  day: "",
  month: "",
  remark: "",
});
</script>

<style lang="scss" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32.0025px;
  color: #6b778c;
  font-size: 32.0025px;
  font-weight: 600;
}
.alertColor {
  background-color: var(--el-bg-color);
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: right;
}
</style>
