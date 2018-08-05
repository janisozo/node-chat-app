const path = require("path");
const express = require("express");
const app = express();



const publicPath = path.join(__dirname, "../public/");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));


// I don't know why this is not needed
// app.get("/", (req, res) => {
// 	res.send("index");
// });

app.listen(port, () => {
	console.log(`Server running on port ${port}.`);
});