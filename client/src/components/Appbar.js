import React from "react";

export const Appbar = ({ user }) => {
  return (
    <nav className="navbar fixed-top navbar-light bg-dark mb-5 p-2">
      <div className="container-fluid">
        <strong className="text-white">Messenger</strong>
        {user && <strong className="text-white">Chatting as, {user}</strong>}
      </div>
    </nav>
  );
};
