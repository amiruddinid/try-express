const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require('../repositories/userRepository');
const SALT = 10;

function encryptPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, SALT, (err, encryptedPassword) => {
            if (!!err) {
                reject(err);
                return;
            }

            resolve(encryptedPassword);
        });
    });
}

function checkPassword(encryptedPassword, password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
            if (!!err) {
                reject(err);
                return;
            }

            resolve(isPasswordCorrect);
        });
    });
}

function createToken(obj){
    return jwt.sign(obj, process.env.SECRET, {expiresIn:'1800s'})
}

module.exports = {
    async register(requestBody) {
        const encryptedPassword = await encryptPassword(requestBody.password);
        const user = await userRepository.create({
            fullName: requestBody.fullname,
            username: requestBody.username,
            password: encryptedPassword,
            email: requestBody.email,
        });
        return {
            id: user.id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    },

    async login(requestBody) {
        const username = requestBody.username.toLowerCase(); // Biar case insensitive
        const password = requestBody.password;

        const user = await userRepository.findOne(username);
        if (!user) {
            res.status(404).json({
                message: "Email atau username tidak ditemukan"
            });
            return;
        }

        const isPasswordCorrect = await checkPassword(
            user.password,
            password
        );

        if (!isPasswordCorrect) {
            res.status(401).json({
                message: "Password salah!"
            });
            return;
        }

        const userdata = {
            id: user.id,
            email: user.email,
            username: user.username,
            fullName: user.fullName,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }

        const token = createToken(userdata);

        return {
            ...userdata,
            token: token
        }
    },
};