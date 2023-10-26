import PassengerModel from "../models/Passengers.js";
let pagename = "homepage";
export async function home(req, res) {
  try {
    const Passengers = await PassengerModel.find();
    let numberOfPassengers = Passengers.length;
    res.render("home", { pagename, Passengers, numberOfPassengers });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
export async function filterPassengers(req, res) {
  try {
    let chosenFilter = req.params.filter;
    let order = req.params.order;
    order = order === "ASC" ? 1 : -1;
    const Passengers = await PassengerModel.find().sort({
      [chosenFilter]: order,
    });
    console.log(Passengers);
    let numberOfPassengers = Passengers.length;
    res.render("home", {
      pagename,
      Passengers,
      numberOfPassengers,
      chosenFilter,
      order,
    });
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
