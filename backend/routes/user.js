const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

//on utilise une méthode post pour créer un nouvel utilisateur
router.post('/signup', userCtrl.signup);
//on utilise une méthode post pour connecter un utilisateur existant
router.post('/login', userCtrl.login);

module.exports = router;