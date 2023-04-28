import React from 'react';

const LogoutButton = ({ onLogout }) => {
  return (
    <button onClick={onLogout}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="lightgrey" d="M0 0h24v24H0z"/>
        <path d="M9 16.2l-.8-.8 2.4-2.4H3v-1.6h7.6l-2.4-2.4.8-.8L12 12zM20 3H6c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H6V5h14v14z"/>
      </svg>
    </button>
  );
};

export default LogoutButton;
