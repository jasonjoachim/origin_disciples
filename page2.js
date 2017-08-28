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

database.ref("/responses").limitToFirst(10).on("child_added", function(snapshot){
	
  var newLink;
	var gif = snapshot.val().gifURL;
	var articleLink = snapshot.val().article;



	var newLink = $("<img>");
  newLink.attr("href", articleLink)
  $("<a href='" + articleLink + "'><img src='" + gif + "'></a>");
	
	$(".gif-container").append(newLink);
});