import { Fragment } from "react";
import { useSelector } from "react-redux";
import UserAccount from "./UserAccount";
import Login from "./Login";
import AdminAccount from "./AdminAccount";

const LoginPage = () => {
    const loggedIn = useSelector(state => state.userLogin.isLoggedIn);
    const isAdmin = useSelector(state => state.userLogin.isAdmin);
    console.log(loggedIn &&  isAdmin === false);

    return (
        <Fragment>
            {loggedIn === false  && <Login/>}
            {loggedIn && isAdmin === false && <UserAccount/>}
            {loggedIn && isAdmin === true && <AdminAccount/>}
        </Fragment>
    )
}
export default LoginPage;