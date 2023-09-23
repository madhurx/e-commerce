const mongoose = require("mongoose");

const connectDatabase = () => {
	mongoose
		.connect(process.env.DB_URI, {
			useNewURLParser: true,
			useUnifiedTopology: true,
		})
		.then((data) => {
			console.log(
				`Mongodb connected with server ${data.connection.host}:${data.connection.port}/${data.connection.name}`,
			);
		});
};
module.exports = connectDatabase;
