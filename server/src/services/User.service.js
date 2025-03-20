const { User } = require('../db/models');
const { Op } = require('sequelize');

require('dotenv').config();

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

	static async update(id, updates) {
		try {
			const user = await User.findByPk(id);

			if (!user) {
				throw new Error('User not found');
			}

			await user.update(updates);
			return user;
		} catch (error) {
			console.error('Error in update:', error);
			throw error;
		}
	}

	static async getByResetToken(token) {
		try {
			const user = await User.findOne({
				where: {
					resetToken: token,
					resetTokenExpiry: {
						[Op.gt]: Date.now(), //! Проверяем, что resetTokenExpiry больше текущего времени
					},
				},
			});

			if (!user) {
				return null; //! Если пользователь не найден или токен истек, возвращаем null
			}

			return user; //! Возвращаем найденного пользователя
		} catch (error) {
			console.error('Error in getByResetToken:', error);
			throw error;
		}
	}
}

module.exports = UserService;
