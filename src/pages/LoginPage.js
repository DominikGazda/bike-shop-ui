import { Fragment } from "react";
import { useSelector } from "react-redux";
import UserAccount from "./UserAccount";
import Login from "./Login";

const LoginPage = () => {
    const loggedIn = useSelector(state => state.userLogin.isLoggedIn);

    return (
        <Fragment>
            {loggedIn ? <UserAccount/> : <Login/>}
        </Fragment>
    )
}
export default LoginPage;