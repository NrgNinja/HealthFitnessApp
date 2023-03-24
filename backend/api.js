// require('express');
// require('mongodb');

// exports.setApp = function (app, client)
// {
//     // //load user model
//     // const User = require("./models/user.js");
//     // //load card model
//     // const Card = require("./models/card.js");

//     app.post('/api/addcard', async (req, res, next) =>
//     {
//         // incoming: userId, color
//         // outgoing: error

//         const { userId, card} = req.body;
//         // const { userId, card, jwtToken } = req.body;

//         // try
//         // {
//         //     if (token.isExpired(jwtToken))
//         //     {
//         //         var r = { error: 'The JWT is no longer valid', jwtToken: '' };
//         //         res.status(200).json(r);
//         //         return;
//         //     }
//         // }
//         // catch (e)
//         // {
//         //     console.log(e.message);
//         // }

//         const newCard = { Card: card, UserId: userId };
//         // const newCard = new Card({ Card: card, UserId: userId });
//         var error = '';
//         try 
//         {
//             const db = client.db('PracticeCardDatabase');
//             const result = db.collection('Cards').insertOne(newCard);
//             // newCard.save();
//         }
//         catch (e) 
//         {
//             error = e.toString();
//         }

//         // var refreshedToken = null;
//         // try
//         // {
//         //     refreshedToken = token.refresh(jwtToken);
//         // }
//         // catch (e)
//         // {
//         //     console.log(e.message);
//         // }

//         var ret = { error: error};
//         // var ret = { error: error, jwtToken: refreshedToken };

//         res.status(200).json(ret);
//     });

//     app.post('/api/login', async (req, res, next) => 
//     {
//         // incoming: login, password
//         // outgoing: id, firstName, lastName, error

//         var error = '';

//         const { login, password } = req.body;
//         const db = client.db('PracticeCardDatabase');
//         const results = await db.collection('Users').find({Login:login,Password:password}).toArray();
//         // const results = await User.find({ Login: login, Password: password });


//         var id = -1;
//         var fn = '';
//         var ln = '';
//         var error = '';
//         var ret;

//         if (results.length > 0)
//         {
//             id = results[0].UserID;
//             fn = results[0].FirstName;
//             ln = results[0].LastName;

//             // try
//             // {
//             //     const token = require("./createJWT.js");
//             //     ret = token.createToken(fn, ln, id);
//             // }
//             // catch (e)
//             // {
//             //     ret = { error: e.message };
//             // }
//         }
//         else
//         {
//             error = 'Login/Password Incorrect!';
//         }

//         var ret = { id: id, firstName: fn, lastName: ln, error: error };
//         res.status(200).json(ret);
//     });

//     // sign up API 
//     app.post('/api/register', async(req, res) => {

//         const { firstName, lastName, email, password} = req.body;
//         const newUser = new User ({ firstName, lastName, email, password });

//         newUser.save()
//             .then(() => res.status(201).send('User registered successfully'))
//             .catch(err => {
//                 console.error(err);
//                 res.status(500).send('Internal server error');
//             });
            
//     });

//     app.post('/api/searchcards', async (req, res, next) => 
//     {
//         // incoming: userId, search
//         // outgoing: results[], error

//         var error = '';

//         const { userId, search} = req.body;
//         // const { userId, search, jwtToken } = req.body;

//         // try
//         // {
//         //     if (token.isExpired(jwtToken))
//         //     {
//         //         var r = { error: 'The JWT is no longer valid', jwtToken: '' };
//         //         res.status(200).json(r);
//         //         return;
//         //     }
//         // }
//         // catch (e)
//         // {
//         //     console.log(e.message);
//         // }

//         var _search = search.trim();
//           const db = client.db('PracticeCardDatabase');
//           const results = await db.collection('NewCards').find({ "Card": { $regex: _search + '.*', $options: 'r' } }).toArray();
//         // const results = await Card.find({ "Card": { $regex: _search + '.*', $options: 'r' } });

//         var _ret = [];
//         for (var i = 0; i < results.length; i++)
//         {
//             _ret.push(results[i].Card);
//         }

//         // var refreshedToken = null;
//         // try
//         // {
//         //     refreshedToken = token.refresh(jwtToken);
//         // }
//         // catch (e)
//         // {
//         //     console.log(e.message);
//         // }

//         var ret = { results: _ret, error: error};
//         // var ret = { results: _ret, error: error, jwtToken: refreshedToken };

//         res.status(200).json(ret);
//     });
// }