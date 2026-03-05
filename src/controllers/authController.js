import userServices from "../services/userServices.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import sessionServices from "../services/sessionServices.js";
import { createToken, verifyToken } from "../utils/jwt.js";

const authUser = async (req, res, userId) => {
    const fingerprint = `${req.headers['user-agent']}|${req.ip}|${req.headers['accept-language']}`;
    await sessionServices.createSessionInRedis(
        userId,
        {
            createdAt: new Date(),
            expireTime: 3600,
            expiredAt: new Date(Date.now() + 3600000),
            refreshTime: new Date(Date.now() + 86400000),
            fingerprint
        }
    );
    const token = await createToken(userId);
    res.cookie("accessToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 3600000,
    });
}

const login = async (req, res) => {
    try {
        const user = await userServices.getUserByUsername(req.body.username);
        if (comparePassword(req.body.password, user.password)) {
            await authUser(req, res, user.id);
            res.status(200).send('Login successful');
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message })
    }
}

const register = async (req, res) => {
    try {
        const hashedPassword = await hashPassword(req.body.password);
        const user = await userServices.createUser({ username: req.body.username, password: hashedPassword });
        await authUser(req, res, user.id);
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message })
    }
}

const logout = async (req, res) => {
    try {
        const token = req.cookies.accessToken;
        const data = await verifyToken(token);
        const sessionData = await sessionServices.getCurrentSession(data.userId);
        await sessionServices.createSessionInPostrgres(data.userId, sessionData.createdAt, sessionData.expiredAt);
        await sessionServices.deleteSession(data.userId);
        res.clearCookie("accessToken");
        res.status(200).send('Logout successful');
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message })
    }
}

export default {
    login,
    register,
    logout
}