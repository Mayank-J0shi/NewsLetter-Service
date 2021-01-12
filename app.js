//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public")); //to use the staic elements in the projects like images and css

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
});


app.post("/",function(req,res){
   const firstname = req.body.fName;
   const lastname = req.body.lName;
   const email = req.body.email;
   const data = {
       members: [
           {
               email_address : email,
               status : "subscribed",
               merge_feilds : {
                    FNAME : firstname,
                    LNAME : lastname,
            }
           }
       ]
   };
    
    const jsonData = JSON.stringify(data);
    const url = "https://us7.api.mailchimp.com/3.0/lists/de3c8720d3";
    const options = {
        method : "POST",
        auth : "mayank:fd2a969f91dc4d02f541651c39669b14-us7",
    };
    
    const request = https.request(url, options, function(response){
        
        if(response.statusCode == 200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();

});


app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(3000, function(){
    console.log("server is running on port 3000");
});
    

    
//
//Api key :fd2a969f91dc4d02f541651c39669b14-us7
//List ID : de3c8720d3