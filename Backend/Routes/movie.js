const express = require("express");
const authMiddleWare = require("../Middleware/authMiddleWare");
const { addMovieController, updateMovieController, getAllMoviesController, getMovieById, deleteMovieController } = require("../Contollers/movieController");
const router =express.Router();

router.post("/add-movie",authMiddleWare,addMovieController);
router.post("/update-movie",authMiddleWare,updateMovieController);
router.post("/delete-movie",authMiddleWare,deleteMovieController);
router.get("/get-all-movies",authMiddleWare, getAllMoviesController);
router.get("/:id",authMiddleWare, getMovieById);

module.exports = router;