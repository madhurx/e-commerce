// // // // // const Busboy = require('busboy');

// // // // // function handleFileUpload(req, res) {
// // // // // 	const busboy = new Busboy({ headers: req.headers });

// // // // // 	busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
// // // // // 		// Handle the uploaded file, e.g., save it to disk or process it.
// // // // // 		file.on("data", (data) => {
// // // // // 			// Process file data as it's being streamed
// // // // // 			console.log(`Received ${data.length} bytes of file data`);
// // // // // 		});

// // // // // 		file.on("end", () => {
// // // // // 			console.log("File upload finished");
// // // // // 		});
// // // // // 	});

// // // // // 	busboy.on("finish", () => {
// // // // // 		console.log("All files have been processed");
// // // // // 		res.writeHead(200, { Connection: "close" });
// // // // // 		res.end("File upload complete");
// // // // // 	});

// // // // // 	busboy.on("error", (err) => {
// // // // // 		console.error("Busboy error:", err);
// // // // // 		res.writeHead(500, { Connection: "close" });
// // // // // 		res.end("Internal Server Error");
// // // // // 	});

// // // // // 	req.pipe(busboy);
// // // // // }

// // // // // module.exports = handleFileUpload;

// // // // const formidable = require("formidable");
// // // // const fs = require('fs');


// // // // function handleFileUpload(req, res, next) {
// // // // 	const form = new formidable.IncomingForm();
// // // //     form.uploadDir = __dirname + '/uploads'; // Set your upload directory

// // // // 	form.parse(req, function (err, fields, files) {

// // // //         if (err) {
// // // //             return next(err); // Pass the error to the error handler
// // // //           }
// // // //         //   console.log('Fields:', fields);
// // // //         //   console.log('Files:', files);
// // // //           // Add parsed form data to request object
// // // //           req.body = fields;
// // // //           req.files = files;
// // // //         //   console.log('Parsed form data:', req.body.avatar);

      
// // // //           next(); // Move to the next middleware or route handler
        

// // // // 	});
// // // // }
// // // // module.exports =  handleFileUpload ;


// // // const formidable = require("formidable");
// // // const fs = require('fs');
// // // const path = require('path');

// // // function handleFileUpload(req, res, next) {
// // //   const uploadDir = path.join(__dirname, 'uploads');

// // //   // Create the 'uploads' directory if it doesn't exist
// // //   if (!fs.existsSync(uploadDir)) {
// // //     fs.mkdirSync(uploadDir);
// // //   }

// // //   const form = new formidable.IncomingForm();
// // //   form.uploadDir = uploadDir;

// // //   form.parse(req, function (err, fields, files) {
// // //     if (err) {
// // //       return next(err);
// // //     }

// // //     req.body = fields;
// // //     req.files = files;

// // //     next();
// // //   });
// // // }


// // // module.exports = handleFileUpload;



// // const busboy = require('busboy');
// // const fs = require('fs');
// // const path = require('path');

// // function handleFileUpload(req, res, next) {
// //   const uploadDir = path.join(__dirname, 'uploads');

// //   // Create the 'uploads' directory if it doesn't exist
// //   if (!fs.existsSync(uploadDir)) {
// //     fs.mkdirSync(uploadDir);
// //   }

// //   const busboyInstance = new busboy({ headers: req.headers });

// //   busboyInstance.on('file', function(fieldname, file, filename, encoding, mimetype) {
// //     const filePath = path.join(uploadDir, filename);

// //     const writeStream = fs.createWriteStream(filePath);

// //     file.pipe(writeStream);

// //     writeStream.on('finish', function() {
// //       // File has been saved
// //       req.files = {
// //         avatar: {
// //           name: filename,
// //           path: filePath,
// //           size: fs.statSync(filePath).size,
// //           mimetype: mimetype,
// //         },
// //       };

// //       next();

// //       // Optionally, delete the file after processing
// //       fs.unlink(filePath, (unlinkErr) => {
// //         if (unlinkErr) {
// //           console.error('Error deleting file:', unlinkErr);
// //         } else {
// //           console.log('File deleted successfully:', filePath);
// //         }
// //       });
// //     });
// //   });

// //   // Set up event listeners for the finish and error events
// //   busboyInstance.on('finish', function() {
// //     console.log('Busboy finished parsing the form!');
// //   });

// //   busboyInstance.on('error', function(err) {
// //     console.error('Busboy error:', err);
// //     next(err);
// //   });

// //   // Pipe the request stream into busboy
// //   req.pipe(busboyInstance);
// // }

// // module.exports = handleFileUpload;


// const fs = require('fs');
// const path = require('path');

// function handleFileUpload(req, res, next) {
//   // Check if the request is a busboy request
//   if (!req.busboy) {
//     return next(new Error('File upload middleware is not properly configured.'));
//   }

//   const uploadDir = path.join(__dirname, 'uploads');

//   // Create the 'uploads' directory if it doesn't exist
//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
//   }

//   req.files = {}; // Initialize an object to store uploaded files

//   req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
//     if (typeof filename !== 'string' || !filename.trim()) {
//       return next(new Error('Invalid filename received.'));
//     }

//     const filePath = path.join(uploadDir, filename);

//     const writeStream = fs.createWriteStream(filePath);

//     file.pipe(writeStream);

//     writeStream.on('finish', function() {
//       // File has been saved
//       req.files[fieldname] = {
//         name: filename,
//         path: filePath,
//         size: fs.statSync(filePath).size,
//         mimetype: mimetype,
//       };
//     });
//   });

//   req.busboy.on('finish', function() {
//     // Busboy finished parsing the form
//     next();
//   });

//   // Pipe the request stream into busboy
//   req.pipe(req.busboy);
// }

// module.exports = handleFileUpload;


// const fs = require('fs');
// const path = require('path');

// function handleFileUpload(req, res, next) {
//   // Check if the request is a busboy request
//   if (!req.busboy) {
//     return next(new Error('File upload middleware is not properly configured.'));
//   }

//   const uploadDir = path.join(__dirname, 'uploads');

//   // Create the 'uploads' directory if it doesn't exist
//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
//   }

//   req.files = {}; // Initialize an object to store uploaded files

//   req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
//     if (typeof filename.filename !== 'string' || !filename.filename.trim()) {
//       console.error('Invalid filename received:', filename.filename);
//       return next(new Error('Invalid filename received.'));
//     }

//     console.log('Received filename:', filename.filename);

//     const filePath = path.join(uploadDir, filename.filename);

//     console.log('Constructed filePath:', filePath);

//     const writeStream = fs.createWriteStream(filePath);

//     file.pipe(writeStream);

//     writeStream.on('finish', function() {
//       // File has been saved
//       req.files[fieldname] = {
//         name: filename.filename,
//         path: filePath,
//         size: fs.statSync(filePath).size,
//         mimetype: mimetype,
//       };
//     });
//   });

//   req.busboy.on('finish', function() {
//     // Busboy finished parsing the form
//     console.log('Busboy finished parsing the form.');
//     next();
//   });

//   // Pipe the request stream into busboy
//   req.pipe(req.busboy);
// }

// module.exports = handleFileUpload;
