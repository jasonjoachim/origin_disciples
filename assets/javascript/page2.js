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
  $("#news-container").css("display");
  $("#emoField").css("display", "none");

});


$("#feed").on("click", ".feed-box", function(){

  console.log("clicked");
    
    if ($("img", this).attr("value") === "hide"){
      $("img", this).removeClass("hidden");
      $(".feed-news-box", this).addClass("hidden");
      $("img", this).attr("value", "show");
      console.log("gif showing");
    
    } else {
      $("img", this).addClass("hidden");
      $(".feed-news-box", this).removeClass("hidden");
      $("img", this).attr("value", "hide");
      console.log("news showing")
    }
    
    
});

function displayFeed(){

  database.ref("/responses").limitToLast(10).on("child_added", function(snapshot){
    
    var gifURL = snapshot.val().gifURL;
    var link = snapshot.val().article.url;
    var title = snapshot.val().article.title;
    var description = snapshot.val().article.description;
    var newsItem = snapshot.val().article

    var newDiv = $("<div class='feed-box'><img src='" + gifURL + "' value='show' class='feed-GIF'><div class='feed-news-box hidden'><h2>" + title + "</h2><p>" + description + "</p></div></div><br>");

    // var newDiv = $("<div class='feed-box'><img src='" + gifURL + "' value='show' class='feed-GIF'></div><br>");

    // newDiv.append("<div class = 'feed-news-box hidden'>" + newsItemHTML(newsItem) + "</div>");
    
    // var newNewsItem = newsItemHTML(newsItem);
    // newNewsItem.addClass("feed-news-box");
    // newDiv.append(newNewsItem);
  });
};

displayFeed();
