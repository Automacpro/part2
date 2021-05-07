import React, { useContext, Fragment, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactItem from "./ContactItem";

const Contacts = () => {
    const contactsContext = useContext(ContactContext);

    const { contacts, filtered, getContacts, loading } = contactsContext;

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, []);

    if (contacts.length === 0) {
        return <h4>Please Add a Contacts</h4>;
    }
    return (
        <Fragment>
            <TransitionGroup>
                {filtered !== null
                    ? filtered.map((contact) => (
                          <CSSTransition
                              key={contact._id}
                              timeout={500}
                              classNames="item"
                          >
                              <ContactItem contact={contact} />
                          </CSSTransition>
                      ))
                    : contacts.map((contact) => (
                          <CSSTransition
                              key={contact._id}
                              timeout={500}
                              classNames="item"
                          >
                              <ContactItem contact={contact} />
                          </CSSTransition>
                      ))}
            </TransitionGroup>
        </Fragment>
    );
};

export default Contacts;
