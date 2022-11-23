import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import axios from "axios";

export default function Home() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    //pusher code here
    // Pusher.logToConsole = true;

    const pusher = new Pusher("7b8528b65953c3de660d", {
      cluster: "us3",
    });

    const channel = pusher.subscribe("chat");
    
    channel.bind("message", function (data) {
      // console.log("test", data)
      setMessages((messages) => [...messages, data]);
    });

    // return () => {
    //   channel.unsubscribe('chat');
    //   pusher.disconnect();
    // };
  }, []);

  const hadnleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/messages", {
      username,
      message: message,
    });
    setMessage("");
  };

  return (
    <div className="container">
      <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
        <div
          href="/"
          className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom"
        >
          <input
            className="fs-5 fw-semibold input-box"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="list-group list-group-flush border-bottom scrollarea">
          {messages.map((message) => (
            <div
              className="list-group-item list-group-item-action active py-3 lh-sm msg"
              aria-current="true"
              key={message.id}
              id={message.id}
            >
              <div className="d-flex w-100 align-items-center justify-content-between">
                <strong className="mb-1">{message.username}</strong>
              </div>
              <div className="col-10 mb-1 small txt">{message.message}</div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={(e) => hadnleSubmit(e)}>
        <input
          className="form-control"
          maxLength={54}
          placeholder="Write a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
}
