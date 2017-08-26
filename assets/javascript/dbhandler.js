
// var config,
//     dbref,
//     db;

// $(document).on("ready", function() {

// Initialize Firebase
function init() {
  console.log("init running");
  var config = {
   apiKey: "AIzaSyDscLKYL_bkXbpsMx0W3eZBlORMwco9qOI",
   authDomain: "culturecanary-859bc.firebaseapp.com",
   databaseURL: "https://culturecanary-859bc.firebaseio.com",
   projectId: "culturecanary-859bc",
   storageBucket: "culturecanary-859bc.appspot.com",
   messagingSenderId: "559681967479"
 };
 firebase.initializeApp(config);
}


 // console.log(dbref);

 // dbref.on("child_added", function(snap) {
 //   console.log(snap.val());
 // })


// Store a response to the DB. Writes in /responses/ and /user-responses/

function postNewResponse(uid, name, articleURL, reaction, gifURL) {
  // A post entry.
  var db = firebase.database();
  var dbref = db.ref();

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

  return dbref.update(updates);
}

// }); //End document ready function
