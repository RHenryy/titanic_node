import PassengerModel from "../models/Passengers.js";
let pagename = "homepage";
let limit = 40;
let page = 0;
let offset = 0;
export async function home(req, res) {
  try {
    if (req.params.page) {
      page = req.params.page;
      offset = (page - 1) * limit;
    } else {
      page = 1;
      offset = (page - 1) * limit;
    }
    const Passengers = await PassengerModel.find().skip(offset).limit(limit);
    const numberOfPassengers = await PassengerModel.countDocuments();
    res.render("home", {
      pagename,
      Passengers,
      numberOfPassengers,
      limit,
      page,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
export async function filterPassengers(req, res) {
  try {
    if (req.params.page) {
      page = req.params.page;
      offset = (page - 1) * limit;
    } else {
      page = 1;
      offset = (page - 1) * limit;
    }
    console.log(req.params);
    let chosenFilter = req.params.filter;
    let order = req.params.order;
    let sort = order === "ASC" ? 1 : -1;
    const Passengers = await PassengerModel.find()
      .sort({
        [chosenFilter]: sort,
      })
      .skip(offset)
      .limit(limit);
    const numberOfPassengers = await PassengerModel.countDocuments();
    res.render("home", {
      pagename,
      Passengers,
      numberOfPassengers,
      chosenFilter,
      order,
      limit,
      page,
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
