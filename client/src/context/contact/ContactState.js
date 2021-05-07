import React, { useReducer } from "react";
import contactContext from "./contactContext";
import axios from "axios";
import contactReducer from "./contactReducer";
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CONTACT_ERROR,
    CLEAR_FILTER,
    GET_CONTACTS,
    CLEAR_CONTACTS,
} from "../../types";

const ContactState = (props) => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null,
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Add COntact

    const addContact = async (contact) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.post("/api/contacts", contact, config);
            dispatch({ type: ADD_CONTACT, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }
    };

    // GET ALL CONTACTS FROM DATABASE

    const getContacts = async (contact) => {
        try {
            const res = await axios.get("/api/contacts");
            dispatch({ type: GET_CONTACTS, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
        }
    };

    // Delete Contact
    const deleteContact = (id) => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    };

    // Set Contact
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    // Clear Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // Update Contact
    const updateContact = (contact) => {
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    };

    // Filter Contacct
    const filterContacts = (text) => {
        dispatch({ type: FILTER_CONTACT, payload: text });
    };

    // Clear Contact
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <contactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
                getContacts,
            }}
        >
            {props.children}
        </contactContext.Provider>
    );
};

export default ContactState;
