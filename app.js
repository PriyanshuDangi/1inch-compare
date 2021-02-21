const Twitter = require("twitter");
const config = require("./config/config");
const uniswap = require("./dex/uniswap");
const sushiswap = require("./dex/sushiswap");

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
  inAmount = inAmount.toFixed(2);
  outAmount = outAmount.toFixed(2);
  saved = saved.toFixed(2);
  const strings = [
    `A user bought ${inAmount} ${inSymbol} tokens using ${outAmount} ${outSymbol} Tokens, and could have saved ${saved}$ if he had used 1inch in instead of ${dex} @1inchExchange. #1inch`,
    `A transaction from ${inAmount} ${inSymbol} to ${outAmount} ${outSymbol} on 1inch could save you $${saved} when compared to ${dex} @1inchExchange. #1inch`,
    `A ${dex} transaction from ${inAmount} ${inSymbol} to ${outAmount} ${outSymbol} will cost you $${saved} more , when compared to @1inchExchange. #1inch. `
  ];

  return strings[Math.floor(Math.random() * strings.length)];
}

const objectToTweet = (transactionInfoToString) => {
  const str = randomTweet(transactionInfoToString.tokenIn.amount, transactionInfoToString.tokenIn.sybmol, transactionInfoToString.tokenOut.amount, transactionInfoToString.tokenOut.sybmol, transactionInfoToString.saved, transactionInfoToString.dex);
  tweetThis(str);
};

const dex = [
  uniswap,
  sushiswap
]

const run = async() =>{
  console.log("Getting data from other DEX Providers")
  let pairCount = 10, swapCount = 2;
  let dexIndex = Math.floor(Math.random() * dex.length);
  let transactionInfo = await dex[dexIndex](pairCount, swapCount);

  console.log("Got the data", transactionInfo);
  
    let i = 0;
    while(i < dex.length && transactionInfo == null){
      if(i == dexIndex){
        continue;
      }
      transactionInfo = await dex[i](2, 2);
      i++;
    }

  if(transactionInfo == null){
    return null;
  }
  objectToTweet(transactionInfo);
};


run();

// calling this function every 5 mins

// const intervalTime = config.regularInterval;
// setInterval(run, intervalTime * 60 * 1000);

