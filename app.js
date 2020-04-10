const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

const titleArray = [];
const contentShortArray = [];
const contentLongArray = [];


app.get("/", function(req,res){
    // change keys and values to pass an array
    res.render("home", {pageTitle: "Home", newPostTitle: titleArray, newPostContent: contentLongArray , xyz:contentShortArray }); 

    
});

app.post("/", function(req,res){ 
       
        var titleOfPost = req.body.postTitle;
        var contentOfPost = req.body.postContent;

        //push it in an array!!!  
        titleArray.push(titleOfPost);
        contentLongArray.push(contentOfPost);
        contentShortArray.push(contentOfPost.slice(0,100)); 

       
    
    res.redirect("/");
});



app.get("/about", function(req,res){
    res.render("blog", {pageTitle: "About Us"});
});



// app.post("/about", function(req,res){

// });

app.get("/contact", function(req,res){
    // res.send("hello");
    res.render("blog", {pageTitle: "Contact Us"});
});

// app.post("/contact", function(req,res){

// });

app.get("/compose", function(req,res){
    res.render("composePage");
});

app.listen(3000, function(){
    console.log("Server running at port 3000");
    
});