const express = require("express");
const bodyParser = require("body-parser");
var _ = require("lodash");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

const blogArray = [];
const homePage = "Welcome to my daily journal!!!!"
const contactPage = "Contact us at xxxxxxxx@xxxx.com";
const aboutPage = "Info About US! Know more.....";


app.get("/", function(req,res){
    // change keys and values to pass an array
    res.render("home", {pageTitle: "HOME", pageContent:homePage, wholeBlog: blogArray });    
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
    res.render("blog", {pageTitle: "About Us", pageContent: aboutPage});
});

app.get("/contact", function(req,res){
    res.render("blog", {pageTitle: "Contact Us", pageContent: contactPage});
});

app.get("/posts/:postname", function(req,res){
    let parameterVar = req.params.postname;

    blogArray.forEach(function(i){
        if(_.lowerCase(parameterVar) === _.lowerCase(i.title)){
            res.render("blog", {pageTitle: i.title , pageContent: i.content});
        }
 
    });

});

app.listen(3000, function(){
    console.log("Server running at port 3000");
    
});