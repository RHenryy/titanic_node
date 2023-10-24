import mongoose from "mongoose";
const Passenger = new mongoose.Schema({
  PassengerId: { type: Number, required: true },
  Survived: { type: Number, required: true },
  Pclass: { type: String, required: true },
  Name: { type: String, required: true },
  Sex: { type: String, required: true },
  Age: { type: Number, required: true },
  SibSp: { type: Number, required: true },
  Parch: { type: Number, required: true },
  Ticket: { type: String, required: true },
  Fare: { type: Number, required: true },
  Cabin: { type: String },
  Embarked: { type: String, required: true },
});
const PassengerModel = mongoose.model("passengers", Passenger);

export default PassengerModel;
