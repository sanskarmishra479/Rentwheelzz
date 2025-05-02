const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const JWT_USER_SECRET = "test@one";
const {Router} = require("express");
const {usersModel, carsModel, reservationsModel} = require("../db");
const userRouter = Router();
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const app = express();

userRouter.post("/register", async function(req, res){
  try{
          const requireBody = z.object({
              userName: z.string().min(3).max(50),
              userEmail: z.string().email().max(50),
              userPassword: z.string().min(5).max(20)
                      .refine((password) =>/[A-Z]/
                      .test(password), {message: "Required atleast one uppercase character"})
                      .refine((password) => /[a-z]/
                      .test(password), {message: "Required atleast one lowercase character"})
                      .refine((password) => /[0-9]/
                      .test(password), {message: "Required atleast one number"})
                      .refine((password) => /[!@#$%^&*]/
                      .test(password), {message: "Required atleast one special character"})
          }).strict();

          const parsedRequiredData = requireBody.safeParse(req.body);

          if(!parsedRequiredData.success){
              res.json({
                  message:"incorrect formate",
                  error: parsedRequiredData.error
              })
          }else{
              const {userName, userEmail, userPassword} = req.body;
              const hasedPassword = await bcrypt.hash(userPassword, 10);
              await usersModel.create({
                  userName,
                  userEmail,
                  userPassword: hasedPassword
              });
              res.json({
                  message:"register successfully"
              })
          }
  }catch(err){
      res.status(500).json({
          message:`something error ocured while storing your data ${err}`
      })
  }
});

userRouter.post("/login", async function(req, res){
  try {
      const requireBody = z.object({
          userEmail: z.string().email().max(50),
          userPassword: z.string().min(5).max(20)
                      .refine((password) =>/[A-Z]/
                      .test(password), {message: "Required atleast one uppercase character"})
                      .refine((password) => /[a-z]/
                      .test(password), {message: "Required atleast one lowercase character"})
                      .refine((password) => /[0-9]/
                      .test(password), {message: "Required atleast one number"})
                      .refine((password) => /[!@#$%^&*]/
                      .test(password), {message: "Required atleast one special character"})
      });
      const parsedRequiredData = requireBody.safeParse(req.body);
      if(!parsedRequiredData.success){
          return res.json({
              message:"incorrect formate",
              error: parsedRequiredData.error
          })
      }
          const { userEmail, userPassword} = req.body;

          const user = await usersModel.findOne({
              userEmail
          });
  
          const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);
          if (user && passwordMatch) {
              const token = jwt.sign({
                  userEmail: user.userEmail.toString()
              }, JWT_USER_SECRET, { expiresIn: '24h' });
      
              res.json({
                  token
              })
          } else {
              res.status(403).json({
                  message: "Incorrect creds"
              })
          }

  }catch(err){
      res.json({
          message: `something worng in signin endpoint ${err}`
      })
  }

});

userRouter.get("/getPackages",authMiddleware, async function(req, res){
    try {
        const cars = await carsModel.find();
        res.status(200).json({
            status: "success",
            results: cars.length,
            data: {
              cars: cars.map(car => ({
                id: car.carID,
                model: car.carModel,
                brand: car.brand,
                status: car.carAvailability.toUpperCase(),
                registrationNumber: car.registrationNumber,
                pricePerHour: car.pricePerHour,
                thumbnail: car.thumbnail
              }))
            }
          });
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch car data' });
      }
})

userRouter.post("/reserve",authMiddleware, async function(req, res){

    try {
        const {
          bookingId,
          carID,
          reservationDate,
          pickupDate,
          returnDate,
          numOfTravellers,
          status,
          car,
          img,
          total
        } = req.body;

        const isAlreadyBooked = await reservationsModel.findOne({
            carID,
            $or: [
              {
                pickupDate: { $lt: new Date(returnDate) },
                returnDate: { $gt: new Date(pickupDate) }
              }
            ]
          });
      
          if (isAlreadyBooked) {
            return res.status(400).json({
              message: "Car is already reserved during the selected time."
            });
          }

        const userEmail = req.user.userEmail;

        await reservationsModel.create({
          bookingId,
          userEmail,
          carID,
          reservationDate,
          pickupDate,
          returnDate,
          numOfTravellers,
          status,
          car,
          img,
          total
        });
    
        res.status(201).json({ message: "Reservation successful" });
        
      } catch (err) {
        console.error("Error details:", err);
        res.status(500).json({ message: "Error while reserving car", error: err });
      }
})

userRouter.get("/all/my-package" , authMiddleware, async function(req, res){
  try {
    const userEmail = req.user.userEmail;
    const reservationCars = await reservationsModel.find({ userEmail: userEmail });
    res.status(200).json({
        status: "success",
        results: reservationCars.length,
        data: {
          reservationCars: reservationCars.map(reservationCars => ({
            bookingId: reservationCars.bookingId,
            carID: reservationCars.carID,
            carModel: reservationCars.car,
            reservationDate: reservationCars.reservationDate,
            pickupDate: reservationCars.pickupDate,
            returnDate: reservationCars.returnDate,
            numOfTravellers: reservationCars.numOfTravellers,
            total: reservationCars.total,
            thumbnail: reservationCars.img
          }))
        }
      });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch car data' });
  }

})

userRouter.post("/cancel" , function(req, res){
  
})

module.exports  = {
    userRouter
}