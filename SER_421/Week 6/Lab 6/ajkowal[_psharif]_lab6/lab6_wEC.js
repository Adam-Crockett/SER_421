////Lab 6 with Extra Credit
///Project: Lab 6 Activity with Extra Credit SER 421 Gary 
///Author: Pedram Sharif and Anthony Kowal
//Date Last Modified: November 25, 2016

///Variables used For Nicest City, Hottest City, and Ave Temp
var temp1Ave=0, temp2Ave=0, temp3Ave=0; 
var humidity1=0, humidity2=0, humidity3=0; 
var wind1=0, wind2=0, wind3=0; 
//var deltaTime1=0, deltaTime2=0, deltaTime3=0; 

///Variables to Keep Track of Values for Each City
var phoenixTempAve=0, parisTempAve=0, romeTempAve=0, vegasTempAve=0, chicagoTempAve=0, tokyoTempAve=0, caymansTempAve=0; 
var phoenixHumidity=0, parisHumidity=0, romeHumidity=0, vegasHumidity=0, chicagoHumidity=0, tokyoHumidity=0, caymansHumidity=0; 
var phoenixWind=0, parisWind=0, romeWind=0, vegasWind=0, chicagoWind=0, tokyoWind=0, caymansWind=0; 
var phoenixTime=0, parisTime=0, romeTime=0, vegasTime=0, chicagoTime=0, tokyoTime=0, caymansTime=0; 

///Loads Google Front End Charts
google.charts.load('current', {packages: ['corechart', 'line']});

///Loads Initial Table Values and Stores the Variables
var array1=weather2Table("Phoenix", "1");
temp1Ave=array1[0]; humidity1=array1[1]; wind1=array1[2]; deltaTime1=array1[3];
phoenixTempAve=array1[0];phoenixHumidity=array1[1];phoenixWind=array1[2];phoenixTime=array1[3];
var array2=weather2Table("Paris", "2");
temp2Ave=array2[0]; humidity2=array2[1]; wind2=array2[2]; deltaTime2=array2[3]; 
parisTempAve=array2[0];parisHumidity=array2[1];parisWind=array2[2];parisTime=array2[3];
var array3=weather2Table("Rome", "3");
temp3Ave=array3[0]; humidity3=array3[1]; wind3=array3[2]; deltaTime3=array3[3]; 
romeTempAve=array3[0];romeHumidity=array3[1];romeHumidity=array3[2];romeTime=array3[3];

///Loads initial average Temp, hottest City and Nicest City
aveTemp(); 
getHottestCity();
getNicestCity();

///Calls the Weather Web API for the current values and updates table and returns values. 
function weather2Table(city, idNumber){
    
    var weather = new XMLHttpRequest();

    weather.open("GET", "http://api.apixu.com/v1/current.json?key=b3fcf49b74b9482da4d204738161911&q="+city, false);
    weather.send(null);

    var r = JSON.parse(weather.response);
    var tempAve = r.current.temp_f;
    var humidity = r.current.humidity;
    var wind = r.current.wind_mph;
    var deltaTime= r.current.last_updated_epoch;

    document.getElementById("tUpdate"+idNumber).innerHTML= "&nbsp&nbsp"+r.current.last_updated;
    document.getElementById("temp"+idNumber).innerHTML = "&nbsp&nbsp"+r.current.temp_f + " & " + r.current.feelslike_f;
    document.getElementById("humidity"+idNumber).innerHTML = "&nbsp&nbsp"+r.current.humidity;
    document.getElementById("wind"+idNumber).innerHTML = "&nbsp&nbsp"+r.current.wind_mph;
    document.getElementById("condition"+idNumber).innerHTML = "&nbsp&nbsp"+r.current.condition.text; 
    
    var cityValues=[tempAve, humidity, wind, deltaTime];
    
    changeCityValues(city, cityValues);
    
    return cityValues; 
}

///Changes the Values of city variables based on which city is being changed 
function changeCityValues(city, cityValues){
    switch(city){
        case 'Phoenix':
            phoenixTempAve=cityValues[0];phoenixHumidity=cityValues[1];phoenixWind=cityValues[2];phoenixTime=cityValues[3]; 
            break; 
        case 'Paris':
            parisTempAve=cityValues[0];parisHumidity=cityValues[1];parisWind=cityValues[2];parisTime=cityValues[3]; 
            break;
        case 'Rome':
            romeTempAve=cityValues[0];romeHumidity=cityValues[1];romeWind=cityValues[2];romeTime=cityValues[3]; 
            break;
        case 'Las Vegas':
            vegasTempAve=cityValues[0];vegasHumidity=cityValues[1];vegasWind=cityValues[2];vegasTime=cityValues[3]; 
            break;
        case 'Chicago':
            chicagoTempAve=cityValues[0];chicagoHumidity=cityValues[1];chicagoWind=cityValues[2];chicagoTime=cityValues[3]; 
            break;
        case 'Tokyo':
            tokyoTempAve=cityValues[0];tokyoHumidity=cityValues[1];tokyoWind=cityValues[2];tokyoTime=cityValues[3]; 
            break;
        case 'Grand Caymans': 
            caymansTempAve=cityValues[0];caymansHumidity=cityValues[1];caymansWind=cityValues[2];caymansTime=cityValues[3]; 
            break;
        default: 
            console.log("Not a proper input."); 
    }                
}


///Adds Listeners for the drop down selector
var selectCityButton=document.getElementById("dropDownCity");

selectCityButton.addEventListener("change", function(){
    var array=getCity3();
    temp3Ave=array[0];humidity3=array[1];wind3=array[2];
    
    ////Clears Screen because of new selection
    document.getElementById("foreCastText").innerHTML ="";
    document.getElementById('chart_area').innerHTML=""; 
    
    ///Recomputes Averages and Cities based on new selection
    aveTemp();
    getHottestCity();
    getNicestCity();
});

///Returns the values for the drop down selection city
function getCity3(){
    var value=document.getElementById("dropDownCity").value;
    var getCityValues=weather2Table(value, '3'); 
    return getCityValues;
}

///Finds the aveTemp 
function aveTemp(){
    var tempAveAll = ((temp1Ave + temp2Ave + temp3Ave)/3).toFixed(2);
    document.getElementById("tempAveAll").innerHTML = tempAveAll;
}

///Gets the Hottest City
function getHottestCity() {

	var hottest = temp1Ave;
	var hotCity = "Phoenix";
    var city3 = document.getElementById("dropDownCity").value;

	if (hottest < temp2Ave && hottest < temp3Ave) {
    hotCity = "Paris";
    hottest = temp2Ave;
    } else if (hottest < temp3Ave) {
    hotCity = city3;
    hottest = temp3Ave;
    } else{
    }
    document.getElementById("hottestCity").innerHTML = hotCity;
    //return hotCity;
 }

///Gets the Nicest City
function getNicestCity() {
	var nicestCity;		//nicest city to be returned

	//nicest city ideal variables to be calculated
	var niceTemp = 72;
    var nicelHumidity = 40;
    var niceWind = 9;

	var score1a = 0, score1b = 0, score1c = 0;
    var score2b = 0, score2b = 0, score2c = 0;
    var score3c = 0, score3b = 0, score3c = 0;

	//iterate through to calculate score
        
        score1a = Math.abs(((temp1Ave - niceTemp)/niceTemp)*10);
        score1b = score1a + Math.abs(((humidity1 - nicelHumidity)/nicelHumidity)*10);
        score1c = score1b + Math.abs(((wind1 - niceWind)/niceWind)*10);
      
        score2a = Math.abs(((temp2Ave - niceTemp)/niceTemp)*10);
        score2b = score2a + Math.abs(((humidity2 - nicelHumidity)/nicelHumidity)*10);
        score2c = score2b + Math.abs(((wind2 - niceWind)/niceWind)*10);
       
      
        score3a = Math.abs(((temp3Ave - niceTemp)/niceTemp)*10);
		score3b = score3a + Math.abs(((humidity3 - nicelHumidity)/nicelHumidity)*10);
		score3c = score3b + Math.abs(((wind3 - niceWind)/niceWind)*10);
        
        
	//iterate to find the best score
	// ideal city is the one with the lowest score
    var city3 = document.getElementById("dropDownCity").value;
    
    if (score1c < score2c && score1c < score3c) {
    nicestCity = "Phoenix";
    } else if (score2c < score3c && score2c < score1c) {
    nicestCity = "Paris";
    } else{
    nicestCity = city3;
    }
    document.getElementById("nicestCity").innerHTML = nicestCity;
    //return nicestCity;
}

///Adds Listeners for the forecast buttons. 
var phxButton=document.getElementById("phxButton");
phxButton.addEventListener("click", function(){ drawChart("Phoenix");});

var parButton=document.getElementById("parButton");
parButton.addEventListener("click", function(){ drawChart("Paris");});

var selcButton=document.getElementById("selcButton");
selcButton.addEventListener("click", function(){ 
    var value = document.getElementById("dropDownCity").value;
    drawChart(value);
});


/// Adds the Forecast to the DOM 
function getForeCast(city){
    
    var forecast1 = new XMLHttpRequest();

    forecast1.open("GET", "http://api.apixu.com/v1/forecast.json?key=b3fcf49b74b9482da4d204738161911&q="+city+"&days=2", false);
    forecast1.send(null);


    var f=JSON.parse(forecast1.response);
    
    ////Update to Make change changeCityValues(city, cityValues)
    var tempAve = f.current.temp_f;
    var humidity = f.current.humidity;
    var wind = f.current.wind_mph;
    var deltaTime= f.current.last_updated_epoch;
    
    var cityValues=[tempAve, humidity, wind, deltaTime];
    
    ///Changes City values when forecast is made
    changeCityValues(city, cityValues);
    
    ////Updates for Forecast below Table
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
    
    ////Gathers data for the Chart
    var hourlyTempValues=[];
    
    for(var i=0; i < 24; i++){
        hourlyTempValues.push([i,f.forecast.forecastday[1].hour[i].temp_f]);
    }
    
    return hourlyTempValues;
}

///Draws the Chart for EC Requirement 2
function drawChart(city) {

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'Temp Values');
        
      var hourlyTempValues=getForeCast(city);  

      data.addRows(hourlyTempValues);

      var options = {
        hAxis: {title: 'Hours Military Time'},
        vAxis: {title: 'Temp in Farenheit'}
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_area'));
    
      chart.draw(data, options);
}


///Adds Listeners for the refresh button 
var phxButton=document.getElementById("wButton");
wButton.addEventListener("click", refresh);

///Renders the Indicators and Calls for New 
function refresh(){
    ///Refreshes the Table
    var array1=renderIndicators("Phoenix", "1");
    temp1Ave=array1[0]; humidity1=array1[1]; wind1=array1[2];
    changeCityValues('Phoenix', array1);
    
    var array2=renderIndicators("Paris", "2");
    temp2Ave=array2[0]; humidity2=array2[1]; wind2=array2[2];
    changeCityValues('Paris', array2);
    
    var value=document.getElementById("dropDownCity").value;
    var array3=renderIndicators(value, "3");
    temp3Ave=array3[0]; humidity3=array3[1]; wind3=array3[2];
    changeCityValues(value, array3);
    
    ///Recomputes For Requirement 3
    aveTemp();
    getHottestCity();
    getNicestCity();
}

////Updates Indicators in the table when Refresh is pushed. 
function renderIndicators(city, idNumber){
    var tempAve=0;
    
    ///Values to compare to
    if(idNumber=='1'){
        tempAve=phoenixTempAve;
        humidity=phoenixHumidity;
        wind=phoenixWind;
        deltaTime=phoenixTime;
    }
    if(idNumber=='2'){
        tempAve=parisTempAve;
        humidity=parisHumidity;
        wind=parisWind;
        deltaTime=parisTime;
    }
    if(idNumber=='3'){
        switch(city){
            case 'Rome':
                tempAve=romeTempAve;humidity=romeHumidity;wind=romeWind;deltaTime=romeTime; 
                break;
            case 'Las Vegas':
                tempAve=vegasTempAve;humidity=vegasHumidity;wind=vegasWind;deltaTime=vegasTime; 
                break;
            case 'Chicago':
                tempAve=chicagoTempAve;humidity=chicagoHumidity;wind=chicagoWind;deltaTime=chicagoTime; 
                break;
            case 'Tokyo':
                tempAve=tokyoTempAve;humidity=tokyoHumidity;wind=tokyoWind;deltaTime=tokyoTime; 
                break;
            case 'Grand Caymans': 
                tempAve=caymansTempAve;humidity=caymansHumidity;wind=caymansWind;deltaTime=caymansTime;
                break;
            default: 
                console.log("Not a proper input."); 
        }
    }
    
    var array=weather2Table(city, idNumber);
    console.log("deltaTime1 is " + deltaTime + " and deltaTime2 is " + array[3]);
    var deltaT=convert2Num(array[3], deltaTime);
   
    ///Updates the Indicators
    if(array[0] > tempAve){
        document.getElementById("tempIndicator"+idNumber).innerHTML="<span style='color:green'>&nbsp&nbspWarmer</span>";
        document.getElementById("tempDelta"+idNumber).innerHTML="&nbsp&nbspdT:&nbsp"+deltaT+"&nbsp";
        tempAve=array[0];
        deltaTime=array[3];
    }
    if(array[0] == tempAve){
        document.getElementById("tempIndicator"+idNumber).innerHTML="<span style='color:blue'>&nbsp&nbspSame&nbspTemperature</span>";
        document.getElementById("tempDelta"+idNumber).innerHTML="&nbsp&nbspdT:&nbsp"+deltaT+"&nbsp";
        tempAve=array[0];
        deltaTime=array[3];
    }
    if(array[0] < tempAve){
        document.getElementById("tempIndicator"+idNumber).innerHTML="<span style='color:red'>&nbsp&nbspColder</span>";
        document.getElementById("tempDelta"+idNumber).innerHTML="&nbsp&nbspdT:&nbsp"+deltaT+"&nbsp";
        tempAve=array[0];
        deltaTime=array[3];
    }
    if(array[1] > humidity){
        document.getElementById("humidityIndicator"+idNumber).innerHTML="<span style='color:green'>&nbsp&nbspMore&nbspHumidity</span>";
        document.getElementById("humDelta"+idNumber).innerHTML="&nbsp&nbspdT:&nbsp"+deltaT+"&nbsp";
        humidity=array[1];
    }
    if(array[1] == humidity){
        document.getElementById("humidityIndicator"+idNumber).innerHTML="<span style='color:blue'>&nbsp&nbspSame&nbspHumidity</span>";
        document.getElementById("humDelta"+idNumber).innerHTML="&nbsp&nbspdT:&nbsp"+deltaT+"&nbsp";
        humidity=array[1];
    }
    if(array[1] < humidity){
        document.getElementById("humidityIndicator"+idNumber).innerHTML="<span style='color:red'>&nbsp&nbspLess&nbspHumidity</span>";
        document.getElementById("humDelta"+idNumber).innerHTML="&nbsp&nbspdT:&nbsp"+deltaT+"&nbsp";
        humidity=array[1];
    }
    if(array[2] > wind){
        document.getElementById("windIndicator"+idNumber).innerHTML="<span style='color:green'>&nbsp&nbspMore&nbspWind</span>";
        document.getElementById("windDelta"+idNumber).innerHTML="&nbsp&nbspdT:&nbsp"+deltaT+"&nbsp";
        humidity=array[2];
    }
    if(array[2] == wind){
        document.getElementById("windIndicator"+idNumber).innerHTML="<span style='color:blue'>&nbsp&nbspSame&nbspWind</span>";
        document.getElementById("windDelta"+idNumber).innerHTML="&nbsp&nbspdT:&nbsp"+deltaT+"&nbsp";
        humidity=array[2];
    }
    if(array[2] < wind){
        document.getElementById("windIndicator"+idNumber).innerHTML="<span style='color:red'>&nbsp&nbspLess&nbspWind</span>";
        document.getElementById("windDelta"+idNumber).innerHTML="&nbsp&nbspdT:&nbsp"+deltaT+"&nbsp";
        humidity=array[2];
    }
    
    var cityValues=[tempAve, humidity, wind, deltaTime];
    
    return cityValues; 
}

////Converts the Epoch Time to a Hard Number for Delta T
function convert2Num(t1,t0){
    var deltaT=t1-t0;
    var deltaTString="";
    if(deltaT < 0){
        deltaTString=deltaTString.concat("-");
        deltaT=deltaT*(-1);
    }
    var timeRemaining=deltaT;
    
    if (timeRemaining >= (24*60*60)){
        var days=Math.floor(timeRemaining/(24*60*60));
        deltaTString=deltaTString.concat(" " + days.toString() + "d");
        timeRemaining=timeRemaining % (24*60*60);
    }
    if(timeRemaining >= (60*60)){
        var hours= Math.floor(timeRemaining/(60*60));
        deltaTString=deltaTString.concat(" " + hours.toString() + "h");
        timeRemaining= timeRemaining % (60*60);
    }
    if (timeRemaining >= (60)){
        var mins= Math.floor(timeRemaining/(60));
        deltaTString=deltaTString.concat(" " + mins.toString() + "m");
        timeRemaining=timeRemaining % 60;
    }
    deltaTString=deltaTString.concat(" " + timeRemaining.toString() + "s");                     
    
    return deltaTString; 
}
