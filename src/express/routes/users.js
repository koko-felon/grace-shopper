const usersRouter = require("express").Router();
const { requireUser } = require("./utils");
const { getUserByEmail, createUser } = require("../db/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

usersRouter.get("/auth", requireUser, (req, res, next) => {
  console.log("inside /authenticate");
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
    const passwordsMatch = bcrypt.compare(password, user.password);
    console.log("USER IN OUR LOGIN ROUTE", user);
    if (passwordsMatch) {
      const token = jwt.sign(
        {
          id: user.id,
          user: email,
        },
        process.env.JWT_SECRET
      );
      res.send({ message: "you're logged in!", token: token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  try {
    const _user = await getUserByEmail(email);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user by that email already exists",
      });
    }
    console.log("About to create user....");
    const user = await createUser({
      email,
      phoneNumber,
      password,
      firstName,
      lastName,
    });

    console.log("user in after made:", user);

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
    console.log("TOKEEE", token);
    res.send({
      message: "Thank you for signing up",
      token,
    });
  } catch (error) {
    console.error(error);
    next(error);
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
