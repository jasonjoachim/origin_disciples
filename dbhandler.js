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

var gifData = {
  usedIn: [
    {
      timestamp: "08/24/17 05:00",
      article: "https://www.NYT.com...."
    },
    {
      timestamp: "08/24/17 05:15",
      article: "https://www.NYT.com...."
    },
    {
      timestamp: "08/24/17 05:35",
      article: "https://www.NYT.com...."
    }
  ],
  rating: "100",
  gifUrl: "https://www.giphy...."
};
