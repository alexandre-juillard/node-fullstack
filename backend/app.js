const express = require('express');
const mongoose = require('mongoose');

const app = express();
const Thing = require('./models/thing');

mongoose.connect('mongodb+srv://alexandre:Txf7zow8J307dwmQ@cluster0.k98hw.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//middleware qui capture le corps des requêtes et les transforme en objet JSON
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//Crée un objet
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});

//Récupère tous les objets
app.get('/api/stuff', (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

//Récupère un objet spécifique
app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});

//Modifie un objet
app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

//Supprime un objet
app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});


module.exports = app;


//on importe express
//on importe mongoose pour se connecter à la base de données
//on stocke express dans la constante app
//on se connecte à la base de données avec mongoose.connect
//on exporte app pour l'utiliser dans d'autres fichiers
//on utilise app.use pour créer une route qui renvoie un objet JSON
//on utilise app.get pour créer une route qui renvoie un tableau d'objets

//avec next() on passe à la fonction suivante
//cela permet de chaîner les middlewares