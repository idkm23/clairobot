const request = require('request');

//const user_id  = 12038675;
const user_id  = 5742109702;
const story_url = "https://i.instagram.com/api/v1/feed/user/" +
          user_id + "/reel_media";
const usr_agent = "Instagram 10.3.2 " +
                  "(iPhone7,2; iPhone OS 9_3_3; en_US; en-US; scale=2.00; 750x1334) " +
                  "AppleWebKit/420+";

var cookies  = [];
var cookies2 = [];
request.get({ url: "https://www.instagram.com/accounts/login/?force_classic_login",
              headers: { 'User-Agent': usr_agent } },
            function(err, res, body) {
  res['headers']['set-cookie'].forEach( function(x) {
    var match = x.match(/(\w+)=(\w+)/);
    cookies[match[1]] = match[2];
  });

  request.post({ url: "https://www.instagram.com/accounts/login/?force_classic_login",
                 headers: {
                   'User-Agent': usr_agent,
                   'cookie': "rur=" + cookies['rur'] + "; " +
                             "mid=" + cookies['mid'] + "; " +
                             "mcd=3; " +
                             "csrftoken=" + cookies['csrftoken']
                          },
                 form: { 'csrfmiddlewaretoken': cookies['csrftoken'],
                         'username': 'homunny',
                         'password': 'richard1'
                       }
               },
    function(err, res, body) {
      res['headers']['set-cookie'].forEach( function(x) {
        var match = x.match(/(\w+)=([a-zA-Z0-9%]+)/);
        cookies2[match[1]] = match[2];
      });
      request.get({ url: story_url,
                    headers: {
                      'user-agent': usr_agent,
                      'cookie': "csrftoken=" + cookies2['csrftoken'] + "; " +
                                "shbid=" + cookies2['shbid'] + "; " +
                                "shbts=" + cookies2['shbts'] + "; " +
                                "rur=" + cookies2['rur'] + "; " +
                                "sessionid=" + cookies2['sessionid'] + "; "
                             }
                  },
                  function(err, res, body) {
        console.log( err, res, body);
      });
  });
});
