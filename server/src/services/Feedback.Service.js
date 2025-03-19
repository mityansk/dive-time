const transporter = require('../config/nodemailerConfig');

const sendEmail = async (name, email, description) => {
	const mailOptions = {
		from: process.env.USER_EMAIL,
		to: process.env.RECIPIENT_EMAIL,
		subject: 'Обратная связь от ' + name,
		text: `Имя: ${name}\nEmail: ${email}\nОписание: ${description}`,
	};

	await transporter.sendMail(mailOptions);
};

module.exports = {
	sendEmail,
};
