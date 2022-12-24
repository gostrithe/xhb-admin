<template>
  <div class="home">
    <div class="statistics padding20 boxShadow">
      <h5>数据统计</h5>
      <el-row :gutter="10">
        <el-col :span="3"
          ><div class="cell">
            <span>￥{{ income }}</span
            >本月收入
          </div></el-col
        >
        <el-col :span="3"
          ><div class="cell">
            <span>￥{{ expend }}</span
            >本月支出
          </div></el-col
        >
        <el-col :span="3"
          ><div class="cell">
            <span>{{ newStudent }}</span
            >本月新增学员
          </div></el-col
        >
        <el-col :span="3"
          ><div class="cell">
            <span>{{ lessonHours }}</span
            >本月授课
          </div></el-col
        >
        <el-col :span="3"
          ><div class="cell">
            <span>￥{{ lessonConsume }}</span
            >本月课消
          </div></el-col
        >
        <el-col :span="3"
          ><div class="cell">
            <span>{{ arrive }}</span
            >今日实到人次
          </div></el-col
        >
        <el-col :span="3"
          ><div class="cell">
            <span>{{ leave }}</span
            >今日请假人次
          </div></el-col
        >
        <el-col :span="3"
          ><div class="cell" style="border-right: 0">
            <span>{{ absence }}</span
            >今日未到人次
          </div></el-col
        >
      </el-row>
    </div>

    <el-row
      :gutter="40"
      style="align-items: flex-start; background-color: #f4f4f5"
    >
      <el-col :span="16">
        <div class="entry padding20 boxShadow">
          <h5>快捷入口</h5>
          <div class="entryBox">
            <div class="entryItem">
              <el-image src="/home_entry_icon1.png"></el-image>
              <div class="title">学员档案</div>
            </div>
            <div class="entryItem">
              <el-image src="/home_entry_icon1.png"></el-image>
              <div class="title">报名/续费</div>
            </div>
            <div class="entryItem">
              <el-image src="/home_entry_icon1.png"></el-image>
              <div class="title">我的课表</div>
            </div>
            <div class="entryItem">
              <el-image src="/home_entry_icon1.png"></el-image>
              <div class="title">学员管理</div>
            </div>
            <div class="entryItem">
              <el-image src="/home_entry_icon1.png"></el-image>
              <div class="title">快速扣课时</div>
            </div>
            <div class="entryItem">
              <el-image src="/home_entry_icon1.png"></el-image>
              <div class="title">批量扣课时</div>
            </div>
            <div class="entryItem">
              <el-image src="/home_entry_icon1.png"></el-image>
              <div class="title">营销活动</div>
            </div>
            <div class="entryItem">
              <el-image src="/home_entry_icon1.png"></el-image>
              <div class="title">预警提醒</div>
            </div>
            <div class="entryItem">
              <el-image src="/home_entry_icon1.png"></el-image>
              <div class="title">上课记录</div>
            </div>
            <div class="entryItem">
              <el-image src="/home_entry_icon1.png"></el-image>
              <div class="title">班级管理</div>
            </div>
            <div class="entryItem">
              <el-image src="/home_entry_icon1.png"></el-image>
              <div class="title">订单管理</div>
            </div>
          </div>
        </div>

        <el-card class="newStudent boxShadow">
          <template #header>
            <div class="card-header">
              <h5>新增学员</h5>
              <el-select
                v-model="value"
                style="margin-left: 16px; width: 100px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </template>
          <div ref="chartDom" style="height: 300px"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <div class="todoList padding20 boxShadow">
          <h5>待办事项</h5>
          <div class="todo">
            <el-tag type="success">续费</el-tag>
            <p>有84位学员需要通知续费</p>
          </div>
          <div class="todo">
            <el-tag type="success">欠费</el-tag>
            <p>有3条欠费待补交记录</p>
          </div>
          <div class="todo">
            <el-tag>排课</el-tag>
            <p>有25个班级未排课</p>
          </div>
          <div class="todo">
            <el-tag>点名</el-tag>
            <p>本周有28个课次超时未点名</p>
          </div>
          <div class="todo">
            <el-tag>缺课</el-tag>
            <p>有18条缺课记录待安排</p>
          </div>
        </div>

        <el-card class="stdBirth boxShadow">
          <template #header>
            <div class="card-header">
              <h5>生日学员</h5>
              <el-select
                v-model="value2"
                style="margin-left: 16px; width: 150px"
              >
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <a href="#" class="more">更多</a>
            </div>
          </template>
        </el-card>

        <el-card class="stdType boxShadow">
          <template #header>
            <h5>学员类型</h5>
          </template>
          <div ref="pie" style="height: 300px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";

type EChartsOption = echarts.EChartsOption;

const income = ref(0);
const expend = ref(0);
const newStudent = ref(0);
const lessonHours = ref(0);
const lessonConsume = ref(0);
const arrive = ref(0);
const leave = ref(0);
const absence = ref(0);

const value = ref("近15天");
const options = [
  {
    value: "近一周",
    label: "近一周",
  },
  {
    value: "近15天",
    label: "近15天",
  },
  {
    value: "近30天",
    label: "近30天",
  },
  {
    value: "自定义",
    label: "自定义",
  },
];
const value2 = ref("今日生日");
const options2 = [
  {
    value: "今日生日",
    label: "今日生日",
  },
  {
    value: "7天内生日",
    label: "7天内生日",
  },
  {
    value: "15天内生日",
    label: "15天内生日",
  },
  {
    value: "30天内生日",
    label: "30天内生日",
  },
  {
    value: "60天内生日",
    label: "60天内生日",
  },
];

const chartDom = ref();
let option: EChartsOption;

option = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
    },
  ],
};

let option2: EChartsOption;
option2 = {
  // title: {
  //   // text: "Referer of a Website",
  //   // subtext: "Fake Data",
  //   // left: "center",
  // },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: "50%",
      data: [
        { value: 18, name: "潜在学员" },
        { value: 97, name: "在读学员" },
        { value: 9, name: "历史学员" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};
const pie = ref();
onMounted(() => {
  const dom = chartDom.value;
  const dom2 = pie.value;
  const myChart = echarts.init(dom);
  const myChart2 = echarts.init(dom2);

  option && myChart.setOption(option);
  option2 && myChart2.setOption(option2);
});
</script>

<style lang="scss">
.home {
  h5 {
    margin: 0;
    margin-bottom: 20px;
  }
  // padding: 10px;
  // background-color: #f6f6f6;
}

.statistics {
  // padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  .cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid #dcdfe6;
    font-size: 12px;
    color: #909399;

    span {
      color: #303133;
      font-size: 24px;
    }
  }
}

.entry {
  background-color: #fff;
  // padding: 20px;
  .entryBox {
    display: flex;
    flex-wrap: wrap;
    .entryItem {
      display: flex;
      align-items: center;
      width: 27%;
      margin-bottom: 20px;
      margin-right: 6%;
      padding: 6px 0;
      padding-left: 10px;
      box-sizing: border-box;
      &:hover {
        background-color: #ecf5ff;
        border: 1px solid #b3d8ff;
      }
    }
  }
}

.todoList {
  background-color: #fff;
  .todo {
    display: flex;
    align-items: center;
    p {
      font-size: 14px;
      color: #666;
      font-weight: 300;
      margin: 4px;
    }
  }
}

.newStudent {
  margin-top: 20px;
  .card-header {
    // border-bottom: 1px solid #e6ebf5;
    display: flex;
    align-items: baseline;
    h5 {
      margin: 0;
    }
  }
}

.stdBirth {
  margin-top: 20px;

  .card-header {
    // border-bottom: 1px solid #e6ebf5;
    position: relative;
    display: flex;
    align-items: baseline;
    h5 {
      margin: 0;
    }
    .more {
      text-decoration: none;
      position: absolute;
      top: 4px;
      right: 0;
      font-size: 12px;
      color: #1890ff;
    }
  }
}

.stdType {
  margin-top: 20px;
}
</style>
>>>>>>> dev
