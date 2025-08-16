const jwt = require("jsonwebtoken");

async function Login(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send({ message: "All Fields are required!" });

  if (
    email != process.env.ADMIN_EMAIL ||
    password != process.env.ADMIN_PASSWORD
  )
    return res.status(400).send({ message: "Invalid Credentials" });

  const token = jwt.sign({ isAuth: true }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res
    .status(200)
    .send({ message: "logged-in successfully.....", token: token });
}

module.exports = { Login };
