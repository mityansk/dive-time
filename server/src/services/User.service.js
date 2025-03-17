const { User } = require('../db/models');

class UserService {
  static async getByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  static async create(data) {
    return await User.create(data);
  }

  static async getAuthor(id) {
    return await User.findByPk(id);
  }

  static async delete(id) {
    return await User.destroy({ where: { id } });
  }

  static async confirmEmail(id) {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }
    user.isEmailConfirmed = true;
    await user.save();
    console.log('<><><><><><><><><>', user);
    return user;
  }
}

module.exports = UserService;
