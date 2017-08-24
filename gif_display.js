var host = "api.giphy.com";
var path = "/v1/gifs/random";
var apikey = "60a662cf5d774be4922ed09719bdb709";
var gifSet = [];
var repeat;

$("#get-gif-btn").on("click", function(){
  event.preventDefault();

  var queryURL = "https://"
                  +host
                  +path
                  +"?q=" + query
                  +"&api_key=" + apikey

  var gifSet = [];
  for (i=0; i<10; i++){ 
    
    $.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response){
      // console.log(response);

      // console.log("the gif: " + response.data.image_original_url)

    var newGif = response.data.image_original_url; 
    gifSet.push(newGif);  
    });
 

function gifDisplay(gifArray){

  console.log("array: " + gifArray);  

  for (j=0; j < gifArray.length; j++){
    console.log("looping");
    $("#gif-dump").append($("<img>").attr("src", gifArray[j]));
  };
};
