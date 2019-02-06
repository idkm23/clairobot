const request  = require('request');
const cheerio  = require('cheerio');
const snoowrap = require('snoowrap');

const r = new snoowrap( {
  userAgent:     'clairobot',
  clientId:      process.env.client_id,
  clientSecret:  process.env.client_secret,
  refresh_token: process.env.refresh_token
} )

const options = {
  url: "https://soundcloud.com/ccottrill",
  headers: {
    'User-Agent': "Mozilla/5.0 " +
                  "(Macintosh; Intel Mac OS X 10_12_6) " +
                  "AppleWebKit/537.36 " + 
                  "(KHTML, like Gecko) " +
                  "Chrome/62.0.3202.94 Safari/537.36"
  }
};

request(options, function(err, response, body) {
  const $ = cheerio.load(body.replace(/noscript/g, 'div' ));
  
  $('.audible').each( function(i, elem) {
    var time  = $(elem).children('time').text();
    var title = $( $(elem).children('h2').html() ).attr('href');
    var url   = "https://soundcloud.com" + title;
    title = title.replace(/\/ccottrill\//i, '').replace(/-/g, ' ');
      
    console.log(title, '  ', url );
    
    if( (Date.now() - Date.parse(time)) <= 600000 ) {
      console.log("Creating post for [", title, "]\n");
      r.getSubreddit('clairo').submitLink( {
        title: title,
        url: url
      })
    }
  });
});
