import { Router } from "express";
import { handleSocialLogin } from "../controller/user.controllers.js";
import passport from 'passport';
import "../passport/index.js"

const router = Router()

router.route("/google").get(
    passport.authenticate("google", {
      scope: ["profile", "email"],
    }),
    (req, res) => {
      res.send("redirecting to google...");
    }
  );

router.route('/google/callback').get(passport.authenticate("google"),handleSocialLogin)

export default router;