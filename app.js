const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const mongo = require('mongodb')
var mongoclient = mongo.MongoClient
const port = 3000
const dburl = 'mongodb://localhost:27017'



mongoclient.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        console.error(err);
        process.exit(1);
        return
    }

    console.log(`Connected to ${dburl}`);
    const db = client.db("RawDB-dev")
    const cards = db.collection("cards")


    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(express.static('public'));

    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, 'public/index.html'))
    });

    app.get('/cards/*', function(req, res) {
        res.sendFile(path.join(__dirname, 'public/card.html'))
    });

    app.get('/carddata/:id', function(req, res) {
        var oid
        try {
            oid = mongo.ObjectID(req.params.id)
        } catch {
            res.send({ ok: false });
            return
        }
        cards.findOne({ _id: oid }, (err, result) => {
            if (err) {
                console.error(err);
                res.send({ ok: false });
                return
            }
            if (result === null) {
                res.send({ ok: false });
                return
            }

            result.ok = true
            res.send(result);


        })
    })

    app.post('/newEntry', function(req, res) {
        cards.insertOne(req.body, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            } else {
                console.log(result.ops)
                res.redirect('/newEntry.html');
            }
        })
    });

    app.get('/head/:lim', function(req, res) {
        var lim = parseInt(req.params.lim)
        if (lim === NaN) {
            res.sendStatus(401);
            return
        }
        cards.find({}).sort({ _id: -1 }).limit(lim).toArray((err, result) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            } else {
                res.send(result);
            }
        })
    })

    app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

});