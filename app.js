const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var _ = require("lodash");

mongoose.connect("mongodb://localhost:27017/blogDB",{useNewUrlParser:true, useUnifiedTopology:true});

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

const blogSchema = {
    title: String,
    content: String
}

const Blog = mongoose.model("Blog", blogSchema);

const homePage = "Welcome to my daily journal!!!!"
const contactPage = "Contact us at xxxxxxxx@xxxx.com";
const aboutPage = "Info About US! Know more.....";


app.get("/", function(req,res){
    // change keys and values to pass an array
    Blog.find({},function(err, foundBlog){
        if(!err){
            res.render("home", {pageTitle: "HOME", pageContent:homePage, wholeBlog: foundBlog });    
        }
        
    });
});

app.get("/compose", function(req,res){
    res.render("composePage");
});

app.post("/compose", function(req,res){    
    let newBlogTitle = req.body.postTitle;
    let newBlogContent = req.body.postContent; 
    
    const blog = new Blog({
        title: newBlogTitle,
        content: newBlogContent
    });

    blog.save();
    res.redirect("/");
});

app.get("/about", function(req,res){
    res.render("blog", {pageTitle: "About Us", pageContent: aboutPage});
});

app.get("/contact", function(req,res){
    res.render("blog", {pageTitle: "Contact Us", pageContent: contactPage});
});

app.get("/posts/:postId", function(req,res){
    let parameterVar = req.params.postId;
    
    Blog.findOne({_id : parameterVar}, function(err, foundBlog){
        if(foundBlog){
            res.render("blog", {pageTitle: foundBlog.title , pageContent: foundBlog.content});
        } 
        else{
            Blog.findOne({title : _.lowerCase(parameterVar)}, function(err, foundBlog){
                if(foundBlog){
                    res.render("blog", {pageTitle: foundBlog.title , pageContent: foundBlog.content});
                } 
                else{
                    res.send("BLOG POST NOT FOUND")
                }
            });
                
        }
    
    });

});

app.listen(3000, function(){
    console.log("Server running at port 3000");
    
});