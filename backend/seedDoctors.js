const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load backend .env manually
dotenv.config({ path: path.join(__dirname, ".env") });

const User = require("./src/models/User");
const Doctor = require("./src/models/Doctor");

const seedDoctors = async () => {
    try {
        const mongoUri = process.env.MONGODB_URL || process.env.MONGO_URI || process.env.MONGODB_URI;
        if (!mongoUri) throw new Error("Missing MongoDB URI");

        await mongoose.connect(mongoUri);
        console.log("Connected to DB");

        // Clear existing docs if needed
        await Doctor.deleteMany({});
        await User.deleteMany({ role: "Doctor" });

        const dummyDoctors = [
    {
        name: "Sarah Jenkins",
        email: "sarah.jenkins@example.com",
        password: "Password123",
        specialization: "Cardiologist",
        qualification: "MD, FACC",
        experience: 12,
        consultationFee: 1500,
        rating: 4.8,
        bio: "Experienced cardiologist specializing in heart failure and preventive cardiology.",
        profilePic: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    {
        name: "Michael Chen",
        email: "michael.chen@example.com",
        password: "Password123",
        specialization: "Neurologist",
        qualification: "MD, PhD",
        experience: 8,
        consultationFee: 2000,
        rating: 4.9,
        bio: "Neurology specialist with a focus on neurodegenerative diseases.",
        profilePic: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        name: "Emily Clark",
        email: "emily.clark@example.com",
        password: "Password123",
        specialization: "Pediatrician",
        qualification: "MD, FAAP",
        experience: 5,
        consultationFee: 800,
        rating: 4.5,
        bio: "Friendly pediatrician dedicated to providing compassionate care for children.",
        profilePic: "https://randomuser.me/api/portraits/women/68.jpg"
    },

    // Indian Doctors
    {
        name: "Dr. Rajesh Sharma",
        email: "rajesh.sharma@example.com",
        password: "Password123",
        specialization: "Orthopedic",
        qualification: "MBBS, MS Ortho",
        experience: 10,
        consultationFee: 1200,
        rating: 4.6,
        bio: "Expert in joint replacement and sports injuries.",
        profilePic: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    {
        name: "Dr. Priya Verma",
        email: "priya.verma@example.com",
        password: "Password123",
        specialization: "Gynecologist",
        qualification: "MBBS, MD",
        experience: 9,
        consultationFee: 1000,
        rating: 4.7,
        bio: "Specialist in women's health and maternity care.",
        profilePic: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
        name: "Dr. अमित कुमार",
        email: "amit.kumar@example.com",
        password: "Password123",
        specialization: "General Physician",
        qualification: "MBBS",
        experience: 7,
        consultationFee: 600,
        rating: 4.4,
        bio: "Provides comprehensive primary healthcare services.",
        profilePic: "https://randomuser.me/api/portraits/men/54.jpg"
    },
    {
        name: "Dr. Neha Gupta",
        email: "neha.gupta@example.com",
        password: "Password123",
        specialization: "Dermatologist",
        qualification: "MBBS, MD Dermatology",
        experience: 6,
        consultationFee: 900,
        rating: 4.6,
        bio: "Skin specialist focusing on acne, allergies, and cosmetic dermatology.",
        profilePic: "https://randomuser.me/api/portraits/women/50.jpg"
    },
    {
        name: "Dr. Arjun Reddy",
        email: "arjun.reddy@example.com",
        password: "Password123",
        specialization: "Psychiatrist",
        qualification: "MBBS, MD Psychiatry",
        experience: 11,
        consultationFee: 1500,
        rating: 4.8,
        bio: "Mental health expert specializing in anxiety and depression treatment.",
        profilePic: "https://randomuser.me/api/portraits/men/41.jpg"
    },
    {
        name: "Dr. Kavita Nair",
        email: "kavita.nair@example.com",
        password: "Password123",
        specialization: "ENT Specialist",
        qualification: "MBBS, MS ENT",
        experience: 8,
        consultationFee: 1100,
        rating: 4.5,
        bio: "Expert in ear, nose, and throat disorders.",
        profilePic: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    {
        name: "Dr. Vikram Singh",
        email: "vikram.singh@example.com",
        password: "Password123",
        specialization: "Oncologist",
        qualification: "MBBS, MD Oncology",
        experience: 13,
        consultationFee: 2500,
        rating: 4.9,
        bio: "Cancer specialist with experience in advanced treatments.",
        profilePic: "https://randomuser.me/api/portraits/men/29.jpg"
    }
];

        let added = 0;
        for (const docData of dummyDoctors) {
            // Check if user already exists
            let user = await User.findOne({ email: docData.email });
            if (!user) {
                user = await User.create({
                    userName: docData.name,
                    email: docData.email,
                    password: docData.password, 
                    role: "Doctor",
                    fullName: docData.name,
                    gender: "Other", // Just a required default depending on schema
                    dateOfBirth: "1980-01-01",
                    address: "Clinic Address"
                });
            }

            // Check if doctor profile already exists
            const existingDoc = await Doctor.findOne({ userId: user._id });
            if (!existingDoc) {
                await Doctor.create({
                    name: docData.name,
                    userId: user._id,
                    specialization: docData.specialization,
                    qualification: docData.qualification,
                    experience: docData.experience,
                    consultationFee: docData.consultationFee,
                    rating: docData.rating,
                    bio: docData.bio,
                    profilePic: docData.profilePic,
                    availableTimes: [
                        {
                            day: "Monday",
                            slots: [{ startTime: "09:00", endTime: "12:00" }, { startTime: "14:00", endTime: "17:00" }]
                        },
                        {
                            day: "Wednesday",
                            slots: [{ startTime: "10:00", endTime: "15:00" }]
                        }
                    ]
                });
                added++;
            }
        }

        console.log(`Successfully seeded ${added} doctors!`);
        process.exit(0);

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

seedDoctors();
