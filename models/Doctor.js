const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, default: 0 },
    fees: { type: Number, default: 0 },
    hospital: { type: String, default: "City Care Hospital" },
    bio: { type: String, default: "" },

    // NEW FIELDS FOR LOGIN
    email: { type: String, unique: true, sparse: true },
    password: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);