const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')
const { User } = require('../models')
const { permissionRolesEnum } = require('../utils/enums')
passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  // Find in DB and return user
  User.findById(id, (err, user) => {
    if (err) {
      console.error('err')
      done(err)
    }
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.OAUTH_CALLBACK_URI
    },
    (accessToken, refreshToken, profile, cb) => {
      // find the user in the database based on their facebook id
      User.findOne({ userId: profile.id }, async (err, user) => {
        if (err) {
          return cb(err)
        }

        if (user) {
          return cb(null, user)
        }
        const newUser = await new User({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          userId: profile.id,
          propicUrl: profile.photos[0].value,
          email: profile.emails[0].value,
          role: permissionRolesEnum.PENDING
        }).save()

        cb(null, newUser)
      })
    }
  )
)
