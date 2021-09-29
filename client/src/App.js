import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";
import { Appbar } from "./components/Appbar";
import { UserName } from "./components/UserName";
const socket = io.connect("http://localhost:4000", {
  transports: ["websocket"],
});
function App() {
  const [state, setState] = useState("");
  const [chat, setChat] = useState([]);
  const [user, setUser] = useState("");
  console.log("/////", user);
  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  });

  const onTextChange = (e) => {
    setState(e.target.value);
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { name: user, message: state });
    setState("");
  };

  const renderChat = () => {
    return (
      <div style={{ overflowY: "auto", minHeight: "500px" }}>
        {chat.map(({ name, message }, index) => (
          <div key={index} className="mb-3">
            <h6>
              {name}: <span>{message}</span>
            </h6>
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
                value={state}
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
        <div className="render-chat"></div>
      </div>
    </>
  );
}

export default App;

// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// import "./App.css";
// const socket = io.connect("http://localhost:4000", {
//   transports: ["websocket"],
// });
// function App() {
//   const [state, setState] = useState({ message: "", name: "" });
//   const [chat, setChat] = useState([]);
//   console.log("/////", chat);
//   useEffect(() => {
//     socket.on("message", ({ name, message }) => {
//       setChat([...chat, { name, message }]);
//     });
//   });

//   const onTextChange = (e) => {
//     setState({ ...state, [e.target.name]: e.target.value });
//   };

//   const onMessageSubmit = (e) => {
//     e.preventDefault();
//     const { name, message } = state;
//     socket.emit("message", { name, message });
//     setState({ message, name });
//   };

//   const renderChat = () => {
//     return chat.map(({ name, message }, index) => (
//       <div key={index}>
//         <h3>
//           {name}: <span>{message}</span>
//         </h3>
//       </div>
//     ));
//   };

//   return (
//     <div className="card">
//       <form onSubmit={onMessageSubmit}>
//         <h1>Messenger</h1>
//         <div className="name-field">
//           <span>Name:</span>{" "}
//           <input
//             name="name"
//             onChange={(e) => onTextChange(e)}
//             value={state.name}
//             label="Name"
//           />
//         </div>
//         <div>
//           {" "}
//           <span>Message:</span>{" "}
//           <input
//             name="message"
//             onChange={(e) => onTextChange(e)}
//             value={state.message}
//             id="outlined-multiline-static"
//             variant="outlined"
//             label="Message"
//           />
//         </div>
//         <button type="submit">Send Message</button>
//       </form>
//       <div className="render-chat">
//         <h1>Chat Log</h1>
//         {renderChat()}
//       </div>
//     </div>
//   );
// }

// export default App;
