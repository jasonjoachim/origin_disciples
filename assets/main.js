
//MAIN
var article;
var reaction; //gets updated when 'i feel' button is clicked
var article;
var head;
var subhead;
var sourceArray = ["al-jazeera-english", "the-washington-post", "breitbart-news", "bbc-news"];
var source;


window.onload = function() {
	init();
	initApp();

  //TODO get the stuff AFTER we've logged in.
};

source = pickNewSource();
// Gets and displays news
getNews(source);


// ========== Click Handlers ===========

$("#i-feel").on("click", function (event){
	// displayRandomGif();
	// displayGIF();
	event.preventDefault();
});

$("#emo-input").keypress(function(event) {
//Enter key
	if (event.which == 13) {
		event.preventDefault();
		var input = $("#emo-input").val();
		console.log(input);
		input ? getFromGiphy("translate", input)
			: getFromGiphy("random", input);

		$("#emo-input").val('');
		reaction = input;

	}
});

	// CLICK HANDLER THAT ACTUALLY SAVES A CARD TO FIREBASE AND RESETS EVERYTHING:
	$(".gif-dump").on("click", ".gif", function(){

		var gifURL = $(this).attr("src");
		postNewResponse(article, reaction, gifURL);
		resetAll();
	})



// ======= Function Definitions ========

function initDB() {
  config = {
   apiKey: "AIzaSyDscLKYL_bkXbpsMx0W3eZBlORMwco9qOI",
   authDomain: "culturecanary-859bc.firebaseapp.com",
   databaseURL: "https://culturecanary-859bc.firebaseio.com",
   projectId: "culturecanary-859bc",
   storageBucket: "culturecanary-859bc.appspot.com",
   messagingSenderId: "559681967479"
 };
 firebase.initializeApp(config);
}

function pickNewSource () {
 	randomNumber = (Math.round(Math.random()*3));
  // console.log(randomNumber);
  return source = sourceArray[randomNumber];
}

//GET ALL THE NEWS
// Returns 10 popular articles
function getNews(source) {
console.log(source);

  var queryUrl = "https://newsapi.org/v1/articles?";
      queryUrl +=
      $.param({
        'source': source,
        'apiKey': 'a4e123dfc66f4cfcb2a4bb4e94248c29',
        // 'sortBy': 'latest'
      });

  //send off our resquest
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).done(function(response){
  	// console.log("news url?")
  	console.log(response);

    var randomArticleNumber = Math.round(Math.random() * (response.articles.length - 1));
    console.log(randomArticleNumber);

		var newsItem = response.articles[randomArticleNumber];
    head = (newsItem.title);
    subhead = (newsItem.description);
		// var newsURL = newsItem.url;
		// var imageURL = newsItem.urlToImage;

    $("#head").html(head);
    $("#subhead").html(subhead);

    article = newsItem.url;

  });
};


//GET THE GIFS
//GET ALL THE GIFS

function getFromGiphy(callType, string) {
	var paths = {random:"/v1/gifs/random?", translate:"/v1/gifs/translate?"},
			url = "https://api.giphy.com" + paths[callType] + "&api_key=60a662cf5d774be4922ed09719bdb709";

	if (paths.hasOwnProperty(callType)) {
		if (callType == "random") {
			giphyAJAX(url, giphyRandomAPI);

		} else if (callType == "translate") {
			if (string != '') {
				url += "&s=" + string
				giphyAJAX(url, giphyTranslateAPI);
			} else {
				giphyAJAX(url, giphyRandomAPI);
			}
		}
	}
}

function giphyAJAX (url, callback) {
$.ajax({
	url: url,
	method: "GET"
}).done(function(response){
		callback(response);
	});
}

function giphyTranslateAPI(response) {
	putGifOnPage(response.data.images.original.webp)
}

function giphyRandomAPI(response) {
	putGifOnPage(response.data.image_original_url)
}

function displayRandomGif() {
	reaction = $("#emo-input").val().trim();
	if (reaction.indexOf(" ") === -1){
	// console.log("response verified")

	//loop through ajax requests to get 10 random images
		for (i=0; i<10; i++){
			getFromGiphy("random");
		}
	}
}

function putGifOnPage(url) {
	var newGif = $("<img>")
	newGif.attr("src", url);
	newGif.attr("class", "gif");
	$(".gif-dump").append(newGif);
}

function postNewResponse(articleURL, reaction, gifURL) {

  // Get a key for a new Post.
  var newKey = firebase.database().ref().child('responses').push().key;
	var uid = firebase.auth().currentUser.uid;
	var name = firebase.auth().currentUser.displayName;
	// A post entry.
	var respData = {
    user: uid,
    name: name,
    article: articleURL,
    reactionText:reaction,
    gifURL: gifURL,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  };
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/responses/' + newKey] = respData;
  updates['/user-responses/' + uid + '/' + newKey] = respData;

  return firebase.database().ref().update(updates);
}

function resetAll() {
	$("#emo-input").val("")
	reaction = "";
	$(".gif-dump").empty();
	source = pickNewSource();
	getNews(source);
}
