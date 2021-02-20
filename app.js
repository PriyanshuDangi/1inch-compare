const Twitter = require("twitter");
const config = require("./config/config");
const uniswap = require("./uniswap/uniswap")

var client = new Twitter({
  consumer_key: config.consumerKey,
  consumer_secret: config.consumerSecret,
  // bearer_token: config.BEARER_TOKEN,
  access_token_key: config.accessToken,
  access_token_secret: config.accessTokenSecret,
});

function tweetThis(tweet) {
  client
    .post("statuses/update", { status: tweet })
    .then((result) => {
      console.log('You successfully tweeted this : "' + result.text + '"');
    })
    .catch(console.error);
}

const test = async() =>{
  let str = "";
  str = await uniswap();
  console.log(str);
}

test();