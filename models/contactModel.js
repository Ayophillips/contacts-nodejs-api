const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true, // Make email required
    },
    phone: {
        type: String,
        required: true, // Make phone number required
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Contact", contactSchema);