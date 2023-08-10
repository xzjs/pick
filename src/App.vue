<script setup>
import { ref } from "vue";

const result = ref([
  {
    name: "杯子",
    matching: "86%",
    accuracy: "100%",
    time: "2023/08/03 16:42:00",
  },
  {
    name: "杯子",
    matching: "86%",
    accuracy: "100%",
    time: "2023/08/03 16:42:00",
  },
  {
    name: "杯子",
    matching: "86%",
    accuracy: "100%",
    time: "2023/08/03 16:42:00",
  },
  {
    name: "杯子",
    matching: "86%",
    accuracy: "100%",
    time: "2023/08/03 16:42:00",
  },
]);

const tasks = ref([
  {
    task_name: "搬运底盖",
    equipment_name: "自动上下料机器人",
    no: "WH202307200001",
    product_name: "减速机",
    product_model: "SY13",
    num: 1,
    time: "2023-07-12 15:17:07",
    duration: "00:17:07",
  },
  {
    task_name: "搬运底盖",
    equipment_name: "自动上下料机器人",
    no: "WH202307200001",
    product_name: "减速机",
    product_model: "SY13",
    num: 1,
    time: "2023-07-12 15:17:07",
    duration: "00:17:07",
  },
  {
    task_name: "搬运底盖",
    equipment_name: "自动上下料机器人",
    no: "WH202307200001",
    product_name: "减速机",
    product_model: "SY13",
    num: 1,
    time: "2023-07-12 15:17:07",
    duration: "00:17:07",
  },
  {
    task_name: "搬运底盖",
    equipment_name: "自动上下料机器人",
    no: "WH202307200001",
    product_name: "减速机",
    product_model: "SY13",
    num: 1,
    time: "2023-07-12 15:17:07",
    duration: "00:17:07",
  },
]);
</script>

<template>
  <div class="header">
    <img src="@/assets/logo.jpg" class="logo" alt="" />
    <span class="span1">中国信息通信研究院</span>
    <span class="span2">
      China Academy of lnformation and Communications Technology
    </span>
  </div>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="box">
          <p>识别图</p>
          <el-image src="@/assets/logo.svg" class="img" :fit="cover" />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="box">
          <p>识别结果</p>
          <el-divider />
          <el-table :data="result" stripe style="width: 100%">
            <el-table-column prop="name" label="物体名称" />
            <el-table-column prop="matching" label="匹配率" />
            <el-table-column prop="accuracy" label="正确率" />
            <el-table-column prop="time" label="识别时间" />
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-table :data="tasks" stripe style="width: 100%;margin-top:30px">
      <el-table-column prop="task_name" label="任务名称" />
      <el-table-column prop="equipment_name" label="设备名称" />
      <el-table-column prop="no" label="订单编号" />
      <el-table-column prop="product_name" label="产品名称" />
      <el-table-column prop="product_model" label="产品型号" />
      <el-table-column prop="num" label="订单数量" />
      <el-table-column prop="time" label="开始时间" />
      <el-table-column prop="duration" label="持续时间" />
    </el-table>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  height: 80px;
  background: linear-gradient(
    0deg,
    rgba(18, 26, 62, 9.8) 8%,
    rgba(12, 34, 75, 8.88) 108%
  );
}

.logo {
  width: 103px;
  height: 32.5px;
  margin-top: 24px;
  margin-left: 48px;
}

.span1 {
  position: absolute;
  height: 24px;
  font-size: 25px;
  font-family: Heiti sC, Heiti sC-Medium;
  font-weight: 500;
  text-align: left;
  color: #ffffff;
  letter-spacing: 10px;
  left: 10%;
  top: 1.5%;
}

.span2 {
  font-size: 10.42px;
  color: #00edff;
  position: absolute;
  top: 5%;
  left: 10%;
}

.box {
  display: flex;
  flex-direction: column;
  height: 450px;
  border-radius: 20px;
  box-shadow: -18px 0px 20px 18px rgba(15, 55, 121, 0.15);
  background: #fff;
}

.container {
  margin: 3%;
}

p {
  text-align: center;
  font-weight: bold;
  line-height: 80px;
}

.img {
  width: 100%;
  height: 100%;
  padding: 5px;
  border-radius: 20px;
}
</style>
