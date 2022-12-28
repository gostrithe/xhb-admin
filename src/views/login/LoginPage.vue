<template>
  <el-container>
    <el-header>xhb后台管理系统</el-header>
    <el-main>
      <p :style="{ display: 'flex' }">
        <el-button @click="isLoginTab = false" link :style="{ flex: 1 }"
          >登录</el-button
        >
        <el-button @click="isLoginTab = true" link :style="{ flex: 1 }"
          >注册</el-button
        >
      </p>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="uname">
          <el-input v-model="ruleForm.uname" />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item v-if="isLoginTab" label="确认密码" prop="checkPass">
          <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            {{ isLoginTab ? "注册" : "登录" }}
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import { doLogin } from "@/api/https";

const router = useRouter();
const isLoginTab = ref(false);
const ruleFormRef = ref<FormInstance>();

const validateUname = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("请输入用户名！"));
  }
  callback();
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    return callback(new Error("请输入密码！"));
  } else {
    if (ruleForm.checkPass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("请确认密码！"));
  } else if (value !== ruleForm.password) {
    callback(new Error("密码不一致！"));
  }
  callback();
};

const ruleForm = reactive({
  password: "",
  checkPass: "",
  uname: "",
});

const rules = reactive({
  pass: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
  uname: [{ validator: validateUname, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const res = await doLogin({
        name: ruleForm.uname,
        password: ruleForm.password,
      });
      console.log(res);
      localStorage.setItem("token", res.data.accessToken);
      router.push("/index");
      ElMessage({ message: "登录成功", type: "success" });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss" scoped>
.el-container {
  width: 40vw;
  height: 70vh;
  border-radius: 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: #aaa;

  .el-header {
    text-align: center;
  }
}
</style>
