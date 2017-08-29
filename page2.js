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

database.ref("/responses").on("child_added", function(snapshot){
	
	var gif = snapshot.val().gifURL;
	var link = snapshot.val().article;

	var newLink = $("<div class='gif-display-boxes'> <a target='_blank' href='" + link + "'><img src='" + gif + "'></a> </div> <br>");
	
	$(".gif-container").append(newLink);
});