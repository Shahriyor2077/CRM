const { addGroup, getAllGroup, getGroupById, updateGroup, deleteGroup } = require("../controllers/group.controller");


const router = require("express").Router();

router.post("/", addGroup),
  router.get("/", getAllGroup),
  router.get("/:id", getGroupById),
  router.put("/:id", updateGroup),
  router.delete("/:id", deleteGroup);

module.exports = router;
