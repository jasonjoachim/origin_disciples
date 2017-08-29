  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDscLKYL_bkXbpsMx0W3eZBlORMwco9qOI",
    authDomain: "culturecanary-859bc.firebaseapp.com",
    databaseURL: "https://culturecanary-859bc.firebaseio.com",
    projectId: "culturecanary-859bc",
    storageBucket: "culturecanary-859bc.appspot.com",
    messagingSenderId: "559681967479"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#feed").on("click", function(){
  $("#news-container").css("display", "none");
  $("#emoField").css("display", "none");

});


$(".gif-dump").on("click", ".feed-box", function(event){
    var clickedGif = $(event.target);

    //You can also use hide.
    // clickedGif.hide();

    // console.log(clickedGif.value()); //Does work!
    // console.log(clickedGif.attr('value')); //Works
    // console.log(clickedGif.data()); //Another option


    if (clickedGif.attr('value') === "display"){
      clickedGif.css("filter", "blur(5px)");
      clickedGif.attr("value", "blur")
    }else{
      clickedGif.css("filter", "blur(0)");
      clickedGif.attr("value", "display")
    }
});

function displayFeed(){

  database.ref("/responses").limitToLast(10).on("child_added", function(snapshot){
    var gifURL = snapshot.val().gifURL;
    var link = snapshot.val().article.url;
    var title = snapshot.val().article.title;
    var description = snapshot.val().article.description;

    var newDiv = $("<div>");
    newDiv.attr("class","feed-box").data(gifURL);
    
    newImg = $("<img>").attr({src:gifURL, id: gifURL, value: 'display', class: 'gif'});
    newImg.append($("<h2>").text(title)).append($("<p>").text(description));

    newDiv.append(newImg);


    // var newDiv = $("<div class='feed-box' value='" + gifURL "'><img src='" + gifURL + "' id='" + gifURL
    // + " value='display' class='feed-GIF'><h2>" + title + "</h2><p>" + description + "</div><br>");
    //
    $(".gif-dump").append(newDiv);
    $(".feed-GIF").css("z-index", "2");
  });
};
