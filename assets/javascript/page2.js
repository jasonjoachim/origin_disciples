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


$(".gif-dump").on("click", ".feed-box", function(){
    var newGIF = $(this).val();

    if ($("#" + newGIF).val() === "display"){
      $("#" + newGIF).css("display", "none");
      $("#" + newGIF).attr("value", "hide");

    }else{
      $("#" + newGIF).css("display", "block");
      $("#" + newGIF).attr("value", "display");
    }
});

function displayFeed(){

  database.ref("/responses").limitToLast(10).on("child_added", function(snapshot){
    
    var gifURL = snapshot.val().gifURL;
    var link = snapshot.val().url;
    var title = snapshot.val().title;
    var decription = snapshot.val().description;

    var newDiv = $("<div class='feed-box' value='" + gifURL "'><img src='" + gifURL + "' id='" + gifURL + " value='display' class='feed-GIF'><h2>" + title + "</h2><p>" + description + "</div><br>");
    
    $(".gif-dump").append(newDiv);
    $(".feed-GIF").css("z-index", "2");
  });
};
