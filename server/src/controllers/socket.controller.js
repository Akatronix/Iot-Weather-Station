const SocketData = require("../models/socketControls.model");

async function createNewSoket(req, res) {
  const { setTemp, lowerValue } = req.body;

  try {
    if (!setTemp || !lowerValue) {
      return res.status(400).send({ message: "all field are required! " });
    }
    const newData = await SocketData.create({
      setTemp,
      lowerValue,
    });
    if (!newData)
      return res.status(500).send({ message: "error something went wrong!" });

    await newData.save();
    res.status(201).send({ message: "created successfully!", data: newData });
  } catch (error) {
    console.log("Error:", error);
  }
}

async function updateControl(req, res) {
  const { id, setTemp, lowerValue } = req.body;

  try {
    // Validate input
    if (!id || !setTemp || !lowerValue) {
      return res.status(400).send({ message: "All fields are required!" });
    }

    // Validate setTemp is a number
    if (typeof setTemp !== "number" || typeof lowerValue !== "number") {
      return res
        .status(400)
        .send({ message: "wrong input, all the inputs has to be a number" });
    }

    const update = { setTemp, lowerValue };
    const updatedData = await SocketData.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!updatedData) {
      return res.status(404).send({ message: "Document not found!" });
    }

    return res.status(200).send({
      message: "Updated successfully!",
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating control:", error);
    return res.status(500).send({
      message: "An error occurred while updating the data",
      error: error.message,
    });
  }
}

module.exports = { createNewSoket, updateControl };
