const express = require("express");

const electronic = require("../Controller/electronicsController")

const router = express.Router();

router.get("/electronic",electronic.GetElectronic);
router.post("/electronic",electronic.createElectronic);
router.put("/electronic/:id",electronic.updateElectronic);
router.delete("/electronic/:id",electronic.deleteElectronic);

router.get("/electronic/:id", electronic.SingleUpdate)





// export router
module.exports = router;