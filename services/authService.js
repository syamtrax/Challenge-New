// services/authService.js

const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

async function authenticate(email, password) {
  const user = await userRepository.getUserByemail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign({ id: user.id, email: user.email }, "secret");
  return token;
}

module.exports = {
  authenticate,
};
