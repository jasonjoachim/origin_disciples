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

database.ref().limitToFirst(10).on("child_added", function(snapshot){
	
	var gif = snapshot.gif;
	var link = snapshot.link;

	var newLink = $("<a href='" + link + "'><img src='" + gif + "'></a>");
	
	$(".gif-dump").append(newLink);
});