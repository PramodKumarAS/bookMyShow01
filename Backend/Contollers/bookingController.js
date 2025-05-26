require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const Booking = require('../Model/booking');
const Show = require('../Model/show');
const UserModel = require('../Model/users');
const emailHelper = require('../Config/emailHelper');

const makePayment = async (req, res) => {
    try {
        const { token, amount, show, user } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ['card'],
            receipt_email: token.email,
            description: "Token has been assigned to the movie!"
        });

        const transactionId = paymentIntent.id;

        res.send({
            success: true,
            message: "Payment & booking successful!",
            data: transactionId
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        });
    }
};

const bookShow = async (req, res) => {
    try {
        const { show, user, seats, transactionId } = req.body;

        if (!transactionId) {
            return res.status(400).send({
                success: false,
                message: "Missing transactionId in booking request."
            });
        }

        const newBooking = new Booking({ show, user, seats, transactionId });
        await newBooking.save();

        const showData = await Show.findById(show).populate("movie").populate("theatre");
        const updatedBookedSeats = [...showData.bookedSeats, ...seats];
        await Show.findByIdAndUpdate(show, { bookedSeats: updatedBookedSeats });

        res.send({
                success: true,
                message: "Booking successful!",
                data: newBooking
        });

        const userData = await UserModel.findById(user);
      
        await emailHelper("ticket.html", userData.email, {
            name: userData.name,
            movie: showData.movie.movieName,
            theatre: showData.theatre.name,
            date: showData.date,
            time: showData.time,
            seats,
            amount: seats.length * showData.ticketPrice,
            transactionId
        });
        
    } catch (err) {
        console.error("Booking Error:", err);
        res.send({
            success: false,
            message: err.message
        });
    }
};

const getAllBooking = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.body.userId })
            .populate("user")
            .populate("show")
            .populate({
                path: "show",
                populate: {
                    path: "movie",
                    model: "movies"
                }
            })
            .populate({
                path: "show",
                populate: {
                    path: "theatre",
                    model: "theatres"
                }
            });

        res.send({
            success: true,
            message: "Bookings fetched!",
            data: bookings
        })

    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
};

module.exports = {
  makePayment,
  bookShow,
  getAllBooking  
};