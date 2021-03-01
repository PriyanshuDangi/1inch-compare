const Twitter = require("twitter");
const config = require("../config/config-heroku");
const fs = require('fs');
let baseQuote = 'https://api.1inch.exchange/v2.0/quote';
const fetch = require("node-fetch");
let savePath = "./chat/since_id.txt";

var client = new Twitter({
    consumer_key: config.consumerKey,
    consumer_secret: config.consumerSecret,
    // bearer_token: config.BEARER_TOKEN,
    access_token_key: config.accessToken,
    access_token_secret: config.accessTokenSecret,
});

// const reply = () => {
//     client.get('/direct_messages/events/list.json', {"type": "message_create"})
//     .then((res) => {
//         console.log(res.events)
//     })
//     .catch(err => console.log(err))
// }

// reply();


const tokens = [
    {
        symbol: 'eth',
        id: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        decimals: 18
    },
    {
        symbol: 'weth',
        id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        decimals: 18
    },
    {
        symbol: 'dai',
        id: '0x6b175474e89094c44da98b954eedeac495271d0f',
        decimals: 18
    },
    {
        symbol: 'usdc',
        id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        decimals: 6
    },
    {
        symbol: 'usdt',
        id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        decimals: 6
    },
    {
        symbol: 'wbtc',
        id: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        decimals: 8
    },
    {
        symbol: 'value',
        id: '0x49e833337ece7afe375e44f4e3e8481029218e5c',
        decimals: 18
    },
    {
        symbol: 'bnt',
        id: '0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c',
        decimals: 18
    }
];

// @1inch_compare eth->dai
const tweetThis = async (text) => {
    text = text.replace('@Shreyas99779212', '')
    text = text.replace('@1inch_compare', '');
    text = text.trim();
    text = text.toLowerCase();
    let returnText = '';
    if (text.includes('!help')) {
        returnText = "This is the bot to get the money you can save when you choose 1inch.exchange over other exchange" + "\n" + "tag us and use !allTokens to get the list of all tokens";
        return returnText;
    }
    if (text.includes("!alltokens")) {
        tokens.forEach(t => {
            returnText += t.symbol + ', '
        })
        returnText += "\n" + "tag us and use token1>token2, e.g. weth>dai"
        return returnText;
    }
    if(text.includes("!allcommands")) {
        returnText = "!alltokens" + "\n";
        returnText += "!help" + "\n";
        returnText += "token1>token2" + "\n"
        return returnText;
    }
    if (!text.includes('&gt;')) {
        // returnText = 'Not a supported query, tag @1inch_compare and use !help'
        returnText = null;
        return returnText;
    }
    let [t1, t2] = text.split('&gt;');
    t1.trim();
    t2.trim();
    let i1 = -1, i2 = -1;
    for (let i in tokens) {
        if (tokens[i].symbol == t1) {
            i1 = i;
        }
        if (tokens[i].symbol == t2) {
            i2 = i;
        }
    }
    if (i1 == -1 || i2 == -1) {
        returnText = null;
        return returnText
    } else if (i1 == i2) {
        returnText = 'both coins should be different'
        return returnText
    }
    let amount = Math.pow(10, tokens[i1].decimals)
    base = baseQuote + "?fromTokenAddress=" + tokens[i1].id + "&toTokenAddress=" + tokens[i2].id + "&amount=" + amount;
    let quote = await fetch(base, {
        method: 'GET'
    }).then(res => res.json());
    let outAmount = parseFloat(quote.toTokenAmount / Math.pow(10, tokens[i2].decimals));
    let inAmount = parseFloat(quote.fromTokenAmount / Math.pow(10, tokens[i1].decimals))
    returnText = "You can get " + outAmount + " " + tokens[i2].symbol + " from " + 1 + " " + tokens[i1].symbol + ", using 1inch. Its the best rate you can get, you can check yourself!"
    return returnText;
}

const mentionFunc = async () => {
    try {
        console.log("mentionFunc")
        let since_id = null;
        if (fs.existsSync(savePath)) {
            let dataBuffer = fs.readFileSync(savePath)
            since_id = dataBuffer.toString();
        }
        let params = {
            "count": "5"
        }
        if (since_id) {
            params = {
                "count": "5",
                "since_id": since_id
            }
        }
        // console.log(since_id, params);

        let url = '/statuses/mentions_timeline.json'
        const mentions = await client.get(url, params);
        console.log(mentions.length)
        // return;
        console.log("since_id", since_id);
        for (let i in mentions) {
            let mention = mentions[i];
            let tweetText = await tweetThis(mention.text);
            if(tweetText == null || tweetText == ''){
                tweetText = "hey" + "@" + mention.user.screen_name + " , you can use our bot commands to check the best conversion rates. try \n" + "@1inch_comapre wbtc>eth"
                fs.writeFileSync(savePath, mention.id_str);
                console.log(mention.text);
                continue;
            }
            const tweet = await client
                .post("statuses/update", { in_reply_to_status_id: mention.id_str, status: "@" + mention.user.screen_name + " " + tweetText })
            fs.writeFileSync(savePath, mention.id_str);

            console.log(tweet.text, tweet.entities.urls[0].url);
        }
        dataBuffer = fs.readFileSync(savePath);
        since_id = dataBuffer.toString();
        console.log(since_id);
    } catch (err) {
        console.log(err);
    }
}

// const test = async () => {
//    let t = await tweetThis("@1inch_compare eth>wbtc");
//    console.log(t);
// }

// test()

let time = parseInt(config.regularChatInterval*60*1000);
setInterval(mentionFunc, time);
mentionFunc();