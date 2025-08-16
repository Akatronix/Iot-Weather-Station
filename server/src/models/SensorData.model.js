const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema(
  {
    Temp: String,
    Humidity: String,
    Buzzer: String,
  },
  { timestamps: true }
);

const SensorData = mongoose.model("sensor", sensorSchema);

module.exports = SensorData;
