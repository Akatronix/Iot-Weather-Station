const express = require("express");
const {
  getAllData,
  createDataSensor,
  updateDataSensor,
} = require("../controllers/data.controller");
const {
  createNewSoket,
  updateControl,
} = require("../controllers/socket.controller");
const { Login } = require("../controllers/auth.controller");

const router = express.Router();

router.get("/data", getAllData);
router.post("/create", createDataSensor);
router.post("/update", updateDataSensor);
router.post("/socket/create", createNewSoket);
router.post("/control/update", updateControl);
router.post("/auth/login", Login);

module.exports = router;
