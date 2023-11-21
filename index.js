// function that writes data to the table from localStorage
function table() {
    const tableData = JSON.parse(localStorage.getItem("details")) || [];
    let table = document.getElementById('table');
    let tableContent = ``;
    tableData.forEach(element => {
      tableContent += `<tr class="border-2 border-stone-200 bg-stone-400">
          <td class="py-2 px-4 text-center">${element.name}</td>
          <td class="py-2 px-4 text-center">${element.email}</td>
          <td class="py-2 px-4 text-center">${element.password}</td>
          <td class="py-2 px-4 text-center">${element.dob}</td>
          <td class="py-2 px-4 text-center">true</td>
      </tr>`;
    });
  
    table.innerHTML = `
      <tr class="border-2 border-stone-200 bg-stone-400">
        <th >Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>Dob</th>
        <th>Accepted terms?</th>
        </tr>
      ${tableContent}`;
  }
  
  // Function that is called when form is submitted
  function submit(event) {
    event.preventDefault();
  
    const user = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      dob: document.getElementById("dob").value,
      password: document.getElementById("password").value,
      tnc: document.getElementById("acceptTerms").value,
    };
  
    let arr = JSON.parse(localStorage.getItem("details")) || [];
    arr.push(user);
    const data = arr;
    localStorage.setItem("details", JSON.stringify(data));
  
    table(); // Call the table function after submitting the form
  }
  
  // Set min and max dates
  var today = new Date();
  var maxDate = new Date(today);
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  var minDate = new Date(today);
  minDate.setFullYear(minDate.getFullYear() - 56);
  
  document.getElementById("dob").setAttribute("max", maxDate.toISOString().slice(0, 10));
  document.getElementById("dob").setAttribute("min", minDate.toISOString().slice(0, 10));
  
  document.getElementById("form").addEventListener("submit", submit);
  
  // Table function call that adds all data in localStorage
  table();
  
