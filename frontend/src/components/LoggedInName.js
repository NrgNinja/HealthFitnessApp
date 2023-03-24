// import React from 'react';

// function LoggedInName()
// {

//     var _ud = localStorage.getItem('user_data');
//     var ud = JSON.parse(_ud);
//     // eslint-disable-next-line
//     var userId = ud.id;
//     var firstName = ud.firstName;
//     var lastName = ud.lastName;

//     const doLogout = event => 
//     {
//         event.preventDefault();

//         localStorage.removeItem("user_data")
//         window.location.href = '/';

//     };

//     return (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
//           <div id="loggedInDiv" style={{ textAlign: 'center' }}>
//             <span id="userName">Welcome Back, {firstName} {lastName}! It's Demon Time!</span><br />
//             <button type="button" id="logoutButton" class="buttons" onClick={doLogout}> Log Out </button>
//           </div>
//         </div>
//       );
      
// };


// export default LoggedInName;
