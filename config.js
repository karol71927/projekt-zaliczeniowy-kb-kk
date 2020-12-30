require('dotenv').config()

module.exports = {
    jwtSecret: process.env.JWTSECRET,
    cookiesSecret: process.env.COOKIESECRET,
    cookiesOptions: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'None',
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        signed: false,
    }
}