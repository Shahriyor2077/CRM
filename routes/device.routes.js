const { addDevice, getAllDevice, getDeviceById, updateDevice, deleteDevice } = require("../controllers/device.controller");

const router = require("express").Router();

router.post("/", addDevice),
  router.get("/", getAllDevice),
  router.get("/:id", getDeviceById),
  router.put("/:id", updateDevice),
  router.delete("/:id", deleteDevice);

module.exports = router;
