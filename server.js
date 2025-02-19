// server.js - Backend gửi lệnh MQTT tới ThingsBoard

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mqtt = require("mqtt");

// Access Token của thiết bị ThingsBoard (ESP32)
const TOKEN = "ejmauiuy3cri6rbn4kxm"; // SensorT1
const BROKER_URL = "mqtt://app.coreiot.io:1883"; // MQTT Broker của ThingsBoard

// Tạo server Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Kết nối đến MQTT Broker, dùng Access Token làm username
const client = mqtt.connect(BROKER_URL, { username: TOKEN });

client.on("connect", () => {
  console.log("🔗 MQTT kết nối thành công!");
});

// Endpoint cho Web App gọi để gửi MQTT
app.post("/mqtt", (req, res) => {
  const { attribute, value } = req.body;
  const payload = JSON.stringify({ [attribute]: value });

  // Publish lên topic cập nhật thuộc tính
  client.publish("v1/devices/me/attributes", payload, () => {
    console.log("✅ Đã gửi MQTT:", payload);
    res.json({ success: true, sent: payload });
  });
});

// Khởi chạy server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
