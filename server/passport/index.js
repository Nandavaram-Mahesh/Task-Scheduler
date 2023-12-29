import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});

try {
  passport.serializeUser((user, next) => {
    next(null, user._id);
  });

  passport.deserializeUser(async (id, next) => {
    try {
      const user = await User.findById(id);
      if (user) next(null, user); // return user of exist
      else next(new ApiError(404, "User does not exist"), null); // throw an error if user does not exist
    } catch (error) {
      next(
        new ApiError(
          500,
          "Something went wrong while deserializing the user. Error: " + error
        ),
        null
      );
    }
  });

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (_, __, profile, next) => {
        console.log(profile)
        // Check if the user with email already exist
        const user = await User.findOne({ email: profile._json.email });
        
        if (user) {
            // If user is registered with the same login method we will send the saved user
            next(null, user);
        
        } else {
          // ~If user with email does not exists, means the user is coming for the first time
          const createdUser = await User.create({
            email: profile._json.email,
            password: profile._json.sub, // Set user's password as sub (coming from the google)
            username: profile._json.email?.split("@")[0], // as email is unique, this username will be unique
          });
          if (createdUser) {
            next(null, createdUser);
          } else {
            next(new ApiError(500, "Error while registering the user"), null);
          }
        }
      }
    )
  );
} catch (error) {
  console.error("PASSPORT ERROR: ", error);
}
