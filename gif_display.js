var host = "api.giphy.com";
var path = "/v1/gifs/random";
var apikey = "60a662cf5d774be4922ed09719bdb709";
var gifSet = [];
var repeat;

function displayGIF(){
  var query = $("#emo-input").val().trim();

  var queryURL = "https://"
                  +host
                  +path
                  +"?q=" + query
                  +"&api_key=" + apikey
  //loop through ajax requests to get 10 images
  for (i=0; i<10; i++){ 
    
    $.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response){
     
    //display each
    var newGif = $("<img>")
    gif.attr("src", response.data.image_original_url);
    gif.attr("class", "gif");
    $("#gif-dump").append(gif);
    });
  }
};
