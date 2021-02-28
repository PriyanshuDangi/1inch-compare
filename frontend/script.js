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
      coutput += `<tr>
          <td>${x.tokenIn.symbol}</td>
          <td>${x.tokenIn.amount}</td>
          <td>${x.tokenOut.symbol}</td>
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