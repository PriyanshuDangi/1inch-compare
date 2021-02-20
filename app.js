const Twitter = require("twitter");
const config = require("./config/config");
const uniswap = require("./uniswap/uniswap");

var client = new Twitter({
  consumer_key: config.consumerKey,
  consumer_secret: config.consumerSecret,
  // bearer_token: config.BEARER_TOKEN,
  access_token_key: config.accessToken,
  access_token_secret: config.accessTokenSecret,
});

const tweetThis = (tweet) => {
  console.log("Trying to tweet, ", tweet);
  client
    .post("statuses/update", { status: tweet })
    .then((result) => {
      console.log('You successfully tweeted this : "' + result.text + '"');
    })
    .catch(console.error);
};

const objectToTweet = (transactionInfoToString) => {
  tweetThis(`A user bought ${transactionInfoToString.tokenIn.amount} ${transactionInfoToString.tokenIn.sybmol} tokens using ${transactionInfoToString.tokenOut.amount} ${transactionInfoToString.tokenOut.sybmol} Tokens, and could have saved ${transactionInfoToString.saved}$ if he had used @1inchExchange. #1inch`);
};

const test = async() =>{
  console.log("Getting data from other DEX Providers")
  const transactionInfo = await uniswap();
  console.log("Got the data", transactionInfo);

  if(transactionInfo == NULL){
    return NULL;
  }
  objectToTweet(transactionInfo);
};


test();

// calling this function every 5 mins
setInterval(test, 5 * 60 * 1000);
