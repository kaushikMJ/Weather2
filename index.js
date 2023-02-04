const express= require("express");
const https= require("https");
const bodyParser= require("body-parser");
const app= express();
const port= 9000;

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname+"/display.html");
})

app.post("/", function(req, res){
    var city= req.body.city;
    var apiKey= "3c1b27b90c4268963bc03f81dad99c39";
    var unit= "metric";
    var url= "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+unit;
    
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            console.log(typeof(data))
            weatherData= JSON.parse(data);
            var temp= weatherData.main.temp;
            var description= weatherData.weather[0].description;
            var icon= weatherData.weather[0].icon;
            var iconURL= "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>"+city+","+weatherData.sys.country+"</h1>")
            //var finalResponse= "<h1>"+city+"</h1><br>Temperature= "+temp+"<br>Weather Description= "+description+"<br><img src="+iconURL+"></img>";
            res.write("<br>Temperature : "+temp);
            res.write("<br>Feels like  : "+weatherData.main.feels_like+"&#8451;");
            res.write("<br>Min. Temp   : "+weatherData.main.temp_min+"&#8451;");
            res.write("<br>Max. Temp   : "+weatherData.main.temp_max+"&#8451;");
            res.write("<br>Humidity   : "+weatherData.main.humidity);
            res.write("<p>Weather Description= "+description+"</p>");
            res.write("<img src="+iconURL+"></img>");
            res.send();
        });
    }).on("error", (error) => {
        console.error(error.message);
    });

})
app.listen("9000", function(){
    console.log("Server is running on port 3000");
})