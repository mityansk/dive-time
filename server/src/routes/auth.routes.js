const router = require('express').Router();
const AuthController = require('../controllers/Auth.Controller');
const verifyRefreshToken = require('../middleware/verifyRefreshToken');
const verifyAccessToken = require('../middleware/verifyAccessToken');

router.post('/signIn', AuthController.signIn);
router.post('/signUp', AuthController.signUp);
router.get('/signOut', AuthController.signOut);
router.get('/refreshTokens', verifyRefreshToken, AuthController.refreshTokens);
router.get('/confirmEmail', AuthController.confirmEmail);
router.delete('/:id', verifyAccessToken, AuthController.delete);
router.post('/forgotPassword', AuthController.forgotPassword);
router.post('/resetPassword/:token', AuthController.resetPassword);

module.exports = router;
