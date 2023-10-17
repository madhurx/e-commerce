const mongoose = require("mongoose");

const connectDatabase = () => {
	const { MONGO_CLOUD_USERNAME, MONGO_CLOUD_PASSWORD } = process.env;

	const connStr = `mongodb+srv://${MONGO_CLOUD_USERNAME}:${MONGO_CLOUD_PASSWORD}@cluster0.o7jvuqc.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=AtlasApp`;
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};

	mongoose.connect(connStr, connectionParams).then((data) => {
		console.log(
			`Mongodb connected with server ${data.connection.host}:${data.connection.port}/${data.connection.name}`,
		);
	});
};

module.exports = connectDatabase;
