const User = require('../database/models/user')

const signup = async(req, res, next) => {

    try {
        const { email, password, displayName } = req.body
        if (await User.findOne({ 'email': email }) != null) {
            return res.status(403).json({ message: 'username was exist' })
        }
        const createdAt = new Date()
        const user = new User({
            email: email,
            password: password,
            displayName: displayName,
            createdAt: createdAt
        })

        await user.save()


        return res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}

const signin = async(req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            throw Error("Email was not exist")
        } else {
            const isCorrectPassword = await user.isValidPassword(password)
            if (isCorrectPassword) {
                res.status(200).json({
                    result: true,
                    user
                })
            } else {
                throw Error("Password is wrong")
            }
        }
    } catch (error) {

        next(error)
    }
}

module.exports = {
    signup,
    signin
}