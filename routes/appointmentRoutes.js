const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointmentsForUser,
  cancelAppointment,
  getAppointmentsForDoctor,
  updateAppointmentStatus 
} = require("../controllers/appointmentController");

router.post("/", createAppointment);
router.get("/user/:userId", getAppointmentsForUser);
router.put("/cancel/:id", cancelAppointment);
router.get("/doctor/:doctorId", getAppointmentsForDoctor);
router.put("/:id/status", updateAppointmentStatus);

module.exports = router;