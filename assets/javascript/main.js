
//MAIN
var reaction;
var articleData;
var sourceArray = ["al-jazeera-english", "the-washington-post", "breitbart-news", "bbc-news"];
var source;


window.onload = function() {
	init(); //load up firebase
	initApp(); //sign in with firebase.auth()
	setTimeout(function(){
		tinyTextSwap(["Gif Reacts to News", "Let's get mad!", "Only the most ridiculous shit."])
	}, 5000)
};

$("#i-feel").on("click", function (event){
	event.preventDefault();
	var input = $("#emo-input").val();
	getResponseGifs(input);
	reaction = input;
});

//Hitting enter in the input box is the only way to use the site right now.
//Fetches appropriate gifs when the user submits their reponse by hitting enter in the input box.
$("#emo-input").keypress(function(event) {
//Enter key
	if (event.which == 13) {
		event.preventDefault();
		var input = $("#emo-input").val();
		$("#gif-area").toggleClass("hidden");
		getResponseGifs(input);
		reaction = input;
	}
});

// Saves to firebase and resets the feed
$(".gif-dump").on("click", ".gif", function(){
	var gifURL = $(this).attr("src");
	postNewResponse(articleData, reaction, gifURL);
	$("#gif-area").toggleClass("hidden");
	resetAll();
})

$("#sign-out-btn").on("click", function (event) {
	firebase.auth().signOut();
	$(".goodbye-div").toggleClass("hidden");
	$(".jumbotron-container").toggleClass("hidden");
	setTimeout(sayBye, 2.5 * 1000);
	setTimeout(revealJumbotron, 2.5 * 1000);
});

$("#sign-in-btn").on("click", function (event) {
  toggleSignIn();
});

$(".buttonToolbar").on("click", function(event) {
	var thisSection = $(event.target).attr("target");
	if (thisSection == "sign-in-out-btn") {
		toggleSignIn();
	} else {
		showOnly(thisSection)
	}
});

$("#feed").on("click", ".feed-box", function(){
    if ($("img", this).attr("value") === "hide"){
      $("img", this).removeClass("hidden");
      $(".feed-news-box", this).addClass("hidden");
      $("img", this).attr("value", "show");
    } else {
      $("img", this).addClass("hidden");
      $(".feed-news-box", this).removeClass("hidden");
      $("img", this).attr("value", "hide");
    }
});


// ======= END click handlers ==========
// ======= Function Definitions ========

function sayBye(){
	$(".goodbye-div").toggleClass("hidden");
}

function revealJumbotron(){
	$(".jumbotron-container").toggleClass("hidden");
}

function getResponseGifs(input) {
	//If the user has put anything in the box, run the translate function, if random, run random.
	input ? getFromGiphy("translate", input) : getFromGiphy("random", input);
	//get filler gifs
	getFromGiphy("search", input);
	$("#emo-input").val('');
}

//Show only the passed in section
function showOnly(someDiv) {
	hideAllSections();
	$(someDiv).toggleClass("hidden");
}

//hide all sections
function hideAllSections() {

	if (!$("#react").hasClass("hidden")) {
		$("#react").addClass("hidden");
	}

	if (!$("#diary").hasClass("hidden")) {
		$("#diary").addClass("hidden");
	}

	if (!$("#feed").hasClass("hidden")) {
		$("#feed").addClass("hidden");
	}
}
//Start up firebase DB.
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
  return sourceArray[randomNumber];
}

// Returns 10 popular article
function getNews(source) {
console.log(source);

  var queryUrl = "https://newsapi.org/v1/articles?"
        +'&source=' + source
        + '&apiKey=a4e123dfc66f4cfcb2a4bb4e94248c29';

  //send off our resquest
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).done(function(response){
  	console.log(response);
    var randomArticleNumber = Math.round(Math.random() * (response.articles.length - 1));
		var newsItem = response.articles[randomArticleNumber];
		while (!newsItem.description && randomArticleNumber<9) {
			var newsItem = response.articles[randomArticleNumber++];
		}
			$("#news-container").append(newsItemHTML(newsItem));
			articleData = newsItem; //Save the articleData for later use by the write new post function
  });
};

//GET THE GIFS
//GET ALL THE GIFS

function getFromGiphy(callType, string) {
	var paths = {random:"/v1/gifs/random?", translate:"/v1/gifs/translate?", search: "/v1/gifs/search?"},
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
		} else if (callType == "search") {
			if (string != '') {
				url += "&q=" + string + "&limit=5";
				giphyAJAX(url, giphySearchAPI);
			} else {
				giphyAJAX(url, giphyRandomAPI);
			}
		}
	}
}



//Takes an array of amusing sayings and swaps a random one into the tinytext.
function tinyTextSwap(array) {
	$("#tinytext").text(array[random(array.length)]);
}

//just spits out a random number
function random(max) {
	return Math.floor(Math.random()*max+1);
}

function giphyAJAX (url, callback) {
$.ajax({
	url: url,
	method: "GET"
}).done(function(response){
	console.log(response);
		callback(response);
	});
}

function giphySearchAPI(response) {
	console.log("running search");
	for (var i = 0; i < response.data.length; i++) {
		putGifOnPage([response.data[i].images.downsized_large.url])
	}
}

function giphyTranslateAPI(response) {
	putGifOnPage([response.data.images.original.webp])
}

function giphyRandomAPI(response) {
	putGifOnPage([response.data.image_original_url])
}


function putGifOnPage(urlArray) {
	console.log(urlArray);
	var newGif;
	for (var i = 0; i < urlArray.length; i++) {
		newGif = $("<img>");
		newGif.attr("src", urlArray[i]);
		newGif.attr("class", "gif");
		$(".gif-dump").append(newGif);
	}
}

//Takes an object with headline, description, url, imageurl and generates proper HTML
//If more args are passed in, it will generate additional HTML to display the user response,
//GIF, and timestamp.
function newsItemHTML(newsItem, reaction, gifURL, timestamp) {
	var newNewsItem = $("<div>");
	var link = $("<a>").attr("href", newsItem.url);
	link.attr("target", "_blank")
	var headline = $("<h2>").attr("class","headline").text(newsItem.title);
	var blurb = $("<div>").attr("class","blurb").text(newsItem.description);
	link.append(headline);
	var time, image;


	//If the post is a response
	if (gifURL) {
		image = $("<img>").attr({class:"gif", src:gifURL});
		if (timestamp) {
			newNewsItem.attr({class:"news-article resp", id: "fetched-article"}); //TODO change the ID to be meaningful or delete it.
			var reactionTime = $("<div>").attr("class","response-time").text(moment(timestamp).format("ddd, h:mm A"));
			var reaction = $("<div>").attr("class","reaction").text('"'+reaction+'"');
			newNewsItem.append(reactionTime, reaction);
		}
	//If the post is a plain news article and not a response.
	} else {
		newNewsItem.attr({class:"news-article", id: "fetched-article"});
		image = $("<img>").attr({class:"gif", src:newsItem.urlToImage});
		time = $("<div>").attr("class","response-time").text(moment(newsItem.publishedAt).format("ddd, h:mm A"));

	}
	newNewsItem.append(link, blurb, image, time);
	return newNewsItem;
}

//Takes a user id and spits out the result to a div with id "day1".
function displayAllFromUser(uid){
	firebase.database().ref('/user-responses/' + uid).limitToLast(25).on('child_added', function(snap) {
		$(".timeline").prepend( newsItemHTML( snap.val().article,
																		 snap.val().reactionText,
																		 snap.val().gifURL,
																		 snap.val().timestamp));
	});
}


// Accepts articleData as an obj, reaction string, and gifURL string. Pushes to firebase.
function postNewResponse(articleData, reaction, gifURL) {
  // Get a key for a new Post.
  var newKey = firebase.database().ref().child('responses').push().key;
	var uid = firebase.auth().currentUser.uid;
	var name = firebase.auth().currentUser.displayName;
	// A post entry.
	var respData = {
    user: uid,
    name: name,
    article: articleData,
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
	articleData = {};
	$("#news-container").empty();
	$(".gif-dump").empty();
	source = pickNewSource();
	getNews(source);
}

function displayFeed(){
  firebase.database().ref("/responses").limitToLast(25).on("child_added", function(snapshot){

    var gifURL = snapshot.val().gifURL;
    var link = snapshot.val().article.url;
    var title = snapshot.val().article.title;
    var description = snapshot.val().article.description;
    var newsItem = snapshot.val().article

    var newDiv = $("<div class='feed-box'><img src='" + gifURL + "' value='show' class='feed-GIF'></div>");

    var newNewsItem = newsItemHTML(newsItem);
    newNewsItem.addClass("feed-news-box");
    newNewsItem.addClass("hidden");
    newDiv.append(newNewsItem);

     $("#feed-container").prepend(newDiv);
  });
};
