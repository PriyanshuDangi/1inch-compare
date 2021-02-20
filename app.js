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

const randomTweet = (inAmount, inSymbol, outAmount, outSymbol, saved, dex) => {
  const strings = [
    `A user bought ${inAmount} ${inSymbol} tokens using ${outAmount} ${outSymbol} Tokens, and could have saved ${saved}$ if he had used @1inchExchange. #1inch`,
    `A transaction from ${inAmount} ${inSymbol} to ${outAmount} ${outSymbol} on 1inch could save you $${saved} when compared to ${dex} @1inchExchange. #1inch`,
    `A ${dex} transaction from ${inAmount} ${inSymbol} to ${outAmount} ${outSymbol} will cost you $${saved} more , when compared to 1inch @1inchExchange. #1inch. `
  ];

  return strings[Math.floor(Math.random() * strings.length)];
}

const objectToTweet = (transactionInfoToString) => {
  const str = randomTweet(transactionInfoToString.tokenIn.amount, transactionInfoToString.tokenIn.sybmol, transactionInfoToString.tokenOut.amount, transactionInfoToString.tokenOut.sybmol, transactionInfoToString.saved, transactionInfoToString.dex);
  tweetThis(str);
};

const test = async() =>{
  console.log("Getting data from other DEX Providers")
  const transactionInfo = await uniswap();
  console.log("Got the data", transactionInfo);

  if(transactionInfo == null){
    return null;
  }
  objectToTweet(transactionInfo);
};


test();

// calling this function every 5 mins
// setInterval(test, 5 * 60 * 1000);
