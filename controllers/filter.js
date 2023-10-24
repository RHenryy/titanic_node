export async function filter(req, res) {
  let chosenFilter =
    req.params.filter.charAt(0).toUpperCase() + req.params.filter.slice(1);
  try {
    res.render("filter", { filter: chosenFilter });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
