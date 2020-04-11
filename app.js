const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

const blogArray = [];

app.get("/", function(req,res){
    // change keys and values to pass an array
    res.render("home", {pageTitle: "Home", wholeBlog: blogArray });    
});

app.get("/compose", function(req,res){
    res.render("composePage");
});

app.post("/compose", function(req,res){    
    let blog = {
        title: req.body.postTitle,
        content: req.body.postContent
    }
    //push it in an array!!!  
    blogArray.push(blog);
    res.redirect("/");
});

app.get("/about", function(req,res){
    res.render("blog", {pageTitle: "About Us"});
});

app.get("/contact", function(req,res){
    res.render("blog", {pageTitle: "Contact Us"});
});


// -------------------------------------------------------------------------------
app.get("/posts/:postname", function(req,res){
   console.log(req.params.postname);
    
});

// -------------------------------------------------------------------------------



app.listen(3000, function(){
    console.log("Server running at port 3000");
    
});