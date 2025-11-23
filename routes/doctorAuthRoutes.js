const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");


// ----------------------
// ⭐ DOCTOR REGISTER
// ----------------------
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      specialization,
      experience,
      fees,
      hospital,
      bio,
    } = req.body;

    // Check if email already registered
    const exists = await Doctor.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create doctor account
    const doctor = new Doctor({
      name,
      email,
      password,
      specialization,
      experience,
      fees,
      hospital,
      bio,
    });

    await doctor.save();

    res.status(201).json({ message: "Doctor registered successfully!" });
  } catch (err) {
    console.error("Doctor register error:", err);
    res.status(500).json({ message: "Error registering doctor" });
  }
});


// ----------------------
// ⭐ DOCTOR LOGIN
// ----------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check doctor exists
  const doctor = await Doctor.findOne({ email });
  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }

  // Check password
  if (doctor.password !== password) {
    return res.status(400).json({ message: "Invalid password" });
  }

  // Generate token
  const token = jwt.sign(
    { id: doctor._id, role: "doctor" },
    process.env.JWT_SECRET
  );

  res.json({
    token,
    doctorId: doctor._id,
    doctorName: doctor.name,
  });
});

module.exports = router;