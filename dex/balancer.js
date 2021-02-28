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
        console.log(swap.data.swaps)
        swaps.push(...swap.data.swaps);


        let compares = [];
        for(let i in swaps) {
            let swap = swaps[i];
            let tokenIn = await fetch(baseurl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( { query: `{
                    tokenPrice(id: "${swaps[i].tokenIn}") {
                        decimals,
                        price,
                        name,
                        symbol
                    }
                }`}),
            }).then(res =>res.json());

            let tokenOut = await fetch(baseurl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( { query: `{
                    tokenPrice(id: "${swaps[i].tokenOut}") {
                        decimals,
                        price,
                        name,
                        symbol
                    }
                }`}),
            }).then(res =>res.json());

            // let amount = parseInt(swapamountOut)
                base = baseQuote + "?fromTokenAddress=" + swap.tokenOut + "&toTokenAddress=" +swap.tokenIn + "&amount=" + swap.tokenAmountOut;
                let quote = await fetch(base, {
                    method: 'GET'
                }).then(res => res.json());

            let obj = {
                tokenOut: {
                    sybmol: tokenOut.symbol,
                    amount: parseFloat(amountOut),
                    out: quote.fromTokenAmount
                },
                tokenIn: {
                    sybmol: tokenIn.symbol,
                    amount: parseFloat(amountIn),
                    in: quote.toTokenAmount
                },
                saved: saved,
                amountGet,
                amountUSD: swap.amountUSD,
                dex: 'Balancer',
                transactionId: swap.transaction.id
            }
            compares.push(obj);
        }
        
        decimals.forEach(sym => console.log(sym));

        let compares = [];
        for(let i in swap) {
            swap = swaps[i];
        }

    } catch(e) {
        console.log("error", e);
    }
}

balancer();