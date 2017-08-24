//Let's make a template for how we're dealing with the data we save to firebase.

//User Example:

var userData ={
  userName:"john",
  responseHistory: [
    {
      timestamp:"08/24/17 05:00", //time set by firebase
      article: "https://www.NYT.com....",
      gifURL: "www.giphy.com...."
    },
    {
      timestamp:"08/24/17 05:15", //time set by firebase
      article: "https://www.NYT.com....",
      gifURL: "www.giphy.com...."
    },
    {
      timestamp:"08/24/17 05:35", //time set by firebase
      article: "https://www.NYT.com....",
      gifURL: "www.giphy.com...."
    }
  ];
};


//response example:

var response = {
  rating: "100",
  gifUrl: "https://www.giphy...."
};
