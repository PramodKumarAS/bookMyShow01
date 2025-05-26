const express = require("express");
const authMiddleWare = require("../Middleware/authMiddleWare");
const { addShowController, updateShowController, deleteShowController, getAllShowByTheatreController, getAllTheatresByMovie, getShowbyId } = require("../Contollers/showController");
const router =express.Router();

router.post("/add-show",authMiddleWare,addShowController);
router.put("/update-show",authMiddleWare, updateShowController);
router.post("/delete-show",authMiddleWare,deleteShowController);
router.post("/get-all-shows-by-theatre",authMiddleWare,getAllShowByTheatreController);
router.post("/get-all-theatres-by-movie",authMiddleWare,getAllTheatresByMovie);
router.post("/get-show-by-id",authMiddleWare,getShowbyId);

module.exports = router;