const Busboy = require('busboy');

function handleFileUpload(req, res) {
	const busboy = new Busboy({ headers: req.headers });

	busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
		// Handle the uploaded file, e.g., save it to disk or process it.
		file.on("data", (data) => {
			// Process file data as it's being streamed
			console.log(`Received ${data.length} bytes of file data`);
		});

		file.on("end", () => {
			console.log("File upload finished");
		});
	});

	busboy.on("finish", () => {
		console.log("All files have been processed");
		res.writeHead(200, { Connection: "close" });
		res.end("File upload complete");
	});

	busboy.on("error", (err) => {
		console.error("Busboy error:", err);
		res.writeHead(500, { Connection: "close" });
		res.end("Internal Server Error");
	});

	req.pipe(busboy);
}

module.exports = handleFileUpload;
