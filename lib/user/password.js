const bcrypt = require('bcrypt');

const comparePassword = (pwd, hash) => {
    return bcrypt.compare(pwd, hash);
}

module.exports = {comparePassword}