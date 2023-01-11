'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConfigSchema = Schema({
    categoria: [{type: Object, required: true}],
    titulo: {type: String, required: true},
    logo: {type: String, required: true},
    serie: {type: String, required: true},
    correlativo: {type: String, required: true}
   
});

module.exports = mongoose.model('config',ConfigSchema);