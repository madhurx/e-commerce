const nodeMailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (options) => {
	const transporter = nodeMailer.createTransport({
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		secure: true,
        secureConnection: false,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
        tls: {
            ciphers: 'SSLv3',
        },
	});

	const mailOptions = {
		from: process.env.SMTP_USER,
		to: options.email,
		subject: options.subject,
        html: `<b>This is bold text ${options.message}</b>`,
	};
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
};



module.exports = sendEmail;
