const {PrismaClient} = require('@prisma/client')
const validator = require("validator");
const authUtils = require("../authentication/utils");

const prisma = new PrismaClient()

class UserService {
    
    static async createUser(email, password){

        if (this.validateCreateUser(email, password)){
            return false
        } 

        const hashPassword = await authUtils.hashPassword(password);
        await prisma.user.create({
        data: {
            email,
            password: hashPassword,
            },
        });
        return true        

    }

    static validateCreateUser (email, password){

        const user = prisma.user.findFirst({
            data: {
            email,
            },
        });
        if (
            validator.isEmail(email) &&
            validator.isLength(password, { min: 8 } && !user)
        ) {
            return true;
        }
        return false;
    };
}

module.exports = {
    UserService
}