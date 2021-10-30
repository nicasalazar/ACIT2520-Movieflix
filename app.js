/*
 Authors: Dannicah Salazar
 Your name and student #: A00957776
*/
const express = require("express");
let app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("pages/index", {
    Movielist: ["Inception", "Spiderman", "The Dark Knight", "Tenet"]
  }));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  let formData = req.body;
  movieListArray = formData.Movielist.split(', ');
  res.render("pages/index", {
    Movielist: movieListArray
  });
});

app.get("/myListQueryString", (req, res) => {
  let movieList = []
  let {movie1, movie2} = req.query;
  movieList.push(movie1, movie2)
  console.log()
  res.render("pages/index", {
    Movielist: movieList 
  });
});

app.get("/search/:movieName", (req, res) => {
  let movieNameList = req.params.movieName;
  fs.readFile("movieDescriptions.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const content = data.split("\n");
      for (line of content) {
        let [name, description] = line.split(":");
        if (name.toUpperCase() == movieNameList.toUpperCase()) {
          res.render("pages/searchResult", { 
            movieNameList, description })
          return;
        };
      };
      res.render("pages/searchResult", { 
        movieNameList: null, description: "Movie not found"
      });
    };
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});