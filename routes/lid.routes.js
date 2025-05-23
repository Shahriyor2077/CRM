const { addLid, getAllLid, getLidById, updateLid, deleteLid } = require("../controllers/lid.controller");


const router = require("express").Router();

router.post("/", addLid),
  router.get("/", getAllLid),
  router.get("/:id", getLidById),
  router.put("/:id", updateLid),
  router.delete("/:id", deleteLid);

module.exports = router;
