const { User } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  create(createArgs) {
    return User.create(createArgs);
  },

  update(id, updateArgs) {
    return User.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(id) {
    return User.destroy(id);
  },

  find(id) {
    return User.findByPk(id);
  },

  findOne(input){
    return User.findOne({
        where: {
            [Op.or]: [
                { username: input },
                { email: input }
            ]
        }
    })
  },

  findAll() {
    return User.findAll();
  },

  getTotalUser() {
    return User.count();
  },
};
