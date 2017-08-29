
//MAIN
var reaction; //gets updated when 'i feel' button is clicked
var articleData;
var head;
var subhead;
var sourceArray = ["al-jazeera-english", "the-washington-post", "breitbart-news", "bbc-news"];
var source;


window.onload = function() {
	// $("#user-area").hide();
	// $("#sign-out").hide();
	// $("#your-profile").hide();
	init(); //load up firebase
	initApp(); //sign in with firebase.auth()

  //TODO get the stuff AFTER we've logged in. I put these two lines into the initApp function after login.
	source = pickNewSource();
	getNews(source);
};

// ========== Click Handlers ===========

$("#sign-out").on("click", function (event){
	toggleSignIn();
	$("#profile-dropdown").html("Welcome - sign in below");
	// $("#user-area").hide();
});

//I feel button doesn't do anything right now.
$("#i-feel").on("click", function (event){
	// displayRandomGif();
	// displayGIF();
	event.preventDefault();
});

//Hitting enter in the input box is the only way to use the site right now.
//Fetches appropriate gifs when the user submits their reponse by hitting enter in the input box.
$("#emo-input").keypress(function(event) {
//Enter key
	if (event.which == 13) {
		event.preventDefault();
		var input = $("#emo-input").val();
		console.log(input);

		//If input == translate, then run the translate function, if random, run random.
		input ? getFromGiphy("translate", input) : getFromGiphy("random", input);

		$("#emo-input").val('');
		reaction = input;

	}
});

	// CLICK HANDLER THAT ACTUALLY SAVES TO FIREBASE AND RESETS EVERYTHING:
	$(".gif-dump").on("click", ".gif", function(){

		var gifURL = $(this).attr("src");
		console.log(articleData);
		console.log(reaction);
		console.log(gifURL);
		postNewResponse(articleData, reaction, gifURL);
		resetAll();
	});

	$("#diary").on("click", function(){

	});


// ======= END click handlers ==========
// ======= Function Definitions ========


function showOnly(someDiv) {
	if (!$("#react").hasClass("hidden")) {
		$("#react").addClass("hidden");
	}

	if (!$("#diary").hasClass("hidden")) {
		$("#diary").addClass("hidden");
	}

	if (!$("#feed").hasClass("hidden")) {
		$("#feed").addClass("hidden");
	}

	if ($(someDiv).hasClass("hidden")) {
		$(someDiv).removeClass("hidden");
	}

}


$("#sign-out-btn").on("click", function () {
  toggleSignIn(); //Hey let's show/hide stuff based on sign-in status INSIDE this toggle sign in function.
});

$("#feed-btn").on("click", function () {
  showOnly("#feed");
});

$("#react-btn").on("click", function () {
  showOnly("#react");
});

$("#diary-btn").on("click", function () {
  showOnly("#diary");
	displayAllFromUser(firebase.auth().currentUser.uid);
});

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

//GET ALL THE NEWS
// Returns 10 popular articles
function getNews(source) {
// function getNews(source, sortBy) { //can also specify an option for sorting
console.log(source);

  var queryUrl = "https://newsapi.org/v1/articles?"
        +'&source=' + source
     // + '&sortBy=': sortBy  //We can also pass in an option for sorting
        + '&apiKey=a4e123dfc66f4cfcb2a4bb4e94248c29';

  //send off our resquest
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).done(function(response){
  	console.log(response);

    var randomArticleNumber = Math.round(Math.random() * (response.articles.length - 1));
    console.log(randomArticleNumber);

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

//Takes an object with headline, description, url, imageurl and generates proper HTML
//If more args are passed in, it will generate additional HTML to display the user response,
//GIF, and timestamp.
function newsItemHTML(newsItem, reaction, gifURL, timestamp) {
	var newNewsItem = $("<div>");
	var headline = $("<h2>").attr("class","headline").text(newsItem.title);
	var blurb = $("<div>").attr("class","blurb").text(newsItem.description);
	var time, image;


	//If the post is a response
	if (gifURL) {
		image = $("<img>").attr({class:"gif", src:gifURL});
		if (timestamp && reaction) {
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
	newNewsItem.append(headline, blurb, image, time);
	return newNewsItem;
}

//Takes a user id and spits out the result to a div with id "day1".
function displayAllFromUser(uid){
	//Line below also workd, we might need it later.
	// firebase.database().ref('/user-responses/' + uid).once('value').then(function(snapshot) {

	firebase.database().ref('/user-responses/' + uid).on('child_added', function(snap) {
		// console.log(snap.val());
		$(".timeline").append( newsItemHTML( snap.val().article,
																		 snap.val().reactionText,
																		 snap.val().gifURL,
																		 snap.val().timestamp));
	});

}

//This is the command to get the last ten responses.
// firebase.database().ref('/responses/' ).limitToLast(10).once('value').then(function(snap) {
// 	snap.forEach(function(childSnapshot) {
// 		console.log(childSnapshot.val());
// 	});
// });


//TODO This can write to the DB without a displayname attached.
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
