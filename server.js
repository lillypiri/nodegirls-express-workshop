var fs = require('fs');
var express = require("express");
var app = express();
var formidable = require('express-formidable');

app.use(express.static("public"));
app.use(formidable());


app.post("/create-post", function(req, res) {

  fs.readFile(__dirname + '/data/posts.json', function(error, file) {
    var parsedFile = JSON.parse(file);
    parsedFile[Date.now()] = req.fields.blogpost;
    var posts = JSON.stringify(parsedFile);
    fs.writeFile(__dirname + '/data/posts.json', posts, function (error) {
      res.json(parsedFile);
    });
  });
});

// app.get("/", function(req, res) {
//   res.send("Yay Node Girls!");
// });
//
// app.get("/chocolate", function(req, res) {
//   res.send("Mmm, chocolate! 🍫🍫🍫");
// });
//
// app.get("/unicorn", function(req, res) {
//   res.send("Unicorns are the best! 🦄");
// });
//
// app.get("/plant", function(req, res) {
//   res.send("🌱🌱🌱🌱🌱");
// });

app.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
