import React, { useState } from "react";

export const UserName = ({ setUser }) => {
  const [input, setInput] = useState("");
  return (
    <div>
      <h3>Enter username to start chat...</h3>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          aria-label="username"
          aria-describedby="basic-addon2"
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="btn btn-success"
          id="basic-addon2"
          onClick={(e) => setUser(input)}
        >
          Enter
        </button>
      </div>
    </div>
  );
};
