<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

const scroll = ref(null);

const data = reactive({
  scene: "",
  textarea: "",
  text: "开始",
  speechText: "开始语音识别",
});

const options = reactive([
  {
    value: "robot_cv",
    label: "3D识别分拣",
  },
  {
    value: "small_2d_pick",
    label: "宏景场景",
  },
]);

const obj = reactive({
  src: "",
  disabled: false,
  label: "3D识别分拣",
});
const messages = reactive([]);

function select_change() {
  obj.disabled = true;
  options.forEach((item) => {
    if (item.value == data.scene) {
      obj.label = item.label;
    }
  });
  axios
    .post("/api/selector", { scene: data.scene })
    .then((res) => {
      console.log(res);
      obj.disabled = false;
    })
    .catch((err) => {
      ElMessage.error("设置失败");
      obj.disabled = false;
    });
}

function click() {
  obj.disabled = true;
  axios
    .post("/api/button", data)
    .then((res) => {
      if (data.text == "开始") {
        data.text = "停止";
      } else {
        data.text = "开始";
      }
      obj.disabled = false;
    })
    .catch((err) => {
      ElMessage.error(data.text + "失败");
      obj.disabled = false;
    });
}

function speech() {
  obj.disabled = true;
  axios
    .post("/api/speech", data)
    .then((res) => {
      if (data.speechText == "开始语音识别") {
        data.speechText = "停止语音识别";
      } else {
        data.speechText = "开始语音识别";
      }
      obj.disabled = false;
    })
    .catch((err) => {
      ElMessage.error(data.text + "失败");
      obj.disabled = false;
    });
}

function stop() {
  axios
    .post("/api/stop")
    .then((res) => {
      ElMessage("结束成功");
    })
    .catch(() => {
      ElMessage.error("结束失败");
    });
}

function getMessage() {
  axios.get("/api/messages").then((res) => {
    messages.push(res.data);
    scrollRefTimer = setTimeout(() => {
      scroll.value.scrollTop = scroll.value.scrollHeight;
      clearTimeout(scrollRefTimer);
    }, 0);
  });
}

function getImg() {
  var bufferImage = new Image();
  bufferImage.src = "/api/img?t=" + Date.now();
  bufferImage.onload = () => {
    obj.src = bufferImage.src;
  };
}

onMounted(() => {
  // select_change();
  setInterval(() => {
    getMessage();
    getImg();
  }, 300);
});
</script>

<template>
  <el-container>
    <el-header style="padding: 0; height: 80px">
      <div class="header">
        <img src="@/assets/logo.jpg" class="logo" alt="" />
        <span class="span1">中国信息通信研究院</span>
        <span class="span2">
          China Academy of lnformation and Communications Technology
        </span>
      </div>
    </el-header>
    <el-main style="height: calc(100vh - 191px)">
      <el-row :gutter="20" style="height: 100%">
        <el-col :span="18" style="height: 100%">
          <div class="box">
            <p>{{ obj.label }}</p>
            <!-- <el-image :src="obj.src" class="img" fit="contain" /> -->
            <img :src="obj.src" alt="" class="img" />
          </div>
        </el-col>
        <el-col :span="6">
          <el-space direction="vertical" class="ctl" size="large">
            <el-select
              v-model="data.scene"
              size="large"
              @change="select_change"
              :disabled="obj.disabled"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button
              type="primary"
              size="large"
              style="width: 198px"
              @click="click"
              :disabled="obj.disabled"
            >
              {{ data.text }}
            </el-button>
            <el-button
              v-if="data.scene == 'robot_cv'"
              type="primary"
              size="large"
              style="width: 198px"
              @click="speech"
              :disabled="obj.disabled"
            >
              {{ data.speechText }}
            </el-button>
            <el-input
              v-model="data.textarea"
              :rows="2"
              type="textarea"
              style="width: 198px"
            />
            <el-button
              type="danger"
              size="large"
              style="width: 198px"
              @click="stop"
              :disabled="obj.disabled"
            >
              全部结束
            </el-button>
          </el-space>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <p style="text-align: left; line-height: 18.5px">状态信息</p>
      <div style="height: 92.5px; overflow: auto" ref="scroll">
        <p
          style="text-align: left; line-height: 18.5px"
          :key="index"
          v-for="(item, index) in messages"
          v-html="item"
        ></p>
      </div>
    </el-footer>
  </el-container>
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
  border-radius: 20px;
  box-shadow: -18px 0px 20px 18px rgba(15, 55, 121, 0.15);
  background: #fff;
  height: 100%;
}

.container {
  height: 100%;
  padding: 20px;
}

p {
  text-align: center;
  font-weight: bold;
  line-height: 80px;
}

.img {
  height: calc(100% - 80px);
  border-radius: 20px;
  object-fit: contain;
}

.ctl {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
</style>
