const router = require("express").Router();
const { User, Repo, Quest, Playerstat } = require("../db");

//  api/auth/login
router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

//  api/auth/signup
router.post("/signup", async (req, res, next) => {
  try {
    console.log("req body", req.body);
    const user = await User.findOne({
      where: {
        email: req.body.email.toLowerCase(),
      },
    });
    if (user && !user.password) {
      await user.update({
        password: req.body.password,
      });
     return res.send({ token: await user.generateToken() });
    }
    if (!user) {
      throw new Error("user not found");
    }
  } catch (err) {
    if (err.message === "user exists") {
      res.status(401).send("This user already has an account");
    } else if (err.message === "user not found") {
      res.status(401).send("You must install GitQuest first!");
    } else {
      next(err);
    }
  }
});

// api/auth/me
router.get("/me", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(user)
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
