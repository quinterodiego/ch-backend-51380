import passport from 'passport'
import local from 'passport-local'
import jwt from 'passport-jwt'

import { createHash } from '../utils/index.js';
import { UserModel } from '../dao/models/user.js'
import { cartController } from '../controllers/carts.controller.js';

const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

function cookieExtractor(req) {
    let token = null

    if(req?.cookies?.token) {
        token = req.cookies.token
    }

    return token
}

export function iniPassport() {

    passport.use(
        'register',
        new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email',
        },
        async (req, username, password, done) => {
            try {
                const { email, firstname, lastname, age } = req.body
                let user = await UserModel.findOne({ email: username })
                if (user) {
                    console.log('User already exists')
                    return done(null, false)
                }
                
                const createdCart = await cartController.createCart()
                const { _id } = createdCart

                const newUser = {
                    email,
                    firstname,
                    lastname,
                    age,
                    cart: _id,
                    password: createHash(password),
                };
                let userCreated = await UserModel.create(newUser)
                console.log(userCreated)
                console.log('User Registration succesful')
                return done(null, userCreated)
            } catch (e) {
                console.log('Error in register')
                console.log(e)
                return done(e)
            }
        }
        )
    )

    passport.use(
        'current',
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
