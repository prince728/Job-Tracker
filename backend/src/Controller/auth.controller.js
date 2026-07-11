const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../../prisma/client');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email, password: passwordHash }
        });

        const token = jwt.sign({ userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign({ userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            message: "User loggedIn successfully",
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        });
    }
};

const logout = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(200).json({
                message: "User already logout"
            })
        }

        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        return res.status(200).json({
            message: "User logout successfully"
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

const getme = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            }, select: { id: true, name: true, email: true, createdAt: true }
        });

        return res.status(200).json({
            message: "User detail fetched successfully",
            user
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}


module.exports = { signup, login, logout, getme };