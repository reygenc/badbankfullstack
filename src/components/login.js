import { useState } from "react";
import { Card } from "./shared/Card";
import loginBackground from "../pictures/bank_vault.jpg";

export function Login({ logIn, googleLogin }) {
  const [statusMessage, setStatusMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function emailLogIn(email, password) {
    try {
      const user = await logIn(email, password);

      if (user) {
        setStatusMessage("Login successful");
      } else {
        setStatusMessage("Login successful");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setStatusMessage("An error occurred during login. Please try again.");
    }
  }

  async function googleLogMeIn() {
    try {
      await googleLogin();
      setStatusMessage("Logged in with Google");
    } catch (error) {
      console.error("Error during Google login:", error);
      setStatusMessage("An error occurred during Google login. Please try again.");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await emailLogIn(email, password);
  };

  return (
    <Card
      bgcolor="primary"
      title="Login"
      status={statusMessage}
      body={
        <form onSubmit={handleSubmit}>
          <div
            className="d-flex"
            style={{
              background: `url(${loginBackground})`,
              backgroundSize: "cover",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "70%",
                backgroundColor: "rgba(0, 0, 0, 0.25)",
                padding: "20px",
              }}
            >
              <label>Email address</label>
              <br />
              <input
                type="input"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <br />
              <label>Password</label>
              <br />
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <br />
              <button
                type="button"
                className="btn btn-light"
                onClick={() => emailLogIn(email, password)}
                style={{
                  backgroundColor: "blue",
                  color: "white",
                }}
              >
                Login
              </button>
              <br />
              <br />
              <button
                type="button"
                className="btn btn-light"
                onClick={() => googleLogMeIn()}
                style={{
                  backgroundColor: "blue",
                  color: "white",
                }}
              >
                Login with Google
              </button>
            </div>
          </div>
        </form>
      }
    />
  );
}
