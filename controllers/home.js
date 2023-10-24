export default function home(req, res) {
  let pagename = "homepage";
  res.render("home", { pagename });
}
