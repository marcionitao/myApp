/**
 * Created by Marcio on 08/02/2015.
 */
module.exports = function(app){
    var usuarios = app.controllers.usuarios;
    
    app.get('/usuarios', usuarios.index);
    app.get('/usuarios/create', usuarios.create);
    app.post('/usuarios', usuarios.insert);
    app.get('/usuarios/edit/:id', usuarios.edit);
    app.post('/usuarios/edit/:id', usuarios.update);
    app.get('/usuarios/show/:id', usuarios.show);
    app.post('/usuarios/delete/:id', usuarios.remove);
};