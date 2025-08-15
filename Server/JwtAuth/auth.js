const Jwt = require('jsonwebtoken')

const blocklistedToken = []

const JwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(404).json({ message: "Unauthorized! No token provided" })
    }

    if (blocklistedToken.includes(token)) {
        return res.status(404).json({ message: "Token expired. Please login again." })
    }
    try {
        const decoded = Jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const Logout = (req, res) => {
    const Token = req.headers.authorization?.split(" ")[1]
    if (!Token) {
        return res.status(404).json({ message: "Unauthorized! No token provided" })
    }

    blocklistedToken.push(Token)
    res.status(200).json({ message: "Logout Successfully!" })
}

const generateToken = (payload) => {
    return Jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' })
}


module.exports = { generateToken, JwtMiddleware, Logout }