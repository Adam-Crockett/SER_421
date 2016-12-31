var fs = require('fs');//Loads File System
var http = require('http');
var url = require('url');
var q = require('querystring');
var Path = require('path'); //Loads Path
var options = {encoding: 'utf8', flag: 'r'}; //Options for Files

///Creates a server listening on port 3000. Loads Landing page with login hyperlink
http.createServer(function (req, res) {
    var resBody = '';
    var resMsg = '';
    var urlObj = url.parse(req.url, true, false);
    var qstr = urlObj.query;   
    console.log(req.method);
    //when user submits login infomation console prints what was typed in
    if (req.method == "POST"){
        var reqData = '';
        req.on('data', function(chunk){
            reqData += chunk;
        });
        req.on('end', function(){
            var reqObj = q.parse(reqData);
            console.log(reqObj);
            /*var resObj = {
            username: reqObj.username,
            userRole: "reviewer"
            };*/
            if(reqObj.username == reqObj.password){
                res.setHeader('Set-Cookie', ['username='+reqObj.username,'role=reviewer']);
                res.writeHead(200,{
                    'Content-type': 'text/html',
                });
            }
            console.log("IT's getting Somewhere.");
            console.log(getLandingPage());
            res.end(getLandingPage());
        });
    }else if (!qstr.msg) {
        resBody = resBody + '<html><head><title>Index</title></head>\n';
        resMsg = '<h2>Blog Home Page</h2>\n';
        resMsg += '<a href="?msg=login">Login</a>';
        resBody += '<body>' + resMsg;
        resMsg = resBody + '\n</body></html>';
    }else if(qstr.msg=='login'){
        resMsg = fs.readFileSync("auth/login.html");
    }else {
        resMsg = loadArt(fs.readFileSync(messages[qstr.msg]));
    }
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(resMsg);
}).listen(3000, function(){
    console.log("Server is ready");
});


///These are the .art filenames to test in an array
var messages = ["foodPoisoning.art", "weightLifting.art", "nutrition.art"];

/*///Creates a server listening on port 3000. If the user types http://localhost:3000?msg=0 or msg=1, or msg=2 it will display the files. If msg=  nothing then it will display No msg parameter. Otherwise an error.
http.createServer(function (req, res) {
    //loadLandingPage();
    var resBody = '';
    var resMsg = '';
    var urlObj = url.parse(req.url, true, false);
    var qstr = urlObj.query;
    console.log(urlObj);
    if (!qstr.msg) {
        resBody = resBody + '<html><head><title>Simple HTTP Server</title></head>';
        resMsg = '<h2>No msg parameter</h2>\n';
        resBody = resBody + '<body>' + resMsg;
        resMsg = resBody + '\n</body></html>';
        console.log(resMsg);
    } else {
        resMsg = loadArt(fs.readFileSync(messages[qstr.msg]));
    }
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(resMsg);
}).listen(3000, function(){
    console.log("Server is ready");
});*/


function getLandingPage(){  
        var resBody = '';
        resBody=resBody + '<html><head><title>Index</title></head>\n';
        resBody += '<body><h2>Blog Home Page</h2>\n';
        var titles = WalkDirs(__dirname); 
        for (var i=0;i < titles.length; i++){
            resBody+= '<p>' + titles[i] + '</p><br />\n';
            console.log(typeof titles[i]);
        }
        resBody += '<a href="?msg=login">Login</a>\n';
        resBody = resBody + '\n</body></html>';
        return resBody;
}

//Reads directories for .art files
function WalkDirs(dirPath){
  var artTitles=[];
  fs.readdir(dirPath, function(err, files){
    for (var idx in files){
      if(files[idx].includes('.art')){
        var fullPath = Path.join(dirPath, files[idx]);
        //count++;
        (function(fullPath){
        fs.readFile(fullPath, options, function(err, data){
	       if(err) {
		      console.log("\nCould not open File this time" + err);
              console.log(err);
	       }
	       else {
                var json = JSON.parse(data);
                console.log(json.Title);
                artTitles.push(json.Title);   
	       }
        });
       })(fullPath);
      }
    }  
  });
    //console.log(artTitles);
    return artTitles;
}


////Takes in a .art File and puts the header, then fragments, then footer html files together. 
function loadArt(artFile){  
    
    var JSONarray = JSON.parse(artFile);
    var concatContent = '';
    concatContent = concatContent.concat(fs.readFileSync("blogs/header.html").toString());
    
    for(var i = 0; i < JSONarray.Fragments.length; i++){
        var content=fs.readFileSync("blogs/" + JSONarray.Fragments[i]).toString();
        concatContent=concatContent.concat(content);
    }
    
    concatContent = concatContent.concat(fs.readFileSync("blogs/footer.html").toString());
    return concatContent;
}

