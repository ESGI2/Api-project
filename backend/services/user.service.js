const { Sequelize } = require('sequelize');
const User = require('../models/user.models');

class UserServices {
    static async getAllUser() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            throw error;
        }
    }

    static async getUserById(id) {
        try {
            const user = await User.findOne({
                where: {
                    id: Number(id)
                }
            });
            if (user) return user;
            else return null;
        } catch (error) {
            throw error;
        }
    }

    static async isAdmin(id) {
        try {
            const user = await User.findOne({
                where: {
                    id: Number(id)
                }
            });
            if (!user) return null;
            if (user.role == "admin") return true;
            else return false;
        } catch (error) {
            throw error;
        }
    }

    static async getUserByToken(token) {
        try {
            const user = await User.findOne({
                where: {
                    token: token
                }
            });
        if (user) return user;
        else return null;
        } catch (error) {
            throw error;
        }
    }   
}

module.exports = UserServices;
