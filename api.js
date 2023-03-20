// renato
require('express');
require('mongodb');

exports.setApp = function (app, client) {
    app.post('/api/addcard', async (req, res, next) => {
        // incoming: userId, color
        // outgoing: error

        // const { userId, card } = req.body;
        let token = require('./createJWT.js');
        const { userId, card, jwtToken } = req.body;

        try {
            if (token.isExpired(jwtToken)) {
                var r = { error: 'The JWT is no longer valid', jwtToken: '' };
                res.status(200).json(r);
                return;
            }
        }
        catch (e) {
            console.log(e.message);
        }


        const newCard = { Card: card, UserId: userId };
        var error = '';

        try {
            const db = client.db('PracticeCardDatabase');
            const result = db.collection('NewCards').insertOne(newCard);
        }
        catch (e) {
            error = e.toString();
        }

        var refreshedToken = null;
        try {
            refreshedToken = token.refresh(jwtToken);
        }
        catch (e) {
            console.log(e.message);
        }

        // var ret = { error: error };
        var ret = { error: error, jwtToken: refreshedToken };
        res.status(200).json(ret);
    });

    app.post('/api/login', async (req, res, next) => {
        // incoming: login, password
        // outgoing: id, firstName, lastName, error

        var error = '';

        const { login, password } = req.body;

        const db = client.db("PracticeCardDatabase");
        const results = await db.collection('Users').find({ Login: login, Password: password }).toArray();

        var id = -1;
        var fn = '';
        var ln = '';

        if (results.length > 0) {
            id = results[0].UserID;
            fn = results[0].FirstName;
            ln = results[0].LastName;

            try {
                const token = require("./createJWT.js");
                ret = token.createToken(fn, ln, id);
            }
            catch (e) {
                ret = { error: e.message };
            }

        }
        else {
            ret = { error: "Login/Password incorrect" };
        }

        // var ret = { id: id, firstName: fn, lastName: ln, error: '' };
        res.status(200).json(ret);
    });


    app.post('/api/searchcards', async (req, res, next) => {
        // incoming: userId, search
        // outgoing: results[], error

        var error = '';
        const { userId, search, jwtToken } = req.body;

        try {
            if (token.isExpired(jwtToken)) {
                var r = { error: 'The JWT is no longer valid', jwtToken: '' };
                res.status(200).json(r);
                return;
            }
        }
        catch (e) {
            console.log(e.message);
        }

        let _search = search.trim();

        const db = client.db('PracticeCardDatabase');
        const results = await db.collection('NewCards').find({ "Card": { $regex: _search + '.*', $options: 'r' } }).toArray();

        let _ret = [];
        for (var i = 0; i < results.length; i++) {
            _ret.push(results[i].Card);
        }

        var refreshedToken = null;
        try {
            refreshedToken = token.refresh(jwtToken);
        }
        catch (e) {
            console.log(e.message);
        }

        var ret = { results: _ret, error: error, jwtToken: refreshedToken };
        res.status(200).json(ret);
    });
}

