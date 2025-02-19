// URL tới API Backend (Node.js) để gọi MQTT
const BACKEND_URL = "http://localhost:3000/mqtt";

// Hàm gửi bất kỳ thuộc tính nào tới ThingsBoard (qua Backend)
function sendMQTT(attribute, value) {
  fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ attribute, value }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("✅ Đã gửi MQTT: " + JSON.stringify(data));
    })
    .catch((error) => {
      alert("❌ Lỗi gửi MQTT: " + error);
    });
}

// Hàm chuyên cập nhật blinkInterval
function updateBlinkInterval() {
  const interval = document.getElementById("blinkingInterval").value;
  if (!interval) {
    alert("Vui lòng nhập giá trị blink interval!");
    return;
  }
  sendMQTT("blinkingInterval", parseInt(interval, 10));
}
