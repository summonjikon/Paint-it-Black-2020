let controlScript = "jsonWrite.php";
let jsonFile = "drawing.json";
let preloadJsonFile = "preload.json";

function makeAjaxCall(url, methodType){
   let promiseObj = new Promise(function(resolve, reject){
         // console.log(url); // debug
   			 let xmlhttp = new XMLHttpRequest();
         xmlhttp.open(methodType, url, true);
         xmlhttp.send();
         xmlhttp.onreadystatechange = function(){
           if (xmlhttp.readyState === 4){
              if (xmlhttp.status === 200){
                // console.log("xmlhttp done successfully"):; // debug
                 let serverResponse = xmlhttp.responseText; //server antwoord met string
                 //console.log(serverResponse); // debug
                 resolve(serverResponse); // wordt via return promiseObj teruggegeven
              } else {
              	reject(xmlhttp.status);
                // console.log("xmlhttp failed"); // debug
              }
           } else {
              // console.log("xmlhttp processing going on"); // debug
           }
        }
        // console.log("request sent succesfully"); // debug
      });
   return promiseObj;
  }

function errorHandler(statusCode){
    console.log("failed with status", status);
  }

function serverWriteJson(data){
    let drawingJsonString = JSON.stringify(data);
    let url = controlScript + "?put=" + drawingJsonString; 
    makeAjaxCall(url, "GET");

  }

function serverGetJson(){
  makeAjaxCall(jsonFile, "POST"). then (readJson); 
}

function preload() {
  // hier komt jouw code
}
