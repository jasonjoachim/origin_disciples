
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
// firebase.auth().currentUser.displayName;
// firebase.auth().currentUser.uid

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
    provider.addScope('repo');
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
  document.getElementById('sign-in').disabled = true;
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
      // document.getElementById('quickstart-oauthtoken').textContent = token;
      console.log("token:"+token);
    } else {
      // document.getElementById('quickstart-oauthtoken').textContent = 'null';

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
      // If you are using multiple auth providers on your app you should handle linking
      // the user's accounts here.
    } else {
      console.error(error);
    }
    // [END_EXCLUDE]
  });
  // [END getidptoken]
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      //TODO move this out to main.js --
      document.getElementById('profile-dropdown').textContent = "Howdy, " + displayName; //
      document.getElementsByTagName('header')[0].style.display = 'block'; //Show the hidden areas.
      document.getElementById('user-area').style.display = 'block'; //Show the hidden areas.
      document.getElementById('sign-in-area').style.display = 'none'; //Hide the sign in area.

      $(".loader").fadeOut("slow");
      //TODO call other functions here....
      console.log("Successfully Signed in");
      // source = pickNewSource();
      // getNews(source);

      // [START_EXCLUDE]
      // document.getElementById('sign-in-status').textContent = 'Signed in';
      // document.getElementById('sign-in').textContent = 'Sign out';
      // document.getElementById('account-details').textContent = JSON.stringify(user, null, '  ');
// console.log(JSON.stringify(user, null, '  '));
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      // [START_EXCLUDE]
      // document.getElementById('sign-in-status').textContent = 'Signed out';
      document.getElementById('sign-in').textContent = 'Sign in with GitHub';

      // document.getElementsByTagName('header')[0].style.display = 'none'; //Hide interaction areas
      // document.getElementById('user-area').style.display = 'none'; //Hide interaction areas
      document.getElementById('sign-in-area').style.display = 'block'; //Show the hidden areas.

      $(".loader").fadeOut("slow");
      // document.getElementById('account-details').textContent = 'null';
      // document.getElementById('oauthtoken').textContent = 'null';
      // [END_EXCLUDE]
    }

    // [START_EXCLUDE]
    document.getElementById('sign-in').disabled = false; //disable the sign in button
    // [END_EXCLUDE]
  });
  // [END authstatelistener]
  document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);
}



//============= END GOOGLE JS =================