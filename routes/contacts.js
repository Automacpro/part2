const express = require("express");

const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Contact = require("../models/Contact");

const router = express.Router();

// @route GET api/contacts
// @get all user contacts
// @access Private
router.get("/", auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({
            date: -1,
        });

        res.json(contacts);
    } catch (err) {
        console.error(err.message);

        res.status(500).send("Server Error");
    }
});

// @route POST api/contacts
// @ Add new Contacts
// @access Private
router.post(
    "/",
    [auth, [check("name", "Please Fill out Name Feild").not().isEmpty()]],
    async (req, res) => {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        const { name, email, phone, type } = req.body;

        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id,
            });

            const contact = await newContact.save();

            res.json(contact);
        } catch (err) {
            console.error(err.message);

            res.status(500).send("Server Error");
        }
    }
);
// @route POST api/contacts
// @ Update Contacts
// @access Private
router.put("/:id", auth, async (req, res) => {
    const { name, email, phone, type } = req.body;

    // Build the Contact Object

    const contactFeilds = {};

    if (name) contactFeilds.name = name;
    if (email) contactFeilds.email = email;
    if (phone) contactFeilds.phone = phone;
    if (type) contactFeilds.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: "Contact not Found" });

        // make Sure User owes his contact

        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "UnAuthorised Access" });
        }
        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: contactFeilds },
            { new: true }
        );

        res.json(contact);
    } catch (err) {
        console.error(err.message);

        res.status(500).send("Server Error");
    }
});

// @route POST api/contacts
// @ Delete Contacts
// @access Private
router.delete("/:id", auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: "Contact not Found" });

        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "UnAuthorised Access" });
        }

        // make Sure User owes his contact

        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "UnAuthorised Access" });
        }

        contact = await Contact.findByIdAndRemove(req.params.id);

        res.json({ msg: "Contact Removed" });
    } catch (err) {
        console.error(err.message);

        res.status(500).send("Server Error");
    }
});

module.exports = router;
