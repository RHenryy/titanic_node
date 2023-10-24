export default function destroySession(req, res) {
  res.locals = {};
  req.session.destroy(function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.redirect("/?disconnect=true");
    }
  });
}
