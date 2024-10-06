const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const stuffRoutes = require('./routes/stuff');
const app = express();

mongoose.connect('mongodb+srv://alexandre:Txf7zow8J307dwmQ@cluster0.k98hw.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//middleware qui capture le corps des requêtes et les transforme en objet JSON
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/stuff', stuffRoutes);


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