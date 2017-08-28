// $(document).on("ready", function(){

	//MAIN
	//MAIN
	//MAIN
	var article = getNews();
	var reaction; //gets updated when 'i feel' button is clicked
	var article;
	var head;
    var subhead;
    var sourceArray = ["al-jazeera-english", "the-washington-post", "breitbart-news", "bbc-news"];
    var source; 

    function pickNewSource () {
   	randomNumber = (Math.round(Math.random()*3));
    console.log(randomNumber);
    return source = sourceArray[randomNumber];
    }

    source = pickNewSource();
    // Gets and displays news
    getNews(source);


	$("#emo-input").keyup(function(event){
	    if(event.keyCode == 13){
	       $("#i-feel").click();
	    }  
	});	

	$("#i-feel").on("click", function (){		
		displayGIF();
	});

	// CLICK HANDLER THAT ACTUALLY SAVES A CARD TO FIREBASE AND RESETS EVERYTHING:
	$(".gif-dump").on("click", ".gif", function(){
		var gifURL = $(this).attr("src");
		//function postNewResponse(uid, name, articleURL, reaction, gifURL) 
		postNewResponse("user74", "name", article, reaction, gifURL);
		resetAll();
	})

	// //GET NEWS
	// //GET ALL THE NEWS
	// var headline;
	// var subhead;

	// Returns 10 popular articles 
	function getNews(source) {

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
	  	console.log("news url?")
	  	console.log(response);

	    var randomArticleNumber = (Math.round(Math.random()*3));
	    console.log(randomArticleNumber);

	    console.log(response.articles[randomArticleNumber].title); //TODO work with our news item here.
	    console.log(response.articles[randomArticleNumber].description); //TODO work with our news item here.
	    
	    head = (response.articles[randomArticleNumber].title);

	    subhead = (response.articles[randomArticleNumber].description);

	    $("#head").html(head);
	    $("#subhead").html(subhead);

	    article = response.articles[randomArticleNumber].url;
 
	  });
	}


	//GET THE GIFS
	//GET ALL THE GIFS
	var host = "api.giphy.com";
	var path = "/v1/gifs/random";
	var apikey = "60a662cf5d774be4922ed09719bdb709";
	var gifSet = [];
	var repeat;

	function displayGIF(){
	  reaction = $("#emo-input").val().trim();
	  	if (reaction.indexOf(" ") === -1){
	  		console.log("response verified")
		  	var queryURL = "https://"
		                  +host
		                  +path
		                  +"?q=" + reaction
		                  +"&api_key=" + apikey
		  	//loop through ajax requests to get 10 images
		  	for (i=0; i<10; i++){ 
		    
			    $.ajax({
			    url: queryURL,
			    method: "GET"
			    }).done(function(response){
			     
			    //display each
			    var newGif = $("<img>")
			    newGif.attr("src", response.data.image_original_url);
			    newGif.attr("class", "gif");
			    $(".gif-dump").append(newGif);
				});
		   	};
	  	};
	};

	// LOG TO DATABASE
	// LOG TO DATABASE
	// LOG TO DATABASE
	var config,
	    dbref,
	    db;

	// Initialize Firebase
	 config = {
	  apiKey: "AIzaSyDscLKYL_bkXbpsMx0W3eZBlORMwco9qOI",
	  authDomain: "culturecanary-859bc.firebaseapp.com",
	  databaseURL: "https://culturecanary-859bc.firebaseio.com",
	  projectId: "culturecanary-859bc",
	  storageBucket: "culturecanary-859bc.appspot.com",
	  messagingSenderId: "559681967479"
	};
	firebase.initializeApp(config);

	 db = firebase.database();
	 dbref = db.ref();

	 // console.log(dbref);

	 dbref.on("child_added", function(snap) {
	   console.log("snapshot: " + ssnap.val());
	 })

	// function

	function postNewResponse(uid, name, articleURL, reaction, gifURL) {
	  // A post entry.
	  var respData = {
	    user: uid,
	    name: name,
	    article: articleURL,
	    reactionText:reaction,
	    gifURL: gifURL,
	    timestamp: firebase.database.ServerValue.TIMESTAMP
	  };

	  // Get a key for a new Post.
	  var newKey = dbref.child('responses').push().key;

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

// }); // close ON READY function