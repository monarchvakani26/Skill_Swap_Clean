import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';

import FacebookStrategy from "passport-facebook";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

// 🔐 Local strategy (email + password)
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: "Incorrect password" });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// 🌐 Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          const existingByEmail = await User.findOne({ email: profile.emails[0].value });
          if (existingByEmail) {
            existingByEmail.googleId = profile.id;
            await existingByEmail.save();
            return done(null, existingByEmail);
          }

          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            password: "social-login", // optional placeholder
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// 💼 LinkedIn Strategy
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: "/auth/linkedin/callback",
      scope: ["r_emailaddress", "r_liteprofile"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ linkedinId: profile.id });
        if (!user) {
          const existingByEmail = await User.findOne({ email: profile.emails[0].value });
          if (existingByEmail) {
            existingByEmail.linkedinId = profile.id;
            await existingByEmail.save();
            return done(null, existingByEmail);
          }

          user = await User.create({
            linkedinId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            password: "social-login",
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// 📘 Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let email = profile.emails?.[0]?.value;
        let user = await User.findOne({ facebookId: profile.id });

        if (!user) {
          const existingByEmail = email ? await User.findOne({ email }) : null;
          if (existingByEmail) {
            existingByEmail.facebookId = profile.id;
            await existingByEmail.save();
            return done(null, existingByEmail);
          }

          user = await User.create({
            facebookId: profile.id,
            name: profile.displayName,
            email,
            password: "social-login",
          });
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// ✅ Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// ✅ Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
