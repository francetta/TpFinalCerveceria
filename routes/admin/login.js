var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next){
    res.render('admin/login', {
        layout: 'admin/layout',
        persona: req.session.nombre
    });
});


var usuariosModels = require ('./../../models/usuariosModels');

router.post('/', async (req, res, next) => {
    try{
        var usuario = req.body.usuario;
        var password = req.body.password;

        var data = await 
    usuariosModels.getUserByUserNameAndPassword(usuario, password);
        if(data != undefined) {
            
            req.session.id_usuario = data.id;
            req.session.nombre = data.usuario;
            req.redirect('/admin/novedades');
        } else {
            res.render('admin/novedades', {
                layout: 'admin/layout',
                error: true
            });
        }
    } catch (error){
        console.log(error);
    }
})
router.get('/logout', function (req, res, next){
    req.session.destroy();
    res.render('/admin/login', {
        layout: 'admin/layout'

    });
});

module.exports = router;