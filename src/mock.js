import Mock from "mockjs";

Mock.mock("/api/llm_show", () => {
    return "第一行\n第二行";
});

Mock.mock("/api/speech", () => {
  return "ok";
});

Mock.mock("/api/messages", () => {
  return "ok";
});
