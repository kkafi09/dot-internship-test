const { default: mongoose } = require("mongoose");
const Contact = require("../models/contactModel");

const getContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.setHeader("Content-Type", "application/json");

  return res.status(200).json({ contacts, message: "get all contacts" });
};

const getContact = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No contact found" });
  }

  await Contact.findById(id)
    .then((result) => {
      return res.status(200).json({ contact: result, message: "get contact" });
    })
    .catch((err) => {
      return res.status(404).json({ error: "No contact found" });
    });
};

const createContact = async (req, res) => {
  const { name, email, phone_number } = req.body;

  const contact = await Contact.create({ name, email, phone_number });
  return res.status(201).json({
    contact,
    message: "success add new contact",
  });
};

const deleteContact = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No contact found" });
  }

  const contact = await Contact.findOneAndDelete({ _id: id });

  if (!contact) {
    return res.status(400).json({ error: "No contact found" });
  }

  return res.status(200).json({ message: "Success delete contact" });
};

const updateContact = async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!contact) {
    return res.status(200).json({ message: "No data updated" });
  }

  return res.status(200).json({ message: "Sukses update Contact" });
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
};
