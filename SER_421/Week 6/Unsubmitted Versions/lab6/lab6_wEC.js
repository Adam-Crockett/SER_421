////Lab 6 with Extra Credit
///Project: Lab 6 Activity with Extra Credit SER 421 Gary 
///Author: Pedram Sharif and Anthony Kowal
//Date Last Modified: November 25, 2016

///Variables used For Nicest City, Hottest City, and Ave Temp
var temp1Ave=0, temp2Ave=0, temp3Ave=0; 
var humidity1=0, humidity2=0, humidity3=0; 
var wind1=0, wind2=0, wind3=0;
var deltaTime1=0, deltaTime2=0, deltaTime3=0; 

///Variables to Keep Track of Values for Each City
var phoenixTempAve=0, parisTempAve=0, romeTempAve=0, vegasTempAve=0, chicagoTempAve=0, tokyoTempAve=0, caymansTempAve=0; 
var phoenixHumidity=0, parisHumidity=0, romeHumidity=0, vegasHumidity=0, chicagoHumidity=0, tokyoHumidity=0, caymansHumidity=0; 
var phoenixWind=0, parisWind=0, romeWind=0, vegasWind=0, chicagoWind=0, tokyoWind=0, caymansWind=0; 
var phoenixTime=0, parisTime=0, romeTime=0, vegasTime=0, chicagoTime=0, tokyoTime=0, caymansTime=0; 

///Variables to Keep Track of Values for Each City
//var oldPhoenixTempAve=0, oldParisTempAve=0, oldRomeTempAve=0, oldVegasTempAve=0, oldChicagoTempAve=0, oldTokyoTempAve=0, oldCaymansTempAve=0; 
//var oldPhoenixHumidity=0, oldParisHumidity=0, oldRomeHumidity=0, oldVegasHumidity=0, oldChicagoHumidity=0, oldTokyoHumidity=0, oldCaymansHumidity=0; 
//var oldPhoenixWind=0, oldParisWind=0, oldRomeWind=0, oldVegasWind=0, oldChicagoWind=0, oldTokyoWind=0, oldCaymansWind=0; 
//var oldPhoenixTime=0, oldParisTime=0, oldRomeTime=0, oldVegasTime=0, oldChicagoTime=0, oldTokyoTime=0, oldCaymansTime=0; 

///Variables used For Nicest City, Hottest City, and Ave Temp
var oldTempAve=0; //oldTemp2Ave=0, oldTemp3Ave=0; 
var oldHumidity=0; //oldHumidity2=0, oldHumidity3=0; 
var oldWind=0;//oldWind2=0, oldWind3=0;
var oldDeltaTime=0;// oldDeltaTime2=0, oldDeltaTime3=0; 

var newTempAve=0; //oldTemp2Ave=0, oldTemp3Ave=0; 
var newHumidity=0; //oldHumidity2=0, oldHumidity3=0; 
var newWind=0;//oldWind2=0, oldWind3=0;
var newDeltaTime=0;

///Loads Google Front End Charts
google.charts.load('current', {packages: ['corechart', 'line']});

//var array=[temp1Ave, humidity1, wind1];

///Loads Initial Table Values and Stores the Variables
ajaxResultCurrent("Phoenix", "1");
//temp1Ave=array1[0]; humidity1=array1[1]; wind1=array1[2]; deltaTime1=array1[3];
//phoenixTempAve=array1[0];phoenixHumidity=array1[1];phoenixWind=array1[2];phoenixTime=array1[3];
ajaxResultCurrent("Paris", "2");
//temp2Ave=array2[0]; humidity2=array2[1]; wind2=array2[2]; deltaTime2=array2[3]; 
//parisTempAve=array2[0];parisHumidity=array2[1];parisWind=array2[2];parisTime=array2[3];
ajaxResultCurrent("Rome", "3");
//temp3Ave=array3[0]; humidity3=array3[1]; wind3=array3[2]; deltaTime3=array3[3]; 
//romeTempAve=array3[0];romeHumidity=array3[1];romeHumidity=array3[2];romeTime=array3[3];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getRequestObject() {
	if (window.XMLHttpRequest) {
		return (new XMLHttpRequest());
	} else {
		return (null);
	}
}

//Make an HTTP request to the given address. 
//Display result in the HTML element that has given ID.

function ajaxResultCurrent(city, idNumber) {
    //var array=[];
    var request = getRequestObject();
    request.open("GET", "http://api.apixu.com/v1/current.json?key=b3fcf49b74b9482da4d204738161911&q="+city, true);
	request.onreadystatechange=function(){
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200){
            console.log("The onready state change happened. This was called.")
            weather2Table(request, city, idNumber);
            aveTemp(); 
            getHottestCity();
            getNicestCity();
            //return array;
        }
    };
	//request.open("GET", "http://api.apixu.com/v1/forecast.json?key=b3fcf49b74b9482da4d204738161911&q="+city+"&days=2", true);
	request.send(null);
    console.log("Reqeust was sent. This was called.");
    //return array;   
}

function showResponseText(request, resultRegion) {
  if ((request.readyState == 4) &&(request.status == 200)) {
      return request.responseText;
  }
}

function ajaxResultForeCast(city){
    var array=[];
    var request = getRequestObject();
	request.onreadystatechange=function(){ 
        array=getForeCast(request, city); 
    };
	request.open("GET", "http://api.apixu.com/v1/forecast.json?key=b3fcf49b74b9482da4d204738161911&q="+city+"&days=2", true);
	request.send(null);
    return array;    
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///Loads initial average Temp, hottest City and Nicest City
//aveTemp(); 
//getHottestCity();
//getNicestCity();


///Calls the Weather Web API for the current values and updates table and returns values. 
function weather2Table(request, city, idNumber){
    if ((request.readyState == 4) && (request.status == 200)){
        console.log("It got to past these checks"); 
        console.log("This is the request response" + request.responseText);
        var r = JSON.parse(request.response);
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

       // return cityValues;     
        
    }
    else if(request.status != 200){
        alert("Big Oppps, I would run far away quickly: " + request.status);
    }       
}


///Changes the Values of city variables based on which city is being changed 
function changeCityValues(city, cityValues){
    switch(city){
        case 'Phoenix':
            phoenixTempAve=cityValues[0];phoenixHumidity=cityValues[1];phoenixWind=cityValues[2];phoenixTime=cityValues[3];
            temp1Ave=cityValues[0];humidity1=cityValues[1];wind1=cityValues[2];deltaTime1=cityValues[3];
            break; 
        case 'Paris':
            parisTempAve=cityValues[0];parisHumidity=cityValues[1];parisWind=cityValues[2];parisTime=cityValues[3];
            temp2Ave=cityValues[0];humidity2=cityValues[1];wind2=cityValues[2];deltaTime2=cityValues[3];
            break;
        case 'Rome':
            romeTempAve=cityValues[0];romeHumidity=cityValues[1];romeWind=cityValues[2];romeTime=cityValues[3];
            temp3Ave=cityValues[0];humidity3=cityValues[1];wind3=cityValues[2];deltaTime3=cityValues[3];
            break;
        case 'Las Vegas':
            vegasTempAve=cityValues[0];vegasHumidity=cityValues[1];vegasWind=cityValues[2];vegasTime=cityValues[3];
            temp3Ave=cityValues[0];humidity3=cityValues[1];wind3=cityValues[2];deltaTime3=cityValues[3];
            break;
        case 'Chicago':
            chicagoTempAve=cityValues[0];chicagoHumidity=cityValues[1];chicagoWind=cityValues[2];chicagoTime=cityValues[3];
            temp3Ave=cityValues[0];humidity3=cityValues[1];wind3=cityValues[2];deltaTime3=cityValues[3];
            break;
        case 'Tokyo':
            tokyoTempAve=cityValues[0];tokyoHumidity=cityValues[1];tokyoWind=cityValues[2];tokyoTime=cityValues[3];
            temp3Ave=cityValues[0];humidity3=cityValues[1];wind3=cityValues[2];deltaTime3=cityValues[3];
            break;
        case 'Grand Caymans': 
            caymansTempAve=cityValues[0];caymansHumidity=cityValues[1];caymansWind=cityValues[2];caymansTime=cityValues[3];
            temp3Ave=cityValues[0];humidity3=cityValues[1];wind3=cityValues[2];deltaTime3=cityValues[3];
            break;
        default: 
            console.log("Not a proper input."); 
    }                
}

///Changes the Values of city variables based on which city is being changed 
function changeOldCityValues(city, oldCityValues){
    switch(city){
        case 'Phoenix':
            oldPhoenixTempAve=oldCityValues[0];oldPhoenixHumidity=oldCityValues[1];oldPhoenixWind=oldCityValues[2];oldPhoenixTime=oldCityValues[3];
            //temp1Ave=oldCityValues[0];humidity1=oldCityValues[1];wind1=oldCityValues[2];deltaTime1=oldCityValues[3];
            break; 
        case 'Paris':
            oldParisTempAve=oldCityValues[0];oldParisHumidity=oldCityValues[1];oldParisWind=oldCityValues[2];oldParisTime=oldCityValues[3];
            //temp2Ave=oldCityValues[0];humidity2=oldCityValues[1];wind2=oldCityValues[2];deltaTime2=oldCityValues[3];
            break;
        case 'Rome':
            oldRomeTempAve=oldCityValues[0];oldRomeHumidity=oldCityValues[1];oldRomeWind=oldCityValues[2];oldRomeTime=oldCityValues[3];
            //temp3Ave=oldCityValues[0];humidity3=oldCityValues[1];wind3=oldCityValues[2];deltaTime3=oldCityValues[3];
            break;
        case 'Las Vegas':
            oldVegasTempAve=oldCityValues[0];oldVegasHumidity=oldCityValues[1];oldVegasWind=oldCityValues[2];oldVegasTime=oldCityValues[3];
            //temp3Ave=oldCityValues[0];humidity3=oldCityValues[1];wind3=oldCityValues[2];deltaTime3=oldCityValues[3];
            break;
        case 'Chicago':
            oldChicagoTempAve=oldCityValues[0];oldChicagoHumidity=oldCityValues[1];oldChicagoWind=oldCityValues[2];oldChicagoTime=oldCityValues[3];
            //temp3Ave=oldCityValues[0];humidity3=oldCityValues[1];wind3=oldCityValues[2];deltaTime3=oldCityValues[3];
            break;
        case 'Tokyo':
            oldTokyoTempAve=oldCityValues[0];oldTokyoHumidity=oldCityValues[1];oldTokyoWind=oldCityValues[2];oldTokyoTime=oldCityValues[3];
            //temp3Ave=oldCityValues[0];humidity3=oldCityValues[1];wind3=oldCityValues[2];deltaTime3=oldCityValues[3];
            break;
        case 'Grand Caymans': 
            oldCaymansTempAve=oldCityValues[0];oldCaymansHumidity=oldCityValues[1];oldCaymansWind=oldCityValues[2];oldCaymansTime=oldCityValues[3];
            //temp3Ave=oldCityValues[0];humidity3=oldCityValues[1];wind3=oldCityValues[2];deltaTime3=oldCityValues[3];
            break;
        default: 
            console.log("Not a proper input."); 
    }                
}



///Adds Listeners for the drop down selector
var selectCityButton=document.getElementById("dropDownCity");

selectCityButton.addEventListener("change", function(){
    getCity3();
    
    ////Clears Screen because of new selection
    document.getElementById("foreCastText").innerHTML ="";
    document.getElementById('chart_area').innerHTML=""; 
 
});

///Returns the values for the drop down selection city
function getCity3(){
    var value=document.getElementById("dropDownCity").value;
    ajaxResultCurrent(value, '3'); 
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
	//ideal city is the one with the lowest score
    var city3 = document.getElementById("dropDownCity").value;
    
    if (score1c < score2c && score1c < score3c) {
    nicestCity = "Phoenix";
    } else if (score2c < score3c && score2c < score1c) {
    nicestCity = "Paris";
    } else{
    nicestCity = city3;
    }
    document.getElementById("nicestCity").innerHTML = nicestCity;
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
function getForeCast(request, city){
    
    if ((request.readyState == 4) && (request.status == 200)){
    
        var f=JSON.parse(request.responseText);

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
    else if(request.status != 200){
        alert("Big Oppps, I would run far away quickly: " + request.status);
    }   
}

///Draws the Chart for EC Requirement 2
function drawChart(city) {

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'Temp Values');
        
      var hourlyTempValues=ajaxResultForecast(city);  

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
   // var array1=
    renderIndicators("Phoenix", "1");
    //tempAve=array1[0]; humidity1=array1[1]; wind1=array1[2];
    //changeCityValues('Phoenix', array1);
    
    renderIndicators("Paris", "2");
    //temp2Ave=array2[0]; humidity2=array2[1]; wind2=array2[2];
    //changeCityValues('Paris', array2);
    
    var value=document.getElementById("dropDownCity").value;
    renderIndicators(value, "3");
   // temp3Ave=array3[0]; humidity3=array3[1]; wind3=array3[2];
    //changeCityValues(value, array3);
    
    ///Recomputes For Requirement 3
    aveTemp();
    getHottestCity();
    getNicestCity();
}

////Updates Indicators in the table when Refresh is pushed. 
function renderIndicators(city, idNumber){
    //var tempAve=0;
    
    ///Values to compare to
    if(idNumber=='1'){
       /* oldPhoenixTime=phoenixTempAve;
        oldPhoenixHumidity=phoenixHumidity;
        oldPhoenixHumidity=phoenixWind;
        oldPhoenixWind=phoenixTime;*/
        oldTempAve=phoenixTempAve;
        oldHumidity=phoenixHumidity;
        oldWind=phoenixWind;
        oldDeltaTime=phoenixTime;
    }
    if(idNumber=='2'){
        oldTempAve=parisTempAve;
        oldHumidity=parisHumidity;
        oldWind=parisWind;
        oldDeltaTime=parisTime;
    }
    if(idNumber=='3'){
        switch(city){
            case 'Rome':
                //oldRomeTempAve=romeTempAve;oldRomeHumidity=romeHumidity;oldRomeWind=romeWind;oldRomeTime=romeTime; 
                 oldTempAve=romeTempAve;oldHumidity=romeHumidity;oldWind=romeWind;oldDeltaTime=romeTime;
                break;
            case 'Las Vegas':
                //oldVegasTempAve=vegasTempAve;oldVegasHumidity=vegasHumidity,oldVegasWind=vegasWind;oldVegasTime=vegasTime;
                oldTempAve=vegasTempAve;oldHumidity=vegasHumidity;oldWind=vegasWind;oldDeltaTime=vegasTime;
                break;
            case 'Chicago':
                //oldChicagoTime=chicagoTempAve;oldChicagoHumidity=chicagoHumidity;oldChicagoWind=chicagoWind;oldChicagoTime=chicagoTime;
                oldTempAve=chicagoTempAve;oldHumidity=chicagoHumidity;oldWind=chicagoWind;oldDeltaTime=chicagoTime;
                break;
            case 'Tokyo':
                //oldTokyoTempAve=tokyoTempAve;oldTokyoHumidity=tokyoHumidity;oldTokyoWind=tokyoWind;oldTokyoTime=tokyoTime; 
                oldTempAve=tokyoTempAve;oldHumidity=tokyoHumidity;oldWind=tokyoWind;oldDeltaTime=tokyoTime;
                break;
            case 'Grand Caymans': 
                //oldCaymansTempAve=caymansTempAve;oldCaymansHumidity=caymansHumidity;oldCaymansWind=caymansWind;oldCaymansTime=caymansTime;
                oldTempAve=caymansTempAve;oldHumidity=caymansHumidity;oldWind=caymansWind;oldDeltaTime=caymansTime;
                break;
            default: 
                console.log("Not a proper input."); 
        }
    }
    
    ajaxResultCurrent(city, idNumber);
    switch(idNumber){
                case '1':
                    newTempAve=temp1Ave;newHumidity=humidity1;newWind=wind1;newDeltaTime=deltaTime1; 
                    break;
                case '2':
                    newTempAve=temp2Ave;newHumidity=humidity2;newWind=wind2;newDeltaTime=deltaTime2;  
                    break;
                case '3':
                    newTempAve=temp3Ave;newHumidity=humidity3;newWind=wind3;newDeltaTime=deltaTime3; 
                    break;
                default: 
                    console.log("Not a proper input."); 
        }

        console.log("pastTime is " + oldDeltaTime + " and currentTime is " + newDeltaTime);

        var deltaT=convert2Num(newDeltaTime, oldDeltaTime);

        //var returnedTempAve=0,  returnedDeltaTime=0, returnedHumidity=0, returnedWind=0;

        ///Updates the Indicators
        if(newTempAve > oldTempAve){
            document.getElementById("tempIndicator"+idNumber).innerHTML="<span style='color:green'>&nbsp&nbspWarmer</span>";
            document.getElementById("tempDelta"+idNumber).innerHTML="&nbsp&nbspdT:&nbsp"+deltaT+"&nbsp";
            returnedTempAve=newTempAve;
            returnedDeltaTime=newDeltaTime;
            //oldTempAve=newTempAve;
            //oldDeltaTime=newDeltaTime;
        }
        if(newTempAve == oldTempAve){
            document.getElementById("tempIndicator"+idNumber).innerHTML="<span style='color:blue'>&nbsp&nbspSame&nbspTemperature</span>";
            document.getElementById("tempDelta"+idNumber).innerHTML="&nbsp&nbspdT:&nbsp"+deltaT+"&nbsp";
            returnedTempAve=newTempAve;
            returnedDeltaTime=newDeltaTime;
            //oldTempAve=newTempAve;
            //oldDeltaTime=newDeltaTime;
        }
        if(newTempAve < oldTempAve){
            document.getElementById("tempIndicator"+idNumber).innerHTML="<span style='color:red'>&nbsp&nbspColder</span>";
            document.getElementById("tempDelta"+idNumber).innerHTML="&nbsp&nbspdT:&nbsp"+deltaT+"&nbsp";
            returnedTempAve=newTempAve;
            returnedDeltaTime=newDeltaTime;
            //oldTempAve=newTempAve;
            //oldDeltaTime=newDeltaTime;
        }
        if(newHumidity > oldHumidity){
            document.getElementById("humidityIndicator"+idNumber).innerHTML="<span style='color:green'>&nbsp&nbspMore&nbspHumidity</span>";
            document.getElementById("humDelta"+idNumber).innerHTML="&nbsp&nbspdT:&nbsp"+deltaT+"&nbsp";
            returnedHumidity=newHumidity;
            //oldHumidity=newHumidity;
        }
        if(newHumidity == oldHumidity){
            document.getElementById("humidityIndicator"+idNumber).innerHTML="<span style='color:blue'>&nbsp&nbspSame&nbspHumidity</span>";
            document.getElementById("humDelta"+idNumber).innerHTML="&nbsp&nbspdT:&nbsp"+deltaT+"&nbsp";
            returnedHumidity=newHumidity;
            //oldHumidity=newHumidity;
        }
        if(newHumidity < oldHumidity){
            document.getElementById("humidityIndicator"+idNumber).innerHTML="<span style='color:red'>&nbsp&nbspLess&nbspHumidity</span>";
            document.getElementById("humDelta"+idNumber).innerHTML="&nbsp&nbspdT:&nbsp"+deltaT+"&nbsp";
            returnedHumidity=newHumidity;
            //oldHumidity=newHumidity;
        }
        if(newWind > oldWind){
            document.getElementById("windIndicator"+idNumber).innerHTML="<span style='color:green'>&nbsp&nbspMore&nbspWind</span>";
            document.getElementById("windDelta"+idNumber).innerHTML="&nbsp&nbspdT:&nbsp"+deltaT+"&nbsp";
            returnedWind=newWind;
            //oldWind=newWind;
        }
        if(newWind == oldWind){
            document.getElementById("windIndicator"+idNumber).innerHTML="<span style='color:blue'>&nbsp&nbspSame&nbspWind</span>";
            document.getElementById("windDelta"+idNumber).innerHTML="&nbsp&nbspdT:&nbsp"+deltaT+"&nbsp";
            returnedWind=newWind;
            //oldWind=newWind;
        }
        if(newWind < oldWind){
            document.getElementById("windIndicator"+idNumber).innerHTML="<span style='color:red'>&nbsp&nbspLess&nbspWind</span>";
            document.getElementById("windDelta"+idNumber).innerHTML="&nbsp&nbspdT:&nbsp"+deltaT+"&nbsp";
            returnedWind=newWind;
            //oldWind=newWind;
        }

        var cityValues=[returnedTempAve, returnedDeltaTime, returnedHumidity, returnedWind];

        return cityValues; 
    }
}

////Converts the Epoch Time to a Hard Number for Delta T
function convert2Num(t1, t0){
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
