import React, { useState } from 'react';
// import { useJwt } from 'react-jwt';
// import axios from 'axios';

function Login()
{
    // let bp = require('./Path.js');
    // var storage = require('../tokenStorage.js');

    var loginName;
    var loginPassword;

    const [message, setMessage] = useState('');

    const app_name = 'cop4331-cards-app'
    // eslint-disable-next-line
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

    const doLogin = async event => 
    {
        event.preventDefault();

        let obj = { login: loginName.value, password: loginPassword.value };
        let js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/login'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            var res = JSON.parse(await response.text());

            if (res.id <= 0)
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = { firstName: res.firstName, lastName: res.lastName, id: res.id }
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/cards';
            }
        }
        catch (e)
        {
            alert(e.toString());
            return;
        }

        // var config =
        // {
        //     method: 'post',
        //     url: bp.buildPath('api/login'),
        //     headers:
        //     {
        //         'Content-Type': 'application/json'
        //     },
        //     data: js
        // };

        // axios(config)
        //     .then(function (response) 
        //     {
        //         var res = response.data;
        //         if (res.error) 
        //         {
        //             setMessage('User/Password combination incorrect');
        //         }
        //         else 
        //         {
        //             storage.storeToken(res);
        //             var jwt = require('jsonwebtoken');

        //             var ud = jwt.decode(storage.retrieveToken(), { complete: true });
        //             var userId = ud.payload.userId;
        //             var firstName = ud.payload.firstName;
        //             var lastName = ud.payload.lastName;

        //             var user = { firstName: firstName, lastName: lastName, id: userId }
        //             localStorage.setItem('user_data', JSON.stringify(user));
        //             window.location.href = '/cards';
        //         }
        //     })
        //     .catch(function (error) 
        //     {
        //         console.log(error);
        //     });
    };

    // return (
    //     <div id="loginDiv">
    //         <form onSubmit={doLogin}>
    //             <span id="inner-title">IT'S GRIND TIME BABY!</span><br />
    //             <input type="text" id="loginName" placeholder="Username"
    //                 ref={(c) => loginName = c} /><br />
    //             <input type="password" id="loginPassword" placeholder="Password"
    //                 ref={(c) => loginPassword = c} /><br />
    //             <input type="submit" id="loginButton" class="buttons" value="Log In"
    //                 onClick={doLogin} />
    //             <input type="submit" id="registerButton" class="buttons" value="Register"/>
    //         </form>
    //         <span id="loginResult">{message}</span>
    //     </div>
    // );

    // return (
    //     <div id="loginDiv" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //       <form onSubmit={doLogin} style={{ textAlign: 'center' }}>
    //         <span id="inner-title">IT'S GRIND TIME BABY!</span><br />
    //         <input type="text" id="loginName" placeholder="Username"
    //           ref={(c) => loginName = c} /><br />
    //         <input type="password" id="loginPassword" placeholder="Password"
    //           ref={(c) => loginPassword = c} /><br />
    //         <input type="submit" id="loginButton" class="buttons" value="Log In"
    //           onClick={doLogin} />
    //         <input type="submit" id="registerButton" class="buttons" value="Register"/>
    //       </form>
    //       <span id="loginResult">{message}</span>
    //     </div>
    //   );
    return (
        <div id="loginDiv" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', marginTop: '-110px' }}>
           <form onSubmit={doLogin} style={{ textAlign: 'center' }}>
              <span id="inner-title">IT'S GRIND TIME BABY!</span><br />
              <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br />
              <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
              <input type="submit" id="loginButton" class="buttons" value="Log In" onClick={doLogin} />
              <input type="submit" id="registerButton" class="buttons" value="Register"/>
           </form>
           <span id="loginResult">{message}</span>
        </div>
     );     
};

export default Login;
