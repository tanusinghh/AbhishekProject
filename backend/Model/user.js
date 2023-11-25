const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: { type: String, match: /^[a-zA-Z]+$/, required: true },
    lastName: { type: String, match: /^[a-zA-Z]+$/, required: true },
    email: { type: String, unique: true, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    country: { type: String, required: true,  }, 
    state: { type: String, required: true }, 
    city: { type: String, required: true }, 
    gender: { type: String,  required: true },
    dateOfBirth: { type: String, required: true},
    age: { type: Number }
}, { timestamps: true });

function isOlderThanFourteen (value) {
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();

    // Adjust the birth date for leap years
    birthDate.setFullYear(today.getFullYear());

    if (today < birthDate) {
        return false; // User has not had their birthday this year
    }

    return age >= 14;
};

module.exports = mongoose.model("User", UserSchema);
