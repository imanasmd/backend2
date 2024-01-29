const express = require("express");
const inventoryTransferApi = require("../../api/inventoryTransfer");
const { validate } = require("../../middlewares");
const router = express.Router();
const passport = require("passport");

router.get("/getAll-inventoryTransfer", passport.authenticate(["jwt"], { session: false }), inventoryTransferApi.getAllInventoryTransfer.handler);
router.post("/add-inventoryTransfer", passport.authenticate(["jwt"], { session: false }), inventoryTransferApi.addInventoryTransfer.handler);
router.put("/update-inventoryTransfer/:id", passport.authenticate(["jwt"], { session: false }), inventoryTransferApi.updateInventoryTransfer.handler);
router.put("/remove-inventoryTransfer", inventoryTransferApi.removeInventoryTransferById.handler);
router.get(
  "/get-inventoryTransfer-by-id/:id",
  passport.authenticate(["jwt"], { session: false }),
  inventoryTransferApi.getInventoryTransferById.handler
);

module.exports = exports = router;
