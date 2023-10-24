# Realtime Sensor Monitor

Realtime Sensor Monitor is an application for monitoring sensor data. It provides a real-time interface for tracking and managing sensor data with the ability to send email alerts based on specified thresholds.

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/stratreddd/realtime-sensor-monitor.git
   ```

2. Navigate to the project directory:

   ```shell
   cd realtime-sensor-monitor
   ```

3. Install the dependencies:

   ```shell
   npm install
   ```

## Configuration

Before running the application, make sure to configure your environment variables. Create a `.env` file in the root directory and add the following configurations:

```shell
MONGO_URI=Your_MongoDB_Connection_String
PORT=3000
NODE_ENV=

SENDGRID_API_KEY=Your_SendGrid_API_Key
EMAIL_FROM=your_email@example.com
EMAIL_TO=recipient_email@example.com
```

Replace the placeholders with your actual configuration settings.

## Usage

To run the application, simply use the following command:

```shell
node index.js
```

The application will start, and you can access it by navigating to `http://localhost:3000` in your web browser.

## API Documentation

The application provides an API for managing sensor data. You can access the API documentation using Swagger UI at:

```
http://localhost:3000/api/docs
```