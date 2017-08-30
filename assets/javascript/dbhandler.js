
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


// Store a response to the DB. Writes in /responses/ and /user-responses/
function postNewResponse(articleURL, reaction, gifURL) {
  // A post entry.
  var db = firebase.database();
  var dbref = db.ref();
  var user = firebase.auth().currentUser

  var respData = {
    user: user.uid,
    name: user.displayName,
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
  updates['/user-responses/' + user.uid + '/' + newKey] = respData;

  return dbref.update(updates);
}

// =========== BEGIN google code =============

function toggleSignIn() {
  if (!firebase.auth().currentUser) {
    // [START createprovider]
    var provider = new firebase.auth.GithubAuthProvider();
    // [END createprovider]
    // [START addscopes]
    provider.addScope('read:user');
    // [END addscopes]
    // [START signin]
    firebase.auth().signInWithRedirect(provider);
    // [END signin]

  } else {
    // [START signout]
    firebase.auth().signOut();

    // [END signout]
  }
  // [START_EXCLUDE]

  document.getElementById('sign-in-btn').disabled = true;
  // [END_EXCLUDE]
}
// [END buttoncallback]
/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 *  - firebase.auth().getRedirectResult(): This promise completes when the user gets back from
 *    the auth redirect flow. It is where you can get the OAuth access token from the IDP.
 */
function initApp() {
  // Result from Redirect auth flow.
  // [START getidptoken]
  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = result.credential.accessToken;
      // [START_EXCLUDE]
      console.log("token:"+token);
    } else {

      // [END_EXCLUDE]
    }
    // The signed-in user info.
    var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // [START_EXCLUDE]
    if (errorCode === 'auth/account-exists-with-different-credential') {
      alert('You have already signed up with a different auth provider for that email.');

    } else {
      console.error(error);
    }
    // [END_EXCLUDE]
  });
  // [END getidptoken]

  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    console.log("AUTH STATE CHANGE");
    if (user) {
      console.log("SIGNED IN");
      // $(".buttonToolbar").toggleClass("hidden");
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      // [START_EXCLUDE]

      //This could greet our user.
      if (displayName == null) {
        // document.getElementById('profile-dropdown').textContent = "Howdy, you!"; //

      } else {
        // document.getElementById('profile-dropdown').textContent = "Howdy, " + displayName; //
      }

      $(".loader").fadeOut();
      console.log("Successfully Signed in");
      source = pickNewSource();
  		getNews(source);
      displayFeed();
      displayAllFromUser(firebase.auth().currentUser.uid);

      // [END_EXCLUDE]
    } else {
      console.log("SIGNED OUT");
      $(".buttonToolbar").toggleClass("hidden");
      $("#sign-in-btn").toggleClass("hidden");
      $("#react").toggleClass("hidden");
      $(".loader").fadeOut(2000);
      // User is signed out.
      // [START_EXCLUDE]

      // [END_EXCLUDE]
    }


    document.getElementById('sign-in-btn').disabled = false; //disable the sign in button
    // [END_EXCLUDE]
  });
  // [END authstatelistener]
}



//============= END GOOGLE JS =================
