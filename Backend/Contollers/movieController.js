const moviesModels = require("../Model/movies");

const addMovieController = async (req,res)=>{

    try {
        const movie = new moviesModels(req.body)

        await movie.save()

        res.send({
            success: true,
            message: "Movie is added!"
        })

    } catch(e) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: e
        })
    }

};

const updateMovieController = async (req, res) => {

    try {
        const movie = await moviesModels.findOneAndUpdate(
            { _id: req.body.movieId }, // filter condition
            req.body,                  // update data
            { new: true }              // optional: returns the updated document
          );
          
        res.send({
            success: true,
            message: "Movie is updated!",
            movie
        })

    } catch(e) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }

};

const getAllMoviesController = async (req, res) => {

    try {
        const movies = await moviesModels.find()
        
        res.send({
            success: true,
            message: "Movies fetched!",
            movies
        })

    } catch(e) {

        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }

}

const getMovieById = async (req, res) => {
    try{
        const movie = await moviesModels.findById(req.params.id);
        res.send({
            success: true,
            message: "Movie fetched successfully!",
            data: movie
        })

    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
};

const deleteMovieController =async (req, res) => {

  try {
    await moviesModels.findByIdAndDelete(req.body._id);
    res.send({
      success: true,
      message: "The movie has been deleted!",
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
    addMovieController,
    updateMovieController,
    getAllMoviesController,
    getMovieById,
    deleteMovieController
};