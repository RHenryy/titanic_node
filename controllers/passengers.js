import PassengerModel from "../models/Passengers.js";

export async function getAll(req, res) {
  try {
    const passengers = await PassengerModel.find();
    res.json({ passengers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
export async function search(req, res) {
  try {
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
