class BaseService {
  constructor({ repository }) {
    this.repository = repository;
  }

  async create(item) {
    return this.repository.create(item);
  }

  async findOne(item) {
    return this.repository.update(item);
  }

  async findAll(query) {
    return this.repository.findAll(query);
  }
}

module.exports = BaseService;
  