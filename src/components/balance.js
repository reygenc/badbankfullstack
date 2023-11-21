import { Card } from "./shared/Card";
import cashPic from "../pictures/cash.jpg";

export function Balance({ balance }) {
  // stretch goal: add transaction history
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
              padding: "100px",
            }}
          >
            <h1>Your current balance is $ {balance}</h1>
          </div>
        </div>
      }
    />
  );
}
