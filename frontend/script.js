window.onload = async () => {
  const resp = await fetch("http://localhost:4000/api/allTrans");
  console.log(resp);
  const data = await resp.json();
  console.log(data);
  addDataToPage(addTable(data));
};

const addTable = (data) => {
  let output = "";
  data.forEach((x) => {
    output += `<tr>
        <td>${x.tokenIn.sybmol}</td>
        <td>${x.tokenIn.amount}</td>
        <td>${x.tokenOut.sybmol}</td>
        <td>${x.tokenOut.amount}</td>
        <td>${x.saved}</td>
        <td><a href="${x.tweetLink}" target="_blank" rel="noopener noreferrer">Tweet Link</a>
        </td> 

      </tr>`;
  });
  return output;
};

addDataToPage = (data) => {
  const table = `<table class="ui selectable striped inverted table">
<thead>
  <tr>
    <th>Token In</th>
    <th>Amount In</th>
    <th>Token Out</th>
    <th>Amount Out</th>
    <th>Saved</th>
    <th>Tweet Link</th>
  </tr>
</thead>
<tbody>
  ${data}
  </tbody>
</table>`;

  document.querySelector("#table").innerHTML = table;
};

// const fake = [
//   {
//     tokenOut: {
//       sybmol: "USDC",
//       amount: 26836.227361,
//       out: "26836227361",
//       image:
//         "https://tokens.1inch.exchange/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
//       name: "USD Coin",
//     },
//     tokenIn: {
//       sybmol: "WETH",
//       amount: 19.978285280841224,
//       in: "19935057532393068655",
//       image:
//         "https://tokens.1inch.exchange/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
//       name: "Wrapped Ether",
//     },
//     saved: 13.59113108760721,
//     amountGet: 26885.814042212565,
//     amountUSD: "26872.22291112495890529883087272611",
//     dex: "Uniswap",
//     transactionId:
//       "0x57934290a6e08f0c7d6d8967be7c620e5b7a239581eef94b4b5b207a02852f5e",
//   },
//   {
//     tokenOut: {
//       sybmol: "SUSHI",
//       amount: 345.5026082559338,
//       out: "345502608255933800000",
//       image:
//         "https://tokens.1inch.exchange/0x6b3595068778dd592e39a122f4f5a5cf09c90fe2.png",
//       name: "SushiToken",
//     },
//     tokenIn: {
//       sybmol: "WETH",
//       amount: 3.6087789424352525,
//       in: "3587350679572005458",
//       image:
//         "https://tokens.1inch.exchange/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
//       name: "Wrapped Ether",
//     },
//     saved: 17.872372833991903,
//     amountGet: 4846.654262128962,
//     amountUSD: "4828.781889294969985083121229188461",
//     dex: "Sushiswap",
//     transactionId:
//       "0x69a4e16495f2252eccb93e73e2efc64932e7a4b0754e4d277fb226937b69c92c",
//   },
// ];

// addDataToPage(addTable(fake));
