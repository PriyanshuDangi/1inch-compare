const fetch = require("node-fetch");

let baseurl = "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer";
let baseQuote = "https://api.1inch.exchange/v2.0/quote";

const balancer = async(swapCount = 2) => {
    try {
        let swaps = [];
        let swap = await fetch(baseurl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { query: `{
                swaps(first: ${swapCount}, orderBy: timestamp, orderDirection: desc) {
                        id
                        tokenIn
                        tokenInSym
                        tokenAmountIn
                        tokenOut
                        tokenOutSym
                        tokenAmountOut
                        value
                    }
                }`
            }),
        }).then(res => res.json());
        swaps.push(...swap.data.swaps);
        
        let compares = [];

        for(let i in swaps) {
            let swap = swaps[i];
            let tokenIn = await fetch(baseurl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( { query: `{
                    tokenPrice(id: "${swaps[i].tokenIn}") {
                        decimals
                        price
                        name
                        symbol
                    }
                }`}),
            }).then(res => res.json());

            let tokenOut = await fetch(baseurl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( { query: `{
                    tokenPrice(id: "${swaps[i].tokenOut}") {
                        decimals
                        price
                        name
                        symbol
                    }
                }`}),
            }).then(res =>res.json());
            
            tokenIn = tokenIn.data.tokenPrice;
            tokenOut = tokenOut.data.tokenPrice;

            let amount = parseInt(swap.tokenAmountOut * Math.pow(10, tokenOut.decimals));
            base = baseQuote + "?fromTokenAddress=" + swap.tokenOut + "&toTokenAddress=" +swap.tokenIn + "&amount=" + amount;
 
            let quote = await fetch(base, {
                method: 'GET'
            }).then(res => res.json());

            let usdRate = parseFloat(tokenIn.price);
            let amountGet = usdRate*parseInt(quote.toTokenAmount)/Math.pow(10, tokenIn.decimals);
            let saved = amountGet - parseFloat(swap.value);

            if(saved <= 0)
                continue;

            let obj = {
                tokenOut: {
                    sybmol: tokenOut.symbol,
                    amount: parseFloat(swap.tokenAmountOut),
                    out: quote.fromTokenAmount,
                    name: quote.fromToken.name,
                },
                tokenIn: {
                    sybmol: tokenIn.symbol,
                    amount: parseFloat(swap.tokenAmountIn),
                    in: quote.toTokenAmount,
                    name: quote.toToken.name,
                },
                saved: saved,
                amountGet,
                amountUSD: swap.value,
                dex: 'Balancer',
                transactionId: swap.id.split('-')[0]
            }
            compares.push(obj);
        }
        compares.sort(forSorting);
        console.log(compares.length);
        if(compares.length == 0) {
            return null;
        }
        //console.log(compares[0]);
        return compares[0];

    } catch(e) {
        console.log("error", e);
    }
}

function forSorting(a, b) {
    return b.saved - a.saved;
}

// balancer();

module.exports = balancer;
