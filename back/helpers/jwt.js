'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'camus';

exports.createToken = function(user){
    var payload ={
        sub:user._id,
        nombre: user.nombre,
        apelidos: user.apelidos,
        email: user.email,
        role: user.rol,
        iat: moment().unix(),
        exp: moment().add(7,'days').unix()
    }

    return jwt.encode(payload,secret);
}