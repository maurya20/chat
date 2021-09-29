import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";
import { Appbar } from "./components/Appbar";
import { UserName } from "./components/UserName";
const socket = io.connect("http://localhost:4000", {
  transports: ["websocket"],
});
function App() {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);
  const [user, setUser] = useState("");
  console.log("/////", user);
  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      setChat([...chat, { name: user, message }]);
    });
  });

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    socket.emit("message", { name, message });
    setState({ message, name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <>
      <Appbar user={user} />
      <div className="container mt-5">
        {user === "" ? <UserName setUser={setUser} /> : renderChat()}
        <form onSubmit={onMessageSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text">Message:</span>
            <input
              type="text"
              className="form-control"
              aria-label="Amount (to the nearest dollar)"
              name="message"
              onChange={(e) => onTextChange(e)}
              value={state.message}
              id="outlined-multiline-static"
            />
            <button className="btn btn-success" id="basic-addon2" type="submit">
              Send
            </button>
          </div>
        </form>
        <div className="render-chat"></div>
      </div>
    </>
  );
}

export default App;
