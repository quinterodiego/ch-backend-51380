import passport from 'passport'
import local from 'passport-local'
import GitHubStrategy from 'passport-github2'
import jwt from 'passport-jwt'

import { createHash, isValidPassword } from '../utils/index.js';
import { UserModel } from '../dao/models/user.js'

const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

function cookieExtractor(req) {
    console.log('Hola')
    console.log(req.cookies.token)
    let token = null

    if(req?.cookies?.token) {
        token = req.cookies.token
    }

    return token
}

export function iniPassport() {

    // passport.use(
    //     'login',
    //     new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    //     try {
    //         const user = await UserModel.findOne({ email: username })
    //         if (!user) {
    //         console.log('User Not Found with username (email) ' + username)
    //         return done(null, false)
    //         }
    //         console.log(isValidPassword(password, user.password))
    //         if (!isValidPassword(password, user.password)) {
    //         console.log('Invalid Password')
    //         return done(null, false)
    //         }

    //         return done(null, user)
    //     } catch (err) {
    //         return done(err)
    //     }
    //     })
    // )

    // passport.use(
    //     'register',
    //     new LocalStrategy(
    //     {
    //         passReqToCallback: true,
    //         usernameField: 'email',
    //     },
    //     async (req, username, password, done) => {
    //         try {
    //             const { email, firstname, lastname } = req.body
    //             let user = await UserModel.findOne({ email: username })
    //             if (user) {
    //                 console.log('User already exists')
    //                 return done(null, false)
    //             }
                
    //             const newUser = {
    //                 email,
    //                 firstname,
    //                 lastname,
    //                 isAdmin: false,
    //                 password: createHash(password),
    //             };
    //             let userCreated = await UserModel.create(newUser)
    //             console.log(userCreated)
    //             console.log('User Registration succesful')
    //             return done(null, userCreated)
    //         } catch (e) {
    //             console.log('Error in register')
    //             console.log(e)
    //             return done(e)
    //         }
    //     }
    //     )
    // )

    // passport.use(
    //     'github',
    //     new GitHubStrategy(
    //     {
    //         clientID: 'Iv1.45c12fee60b69add',
    //         clientSecret: '0b506fb745c5431994ec089eb3003ebfb3bc04ef',
    //         callbackURL: 'http://localhost:8080/auth/githubcallback'
    //     },
    //     async (accesToken, _, profile, done) => {
    //         try {
    //             const res = await fetch('https://api.github.com/user/emails', {
    //                 headers: {
    //                 Accept: 'application/vnd.github+json',
    //                 Authorization: 'Bearer ' + accesToken,
    //                 'X-Github-Api-Version': '2022-11-28',
    //                 },
    //             });
    //             const emails = await res.json();
    //             const emailDetail = emails.find((email) => email.verified == true);

    //             if (!emailDetail) {
    //                 return done(new Error('cannot get a valid email for this user'));
    //             }
    //             profile.email = emailDetail.email;

    //             let user = await UserModel.findOne({ email: profile.email });
    //             if (!user) {
    //                 const newUser = {
    //                 email: profile.email,
    //                 firstname: profile._json.name || profile._json.login || 'noname',
    //                 lastname: 'nolast',
    //                 isAdmin: false,
    //                 password: 'nopass',
    //                 };
    //                 let userCreated = await UserModel.create(newUser);
    //                 console.log('User Registration succesful');
    //                 return done(null, userCreated);
    //             } else {
    //                 console.log('User already exists');
    //                 return done(null, user);
    //             }
    //         } catch (e) {
    //             console.log('Error en auth github');
    //             console.log(e);
    //             return done(e);
    //         }
    //     }
    //     )
    // );

    passport.use(
        'jwt',
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
                secretOrKey: 'DiegoQuintero'
            },
            async (jwt_payload, done) => {
                try {
                    return done(null, jwt_payload)
                } catch (e) {
                    return done(e)
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById(id);
        done(null, user);
    });
}
