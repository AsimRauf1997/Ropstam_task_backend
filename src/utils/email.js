const nodemailer = require('nodemailer');
const config = require('../config/config');
const transport = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 465,
	auth: {
		user: config.emailUsername,
		pass: config.password,
	},
});

const sendEmail = (password, email) => {
	const mailOptions = {
		from: config.emailUsername,
		to: email,
		subject: 'Account Credentials',
		html: `<h3>Welcome!!!</h3>
    <div>Your Account Creds Are:<p>Username:${email}</p><p>Password:${password}</p>
    
    </div>
    `,
	};
	transport.sendMail(mailOptions, function (err, info) {
		if (err) {
			console.log(err);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
};

module.exports = { sendEmail };
