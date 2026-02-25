import userServices from "../services/userServices.js";

const login = async (req, res) => {
    const user = await userServices.getUserById(Number(req.params.id))
    res.json(user);
}

const register = async (req, res) => {
    const user = await userServices.createUser(req.body);
    res.status(201).json(user);
}

const logout = async (req, res) => {
    res.send('Logout endpoint');
}

export default {
    login,
    register,
    logout
}