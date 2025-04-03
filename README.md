# ESP32-SensorStream: Real-Time Sensor Data with ESP32, Java, and Web Technologies

## What is This Project?

**ESP32-SensorStream** is a project that allows you to view real-time data from an **MPU6050 sensor** (accelerometer and gyroscope) connected to an **ESP32**. The data is continuously sent to a **Java server** and displayed on a **web interface** that updates in real time. You will be able to monitor the acceleration and rotation of your device directly in your browser.

This project is made up of three main components:
1. **ESP32 Code**: The ESP32 reads data from the sensor and sends it to the Java server.
2. **Java Backend**: A simple **Spring Boot** server receives data from the ESP32 and serves it to the webpage.
3. **Web Interface**: HTML, CSS, and JavaScript files that display the data on your browser.

## What’s Included in This Project?

- **ESP32 Code**: The code for the ESP32 to read sensor data and send it to the server.
- **Java Backend**: A **Spring Boot** server to receive and serve the sensor data.
- **Web Interface**: Web files (HTML, CSS, and JavaScript) that display the data in real-time.

## How to Set Up the Project

### Step 1: Set Up ESP32
1. **Install Arduino IDE**:
   Download and install the **Arduino IDE** from [here](https://www.arduino.cc/en/software).

2. **Install ESP32 Board in Arduino IDE**:
   To use ESP32 with Arduino, follow these steps:
   - Open **File > Preferences** in the Arduino IDE.
   - In the **Additional Boards Manager URLs** field, add: `https://dl.espressif.com/dl/package_esp32_index.json`.
   - Go to **Tools > Board > Boards Manager** and search for **ESP32**. Click **Install**.

3. **Connect the MPU6050 Sensor to ESP32**:
   Connect the **MPU6050 sensor** to your **ESP32** as follows:
   - **VCC** to **3.3V**
   - **GND** to **GND**
   - **SDA** to **GPIO21**
   - **SCL** to **GPIO22**

4. **Upload the ESP32 Code**:
   Open the ESP32 code in Arduino IDE and upload it to your ESP32.

### Step 2: Set Up the Java Server (Using IntelliJ IDEA)
1. **Install IntelliJ IDEA**:
   Download and install **IntelliJ IDEA** from [here](https://www.jetbrains.com/idea/).

2. **Clone the Project**:
   Clone the project from GitHub by running this command in your terminal:

   ```bash
   git clone https://github.com/mohoja313/ESP32-SensorStream.git
   cd ESP32-SensorStream/server
3. **Open the Project in IntelliJ IDEA**:

    Open IntelliJ IDEA.
  
    Click Open and select the ESP32-SensorStream/server directory where you cloned the project.

4. **Install Maven (if needed)**:

    IntelliJ should detect Maven automatically. If not, make sure to install Maven and configure it in IntelliJ.
  
    Go to File > Settings > Build, Execution, Deployment > Build Tools > Maven and ensure it’s configured properly.

5. **Run the Java Server**:

    In IntelliJ IDEA, open the server project.
  
    Look for the Application.java file in the src/main/java directory.
  
    Click on the green play button next to the Application.java file to run the server.

6. **Check if the Server is Running**:
  
    Once you run the server, you should see output in the console like:
    Tomcat started on port(s): 8080 (http) with context path ''
  
    Now, the server is running and can accept requests from the ESP32.

7. **Connect to the Server**: 
    Open your browser and go to http://localhost:5002. 
    You should see the real-time data from your ESP32 on the webpage.

## What You Need
  Arduino IDE to upload code to the ESP32.

  IntelliJ IDEA to run the Java server.

  Maven to build the Java project.

