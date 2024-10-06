const express = require('express');
const router = express.Router();

const Thing = require('../models/thing');
const stuffCtrl = require('../controllers/stuff');

//Crée un objet
router.post('/', stuffCtrl.createThing);

//Récupère tous les objets
router.get('/', stuffCtrl.getAllThings);

//Récupère un objet spécifique
router.get('/:id', stuffCtrl.getOneThing);

//Modifie un objet
router.put('/:id', stuffCtrl.updateOneThing);

//Supprime un objet
router.delete('/:id', stuffCtrl.deleteThing);

module.exports = router;