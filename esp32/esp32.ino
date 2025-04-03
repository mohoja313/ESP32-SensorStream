#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Arduino_JSON.h>


const char* ssid = "your_accesspoint_name";
const char* password = "your_accesspoint_pass";


const char* serverUrl = "http://your_system_ip:your_port/angles";

Adafruit_MPU6050 mpu;

float roll, pitch, yaw;

void initMPU() {
  if (!mpu.begin()) {
    Serial.println("Failed to find MPU6050 chip");
    while (1) {
      delay(10);
    }
  }
  Serial.println("MPU6050 Initialized");
}

void initWiFi() {
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }
  Serial.println("\nConnected to WiFi");
  Serial.println(WiFi.localIP());
}

void updateAngles() {
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

 
  roll += g.gyro.x * 0.01;  
  pitch += g.gyro.y * 0.01;
  yaw += g.gyro.z * 0.01;

  JSONVar jsonData;
  jsonData["roll"] = roll;
  jsonData["pitch"] = pitch;
  jsonData["yaw"] = yaw;

  String jsonString = JSON.stringify(jsonData);

  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  int httpResponseCode = http.POST(jsonString);

  if (httpResponseCode > 0) {
    Serial.print("Data sent successfully. Response: ");
    Serial.println(httpResponseCode);
  } else {
    Serial.print("Error sending data. HTTP Response code: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}

void setup() {
  Serial.begin(115200);
  initWiFi();
  initMPU();
}

void loop() {
  updateAngles();
  delay(10);  
}
