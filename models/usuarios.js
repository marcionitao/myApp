/**
 * Created by Marcio on 08/02/2015.
 */

module.exports = function(){
    var mongoose = require('mongoose');
    var Schema   = mongoose.Schema;

    var usuario = new Schema({
        nome: String,
        login: String,
        senha: String,
        data_cad: {type: Date, default: Date.now}
    });

    return mongoose.model('Usuarios', usuario);
}
