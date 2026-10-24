const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        maxlength: 50,
    },
    email: {
        type: String,
        // required: [true, "Please provide an email"],
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6,
        maxlength: 15,
        trim: true,
        select: false,
    },
    role: {
        type: String,
        enum: ["user", "owner", "admin"],
    },
    phone: {
        type: String,
        trim: true,
        required: [true, "Please provide a phone number"],
    }
}, {timestamps: true});

UserSchema.pre("save", async function () {
    if(!this.isModified("password") || !this.password ) return;
   this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
}


module.exports = mongoose.model("user", UserSchema);