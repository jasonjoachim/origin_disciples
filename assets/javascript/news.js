//This will describe how to use the newsAPI.org api.
// request example:
// "https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=a4e123dfc66f4cfcb2a4bb4e94248c29"

//Remember -- these can't _return_ the data from the function. We'd need to save the response
//somewhere in our ajax done function in order to do anything with them.

// function getSources() {
//   // var categories = ["business", "entertainment", "gaming",
//   //                   "general", "music", "politics", "science-and-nature",
//   //                   "sport", "technology"];

// //The 2-letter ISO-639-1 code of the language you would like to get sources for.
//   var lang = "en";

//   var queryUrl = "https://newsapi.org/v1/sources";
//       queryUrl += '?' +
//       $.param({
//         'language': lang,
//         // 'category': ,
//         'apiKey': 'a4e123dfc66f4cfcb2a4bb4e94248c29'
//       });

//   //send off our resquest
//   $.ajax({
//     url: queryUrl,
//     method: "GET"
//   }).done(function(response){
//     console.log(response); //TODO work with our source list here.
//   });
// }

var headline;
var subhead;

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

    var randomArticleNumber = (Math.round(Math.random()*3));
    console.log(randomArticleNumber);

    console.log(response.articles[randomArticleNumber].title); //TODO work with our news item here.
    console.log(response.articles[randomArticleNumber].description); //TODO work with our news item here.
    
    head = (response.articles[randomArticleNumber].title);

    subhead = (response.articles[randomArticleNumber].description);

    $("#head").html(head);
    $("#subhead").html(subhead);

  });
}

// EXAMPLE: one nested object (story object) from the News API response
// "author": "Tristan Greene",
// "title": "Gangster rapping hackers warn us about the dangers of ransomware",
// "description": "We're all vulnerable to attack. Not just TNW, not just the US, but the entire internet. And it is a serious problem. Sure, we talked about WannaCry and other cyberattacks, but we simply ...",
// "url": "https://thenextweb.com/distract/2017/08/24/gangster-rapping-hackers-warn-us-about-the-dangers-of-ransomware/",
// "urlToImage": "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2017/08/gangster-social.jpg",
// "publishedAt": "2017-08-24T19:56:10Z"