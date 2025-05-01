const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const users = new Schema({
    userName:{type:String, required:true},
    userEmail:{type:String, unique:true, required:true},
    userPassword:{type:String, required:true}
})

const cars = new Schema({
    carID : {type:String, unique:true, required:true},
    carModel : {type:String, required:true},
    registrationNumber : {type:String, unique:true, required:true},
    carAvailability:{type:String, required:true},
    brand :{type:String, required:true},
    pricePerHour:{type:Number, required:true},
    thumbnail:{type:String, required:true}
})

const reservations = new Schema({
    bookingId : {type:String, required: true, unique:true},
    userEmail : {type:String, required: true},
    carID : {type:String, required: true},
    reservationDate : {type:Date, required: true},
    pickupDate : {type:Date, required: true},
    returnDate : {type:Date, required: true},
    numOfTravellers : {type:Number, required: true},
    status : {type:String, required: true},
    car : {type:String, required: true},
    img : {type:String, required: true},
    total : {type:Number, required: true}
})

const usersModel = mongoose.model('users', users);
const carsModel = mongoose.model('cars', cars);
const reservationsModel = mongoose.model('reservations', reservations);

module.exports = {
    usersModel,
    carsModel,
    reservationsModel
};
