import React, { useState } from 'react';
// import { useJwt } from "react-jwt";
// import axios from 'axios';

function CardUI()
{
    // let bp = require('./Path.js');

    const app_name = 'cop4331-cards-app'
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + app_name + '.herokuapp.com/' + route;
        }
        else
        {
            return 'http://localhost:5001/' + route;
        }
    }

    var card = '';
    var search = '';

    const [message, setMessage] = useState('');
    const [searchResults, setResults] = useState('');
    const [cardList, setCardList] = useState('');

    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;
    // let userId = ud.userId;
    // eslint-disable-next-line
    let firstName = ud.firstName;
    // eslint-disable-next-line
    let lastName = ud.lastName;

    const addCard = async event => 
    {
        event.preventDefault();

        let obj = { userId: userId, card: card.value };
        let js = JSON.stringify(obj);

        // let storage = require('../tokenStorage.js');
        // var obj = { userId: userId, card: card.value, jwtToken: storage.retrieveToken() };
        // var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/addcard'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            let txt = await response.text();
            let res = JSON.parse(txt);

            if (res.error.length > 0)
            {
                setMessage("API Error:" + res.error);
            }
            else
            {
                setMessage('Custom workout added!');
                // storage.storeToken(res);
            }
        }
        catch (e)
        {
            setMessage(e.toString());
        }
    };

    const searchCard = async event => 
    {
        event.preventDefault();

        // let storage = require('../tokenStorage.js');
        let obj = { userId: userId, search: search.value};
        // let obj = { userId: userId, search: search.value, jwtToken: storage.retrieveToken() };
        let js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/searchcards'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            let txt = await response.text();
            let res = JSON.parse(txt);
            let _results = res.results;
            let resultText = '';
            for (var i = 0; i < _results.length; i++)
            {
                resultText += _results[i];
                if (i < _results.length - 1)
                {
                    resultText += ', ';
                }
            }
            setResults('Here are a list of workouts that match your search:');
            setCardList(resultText);
            // storage.storeToken(res);
        }
        catch (e)
        {
            console.log(e.toString());
            setResults(e.toString());
            // storage.storeToken(res.jwtToken);
        }
    };

    // return (
    //     <div id="cardUIDiv">
    //         <br />
    //         <input type="text" id="searchText" placeholder="Muscle to Search For"
    //             ref={(c) => search = c} />
    //         <button type="button" id="searchCardButton" class="buttons"
    //             onClick={searchCard}> Search Workouts</button><br />
    //         <span id="cardSearchResult">{searchResults}</span>
    //         <p id="cardList">{cardList}</p><br /><br />
    //         <input type="text" id="cardText" placeholder="Workout To Add"
    //             ref={(c) => card = c} />
    //         <button type="button" id="addCardButton" class="buttons"
    //             onClick={addCard}> Add Workout </button><br />
    //         <span id="cardAddResult">{message}</span>
    //     </div>
    // );
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
          <br />
          <input type="text" id="searchText" placeholder="Muscle to Search For"
            ref={(c) => search = c} />
          <button type="button" id="searchCardButton" class="buttons"
            onClick={searchCard}> Search Workouts</button><br />
          <span id="cardSearchResult">{searchResults}</span>
          <p id="cardList">{cardList}</p><br /><br />
          <input type="text" id="cardText" placeholder="Workout To Add"
            ref={(c) => card = c} />
          <button type="button" id="addCardButton" class="buttons"
            onClick={addCard}> Add Workout </button><br />
          <span id="cardAddResult">{message}</span>
        </div>
      );      
}

export default CardUI;
