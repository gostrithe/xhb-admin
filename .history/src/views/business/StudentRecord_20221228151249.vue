<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="潜在学员" name="first">
      <el-form
        inline="true"
        :model="Potential_trainees"
        class="demo-form-inline"
      >
        <el-form-item label="学员信息">
          <el-input
            v-model="Potential_trainees.name"
            placeholder="学员信息/手机号码/卡号"
            class="el-input__inner"
          />
        </el-form-item>
        <el-form-item label="更进状态">
          <el-select
            v-model="Potential_trainees.follow"
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
            v-model="Potential_trainees.followMan"
            placeholder="请选择更跟进人"
            :prefix-icon="Grid"
            @click="changefollowMan = true"
          >
          </el-input>
          <el-dialog
            v-model="changefollowMan"
            title="请选择跟进人"
            @open="getlist"
            lock-scroll
            align-center
          >
            <el-form-item label="员工信息">
              <el-input
                v-model="Potential_trainees.info"
                placeholder="姓名/手机号码"
                clearable
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryEmployee">查询</el-button>
            </el-form-item>
            <el-alert
              title="双击确定所选择选的数据"
              type="info"
              show-icon
              class="alertColor"
            />
            <el-table
              :data="Employee_Information"
              @cell-dblclick="changeEmployee_Information"
            >
              <el-table-column
                property="employeeNme"
                label="员工名称"
                width="150"
              />
              <el-table-column property="phone" label="手机号码" width="200" />
              <el-table-column property="Whether_to_teachs" label="是否授课" />
              <el-table-column property="role" label="角色" />
              <el-table-column property="note" label="备注" />
            </el-table>
            <el-pagination
              background
              pager-count="5"
              layout=" total,prev, pager, next, jumper"
              :total="100"
              class="pagination"
              small
            />
          </el-dialog>
        </el-form-item>
        <template v-if="isSearch">
          <el-form-item label="学生来源">
            <el-select
              v-model="Potential_trainees.source"
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
              v-model="Potential_trainees.form"
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
              v-model="Potential_trainees.tag"
              multiple
              :reserve-keyword="false"
              placeholder="请选择学员标签"
            >
              <el-option
                v-for="item in tagOptions"
                :key="item.tag"
                :label="item.label"
                :value="item.tag"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="生日">
            <el-select
              v-model="Potential_trainees.birthdayDay"
              placeholder="生日"
              clearable
            >
              <el-option label="今日生日" value="今日生日" />
              <el-option label="7天内生日" value="7天内生日" />
              <el-option label="15天内生日" value="15天内生日" />
              <el-option label="30天内生日高" value="30天内生日" />
              <el-option label="60天内生日" value="60天内生日" />
            </el-select>
          </el-form-item>
          <el-form-item label="生日月份">
            <el-select
              v-model="Potential_trainees.monthBirth"
              placeholder="生日月份"
              clearable
            >
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
            <el-config-provider :locale="zhCn"
              ><el-date-picker
                v-model="Potential_trainees.addingDate"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :locale="zhCn"
                style="width: 250px; height: 28px"
            /></el-config-provider>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="Potential_trainees.remark" placeholder="备注" />
          </el-form-item>
        </template>
        <el-form-item>
          <el-button class="btn">重置</el-button>
          <el-button type="primary" class="btn">查询</el-button>
          <el-button
            @click="isSearch = !isSearch"
            class="btn"
            link
            type="primary"
          >
            {{ isSearch ? "收起搜索" : "更多搜索" }}
          </el-button>
        </el-form-item>
      </el-form>
      <el-form>
        <el-button
          @click="potential = true"
          class="el-button--mini"
          type="primary"
        >
          <el-icon><EditPen /></el-icon>添加潜在学员</el-button
        >
        <el-drawer
          v-model="potential"
          title="添加潜在学员"
          direction="rtl"
          size="30%"
        >
          <el-form
            :model="AddPotential_trainees"
            label="基本信息"
            label-position="right"
          >
            <el-form-item label="学员头像">
              <!-- 头像暂时不知怎么搞 ----------------------------------------------------->
              <el-avatar src="http://www.wzsqyg.com/attachment/upload" />
              <el-upload
                class="avatar-uploader"
                action="http://localhost:3030/file/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="学员姓名">
              <el-input
                placeholder="请输入学员姓名"
                v-model="AddPotential_trainees.name"
              />
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input
                v-model="AddPotential_trainees.phone"
                placeholder="请输入手机号码"
              >
                <template #prepend>
                  <el-select
                    v-model="AddPotential_trainees.phoneUser"
                    placeholder="自己"
                    style="width: 100px"
                  >
                    <el-option label="自己" value="自己" />
                    <el-option label="家人" value="家人" />
                    <el-option label="朋友" value="朋友" />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="AddPotential_trainees.sex">
                <el-radio label="男" size="large">男</el-radio
                ><el-radio label="女" size="large">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="生日">
              <el-date-picker
                placeholder="出生日期"
                v-model="AddPotential_trainees.birthday"
                :disabledDate="disabledDate"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="就读学校">
              <el-input
                v-model="AddPotential_trainees.school"
                placeholder="目前就读学校的名称"
              />
            </el-form-item>
            <el-form-item label="就读年级">
              <el-select
                v-model="AddPotential_trainees.grade"
                placeholder="目前在读的年级"
              >
                <el-option label="初培" value="初培" />
                <el-option label="复审" value="复审" />
              </el-select>
            </el-form-item>
            <el-form-item label="学生来源">
              <el-select
                v-model="AddPotential_trainees.source"
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
            <el-form-item label="推荐人">
              <el-input
                v-model="AddPotential_trainees.referrer"
                placeholder="请选择推荐人"
                :prefix-icon="Grid"
                @click="dialogTableVisible2 = true"
              >
              </el-input>
              <el-dialog
                v-model="dialogTableVisible2"
                title="请选择推荐人"
                @open="getReferrerList"
              >
                <el-form inline="true">
                  <el-form-item label="学员信息">
                    <el-input
                      v-model="AddPotential_trainees.user"
                      placeholder="姓名/手机号码/卡号"
                      clearable
                    />
                  </el-form-item>
                  <el-form-item label="类型">
                    <el-select
                      v-model="AddPotential_trainees.type"
                      placeholder="请选择学员类型"
                      clearable
                    >
                      <el-option label="潜在学员" value="潜在学员" />
                      <el-option label="在读学员" value="在读学员" />
                      <el-option label="历史学员" value="历史学员" />
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="queryReferrer"
                      >查询</el-button
                    >
                  </el-form-item>
                  <el-alert
                    title="双击确定所选择选的数据"
                    type="info"
                    show-icon
                    class="alertColor"
                  />
                  <el-table :data="referrer" @cell-dblclick="changeReferrer">
                    <el-table-column
                      property="name"
                      label="学员姓名"
                      width="150"
                    />
                    <el-table-column
                      property="phone"
                      label="手机号码"
                      width="200"
                    />
                    <el-table-column property="type" label="类型" />
                    <el-table-column property="age" label="年龄" />
                    <el-table-column
                      property="Available_credits"
                      label="可用积分"
                    />
                    <el-table-column property="source" label="来源" />
                    <el-table-column property="follow_people" label="跟进人" />
                    <el-table-column property="GZ_A" label="学管师" />
                  </el-table>
                  <el-pagination
                    background
                    layout="total,prev, pager, next, jumper"
                    :total="1000"
                    class="pagination"
                  />
                </el-form>
              </el-dialog>
            </el-form-item>
            <el-form-item label="备用号码">
              <el-input
                v-model="AddPotential_trainees.altPhone"
                placeholder="请输入备用号码"
              >
                <template #prepend>
                  <el-select
                    v-model="AddPotential_trainees.Reserve"
                    placeholder="自己"
                    style="width: 100px"
                  >
                    <el-option label="自己" value="自己" />
                    <el-option label="家人" value="自己" />
                    <el-option label="朋友" value="朋友" />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="家庭住址">
              <el-input
                v-model="AddPotential_trainees.address"
                placeholder="请输入家庭住址"
              />
            </el-form-item>
            <el-form-item label="意向级别">
              <el-select
                v-model="AddPotential_trainees.level"
                placeholder="请选择意向级别"
              >
                <el-option label="低" value="低" />
                <el-option label="中" value="中" />
                <el-option label="高" value="高" />
              </el-select>
            </el-form-item>
            <el-form-item label="跟进状态">
              <el-select
                v-model="AddPotential_trainees.follow"
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
                v-model="AddPotential_trainees.followMan"
                placeholder="请选择更跟进人"
                :prefix-icon="Grid"
                @click="changefollowMan1 = true"
              >
              </el-input>
              <el-dialog
                v-model="changefollowMan1"
                title="请选择跟进人"
                @open="getlist"
                lock-scroll
                align-center
              >
                <el-form-item label="员工信息">
                  <el-input
                    v-model="AddPotential_trainees.info"
                    placeholder="姓名/手机号码"
                    clearable
                    class="inp"
                  /><el-button type="primary" @click="queryEmployee" class="bun"
                    >查询</el-button
                  >
                </el-form-item>
                <el-alert
                  title="双击确定所选择选的数据"
                  type="info"
                  show-icon
                  class="alertColor"
                />
                <el-table
                  :data="Employee_Information"
                  @cell-dblclick="changeEmployee_Information1"
                >
                  <el-table-column
                    property="employeeNme"
                    label="员工名称"
                    width="150"
                  />
                  <el-table-column
                    property="phone"
                    label="手机号码"
                    width="200"
                  />
                  <el-table-column
                    property="Whether_to_teachs"
                    label="是否授课"
                  />
                  <el-table-column property="role" label="角色" />
                  <el-table-column property="note" label="备注" />
                </el-table>
                <el-pagination
                  background
                  pager-count="5"
                  layout=" total,prev, pager, next, jumper"
                  :total="100"
                  class="pagination"
                  small
                />
              </el-dialog>
            </el-form-item>
            <el-form-item label="标签">
              <el-select
                v-model="AddPotential_trainees.tag"
                multiple
                :reserve-keyword="false"
                placeholder="请选择学员标签"
              >
                <el-option
                  v-for="item in tagOptions"
                  :key="item.tag"
                  :label="item.label"
                  :value="item.tag"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                v-model="AddPotential_trainees.remark"
                :rows="2"
                type="textarea"
                placeholder="备注信息"
              />
            </el-form-item>
            <el-form-item>
              <el-button @click="savePotentialTrainees">保存</el-button>
            </el-form-item>
          </el-form>
        </el-drawer>
        <el-button class="el-button--mini jr">今日待跟进</el-button>
        <el-button class="el-button--mini">分配跟进人</el-button>
        <el-button class="el-button--mini">添加跟进记录</el-button>
        <el-dropdown>
          <el-button class="el-button--mini" placement="bottom" size="small">
            更多操作<el-icon><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>学员招生码</el-dropdown-item>
              <el-dropdown-item>导入潜在学员</el-dropdown-item>
              <el-dropdown-item>批量赠送课时</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-form>
      <el-table
        :data="potentialStudent"
        style="width: 100%"
        border
        class="etms-table-container"
      >
        <el-table-column type="selection" width="35" />
        <el-table-column prop="name" label="学员姓名" width="120" />
        <el-table-column prop="phone" label="手机号" width="120" />
        <el-table-column prop="age" label="年龄" width="120" />
        <el-table-column prop="birthday" label="生日" width="120" />
        <el-table-column prop="follow" label="跟进状态" width="120" />
        <el-table-column prop="followMan" label="跟进人" width="120" />
        <el-table-column prop="level" label="意向级别" width="120" />
        <el-table-column prop="source" label="来源" width="120" />
        <el-table-column prop="Last_follow" label="最后一次跟进" width="120" />
        <el-table-column prop="Next_follow" label="下—次跟进" width="120" />
        <el-table-column prop="remark" label="备注" width="120" />
        <el-table-column prop="createdAt" label="添加日期" width="120" />
        <el-table-column fixed="right" label="操作" width="150">
          <template #default>
            <el-button link type="primary" size="small" @click="handleClick">
              报名</el-button
            >
            <el-button link type="primary" size="small">试听</el-button>
            <el-button link type="primary" size="small" @click="change">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-form inline="true" class="form_page">
        <el-form-item>
          <el-button class="el-button--mini">导出当前页</el-button>
          <el-button class="el-button--mini">导出学员详情</el-button>
        </el-form-item>
        <el-form-item>
          <el-pagination
            :page-sizes="[10, 20, 30, 50, 100, 200, 500]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            class="pagination"
            background
            small
        /></el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="在读学员" name="second">在读学员</el-tab-pane>
    <el-tab-pane label="历史学员" name="third">历史学员</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import type { TabsPaneContext, UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
import { Grid, EditPen, ArrowDown, Plus } from "@element-plus/icons-vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { getEmployeeData } from "@/api/employees";
import { getreferrer } from "@/api/referrer";
import { postStudents } from "@/api/students";
import { getStudents } from "@/api/queryStudent";

//执行渲染
onMounted(() => {
  queryPotentialStudent();
});
//修改潜在学员


//潜在学员渲染表
const potentialStudent = ref([
  {
    name: "",
    phone: "",
    age: "",
    birthday: "",
    follow: "",
    followMan: "",
    level: "",
    source: "",
    Last_follow: "",
    Next_follow: "",
    remark: "",
    createdAt: "",
    operation: "",
  },
]);

//请求潜在学员并渲染
const queryPotentialStudent = async () => {
  const res = await getStudents();
  console.log(res);
  potentialStudent.value = res!.data;
};

//保存潜在学员数据
const savePotentialTrainees = async () => {
  AddPotential_trainees.tag = (
    AddPotential_trainees.tag as unknown as string[]
  ).join("|");
  await postStudents({ ...AddPotential_trainees });
  queryPotentialStudent();
};

//推荐人
const referrer = ref([
  {
    name: "",
    phone: "",
    type: "",
    age: "",
    sex: "",
    Available_credits: "",
    source: "",
    followMan: "",
    GZ_A: "",
  },
]);

//请求推荐人信息列表渲染到列表
const getReferrerList = async () => {
  const res = await getreferrer();
  referrer.value = res!.data;
};

//按姓名手机号类型查询推荐人
const queryReferrer = async () => {
  const res = await getreferrer();
  referrer.value = res!.data;
  const data = referrer.value.filter(function (item) {
    if (
      item.name === AddPotential_trainees.user ||
      item.phone === AddPotential_trainees.user ||
      item.type === AddPotential_trainees.type
    ) {
      return item.name || item.phone || item.type;
    }
  });
  referrer.value = data;
};

//双击选中数据并关闭界面
const changeReferrer = (row: { name: string }) => {
  getReferrerList();
  AddPotential_trainees.referrer = row.name;
  dialogTableVisible2.value = false;
};

// 今天后面的日期不可选
const disabledDate = (time: { getTime: () => number }) => {
  return time.getTime() > Date.now();
};

const imageUrl = ref("");

//上传头像
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};
const beforeAvatarUpload: UploadProps["beforeUpload"] = (File) => {
  const fileSuffix = File.name.substring(File.name.lastIndexOf(".") + 1);
  const whiteList = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "pdf",
    "JPG",
    "JPEG",
    "PBG",
    "GIF",
    "BMP",
    "PDF",
  ];
  if (whiteList.indexOf(fileSuffix) === -1) {
    ElMessage.error(
      "头像图片必须为jpg、jpeg、png、gif、bmp、pdf、JPG、JPEG、PBG、GIF、BMP、PDF格式!"
    );
    return false;
  } else if (File.size / 1024 / 1024 > 2) {
    ElMessage.error("头像图片大小不能超过2MB!");
    return false;
  }
  return true;
};

const potential = ref(false);

//添加潜在学员字段
const AddPotential_trainees = reactive({
  status: "0",
  name: "",
  phone: "",
  phoneUser: "",
  sex: "",
  birthday: "",
  school: "",
  grade: "",
  source: "",
  referrer: "",
  altPhone: "",
  Reserve: "",
  address: "",
  level: "",
  follow: "",
  followMan: "",
  info: "",
  tag: "",
  remark: "",
  user: "",
  type: "",
});

const activeName = ref("first");
const changefollowMan = ref(false);
const changefollowMan1 = ref(false);
const dialogTableVisible2 = ref(false);

//选中后在关闭弹窗
const changeEmployee_Information = (row: { employeeNme: string }) => {
  getlist();
  Potential_trainees.followMan = row.employeeNme;
  changefollowMan.value = false;
};

const changeEmployee_Information1 = (row: { employeeNme: string }) => {
  getlist();
  AddPotential_trainees.followMan = row.employeeNme;
  changefollowMan1.value = false;
};

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

// 潜在学员
const Potential_trainees = reactive({
  name: "",
  follow: "",
  birthdayDay: "",
  followMan: "",
  info: "",
  monthBirth: "",
  addingDate: "",
  remark: "",
  tag: "",
  source: "",
  form: "",
});

//跟进人
const Employee_Information = ref([
  {
    employeeNme: "",
    phone: "",
    Whether_to_teachs: "",
    role: "",
    note: "",
  },
]);

//请求跟进人信息列表
const getlist = async () => {
  const res = await getEmployeeData();
  Employee_Information.value = res!.data;
};

//点击按手机姓名查询获取列表
const queryEmployee = async () => {
  const res = await getEmployeeData();
  Employee_Information.value = res!.data;
  const data = Employee_Information.value.filter(function (item) {
    if (
      item.employeeNme === Potential_trainees.info ||
      item.phone === Potential_trainees.info
    ) {
      return item.employeeNme || item.phone;
    }
  });
  console.log(data);
  Employee_Information.value = data;
};

//标签数据
const tagOptions = [
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

//更多搜索与收起搜索的判断
const isSearch = ref(true);
</script>

<style lang="scss" scoped>
.bun {
  margin-left: 10px;
}
.inp {
  width: 184px;
}
.form_page {
  display: flex;
  justify-content: space-between;
}
:deep {
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    margin: 8px 0 0 8px;
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 30px;
    height: 30px;
    text-align: center;
  }
}

.jr {
  margin-left: 12px;
}
.el-tooltip__trigger {
  margin-left: 12px;
}
.el-tabs {
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  padding: 20px;
}

.etms-table-container {
  margin-top: 5px;
}
.el-button--mini {
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 3px;
  width: 56;
  height: 28px;
  font-size: 12px;
}
.demo-tabs > .el-tabs__content {
  padding: 32.0025px;
  color: #6b778c;
  font-size: 32.0025px;
  font-weight: 600;
}
.demo-form-inline {
  :deep {
    .el-input {
      line-height: 28px;
      font-size: 12px;
      width: 184px;
    }
    input {
      line-height: 28px;
      font-size: 12px;
    }
  }
}

.alertColor {
  background-color: var(--el-bg-color);
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: right;
}
.btn {
  width: 56;
  height: 28px;
  font-size: 12px;
}
</style>
