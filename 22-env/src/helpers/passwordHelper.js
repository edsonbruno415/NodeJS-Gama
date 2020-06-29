const Bcrypt = require('bcrypt');
/* const {
    promisify
} = require('util');
const hashAsync = promisify(Bcrypt.hash);
const compareAsync = promisify(Bcrypt.compare); */
const SALT = parseInt(process.env.SALT_PWD);

class PasswordHelper {

    static async hashPassword(password) {
        const hash = await Bcrypt.hash(password, SALT);
        return hash;
    }

    static async comparePassword(password, hash) {
        const status = await Bcrypt.compare(password, hash);
        return status;
    }
}

module.exports = PasswordHelper;