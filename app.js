const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function (req,res) {
    res.sendFile(__dirname + "/signup.html");   
});

app.post("/",function (req,res){
    const firstname = req.body.Fname;
    const lastname = req.body.Lname;
    const emailId  = req.body.email;
    const data = {
        members:[
        {
           email_address:emailId,
           status : "subscribed",
           merge_fields:{
            FNAME:firstname,
            LNAME:lastname
           }   
        }]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/472f029b83"

    const options = {
        method: "POST",
        auth: "Vivek:7813b88b05a620a53ed442b6aeba882b-us14"
    }

    const request = https.request(url,options,function (response) {
            
        if (response.statusCode === 200) {
            res.sendFile(__dirname+"/success.html");    
        } 
        else {
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
                console.log(JSON.parse(data));
            });
    });

    app.post("/failure",function (req,res) {
            res.redirect("/");       
    })
request.write(jsonData);
request.end();



});


app.listen(3000,function () {
    console.log("Server started on port 3000");
});
// api key
// 7813b88b05a620a53ed442b6aeba882b-us14

// list id
// 472f029b83