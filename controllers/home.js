import PassengerModel from "../models/Passengers.js";
export async function home(req, res) {
  let pagename = "homepage";
  try {
    const Passengers = await PassengerModel.find();
    let numberOfPassengers = Passengers.length;
    res.render("home", { pagename, Passengers, numberOfPassengers });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
// export async function filter(req, res) {
//   let pagename = "homepage";
//   try {
//     let filter = req.params.filter;
//     const Passengers = await PassengerModel.find({
//       Sex: "male",
//     });
//     res.render("home", { pagename, Passengers });
//   } catch {}
// }
