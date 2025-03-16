require('dotenv').config();
const jwt = require('jsonwebtoken');
const formatResponse = require('../utils/formatResponse');

function verifyAccessToken(req, res, next) {
  // Проверяем наличие токена в заголовках
  const accessToken = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : null;

  if (accessToken) {
    try {
      const { user } = jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN); // Проверяем токен
      res.locals.user = user; // Сохраняем информацию о пользователе в res.locals
    } catch (error) {
      console.log('Token verification failed', error);
      return res
        .status(403)
        .json(
          formatResponse(
            403,
            'Invalid access token',
            null,
            'Invalid access token'
          )
        );
    }
  }

  next(); // Пропускаем дальше, если токен не найден или невалиден
}
module.exports = verifyAccessToken;
