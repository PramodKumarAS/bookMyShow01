const express = require("express");
const authMiddleWare = require("../Middleware/authMiddleWare");
const { addTheatreController, updateTheatreController,getAllTheatreController,getAllTheatresByOwnerIdController, deleteTheatreController } = require("../Contollers/theatreContoller");
const router =express.Router();

router.post("/add-theatre",authMiddleWare,addTheatreController);
router.put("/update-theatre",authMiddleWare,updateTheatreController);
router.post("/delete-theatre",authMiddleWare,deleteTheatreController);
router.get("/get-all-theatres-by-owner/:ownerID",authMiddleWare, getAllTheatresByOwnerIdController);
router.get("/get-all-theatres",authMiddleWare, getAllTheatreController);

module.exports = router;