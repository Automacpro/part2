import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;

    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push("/");
        }
        if (error === "User Already exist") {
            setAlert(error, "danger");
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password2 } = user;

    const onChange = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        if (name === "" || email === "" || password === "") {
            setAlert("Please Enter All Feilds", "danger");
        } else if (password !== password2) {
            setAlert("Password Does not Match", "danger");
        } else {
            register({
                name,
                email,
                password,
            });
        }
    };
    return (
        <div className="form-container">
            <h1>
                Accout <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        placeholder="Name..."
                        value={name}
                        name="name"
                        onChange={onChange}
                    />
                </div>
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
                <div className="form-group">
                    <label htmlFor="password2">Confirm-Password</label>
                    <input
                        type="password"
                        placeholder="Confirm Password..."
                        value={password2}
                        name="password2"
                        onChange={onChange}
                    />
                </div>
                {/* <button type="submit" className="btn btn-primary btn-success">
                    Register
                </button> */}
                <input
                    type="Submit"
                    className="btn btn-primary btn-block"
                    value="Register"
                />
            </form>
        </div>
    );
};
export default Register;
