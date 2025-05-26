const theatreModels = require("../Model/theatre");

const addTheatreController = async (req,res)=>{

    try {
        const theatre = new theatreModels(req.body)

        await theatre.save()

        res.send({
            success: true,
            message: "Theatre is added!"
        })

    } catch(e) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: e
        })
    }

};

const updateTheatreController = async (req, res) => {

    try {
        const theatre = await theatreModels.findByIdAndUpdate(req.body.theatreId, req.body);
          
        res.send({
            success: true,
            message: "Theatre is updated!",
            theatre
        })

    } catch(e) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }

};

const deleteTheatreController =async (req, res) => {

  try {
    const theatres =await theatreModels.findByIdAndDelete(req.body._id);
    res.send({  
        theatres,
        success: true,
        message: "The Theatre has been deleted!",
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
};

const getAllTheatreController = async (req, res) => {

    try {
        const allTheatres = await theatreModels.find().populate("owner")
        res.send({
            success: true,
            message: "Theatre fetched!",
            allTheatres
        })

    } catch(e) {

        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }

}

const getAllTheatresByOwnerIdController = async (req, res) => {

    try {
        const allTheatresByOwner = await theatreModels.find({
            owner: req.params.ownerID
        })

        res.send({
            success: true,
            message: "Theatres by owners fetched!",
            allTheatresByOwner
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error!",
        })
    }

}

module.exports = {
    addTheatreController,
    updateTheatreController,
    deleteTheatreController,
    getAllTheatreController,
    getAllTheatresByOwnerIdController
};