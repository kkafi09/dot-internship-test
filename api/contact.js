const express = require("express");
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
} = require("../controllers/contactController");
const router = express.Router();
const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    req.user = decoded;
    next();
  });
}

// GET all contacts
router.get("/", getContacts);

// GET single contact
router.get("/:id", getContact);

// POST new contact
router.post("/", authenticate, createContact);

// DELETE a contact
router.delete("/:id", authenticate, deleteContact);

// PUT a contact
router.put("/:id", authenticate, updateContact);

module.exports = router;
