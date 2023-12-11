const AppartementRepository = require('../repositories/appartement.repository');

class AppartementService {
  static getAllAppartements() {
    return AppartementRepository.getAllAppartements();
  }
}

module.exports = AppartementService;