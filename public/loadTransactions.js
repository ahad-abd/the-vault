fetch('http://tsf-vault.herokuapp.com/getTransactions')
     .then(res => res.json())
     .then(data => loadHTMLTable(data))
    

function loadHTMLTable(data){
    const table = document.querySelector('table tbody');
    let tableHTML = "";
    data.forEach(function ({id,sender,receiver,date,amount}){
        tableHTML += "<tr>";
        tableHTML += `<td>${id}</td>`
        tableHTML += `<td>${sender}</td>`
        tableHTML += `<td>${receiver}</td>`
        tableHTML += `<td>${new Date(date).toLocaleString()}</td>`
        tableHTML += `<td><p class="balance">₹${amount}.00</p></td>`
        tableHTML += "</tr>";
    });
    table.innerHTML = tableHTML;

}