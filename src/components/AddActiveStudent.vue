<template>
  <el-form
    inline
    label-width="auto"
    :model="addForm"
    ref="mainFormRef"
    class="demo-form-inline"
  >
    <el-form-item label="学员姓名">
      <el-input v-model="addForm.sname" placeholder="请输入学员姓名" />
    </el-form-item>
    <el-form-item label="手机号码">
      <el-input v-model="addForm.sphone" placeholder="请输入手机号码" />
    </el-form-item>
    <el-form-item label="考勤卡">
      <el-input v-model="addForm.stimecard" placeholder="请输入考勤卡" />
    </el-form-item>
    <el-form-item label="人脸">
      <el-select v-model="addForm.sface" placeholder="请选择">
        <el-option label="否" value="否" />
        <el-option label="是" value="是" />
      </el-select>
    </el-form-item>
    <el-form-item label="学员码">
      <el-input v-model="addForm.scode" placeholder="请输入学员码" />
    </el-form-item>
    <el-form-item label="年龄">
      <el-input v-model="addForm.sage" placeholder="请输入年龄" />
    </el-form-item>
    <el-form-item label="生日">
      <el-date-picker
        v-model="addForm.sbirthday"
        type="date"
        placeholder="请选择生日"
        style="width: 100%"
      />
      <!-- <el-input v-model="addForm.sbirthday" placeholder="请输入生日" /> -->
    </el-form-item>
    <el-form-item label="可用积分">
      <el-input v-model="addForm.spoints" placeholder="请输入可用积分" />
    </el-form-item>
    <el-form-item label="学管师">
      <el-input v-model="addForm.stutor" placeholder="请输入学管师" />
    </el-form-item>
    <el-form-item label="课程状态">
      <el-select v-model="addForm.sstatus" placeholder="请选择课程状态">
        <el-option
          v-for="option of ['正常', '已停课', '已结课']"
          :key="option"
          :label="option"
          :value="option"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="在读课程">
      <el-select v-model="addForm.scourse" placeholder="请选择课程">
        <el-option
          v-for="option of 3"
          :key="option"
          :label="option"
          :value="option"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="所在班级">
      <el-input v-model="addForm.sclass" placeholder="请选择班级"> </el-input>
    </el-form-item>
    <el-form-item label="标签">
      <el-select v-model="addForm.slabel" placeholder="请选择学员标签">
        <el-option
          v-for="option of 3"
          :key="option"
          :label="option"
          :value="option"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="就读学校">
      <el-input v-model="addForm.sschool" placeholder="目前就读的学校名称" />
    </el-form-item>
    <el-form-item label="就读年级">
      <el-select v-model="addForm.sgrade" placeholder="目前在读的年级">
        <el-option label="初培" value="初培" />
        <el-option label="复审" value="复审" />
      </el-select>
    </el-form-item>
    <el-form-item label="通讯地址">
      <el-input v-model="addForm.sadress" placeholder="请输入家庭住址" />
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="addForm.sremarks" placeholder="备注" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addStudent" v-if="status === 'add'"
        >添加</el-button
      >
      <el-button type="primary" @click="editStudent" v-if="status === 'edit'"
        >修改</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElMessage, ElNotification } from "element-plus";
import _ from "lodash";
import { addActiveStudent, editActiveStudent } from "@/api/https";

export default defineComponent({
  data() {
    return {
      addForm: {
        sname: "",
        sphone: "",
        stimecard: "",
        sface: "",
        scode: "",
        sage: "",
        sbirthday: "",
        spoints: "",
        stutor: "",
        sstatus: "",
        scourse: "",
        sclass: "",
        slabel: "",
        sschool: "",
        sgrade: "",
        sadress: "",
        sremarks: "",
      },
    };
  },
  props: ["afterAdd", "afterEdit", "status", "editForm"],
  methods: {
    addStudent() {
      //   console.log("this.addForm", this.addForm);
      addActiveStudent({ ...this.addForm }).then((res) => {
        // console.log(res);
        const { status } = res;
        if (status !== 201)
          ElMessage({
            type: "warning",
            message: "添加失败",
          });
        ElNotification({
          message: "添加成功",
          duration: 0,
        });
        this.$emit("afterAdd", false);
      });
    },
    editStudent() {
      editActiveStudent(this.editForm.id, { ...this.addForm }).then((res) => {
        // console.log(res);
        ElNotification({
          message: "修改成功",
          duration: 0,
        });
        this.$emit("afterEdit", false);
      });
    },
  },
  mounted() {
    if (this.editForm) {
      this.addForm = _.cloneDeep(this.editForm);
    }
  },
});
</script>

<style lang="scss" scoped></style>
