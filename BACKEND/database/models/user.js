const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    displayName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    },
    updateAt: {
        type: Date
    },

})


userSchema.pre("save", async function(next) {
    try {
        const salt = await bcrypt.genSalt(10)

        const passwordHash = await bcrypt.hash(this.password, salt)
        this.password = passwordHash
    } catch (error) {
        next(error)
    }
})

userSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw new Error(error)
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;