const db = require('../config/db');

class AppartementRepository {
  static getAllAppartements() {
    return db.query('SELECT * FROM appartements');
  }
}

module.exports = AppartementRepository;