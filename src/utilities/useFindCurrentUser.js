import { useContext } from "react";
import { UserContext } from "../components/context";

// TODO: get extracted componenet working, currently not functional.
export function useFindCurrentUser() {
    const ctx = useContext(UserContext);
    return ctx.users.find((user) => user.email === ctx.currentUser);
}