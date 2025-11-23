const express = require("express");
const router = express.Router();
const {
  createDoctor,
  getDoctors,
  getDoctorById
} = require("../controllers/doctorController");

router.post("/", createDoctor);
router.get("/", getDoctors);
router.get("/:id", getDoctorById);

module.exports = router;