import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Navbar = ({ icon, title }) => {
    const authContext = useContext(AuthContext);

    const { isAuthenticated, logout, user } = authContext;

    const onLogout = () => {
        logout();
    };

    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a href="#!" onClick={onLogout}>
                    <i className="fas fa-sign-out-alt"></i>{" "}
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const guestLink = (
        <Fragment>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
        </Fragment>
    );
    return (
        <div className="navbar bg-primary">
            <h3>
                <i className={icon}></i> {title}
            </h3>
            <ul>{isAuthenticated ? authLinks : guestLink}</ul>
        </div>
    );
};

// Navbar.propTypes = {
//     icon: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
// };

Navbar.defaultProps = {
    title: "Contact Keeper",
    icon: "fas fa-id-card-alt",
};
export default Navbar;
