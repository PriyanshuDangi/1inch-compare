const fetch = require("node-fetch");

let baseurl = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';
let baseQuote = 'https://api.1inch.exchange/v2.0/quote'

const uniswap = async () => {
    try{
        let pairs = await fetch( baseurl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: `{
                pairs(first: 1, orderBy: txCount, orderDirection:desc, skip: $skip) {
                    id
                }
                }` 
            }),
        }).then(res => res.json());
        // console.log(pairs.data);
        let swaps = [];
        for(let i in pairs.data.pairs){
            pair = pairs.data.pairs[i];
            let swap = await fetch(baseurl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( {query: `{
                    swaps(first: 2, orderBy: timestamp, orderDirection: desc, where:
                    { pair: "${pair.id}" }) {
                        pair {
                            token0 {
                                symbol,
                                id,
                                decimals,
                                name,
                                derivedETH
                            }
                            token1 {
                                symbol,
                                id,
                                decimals,
                                name,
                                derivedETH
                            }
                        }
                        amount0In
                        amount0Out
                        amount1In
                        amount1Out
                        amountUSD
                    }
                }` 
                }),
            }).then(res => res.json());

            for(let i in swap.data.swaps){
                swaps.push(swap.data.swaps[i]);
            }
        }
        // console.log(swaps.length);
        // swaps.forEach(swap => {
        //     console.log(swap);
        // })
        let compares = [];
        for(let i in swaps){
            swap = swaps[i];
                let tokenOut, tokenIn;
                let amountOut, amountIn;
                if(swap.amount0Out != 0){
                    tokenOut = swap.pair.token0;
                    tokenIn = swap.pair.token1;
                    amountOut = swap.amount0Out;
                    amountIn = swap.amount1In;
                }else{
                    tokenOut = swap.pair.token1;
                    tokenIn = swap.pair.token0;
                    amountOut = swap.amount1Out;
                    amountIn = swap.amount0In;
                }
                let amount = parseInt(amountOut*Math.pow(10, tokenOut.decimals))
                base = baseQuote + "?fromTokenAddress=" + tokenOut.id + "&toTokenAddress=" +tokenIn.id + "&amount=" + amount;
                let quote = await fetch(base, {
                    method: 'GET'
                }).then(res => res.json());

                let ethPrice = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`, {
                    method: 'GET'
                }).then(res => res.json());

                ethPrice = parseFloat(ethPrice.ethereum.usd);
                let calculated = ethPrice*parseFloat(tokenIn.derivedETH);
                
                let amountGet = (calculated*parseInt(quote.toTokenAmount))/Math.pow(10, tokenIn.decimals);
                let saved = amountGet - parseFloat(swap.amountUSD);
                // console.log(amountGet, amountUSD)

                if(saved  <= 0){
                    continue;
                }
                let obj = {
                    tokenOut: {
                        sybmol: tokenOut.symbol,
                        amount: amountOut,
                        out: quote.fromTokenAmount
                    },
                    tokenIn: {
                        sybmol: tokenIn.symbol,
                        amount: amountIn,
                        in: quote.toTokenAmount
                    },
                    saved: saved,
                    amountGet,
                    amountUSD: swap.amountUSD,
                    dex: 'Uniswap'
                }
                compares.push(obj);
        }
        compares.sort(forSorting);
        // compares.forEach((c) => {
        //     console.log(c);
        // })
        if(compares.length == 0){
            return null;
        }
        return compares[0];
    }catch(e){
        console.log("error", e);
    }
}

function forSorting(a, b){
    return b.saved-a.saved;
}

module.exports = uniswap;