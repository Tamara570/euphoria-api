const { DATABASE_URL } = require('../../config')
//const bcrypt = require('bcryptjs')
const config = require('../../config')

const db = DATABASE_URL;

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