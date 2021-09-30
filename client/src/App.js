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

  useEffect(() => {
    console.log("rendering");
    return () => {
      return;
    };
  }, [chat]);
  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = async (e) => {
    e.preventDefault();
    const { message } = state;
    socket.emit("message", { name: user, message });
    setState({ message: "" });
    await socket.on("message", ({ name, message }) => {
      let allchats = [...chat, { name, message }];
      setChat(allchats);
    });
  };

  const renderChat = () => {
    return (
      <div
        style={{
          overflowY: "auto",
          minHeight: "70vh",
          maxHeight: "70vh",
        }}
      >
        {chat.map(({ name, message }, index) => (
          <div key={index}>
            <p
              className="border border-info m-2 p-3"
              style={{
                width: "40vw",
                float: index % 2 === 0 ? "right" : "left",
                borderRadius: "10px",
              }}
            >
              <span className="bg-secondary text-white p-2 m-1">
                {" "}
                {name} 📢{" "}
              </span>{" "}
              {message}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Appbar user={user} />
      <div className="container mt-5">
        {user === "" ? <UserName setUser={setUser} /> : renderChat()}
        {user && (
          <form onSubmit={onMessageSubmit}>
            <div
              className="input-group mb-3"
              style={{
                position: "fixed",
                width: "80%",
                bottom: 0,
                height: "2.5rem",
              }}
            >
              <span className="input-group-text">Message:</span>
              <input
                type="text"
                className="form-control"
                aria-label="Amount (to the nearest dollar)"
                name="message"
                value={state.message}
                onChange={onTextChange}
                id="outlined-multiline-static"
              />
              <button
                className="btn btn-success"
                id="basic-addon2"
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default App;
