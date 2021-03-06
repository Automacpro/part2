import React, { useContext } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext);

    const { setCurrent, clearCurrent, deleteContact } = contactContext;
    const { id, name, email, phone, type } = contact;

    const onDelete = () => {
        deleteContact(id);
        clearCurrent();
    };
    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name} {""}
                <span
                    style={{ float: "right" }}
                    className={
                        "badge " +
                        (type === "professional"
                            ? "badge-success"
                            : "badge-primary")
                    }
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className="list">
                {email && (
                    <li>
                        <i className="fas fa-envelope-open m" />
                        {email}
                    </li>
                )}
                {phone && (
                    <li>
                        <i className="fas fa-phone m" />
                        {phone}
                    </li>
                )}
            </ul>
            <p>
                <button
                    className="btn btn-dark btn-sm"
                    onClick={() => setCurrent(contact)}
                >
                    Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>
                    Delete
                </button>
            </p>
        </div>
    );
};

export default ContactItem;
