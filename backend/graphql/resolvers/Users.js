const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { UserInputError } = require("apollo-server")
const { validateRegisterInput, validateLoginInput } = require("../../utils/validators")

const generateToken = (user) => jwt.sign(
  {
    id: user.id,
    email: user.email,
    username: user.username,
  },
  process.env.SECRET_KEY,
  { expiresIn: "1h" }
);

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password)
      if (!valid) {
        throw new UserInputError("Errors", { errors })
      }
      const user = await User.findOne({ username })
      if (!user) {
        errors.general = 'User nor found'
        throw new UserInputError("user nor found", { errors })
      }
      const match = await bcrypt.compare(password, user.password)
      const token = generateToken(user)

      if (!match) {
        errors.general = 'Wrong credentials'
        throw new UserInputError("Wrong credentials", { errors })
      }
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      const { errors, valid } = validateRegisterInput(username, email, password, confirmPassword)
      if (!valid) {
        throw new UserInputError("Errors", { errors })
      }
      const user = await User.findOne({ username })
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken'
          }
        })
      }
      // TODO: Hash password and create an auth token
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        username,
        email,
        password,
      });
      const res = await newUser.save();
      const token = generateToken(res)
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
