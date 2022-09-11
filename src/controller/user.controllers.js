const { User } = require('../models/users');
const { password, generateToken } = require('../utils/common');
const { sendEmail } = require('../utils/email');

const registerUser = async (req, res) => {
	try {
		const { name, email } = req.body.data;
		if (!(name && email)) {
			return res.status(400).json({ msg: 'All Fields Are Required' });
		}
		const userExists = await User.findOne({ email: email });
		if (userExists) {
			return res.status(400).json({ msg: 'User Already Exists' });
		}

		const user = await User.create({
			name: name,
			email: email,
			password: password,
		});

		sendEmail(password, email);
		const token = generateToken(user._id);
		return res.status(201).json({
			msg: 'User Created Kindly Check Your Email',
			User: {
				userid: user._id,
				name: user.name,
				email: user.email,
				token: token,
			},
		});
	} catch (error) {
		res.status(400).json({ msg: error });
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body.data;
		if (!(email && password)) {
			return res.status(400).json({ msg: 'All Fields Are Required' });
		}
		if (password.length < 6) {
			return res
				.status(400)
				.json({ msg: 'Password Should have at least 6 characters' });
		}
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(404).json({
				msg: 'No account with this email/UserName has been registered.',
			});
		}
		if (user && (await user.matchPassword(password))) {
			const token = generateToken(user._id);
			return res.status(200).json({
				msg: 'User LoggedIn SuccessFully',
				user: {
					userid: user._id,
					name: user.name,
					email: user.email,
					token: token,
				},
			});
		} else {
			return res.status(404).json({ msg: 'Invalid Credentials' });
		}
	} catch (error) {
		return res.status(400).json({ msg: error });
	}
};

module.exports = { registerUser, loginUser };
