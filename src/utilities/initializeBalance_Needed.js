import { useContext, useState } from "react";
import { UserContext, Card } from "./context";



export default function InitializeBalance() {
    const ctx = useContext(UserContext);
    const [balance, setBalance] = useState(null);

    function findCurrentUser() {
        return ctx.users.find((user) => user.email === ctx.currentUser);
    }

    setBalance(findCurrentUser().balance)
    return balance
}