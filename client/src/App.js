import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/alert/Alert";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import AuthState from "./context/auth/AuthState";
import PrivateRoute from "./components/routing/PrivateRoute";
import ContactState from "./context/contact/ContactState";
import AlertState from "./context/alert/AlertState";
import setAuthToken from "./utills/setAuthToken";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}
const App = () => {
    return (
        <AuthState>
            <ContactState>
                <AlertState>
                    <Fragment>
                        <Router>
                            <Navbar />
                            <div className="container">
                                <Alert />
                                <Switch>
                                    <PrivateRoute
                                        exact
                                        path="/"
                                        component={Home}
                                    />
                                    <Route
                                        exact
                                        path="/about"
                                        component={About}
                                    />
                                    <Route
                                        exact
                                        path="/login"
                                        component={Login}
                                    />
                                    <Route
                                        exact
                                        path="/register"
                                        component={Register}
                                    />
                                </Switch>
                            </div>
                        </Router>
                    </Fragment>
                </AlertState>
            </ContactState>
        </AuthState>
    );
};

export default App;
