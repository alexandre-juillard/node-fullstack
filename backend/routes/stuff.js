const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const Thing = require('../models/thing');
const stuffCtrl = require('../controllers/stuff');

//Crée un objet
router.post('/', auth, stuffCtrl.createThing);

//Récupère tous les objets
router.get('/', auth, stuffCtrl.getAllThings);

//Récupère un objet spécifique
router.get('/:id', auth, stuffCtrl.getOneThing);

//Modifie un objet
router.put('/:id', auth, stuffCtrl.updateOneThing);

//Supprime un objet
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;