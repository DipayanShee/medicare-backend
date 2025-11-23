const Appointment = require("../models/Appointment");

exports.createAppointment = async (req, res) => {
  try {
    const appt = new Appointment(req.body);
    await appt.save();
    res.status(201).json(appt);
  } catch (err) {
    res.status(500).json({ message: "Error creating appointment" });
  }
};

exports.getAppointmentsForUser = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.userId })
      .populate("doctor", "name specialization fees");

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);

    if (!appt) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appt.status = "Cancelled";
    await appt.save();

    res.json({ message: "Appointment cancelled", appt });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling appointment" });
  }
};

exports.getAppointmentsForDoctor = async (req, res) => {
  try {
    const appts = await Appointment.find({ doctor: req.params.doctorId })
      .populate("patient", "name email");

    res.json(appts);
  } catch (err) {
    res.status(500).json({ message: "Error loading doctor appointments" });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appt = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appt) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(appt);
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
};