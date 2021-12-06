const usersRouter = require("express").Router();
const { requireUser } = require("./utils");
const { getUserByEmail } = require("../db/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

usersRouter.get("/authenticate", requireUser, (req, res, next) => {
  res.send({ success: true, user: req.user });
});

// POST /api/users/login

usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
  }

  try {
    const user = await getUserByEmail(email);

    if (user && user.password == password) {
      const token = jwt.sign(
        {
          id: user.id,
          user: email,
        },
        JWT_SECRET
      );
      res.send({ message: "you're logged in!", token: token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "email or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
  const { email, phoneNumber, password, firstName, lastName } = req.body;

  try {
    const _user = await getUserByEmail(email);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user by that email already exists",
      });
    } else if (password.length < 8) {
      next({
        name: "PasswordLengthError",
        message: "Password must be at least 6 characters",
      });
    }

    const user = await createUser({
      email,
      phoneNumber,
      password,
      firstName,
      lastName,
    });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "Thank you for signing up",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// get all users
usersRouter.get("/", async (req, res, next) => {
  try {
    res.send("here is a test");
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
