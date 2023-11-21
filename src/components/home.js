import React from "react";
import { Card } from "./shared/Card";
import cashPic from "../pictures/cash.jpg";
import bankLogo from "../pictures/bank_logo.png"; 

export function Home() {
  return (
    <Card
      bgcolor="primary"
      header="Welcome to the Better Bad Bank"
      body={
        <div
          className="d-flex"
          style={{
            background: `url(${cashPic})`,
            backgroundSize: "cover",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.25)",
              padding: "20px",
            }}
          >
            <div className="card-body" style={{ width: "90%" }}>
              <h5 className="card-title">
                Please login or create an account to make deposits and withdrawals.
              </h5>
              <p className="card-text">
                If you are logged in, you are now able to make deposits and
                withdrawals.
              </p>
              <div className="d-flex mb-3">
                <img
                  className="img-fluid"
                  src={bankLogo} // Make sure to use the correct variable here
                  width="10%"
                  alt="bank-logo"
                />
              </div>
            </div>
          </div>
        </div>
      }
    >
      {/* Optional: You can add additional elements here if needed */}
    </Card>
  );
}
