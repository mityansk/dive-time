const UserService = require('../services/User.service');
const AuthValidator = require('../utils/Auth.validator');
const formatResponse = require('../utils/formatResponse');
const bcrypt = require('bcrypt');
const generateTokens = require('../utils/generateTokens');
const cookiesConfig = require('../config/cookiesConfig');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

class AuthController {
  static async refreshTokens(req, res) {
    try {
      const { user } = res.locals;

      const { accessToken, refreshToken } = generateTokens({ user });

      res.status(200).cookie('refreshToken', refreshToken, cookiesConfig).json(
        formatResponse(200, 'Successfully regenerate tokens', {
          user,
          accessToken,
        })
      );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async signUp(req, res) {
    const { email, username, password } = req.body;

    const { isValid, error } = AuthValidator.validateSignUp({
      email,
      username,
      password,
    });

    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation error', null, error));
    }

    const normalizedEmail = email.toLowerCase();
    try {
      const userFound = await UserService.getByEmail(normalizedEmail);

      if (userFound) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              'User already exists',
              null,
              'User already exists'
            )
          );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await UserService.create({
        username,
        email: normalizedEmail,
        password: hashedPassword,
      });

      if (!newUser) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              'Failed to register user',
              null,
              'Failed to register user'
            )
          );
      }

      const emailConfirmationToken = jwt.sign(
        { userId: newUser.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      const confirmationLink = `http://localhost:5173/confirm-email/${emailConfirmationToken}`;
      await sendEmail({
        to: email,
        subject: 'Подтверждение email',
        text: `${username}, мы приветствуем вас на сайте DIVE TIME! \n\n Пожалуйста, подтвердите ваш email, перейдя по ссылке: ${confirmationLink}`,
      });

      const plainUser = newUser.get({ plain: true });
      delete plainUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      res
        .status(201)
        .cookie('refreshToken', refreshToken, cookiesConfig)
        .json(
          formatResponse(201, 'Register successful', {
            user: plainUser,
            accessToken,
          })
        );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;
    // console.log(req.body);
    const { isValid, error } = AuthValidator.validateSignIn({
      email,
      password,
    });

    if (!isValid) {
      console.log(error);
      return res
        .status(400)
        .json(formatResponse(400, 'Validation error', null, error));
    }

    const normalizedEmail = email.toLowerCase();
    try {
      const user = await UserService.getByEmail(normalizedEmail);

      if (!user) {
        return res
          .status(400)
          .json(formatResponse(400, 'User not found', null, 'User not found'));
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(400)
          .json(
            formatResponse(400, 'Invalid password', null, 'Invalid password')
          );
      }

      const plainUser = user.get({ plain: true });
      delete plainUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      res
        .status(200)
        .cookie('refreshToken', refreshToken, cookiesConfig)
        .json(
          formatResponse(200, 'Login successful', {
            user: plainUser,
            accessToken,
          })
        );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async signOut(req, res) {
    try {
      res
        .clearCookie('refreshToken')
        .json(formatResponse(200, 'Logout successfully'));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    if (+id !== res.locals.user.id) {
      return res
        .status(403)
        .json(formatResponse(403, 'Нет доступа', null, 'Нет доступа'));
    }
    try {
      const { data } = await UserService.delete(+id);
      res
        .clearCookie('refreshToken')
        .status(200)
        .json(formatResponse(200, 'Профиль пользователя удален', data, null));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }
  static async confirmEmail(req, res) {
    const { token } = req.query;
    console.log('>>>>>>>>>>>>>>>>>>>');
    if (!token) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            'Токен не предоставлен',
            null,
            'Токен не предоставлен'
          )
        );
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userConfirm = await UserService.confirmEmail(decoded.userId);

      if (!userConfirm) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              'Пользователь не найден',
              'Пользователь не найден'
            )
          );
      }
      return res
        .status(200)
        .json(
          formatResponse(
            200,
            'Email успешно подтвержден!',
            userConfirm,
            'Email успешно подтвержден!'
          )
        );
    } catch ({ message }) {
      return res
        .status(400)
        .json(formatResponse(400, 'Пользователь не найден', null, message));
    }
  }
}

module.exports = AuthController;
