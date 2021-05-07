import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;

    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push("/");
        }
        if (error === "Invalid Credientials") {
            setAlert(error, "danger");
            clearErrors();
        }
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { email, password } = user;

    const onChange = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setAlert("Please Fill all Feilds", "danger");
        } else {
            login({
                email,
                password,
            });
        }
    };

    return (
        <div className="form-container">
            <h1>
                Accout <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="Email..."
                        value={email}
                        name="email"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Password</label>
                    <input
                        type="password"
                        placeholder="password..."
                        value={password}
                        name="password"
                        onChange={onChange}
                    />
                </div>

                <button type="submit" className="btn btn-block btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
