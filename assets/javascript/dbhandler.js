//Let's make a template for how we're dealing with the data we save to firebase.

//User Example:
var config,
    dbref,
    db;

// $(document).on("ready", function() {

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
   console.log(snap.val());
 })


// function

function writeNewPost(uid, username, picture, title, body) {
  // A post entry.
  var postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
    authorPic: picture
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}

// }); //End document ready function

var userData ={
  userName:"john",
  responseHistory: [
    {
      timestamp:"08/24/17 05:00", //time set by firebase
      article: "https://www.NYT.com....",
      reaction: "Somestring",
      gifURL: "www.giphy.com...."
    },
    {
      timestamp:"08/24/17 05:15", //time set by firebase
      article: "https://www.NYT.com....",
      reaction: "Somestring",
      gifURL: "www.giphy.com...."
    },
    {
      timestamp:"08/24/17 05:35", //time set by firebase
      article: "https://www.NYT.com....",
      reaction: "Somestring",
      gifURL: "www.giphy.com...."
    }
  ]
};


//response example:

var gifData = {
  usedIn: [
    {
      timestamp: "08/24/17 05:00",
      article: "https://www.NYT.com....",
      rating: "99"
    },
    {
      timestamp: "08/24/17 05:15",
      article: "https://www.NYT.com....",
      rating: "49"
    },
    {
      timestamp: "08/24/17 05:35",
      article: "https://www.NYT.com....",
      rating: "19"
    }
  ],
  avgRating: "100",
  gifUrl: "https://www.giphy...."
};
