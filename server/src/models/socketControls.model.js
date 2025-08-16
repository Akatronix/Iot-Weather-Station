const mongoose = require("mongoose");

const socketSchema = new mongoose.Schema(
  {
    setTemp: Number,
    lowerValue: Number,
  },
  { timestamps: true }
);

const SocketData = mongoose.model("socket", socketSchema);

module.exports = SocketData;
