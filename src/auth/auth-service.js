//const bcrypt = require('bcryptjs')
const config = require('../config')

 const AuthService = {
   getUserWithUserName(db, username) {
     return db('euphoria_users')
       .where({ username })
       .first()
   },
 /* comparePasswords(password, hash) {
    return bcrypt.compare(password, hash)
  },*/
}

module.exports = AuthService