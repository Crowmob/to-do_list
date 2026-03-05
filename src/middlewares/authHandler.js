import { verifyToken } from "../utils/jwt.js";
import sessionServices from "../services/sessionServices.js";
import { UnauthorizedError } from "../errors/appErrors.js";

const authHandler = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        const data = await verifyToken(token);
        const session = await sessionServices.getCurrentSession(data.userId);
        if (session.fingerprint !== `${req.headers['user-agent']}|${req.ip}|${req.headers['accept-language']}`) {
            throw new UnauthorizedError('Session fingerprint mismatch. Possible session hijacking attempt.');
        }
        await sessionServices.createSessionInRedis(data.userId, { ...session, expiredAt: new Date(Date.now() + session.expireTime * 1000) });
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 3600000,
        });
        next();
    } catch (err) {
        if (err instanceof UnauthorizedError) {
            const token = req.cookies.accessToken;
            const data = await verifyToken(token);
            const sessionData = await sessionServices.getCurrentSession(data.userId);
            await sessionServices.createSessionInPostrgres(data.userId, sessionData.createdAt, sessionData.expiredAt);
            await sessionServices.deleteSession(data.userId);
            res.clearCookie("accessToken");
            return res.status(err.statusCode).json({ error: err.message });
        }
        return res.status(err.statusCode || 500).json({ error: err.message });
    }
}

export default authHandler;