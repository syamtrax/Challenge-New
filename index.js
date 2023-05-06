// app.js
const PORT = 8080;
const express = require("express");
//const Route = require("./Routes/Route");
const userService = require("./services/userService");
var bodyParser = require("body-parser");

const app = express();
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }
  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
}

app.post("/register", async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await userService.register(name, email, password, role);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

app.post("/logins", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

app.get("/protected", authenticate, (req, res) => {
  res.send(`Welcome, ${req.user.email}!`);
});
//app.use(Route);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("An error occurred");
});

app.listen(PORT, () => {
  console.log(`App Running on http://localhost:${PORT}`);
});
