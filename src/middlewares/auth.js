const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../model/user.model');
const UnauthorizedException = require("../exceptions/unauthorized.exception");
const ForbiddenException = require("../exceptions/forbidden.exception");

const roles = ['user','admin'];

module.exports = ({required, roles = roles} = {}) => (req, res, next) => {
    const token = req.cookies.auth
    if (!token) throw new UnauthorizedException();
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, config.jwtSecret);
    } catch {
        throw new UnauthorizedException('Wrong token');
    }

    const user = {
        ID_user: decodedToken.sub,
        status: decodedToken.role,
        login: decodedToken.login
    }

    if ((required && !user) || (required && !~roles.indexOf(user.status))) {
        throw new ForbiddenException();
    }

    req.user = user;
    next();
};