# 1inch-compare

With Elon Musk tweeting about every crypto-currency in existence, you need a reliable DEX Provider to help you jump on the wagon and make some quick bucks. 

<!-- ![demo](/images/banner.jpeg) -->
TWITTER LINK: [twitter.com/1inch_compare](https://twitter.com/1inch_compare)

<img src="./images/profile-tweet.png" height="300">

 1inch-compare is an intelligent bot, which tracks transactions on [UNISWAP](https://uniswap.org/), [SUSHISWAP](https://sushiswap.fi/)(and are working on the support over other DEX Providers) and tell how much users could have saved if they had used [1inch Exchange](https://1inch.exchange/) instead.

It tracks transactions at intervals of x mins(can be changed in the config/config.js) completed over various DEX's and tweets the amount that the user would have saved if he/she had done the same transaction via the [1inch.exchange](https://1inch.exchange/)

## Example

<img src="./images/tweet.png">  
For this tweet(or transaction) completed over uniswap we compared it with 1inch.exchange and you can see the results.

1inch.exchange            |  Uniswap
:-------------------------:|:-------------------------:
<img src="./images/1inch-crop.png">  |  <img src="./images/uniswap.png">

Its clear by this data if this user had used 1inch.exchange[1inch.exchange](https://1inch.exchange/) for this transaction, he would have got more WETH for same price or got same WETH for a lower price.

## Setup

- git clone the repo
- cp config/config.example.js config/config.js
- Generate your api keys from [here](https://developer.twitter.com/en/docs/authentication/oauth-1-0a/obtaining-user-access-tokens) and put it in the config.js file
- npm install
- npm start


 This bot was made with ❤️ by 1inch-compare team.
