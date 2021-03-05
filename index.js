const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID



MongoClient.connect('mongodb://localhost:27017/mongodb', {
  useUnifiedTopology: true})
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('mongodb')
        const cdsCollection = db.collection('cds')

        app.set('view engine','ejs')
        const path = require('path');
        app.use(express.static(path.join(__dirname, 'scripts')))
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json())

        app.listen(8090, function() {
            console.log('listening on 8090')
        })

        app.get('/product', (req, res) => {
            cdsCollection.find().toArray()
                .then(results => {
                    res.render('template.ejs', { cds: results });
            });
        });
        app.post('/product', (req, res) => {
            cdsCollection.insertOne(req.body, (err, result) => {
                if (err) return console.log("Error: " + err);
            console.log("Successfully saved on the database!");
            res.redirect('/product');
            cdsCollection.find().toArray((err, results) => {
                console.log(results);
                });
            });
        })
        // EDIT
        app.put('/product/:id', (req, res) => {
            cdsCollection.findOneAndUpdate(
                 { _id: ObjectId(req.body._id) }, 
                 {
                   $set: {
                    _id: ObjectId(req.body._id),
                    Title: req.body.Title,
                    Artist: req.body.Artist,
                    Genre: req.body.Genre
                   }
                 },
                 {
                   upsert: true
                 }, (err, result) => {
                    if (err) return res.send(err);
                console.log("Successfully Updated!");
                return res.send({status:1});
                })
            })
        //DELETE
        app.delete('/product/:id',(req,res)=> {
            cdsCollection.deleteOne({ _id: ObjectId(req.body._id) }, (err, result) => {
                if (err) return res.send(err);
                // res.redirect('/product');
                console.log("successful delete")
                return res.send({status:1});
            })
        })  
    })