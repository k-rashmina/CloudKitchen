const express = require("express");
const router = express.Router();
const userSignup = require("../controllers/signup");
const userSignin = require("../controllers/signin");
const userAuth = require("../middleware/authMiddleware");
const refreshToken = require("../middleware/refreshToken");
const userSignout = require("../controllers/signout");

router.post("/signup", userSignup);
router.post("/signin/restaurant-admin",userSignin(["restaurant-admin"]));
router.post("/signin/delivery",userSignin(["delivery"]));
router.post("/signin/customer",userSignin(["customer"]));
router.post("/refresh-token",refreshToken)
router.post("/signout",userSignout)



module.exports = router;
