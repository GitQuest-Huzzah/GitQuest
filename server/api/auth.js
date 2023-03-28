const router = require("express").Router();
const { User } = require("../db");

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
        const [user, created] = await User.findOrCreate({
            where: {
                email: req.body.email,
            }
        });
        if(!user.password){
           await user.update({
            password: req.body.password
           }) 
           res.send({ token: await user.generateToken() });
        }
        throw new Error('user exists')
    } catch (err) {
        if (err.message === "user exists") {
            res.status(401).send("This user already has an account");
        } else {
            next(err);
        }
    }
});

// api/auth/me
router.get("/me", async (req, res, next) => {
    try {
        console.log(req)
        res.send(await User.findByToken(req.headers.authorization));
    } catch (ex) {
        next(ex);
    }
});

module.exports = router;
