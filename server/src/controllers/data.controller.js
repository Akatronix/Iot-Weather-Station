const SensorData = require("../models/SensorData.model");
const SocketData = require("../models/socketControls.model");

async function getAllData(req, res) {
  try {
    const sensorDatas = await SensorData.find();

    if (!sensorDatas)
      return res.status(500).send({ message: "error something went wrong!" });

    res.status(200).send({
      message: "success",
      sensor: sensorDatas,
    });
  } catch (error) {
    console.log("Error", error);
  }
}

async function createDataSensor(req, res) {
  const { Temp, Humidity, Buzzer } = req.body;
  try {
    if (!Temp || !Humidity || !Buzzer) {
      return res.status(400).send({ message: "all field are required! " });
    }
    const newData = await SensorData.create(req.body);
    if (!newData)
      return res.status(500).send({ message: "error something went wrong!" });

    await newData.save();
    res.status(201).send({ message: "created successfully!" });
  } catch (error) {
    console.log("Error:", error);
  }
}

async function updateDataSensor(req, res) {
  const { id, Temp, Humidity, Buzzer } = req.body;
  try {
    if (!id || !Temp || !Humidity || !Buzzer) {
      return res.status(400).send({ message: "all field are required! " });
    }
    console.log("data logging");
    const updatedData = await SensorData.findByIdAndUpdate(id, { ...req.body });
    const controlsDatas = await SocketData.find();
    if (!updatedData || !controlsDatas)
      return res.status(500).send({ message: "error something went wrong!" });

    await updatedData.save();
    res
      .status(200)
      .send({ message: "updated successfully!", control: controlsDatas });
  } catch (error) {
    console.log("Error:", error);
  }
}

module.exports = { getAllData, createDataSensor, updateDataSensor };
