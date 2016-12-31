var temp1Ave=0, temp2Ave=0, temp3Ave=0; 
var humidity1=0, humidity2=0, humidity3=0; 
var wind1=0, wind2=0, wind3=0; 

var array1=weather2Table("Phoenix", "1");
temp1Ave=array1[0]; humidity1=array1[1]; wind1=array1[2]; 
var array2=weather2Table("Paris", "2");
temp2Ave=array2[0]; humidity2=array2[1]; wind2=array2[2]; 
var array3=weather2Table("Rome", "3");
temp3Ave=array3[0]; humidity3=array3[1]; wind3=array3[2]; 

function weather2Table(city, idNumber){
    
    var weather = new XMLHttpRequest();

    weather.open("GET", "http://api.apixu.com/v1/current.json?key=b3fcf49b74b9482da4d204738161911&q="+city, false);
    weather.send(null);

    var r = JSON.parse(weather.response);
    var tempAve = r.current.temp_f;
    var humidity = r.current.humidity;
    var wind = r.current.wind_mph;

    document.getElementById("tUpdate"+idNumber).innerHTML= r.current.last_updated;
    document.getElementById("temp"+idNumber).innerHTML = r.current.temp_f + " & " + r.current.feelslike_f;
    document.getElementById("humidity"+idNumber).innerHTML = r.current.humidity;
    document.getElementById("wind"+idNumber).innerHTML = r.current.wind_mph;
    document.getElementById("condition"+idNumber).innerHTML = r.current.condition.text; 
    
    var cityValues=[tempAve, humidity, wind];
    
    return cityValues; 
}

aveTemp(); ///Loads When the page opens. 
getHottestCity();
getNicestCity();

var selectCityButton=document.getElementById("dropDownCity");
//selectCityButton.addEventListener("change", getCity3); 
selectCityButton.addEventListener("change", function(){
    var array=getCity3();
    temp3Ave=array[0];humidity3=array[1];wind3=array[2];
    aveTemp();
});


function getCity3(){
    var value=document.getElementById("dropDownCity").value;
    var getCityValues=weather2Table(value, '3'); 
    return getCityValues;
}

function aveTemp(){
    var tempAveAll = ((temp1Ave + temp2Ave + temp3Ave)/3).toFixed(2);
    var hottestCity = getHottestCity();
    var nicestCity = getNicestCity();
    document.getElementById("tempAveAll").innerHTML = tempAveAll;
    document.getElementById("hottestCity").innerHTML = hottestCity;
    document.getElementById("nicestCity").innerHTML = nicestCity;
}

function getHottestCity() {

	var hottest = temp1Ave;
	var hotCity = "Phoenix";
    var city3 = document.getElementById("dropDownCity").value;

	if (hottest < temp2Ave) {
    hotCity = "Paris";
    hottest = temp2Ave;
    } else if (hottest < temp3Ave) {
    hotCity = city3;
    hottest = temp3Ave;
    } else{
    hotCity = "Phoenix";
    hottest = temp1Ave;
    }
    return hotCity;
 }

function getNicestCity() {
	var city;		//nicest city to be returned
	var bestScore = 10000;	//best score out of all cities

	//nicest city ideal variables to be calculated
	var idealTemp = 70.0;
    var idealWind = 10.0;
	var idealHumidity = 20;

	var score = [0, 0, 0];	//score for each city

	//iterate through to calculate score
	
	

	//iterate to find the best score
	// ideal city is the one with the lowest score	

	return city;
}

///Adds Listeners for the forecast buttons. 
var phxButton=document.getElementById("phxButton");
phxButton.addEventListener("click", function(){ getForeCast("Phoenix");});

var parButton=document.getElementById("parButton");
parButton.addEventListener("click", function(){ getForeCast("Paris");});

var selcButton=document.getElementById("selcButton");
selcButton.addEventListener("click", function(){ 
    var value = document.getElementById("dropDownCity").value;
    getForeCast(value);
});


/// Adds the forecast to the DOM 
function getForeCast(city){
    
    var forecast1 = new XMLHttpRequest();

    forecast1.open("GET", "http://api.apixu.com/v1/forecast.json?key=b3fcf49b74b9482da4d204738161911&q="+city+"&days=2", false);
    forecast1.send(null);

    var f=JSON.parse(forecast1.response);

    var timeString=f.forecast.forecastday[1].hour[8].time;
    var day=timeString.substring(0,timeString.length-6);
    var milTime=timeString.substring(timeString.length-6,timeString.length);

    var foreCastDay1="The forecast for tomorrow " + day + " at" + milTime +" is:"; 

    var foreCastDay2="It will be " +  f.forecast.forecastday[1].hour[8].condition.text + ". The temperature will be: " +  f.forecast.forecastday[1].hour[8].temp_f + " f";

    var foreCastDay3="The wind will be: " + f.forecast.forecastday[1].hour[8].wind_mph + " mph. In the direction of: " + f.forecast.forecastday[1].hour[8].wind_dir;

    var foreCastDay4="The pressure will be: " + f.forecast.forecastday[1].hour[8].pressure_in + " in., The precipitation will be: " + f.forecast.forecastday[1].hour[8].precip_in + " in., And the humidity will be: " + f.forecast.forecastday[1].hour[8].humidity + "%";

    var foreCastDay5=((f.forecast.forecastday[1].hour[8].will_it_rain == 0) ? "No expected rain. " : "It will rain. ") + ((f.forecast.forecastday[1].hour[8].will_it_snow == 0) ?  "No expected snow. " : " It will snow.") + " The cloud percentage will be: " + f.forecast.forecastday[1].hour[8].cloud + "%";

    var foreCastDay6="The temperature will feel like: " + f.forecast.forecastday[1].hour[8].feelslike_f + " f, With a windchill of: " + f.forecast.forecastday[1].hour[8].windchill_f + " f, With a heatindex of:  " + f.forecast.forecastday[1].hour[8].heatindex_f + " f, and a dewpoint of " + f.forecast.forecastday[1].hour[8].dewpoint_f + " f.";

    var timeString2=f.forecast.forecastday[1].hour[20].time;
    var day2=timeString2.substring(0,timeString2.length-6);
    var milTime2=timeString2.substring(timeString2.length-6,timeString2.length);

    var foreCastNight1="The forecast for tomorrow " + day2 + " at" + milTime2 +" is:"; 

    var foreCastNight2="It will be " +  f.forecast.forecastday[1].hour[20].condition.text + ". The temperature will be: " +  f.forecast.forecastday[1].hour[20].temp_f + " f";

    var foreCastNight3="The wind will be: " + f.forecast.forecastday[1].hour[20].wind_mph + " mph. In the direction of: " + f.forecast.forecastday[1].hour[20].wind_dir;

    var foreCastNight4="The pressure will be: " + f.forecast.forecastday[1].hour[20].pressure_in + " in., The precipitation will be: " + f.forecast.forecastday[1].hour[20].precip_in + " in., And the humidity will be: " + f.forecast.forecastday[1].hour[20].humidity + "%";

    var foreCastNight5=((f.forecast.forecastday[1].hour[8].will_it_rain == 0) ? "No expected rain. " : "It will rain. ") + ((f.forecast.forecastday[1].hour[8].will_it_snow == 0) ?  "No expected snow. " : "It will snow.") + " The cloud percentage will be: " + f.forecast.forecastday[1].hour[8].cloud + "%";

    var foreCastNight6="The temperature will feel like: " + f.forecast.forecastday[1].hour[20].feelslike_f + " f, With a windchill of: " + f.forecast.forecastday[1].hour[20].windchill_f + " f, With a heatindex of:  " + f.forecast.forecastday[1].hour[20].heatindex_f + " f, and a dewpoint of " + f.forecast.forecastday[1].hour[20].dewpoint_f + " f.";


    var dayArray = [foreCastDay1, foreCastDay2, foreCastDay3, foreCastDay4, foreCastDay5, foreCastDay6, foreCastNight1, foreCastNight2, foreCastNight3, foreCastNight4, foreCastNight5, foreCastNight6];

    var foreCastText="<h3>Day Time Forecast for " + city + " is: </h3>"; 

    for(var i=0; i < dayArray.length; i++){
        if(i==6){
            foreCastText=foreCastText.concat("<br><h3>Night Time Forecast for " + city + " is: </h3>");
        }
        foreCastText=foreCastText.concat("<p>" + dayArray[i] + "</p>");
    }
    
    document.getElementById("foreCastText").innerHTML = foreCastText + "<br>";
}

///Adds Listeners for the forecast buttons. 
var phxButton=document.getElementById("wButton");
wButton.addEventListener("click", refresh);

function refresh(){
    ///Refreshes the Table
    var array1=weather2Table("Phoenix", "1");
    temp1Ave=array1[0]; humidity1=array1[1]; wind1=array1[2]; 
    var array2=weather2Table("Paris", "2");
    temp2Ave=array2[0]; humidity2=array2[1]; wind2=array2[2];
    var array3=getCity3();
    temp3Ave=array3[0]; humidity3=array3[1]; wind3=array3[2];
    
    ///Recomputes For Requirement 3
    aveTemp();        
}

