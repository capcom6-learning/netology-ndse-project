const passport = require("passport");
const LocalStrategy = require("passport-local");
const { UserModule } = require("../users");
const { AuthenticationError } = require("../errors");

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, async (email, password, done) => {
    const user = await UserModule.authorize(email, password);
    if (!user) {
        return done(null, false, { message: "Incorrect email or password" });
    }
    return done(null, user);
}));



passport.serializeUser((user, done) => {
    process.nextTick(() => {
        done(null, { id: user.id, name: user.name });
    });

});

passport.deserializeUser((user, done) => {
    process.nextTick(() => {
        done(null, user);
    });
});

module.exports = {
    authByCredentials: (req, res, next) => {
        passport.authenticate("local", async (err, user, info, status) => {
            if (err) { return next(err) }
            if (!user) { return next(new AuthenticationError(info.message)) }

            req.logIn(user, async (err) => {
                if (err) { return next(err) }
                return next();
            });

            // next();
        })(req, res, next);
    },
    authBySession: passport.authenticate("session"),
    requireUser: (req, res, next) => {
        if (!req.user) {
            next(new AuthenticationError("User is not authorized"));
            return;
        }
        next();
    }
};