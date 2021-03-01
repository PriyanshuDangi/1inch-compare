const config = {
    consumerKey: process.env.CONSUMERKEY,
    consumerSecret: process.env.CONSUMERSECRET,
    accessToken: process.env.ACCESSTOKEN,
    accessTokenSecret: process.env.ACCESSTOKENSECRET,
    // bearer_token: 'AAAAAAAAAAAAAAAAAAAAALvMMwEAAAAALRiiGniXn2l76McwDG3PC4zj8eU%3DsyzyA1BNWlGvwoD1ORzyzPCrscOMC9kWFmjHXuPVoiGAiAZbgm',
    regularInterval: process.env.REGULARINTERVAL,     //unit is in minutes
    regularTweetInterval: process.env.REGULARTWEETINTERVAL,
    regularChatInterval: process.env.REGULARCHATINTERVAL
  };
  
  module.exports = config;