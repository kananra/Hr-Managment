const headings = document.querySelectorAll("td");
const searchBtn = document.querySelector(".srch");
const firstName = document.querySelector(".firstName");
const lastName = document.querySelector(".LastName");
const money = document.querySelector(".money");
const positin = document.querySelector("#post");
const addBtn = document.querySelector(".add-btn");
const rows = document.querySelectorAll("tbody tr");
const tbody = document.querySelector("tbody");

headings.forEach((heading) => {
  heading.addEventListener("click", function () {
    const input = document.createElement("input");
    input.type = "text";
    input.value = heading.innerText;
    heading.replaceWith(input);

    input.addEventListener("blur", function () {
      const newHeading = document.createElement("td");
      newHeading.innerText = input.value;
      input.replaceWith(newHeading);
      newHeading.addEventListener("click", handleClick);
    });

    function handleClick() {
      const newInput = document.createElement("input");
      newInput.type = "text";
      newInput.value = this.innerText;
      this.replaceWith(newInput);
      newInput.addEventListener("blur", function () {
        const newHeading = document.createElement("td");
        newHeading.innerText = newInput.value;
        newInput.replaceWith(newHeading);
        newHeading.addEventListener("click", handleClick);
      });
    }
  });
});

function getTableData() {
  const data = [];

  rows.forEach((row) => {
    const obj = {};
    obj.first = row.querySelectorAll("td")[0].textContent;
    obj.last = row.querySelectorAll("td")[1].textContent;
    obj.salary = row.querySelectorAll("td")[2].textContent;
    obj.position = row.querySelectorAll("td")[3].textContent;
    data.push(obj);
  });

  return data;
}

let tableData = getTableData(); 

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${firstName.value}</td>
    <td>${lastName.value}</td>
    <td>${money.value}</td>
    <td>${positin.value}</td>
  `;
  tbody.appendChild(newRow);

  
  tableData.push({
    first: firstName.value,
    last: lastName.value,
    salary: money.value,
    position: positin.value,
  });

  
  console.log(data);
});

function searchTableData(searchText) {
  const filteredData = tableData.filter((item) => {
    return (
      item.first.toLowerCase().includes(searchText.toLowerCase()) ||
      item.last.toLowerCase().includes(searchText.toLowerCase()) ||
      item.salary.toLowerCase().includes(searchText.toLowerCase()) ||
      item.position.toLowerCase().includes(searchText.toLowerCase())
    );
  });
  return filteredData;
}




searchBtn.addEventListener("input", function () {
  const searchText = searchBtn.value;
  const filteredData = searchTableData(searchText);
  updateTable(filteredData);
});

function updateTable(data) {
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }


  data.forEach((item) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${item.first}</td>
      <td>${item.last}</td>
      <td>${item.salary}</td>
      <td>${item.position}</td>
    `;
    tbody.appendChild(newRow);
  });
}





