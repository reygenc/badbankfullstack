import { useState } from "react";
import { Card } from "./shared/Card";
import useValidateAmounts from "../utilities/useValidateAmounts";
import depositBackground from "../pictures/piggy_bank.jpg";

export function Withdraw({ adjustMoney, balance }) {
  const [status, setStatus] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");

  const validationError = useValidateAmounts(withdrawalAmount);

  function handleWithdrawal() {
    if (validationError) {
      setStatus(`Error Withdrawal ${validationError}`);
      console.log("validation result exists in withdrawl.js");
      return;
    }

    if (withdrawalAmount > balance) {
      setStatus("Insufficient funds.");
      return;
    }

    adjustMoney(-withdrawalAmount);

    setWithdrawalAmount("");
    setStatus(`Withdrawal of $ ${withdrawalAmount} was successful.`);
  }

return (
    <Card
      bgcolor="primary"
      header="Deposit"
      status={status}
      body={
        <>
          <div
            className="d-flex"
            style={{
              background: `url(${depositBackground})`,
              backgroundSize: "cover",
              width: "100%",
              height: "30%",
            }}
          >
            <div
              style={{
                width: "70%",
                backgroundColor: "rgba(0, 0, 0, 0.25)",
                padding: "100px",
              }}
            >
              Current Account Balance {balance} <br />
          Amount
          <br />
          <input
            type="input"
            className="form-control"
            id=""
            placeholder="Enter Amount"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(e.currentTarget.value)}
          />
          <br />
          <button
            type="submit"
            className="btn btn-light"
            onClick={handleWithdrawal}
            disabled={withdrawalAmount === ""}
            style={{
                backgroundColor: "blue",
                color: "white",
              }}
          >
            Withdraw
          </button>
            </div>
          </div>
        </>
      }
    />
  );
}
