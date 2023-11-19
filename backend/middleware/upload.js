// const Busboy = require('busboy');

// function handleFileUpload(req, res) {
// 	const busboy = new Busboy({ headers: req.headers });

// 	busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
// 		// Handle the uploaded file, e.g., save it to disk or process it.
// 		file.on("data", (data) => {
// 			// Process file data as it's being streamed
// 			console.log(`Received ${data.length} bytes of file data`);
// 		});

// 		file.on("end", () => {
// 			console.log("File upload finished");
// 		});
// 	});

// 	busboy.on("finish", () => {
// 		console.log("All files have been processed");
// 		res.writeHead(200, { Connection: "close" });
// 		res.end("File upload complete");
// 	});

// 	busboy.on("error", (err) => {
// 		console.error("Busboy error:", err);
// 		res.writeHead(500, { Connection: "close" });
// 		res.end("Internal Server Error");
// 	});

// 	req.pipe(busboy);
// }

// module.exports = handleFileUpload;

const formidable = require("formidable");
const fs = require('fs');


function handleFileUpload(req, res, next) {
	const form = new formidable.IncomingForm();
    form.uploadDir = __dirname + '/uploads'; // Set your upload directory

	form.parse(req, function (err, fields, files) {
		// let oldPath = files.profilePic.filepath;
		// let newPath = path.join(__dirname, "uploads") + "/" + files.profilePic.name;
		// let rawData = fs.readFileSync(oldPath);

		// fs.writeFile(newPath, rawData, function (err) {
		// 	if (err) {
		// 		req.fileError = err;
		// 		console.log(err);
		// 	} else {
		// 		req.body = fields;
		// 		req.files = files;
		// 		req.fileError = { msg: "Successfully uploaded" };
		// 		// return res.send("Successfully uploaded")
		// 	}

		// 	next();
		// });

        if (err) {
            return next(err); // Pass the error to the error handler
          }
      
          // Add parsed form data to request object
          req.body = fields;
          req.files = files;
          console.log('Parsed form data:', req.files);

      
          next(); // Move to the next middleware or route handler
        

	});
}
module.exports =  handleFileUpload ;
