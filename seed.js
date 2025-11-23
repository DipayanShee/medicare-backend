require("dotenv").config();
const mongoose = require("mongoose");
const Doctor = require("./models/Doctor");

const MONGO_URI = process.env.MONGO_URI;

const doctors = [
  {
    name: "Dr. Arjun Mehta",
    specialization: "Cardiologist",
    experience: 12,
    fees: 700,
    hospital: "Fortis Hospital",
    bio: "Expert in heart surgery and cardiac emergencies.",

    email: "arjun@doctor.com",
    password: "123456",
  },
  {
    name: "Dr. Priya Sharma",
    specialization: "Dermatologist",
    experience: 8,
    fees: 500,
    hospital: "Apollo Clinic",
    bio: "Specialist in skin issues, acne, and cosmetology.",

    email: "priya@doctor.com",
    password: "123456",
  },
  {
    name: "Dr. Sameer Gupta",
    specialization: "Dentist",
    experience: 6,
    fees: 450,
    hospital: "Clove Dental",
    bio: "Experienced in root canal therapy and dental surgery.",

    email: "sameer@doctor.com",
    password: "123456",
  },
  {
    name: "Dr. Neha Sinha",
    specialization: "Neurologist",
    experience: 10,
    fees: 900,
    hospital: "AIIMS Delhi",
    bio: "Expert in brain, spine, and nervous system disorders.",

    email: "neha@doctor.com",
    password: "123456",
  },
  {
    name: "Dr. Rohan Patel",
    specialization: "Orthopedic",
    experience: 7,
    fees: 600,
    hospital: "Manipal Hospital",
    bio: "Specialist in bone, joint, and sports injuries.",

    email: "rohan@doctor.com",
    password: "123456",
  }
];

const seedDoctors = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB...");

    await Doctor.deleteMany();
    console.log("Old data removed.");

    await Doctor.insertMany(doctors);
    console.log("Sample doctors inserted!");

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

seedDoctors();