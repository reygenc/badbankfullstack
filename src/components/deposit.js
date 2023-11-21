import { useState } from "react";
import { Card } from "./shared/Card";
import useValidateAmounts from "../utilities/useValidateAmounts";
import depositBackground from "../pictures/piggy_bank.jpg";

export function Deposit({ adjustMoney, balance }) {
  const [statusMessage, setStatusMesssage] = useState("");
  const [depositAmount, setDepositAmount] = useState("");

  const validationError = useValidateAmounts(depositAmount);

  function handleDeposit() {
    if (validationError) {
      setStatusMesssage(`Error Deposit ${validationError}`);
      console.log("validation result exists in deposit.js");
      return;
    }

    adjustMoney(depositAmount);

    setDepositAmount("");
    setStatusMesssage("Deposit successful");
  }

  return (
    <Card
      bgcolor="primary"
      header="Deposit"
      status={statusMessage}
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
              Current Account Balance {balance}
              <br />
              Deposit Amount
              <br />
              <input
                type="input"
                className="form-control"
                id="deposit"
                placeholder="Enter Amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.currentTarget.value)}
              />
              <br />
              <button
                type="submit"
                className="btn btn-light"
                onClick={() => handleDeposit()}
                disabled={depositAmount === ""}
                style={{
                  backgroundColor: "blue",
                  color: "white",
                }}
              >
                Deposit
              </button>
            </div>
          </div>
        </>
      }
    />
  );
}
