import { useState } from "react";
import { Card } from "./shared/Card";
import signaturePic from "../pictures/signature.jpg";

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4500';

export function CreateAccount({
  initializeUser,
  createWithFirebase,
  googleLogin,
}) {
  const [show, setShow] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validate(field, label) {
    if (!field) {
      setStatusMessage("Error: " + label + " must not be blank");
      setTimeout(() => setStatusMessage(""), 3000);
      return false;
    }
    return true;
  }

  async function handleCreate() {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!validate(name, "Name")) return;
    if (!validate(email, "Email")) return;
    if (!validate(password, "Password")) return;
    if (!emailRegex.test(email)) {
      setStatusMessage("Please enter a valid email address");
      return;
    }
    if (password.length < 8) {
      setStatusMessage("Error: Password must be at least 8 characters");
      return;
    }
  
    try {
      createWithFirebase(email, password);
  
      const url = `${baseUrl}/account/create/${name}/${email}/${password}`;
      await fetch(url);
  
      await initializeUser(email, password);
      setStatusMessage("Your account is created. It's time to explore!");
      setShow(false);
    } catch (error) {
      console.error("Firebase Authentication Error:", error);
      setStatusMessage("Error creating account. Please try again.");
    }
  }
  

  function googleLogMeIn() {
    setStatusMessage(googleLogin(true));
    setStatusMessage("Your account is created. It's time to explore!");
    setShow(false);
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setStatusMessage("");
    setShow(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={statusMessage}
      body={
        <div
          className="d-flex"
          style={{
            background: `url(${signaturePic})`,
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
            {show ? (
              <>
                <div>
                  Name
                  <br />
                  <input
                    type="input"
                    className="form-control"
                    id="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                  />
                </div>
                <br />

                <div>
                  Email address
                  <br />
                  <input
                    type="input"
                    className="form-control"
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                </div>
                <br />
                <div>
                  Password
                  <br />
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                </div>
                <br />
                <button
                  type="submit"
                  className="btn btn-light"
                  onClick={handleCreate}
                  disabled={name + email + password === ""}
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                  }}
                >
                  Create Account
                </button>
                <br />
                <br />
                <button
                  type="submit"
                  className="btn btn-light"
                  onClick={() => googleLogMeIn()}
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                  }}
                >
                  Create an account with Google
                </button>
              </>
            ) : (
              <>
                <h5>Account Created</h5>
                <button
                  type="submit"
                  className="btn btn-light"
                  onClick={clearForm}
                >
                  Add Another Account
                </button>
              </>
            )}
          </div>
          <div
            style={{ width: "30%" }}
            className="d-flex align-items-center"
          ></div>
        </div>
      }
    />
  );
}
