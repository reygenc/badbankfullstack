import { Link, useLocation } from "react-router-dom";

export function NavBar({ user, isLoggedIn, signOut }) {
  const location = useLocation();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark px-3">
        <Link className="navbar-brand" to="/" data-toggle="tooltip" title="Better Bad Bank Home Page">
          Better Bad Bank
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {!isLoggedIn ? (
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/CreateAccount" ? "active" : ""}`}
                  aria-current="page"
                  to="/CreateAccount"
                  data-toggle="tooltip"
                  title="Click here to create a new account login."
                >
                  Create Account
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === "/CreateAccount" ? "active" : ""}`}
                    aria-current="page"
                    to="/CreateAccount"
                    data-toggle="tooltip"
                    title="Click here to create a new account login."
                  >
                    Create Account
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === "/deposit" ? "active" : ""}`}
                    aria-current="page"
                    to="/deposit"
                    data-toggle="tooltip"
                    title="Click here to deposit funds into your account."
                  >
                    Deposit
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === "/withdraw" ? "active" : ""}`}
                    aria-current="page"
                    to="/withdraw"
                    data-toggle="tooltip"
                    title="Click here to withdraw funds from your account."
                  >
                    Withdraw
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === "/balance" ? "active" : ""}`}
                    aria-current="page"
                    to="/balance"
                    data-toggle="tooltip"
                    title="Click here to check your account balance."
                  >
                    Balance
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="text-light">
          <p className="nav-link px-3 m-0">Hello {user.name}</p>
        </div>
        <div className="nav navbar-nav navbar-right">
          {!isLoggedIn ? (
            <Link
              className={`btn btn-info navbar-btn ${location.pathname === "/login" ? "active" : ""}`}
              aria-current="page"
              to="/login"
              data-toggle="tooltip"
              title="Click here to login to your account."
            >
              Login
            </Link>
          ) : (
            <button type="button" className="btn btn-info navbar-btn" onClick={() => signOut()}>
              Log Out
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
