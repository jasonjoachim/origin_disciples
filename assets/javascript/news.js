//This will describe how to use the newsAPI.org api.
// request example:
// "https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=a4e123dfc66f4cfcb2a4bb4e94248c29"


function getSources() {
  // var categories = ["business", "entertainment", "gaming",
  //                   "general", "music", "politics", "science-and-nature",
  //                   "sport", "technology"];

//The 2-letter ISO-639-1 code of the language you would like to get sources for.
  var lang = "en";

  var queryUrl = "https://newsapi.org/v1/sources";
      queryUrl += '?' +
      $.param({
        'language': lang,
        // 'category': ,
        'apiKey': 'a4e123dfc66f4cfcb2a4bb4e94248c29'
      });

  //send off our resquest
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).done(function(response){
    console.log(response);
  });
}


function getNews(source) {

  var queryUrl = "https://newsapi.org/v1/articles";
      queryUrl += '?' +
      $.param({
        'source': source,
        'apiKey': 'a4e123dfc66f4cfcb2a4bb4e94248c29',
        'sortBy': 'popular'
      });

  //send off our resquest
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).done(function(response){
    console.log(response);
  });
}
