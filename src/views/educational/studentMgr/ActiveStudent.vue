<template>
  <el-container class="active-student">
    <el-header height="auto">
      <el-form
        inline
        label-width="auto"
        :model="mainForm"
        ref="mainFormRef"
        class="demo-form-inline"
      >
        <el-form-item label="学员信息" prop="sname">
          <el-input
            v-model="mainForm.sname"
            placeholder="学员姓名/手机号码/卡号"
            style="width: 183px"
          />
        </el-form-item>
        <el-form-item label="课程状态" prop="sstatus">
          <el-select v-model="mainForm.sstatus" placeholder="请选择">
            <el-option label="正常" value="正常" />
            <el-option label="已停课" value="已停课" />
            <el-option label="已结课" value="已结课" />
          </el-select>
        </el-form-item>
        <template v-if="!isFormCollapsed">
          <el-form-item label="在读课程" prop="scourse">
            <el-select v-model="mainForm.scourse" placeholder="请选择课程">
              <el-option
                v-for="option of 3"
                :key="option"
                :label="option"
                :value="option"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="所在班级" prop="sclass">
            <el-input
              v-model="mainForm.sclass"
              placeholder="请选择班级"
              @click="pickClass"
            >
              <template #prefix>
                <el-icon><Grid /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="学管师" prop="stutor">
            <el-input
              v-model="mainForm.stutor"
              placeholder="请选择学管师"
              @click="pickTutor"
            >
              <template #prefix>
                <el-icon><Grid /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="微信状态" prop="swx">
            <el-select v-model="mainForm.swx" placeholder="家长是否绑定了微信">
              <el-option label="已绑定" value="已绑定" />
              <el-option label="未绑定" value="未绑定" />
            </el-select>
          </el-form-item>
          <el-form-item label="学员来源" prop="ssourse">
            <el-select v-model="mainForm.ssourse" placeholder="请选择学员来源">
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
          <el-form-item label="家庭住址" prop="sadress">
            <el-input v-model="mainForm.sadress" placeholder="请输入家庭住址" />
          </el-form-item>
          <el-form-item label="就读学校" prop="sschool">
            <el-input
              v-model="mainForm.sschool"
              placeholder="目前就读的学校名称"
            />
          </el-form-item>
          <el-form-item label="就读年级" prop="sgrade">
            <el-select v-model="mainForm.sgrade" placeholder="目前在读的年级">
              <el-option label="初培" value="初培" />
              <el-option label="复审" value="复审" />
            </el-select>
          </el-form-item>
          <el-form-item label="标签" prop="slabel">
            <el-select v-model="mainForm.slabel" placeholder="请选择学员标签">
              <el-option
                v-for="option of 3"
                :key="option"
                :label="option"
                :value="option"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="年龄" prop="sage">
            <el-input v-model="mainForm.sage" placeholder="学员年龄" />
          </el-form-item>
          <el-form-item label="生日" prop="sbirthday">
            <el-select v-model="mainForm.sbirthday" placeholder="生日">
              <el-option key="今日生日" label="今日生日" value="今日生日" />
              <el-option
                v-for="option of [7, 15, 30, 60]"
                :key="option + '天内生日'"
                :label="option + '天内生日'"
                :value="option + '天内生日'"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="生日月份" prop="smonth">
            <el-select v-model="mainForm.smonth" placeholder="请选择生日月份">
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
          <el-form-item label="是否分班" prop="sdivide">
            <el-select v-model="mainForm.sdivide" placeholder="请选择">
              <el-option label="否" value="否"></el-option>
              <el-option label="是" value="是"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否排课" prop="sarrange">
            <el-select v-model="mainForm.sarrange" placeholder="请选择">
              <el-option label="否" value="否"></el-option>
              <el-option label="是" value="是"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人脸采集" prop="sface">
            <el-select v-model="mainForm.sface" placeholder="请选择">
              <el-option label="否" value="否"></el-option>
              <el-option label="是" value="是"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="sremarks">
            <el-input v-model="mainForm.sremarks" placeholder="备注" />
          </el-form-item>
        </template>
        <el-form-item>
          <el-button @click="doReset('mainFormRef')">重置</el-button>
          <el-button type="primary" @click="doQuery">查询</el-button>
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
        <el-button @click="isAddDrawerOpen = true" type="primary"
          ><el-icon><EditPen /></el-icon>新增在读学员</el-button
        >
      </el-space>
      <TableComp :tableData="tableData" :tableColumn="tableColumn">
        <template #selection>
          <el-table-column type="selection" width="55" />
        </template>
        <template #operation>
          <el-table-column width="120" fixed="right" label="操作">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
                >修改</el-button
              >
              <el-popconfirm
                title="确认要删除吗?"
                confirm-button-text="删除"
                cancel-button-text="取消"
                @confirm="handleDelete(scope.$index, scope.row)"
              >
                <template #reference>
                  <el-button link type="primary" size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </template>
      </TableComp>
    </el-main>
  </el-container>

  <el-dialog v-model="isClassDialogOpen" title="请选择班级">
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
    <el-alert title="双击确定所选择的数据" type="info" show-icon />
    <TableComp
      :tableData="classes"
      :tableColumn="classColumn"
      @getClass="getClass"
    />
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
    <TableComp :tableData="teacher" :tableColumn="teacherColumn" />
  </el-dialog>
  <el-drawer v-model="isAddDrawerOpen" title="添加在读学员">
    <AddActiveStudent @afterAdd="afterAdd" status="add"></AddActiveStudent>
  </el-drawer>
  <el-drawer v-model="isEditDrawerOpen" title="修改在读学员">
    <AddActiveStudent
      @afterEdit="afterEdit"
      status="edit"
      :editForm="editForm"
    ></AddActiveStudent>
  </el-drawer>
</template>

<script lang="ts">
import TableComp from "components/TableComp.vue";
import AddActiveStudent from "@/components/AddActiveStudent.vue";
import { defineComponent } from "vue";
import { ElNotification } from "element-plus";
import { Grid, EditPen } from "@element-plus/icons-vue";
import {
  getActiveStudent,
  getAllClass,
  getAllTeacher,
  deleteActiveStudent,
} from "@/api/https";

export default defineComponent({
  name: "activeStudent",
  data() {
    return {
      isEditDrawerOpen: false,
      isAddDrawerOpen: false,
      isClassDialogOpen: false,
      isTutorDialogOpen: false,
      isFormCollapsed: true,
      tableColumn: [
        { label: "学员姓名", prop: "sname" },
        { label: "手机号码", prop: "sphone" },
        { label: "考勤卡", prop: "stimecard" },
        { label: "人脸", prop: "sface" },
        { label: "学员码", prop: "scode" },
        { label: "年龄", prop: "sage" },
        { label: "生日", prop: "sbirthday" },
        { label: "可用积分", prop: "spoints" },
        { label: "学管师", prop: "stutor" },
        { label: "课程状态", prop: "sstatus" },
        { label: "在读课程", prop: "scourse" },
        { label: "所在班级", prop: "sclass" },
        { label: "标签", prop: "slabel" },
        { label: "就读学校", prop: "sschool" },
        { label: "就读年级", prop: "sgrade" },
        { label: "通讯地址", prop: "sadress" },
        { label: "备注", prop: "sremarks" },
      ],
      classColumn: [
        { label: "类型", prop: "solo" },
        { label: "班级名称", prop: "className" },
        { label: "班级类型", prop: "classKind" },
        { label: "关联课程", prop: "lessons" },
        { label: "班级老师", prop: "teachers" },
        { label: "上课教室", prop: "classroom" },
      ],
      teacherColumn: [
        { label: "员工名称", prop: "employeeNme" },
        { label: "手机号码", prop: "phone" },
        { label: "是否授课", prop: "Whether_to_teachs" },
        { label: "角色", prop: "role" },
        { label: "备注", prop: "note" },
      ],
      tableData: [],
      classes: [],
      teacher: [],
      mainForm: {
        sname: "",
        sstatus: "",
        scourse: "",
        sclass: "",
        stutor: "",
        swx: "",
        ssourse: "",
        sadress: "",
        sschool: "",
        sgrade: "",
        slabel: "",
        sage: "",
        sbirthday: "",
        smonth: "",
        sdivide: "",
        sarrange: "",
        sface: "",
        sremarks: "",
      },
      editForm: {},
      editId: "",
    };
  },
  components: {
    TableComp,
    AddActiveStudent,
    Grid,
    EditPen,
  },
  methods: {
    getStudent(data) {
      getActiveStudent(data).then((res) => {
        // console.log(res);
        this.tableData = res.data.data;
      });
    },
    pickClass() {
      this.isClassDialogOpen = true;
    },
    pickTutor() {
      this.isTutorDialogOpen = true;
    },
    doReset(formName: string) {
      // console.log(formName, this.$refs[formName]);
      this.$refs[formName].resetFields();
    },
    doQuery() {
      // console.log("mainform", this.mainForm);
      const data = Object.fromEntries(
        Object.entries(this.mainForm).filter((i) => i[1] !== "")
      );
      // console.log("data", data);
      this.getStudent(data);
    },
    getClass() {},
    handleEdit(index, record) {
      console.log("handleEdit", index, record);
      this.isEditDrawerOpen = true;
      this.editForm = record;
    },
    handleDelete(index, record) {
      // console.log("handleDelete", index, record);
      deleteActiveStudent(record.id).then(() => {
        this.getStudent({});
        ElNotification({
          message: "删除成功",
          duration: 0,
        });
      });
    },
    afterAdd(status) {
      this.isAddDrawerOpen = status;
      this.getStudent({});
    },
    afterEdit(status) {
      this.isEditDrawerOpen = status;
      this.getStudent({});
    },
  },
  created() {
    getAllClass().then((res) => {
      // console.log("class", res);
      this.classes = res.data.data;
    });
    getAllTeacher().then((res) => {
      // console.log(res);
      this.teacher = res.data.data;
    });
    this.getStudent({});
  },
});
</script>

<style lang="scss" scoped>
.demo-form-inline {
  :deep {
    .el-input {
      height: 28px;
      line-height: 28px;
      font-size: 12px;
      width: 184px;
    }
    input {
      height: 28px;
      line-height: 28px;
      font-size: 12px;
    }
  }
}
</style>
