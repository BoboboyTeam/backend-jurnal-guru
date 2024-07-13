const { compareSync, hashSync } = require('bcryptjs')

module.exports = {

    hashPassword: (password) => hashSync(password, 5),
    comparePassword: (password, password_db) => compareSync(password, password_db)

}