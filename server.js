var express = require("express");
// var mongojs = require("mongojs");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");

//require custom models
var db = require("./models");

var PORT = 3000;
var app = express();


app.use(bodyparser.urlencoded({extended: true}));

//servers public folder as the static directory
app.use(express.static("public"), function(re,res,next){
    next();
});

//connect to mongodbdb
mongoose.connect("mongodb://localhost/scraper", {useNewUrlParser: true},function(error){
    if(error){
        console.log(error);
    }
    console.log("connected...")
});


//create test article

// db.Article.create({title: "test", link:"test.url"})
// db.Article.create({title: "test2", link:"test.url2"})

//figure out test comments after scraping and storing

// db.Comment.create({body: "This is a test comment"})


//scrape routes
app.get("/", function(req, res){
    res.send("testing")
    console.log("scraping...");
    request("https://www.nbcnews.com", function(err,resp,html){
        if(!err){
            const $ = cheerio.load(html);
            console.log(html);
            var result = [];
            let looptitle = "";
            let loopurl = "";
            $("h3 a").each(function(i, element){
                console.log("---------------------------------");
                //title
                // console.log(element.children[0].data);
                looptitle = element.children[0].data;

                //url
                // console.log(element.children[0].parent.attribs.href);
                loopurl = element.children[0].parent.attribs.href;
                result.push({
                    "title": looptitle,
                    "url": loopurl
                })

            })
            console.log(result);
            // db.articles.remove({});
            for(i=0; i< result.length; i++){
                dbtitle = result[i].title;
                dburl = result[i].url;
                db.Article.create({title: dbtitle, link: dburl});
                console.log(`Title for this is ${result[i].title}`);
                console.log(`Url for this is ${result[i].url}`);

            }
        }
        console.log(err);
    })
})

app.get("/articles", function(req,res){
    db.Article.find({}).then(function(dbArtice){
        res.json(dbArtice);
    })
    .catch(function(err){
        res.json(err);
    })
})


//listen on desired port...3000 atm
app.listen(PORT, function(){
    console.log(`App is listening on port ${PORT}`);
});