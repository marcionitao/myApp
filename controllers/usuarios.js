/**
 * Created by Marcio on 08/02/2015.
 */
var moment = require('moment');

module.exports = function(app){

    var Usuario = app.models.usuarios;

    var UsuarioController = {
        //lista os dados na tela
        index: function(req,res){
            //para pegar todos os registos do banco
            Usuario.find(function(err, data){
                if (err){
                    console.log(err);
                }
                //se não houver erro, uma pagina será chamada com os dados de 'lista'
                res.render("usuarios/index", {lista: data, moment: moment});
            });
        },
        //criar um novo registo, ou seja, chama a pagina para criar o registo
        create: function(req,res){
            res.render("usuarios/create");
        },
        //insere no banco de facto
        insert: function(req,res){
            var model = new Usuario();
            model.nome     = req.body.nome;
            model.login    = req.body.login;
            model.senha     = req.body.senha;

            model.save(function(err){
                if(err){
                    console.log(err);
                }
                req.flash('info','Usuário cadastrado com sucesso!');
                res.redirect('/usuarios');
            });
        },

        edit: function(req,res){
            Usuario.findById(req.params.id, function(err, data){
                if(err){
                    console.log(err);
                }else{
                    //'value', referente a edit.jade
                    res.render('usuarios/edit', {value: data});
                }
            });
        },

        update: function(req,res){
            Usuario.findById(req.params.id, function(err, data){
                if(err){
                    console.log(err);
                }else{
                    var model   = data;
                    model.nome  = req.body.nome;
                    model.login = req.body.login;
                    model.save(function(err){
                        if(err){
                            req.flash('erro', 'Erro ao editar: '+err);
                            res.render('usuarios/edit', {value: model});
                        }else{
                            req.flash('info', 'Usuário atualizado com sucesso!');
                            res.redirect('/usuarios');
                        }
                    });
                }
            });
        },

        show: function(req,res){
            Usuario.findById(req.params.id, function(err, data){
                if(err){
                    console.log(err);
                }else{
                    res.render('usuarios/show', {value: data});
                }
            });
        },

        remove: function(req,res){
            Usuario.remove({_id: req.params.id}, function(err){
                if (err){
                    req.flash('erro', 'Erro ao excluir usuário: '+err);
                    res.redirect('/usuarios');
                }else{
                    req.flash('info', 'Usuário excluído com sucesso!');
                    res.redirect('/usuarios');
                }
            });
        }
    }

    return UsuarioController;
}

