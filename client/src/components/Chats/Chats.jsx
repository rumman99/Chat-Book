import React from 'react';

const Chats = () => {
    const userDetailsFromSession= JSON.parse(sessionStorage.getItem('user'));
    return (
        <div>
            Chats
            {userDetailsFromSession && <h1>{userDetailsFromSession.name}</h1>}
            {userDetailsFromSession && <img src={userDetailsFromSession.photo} alt="User Photo" />}
            <button></button>
        </div>
    );
};

export default Chats;