const contentsPath = "./../data/list.json";

const container = document.getElementById("list-container");
const table = document.createElement("table");
const addButton = document.getElementById("addBtn");
const loadButton = document.getElementById("loadButton");

let className, contents, viewButton, dataElementTag;
let alreadyLoaded, oddRow = false;

addButton.addEventListener("click", () => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id="check";
  const summary = document.createElement("summary");
  const details = document.createElement("details");
  summary.innerHTML = document.getElementById("inputTitle").value;
  if(summary.innerHTML === null | summary.innerHTML === ""){
    // alert("Title can't be empty"); 
    return;
  }

  details.append(
    "Description: ",
    document.getElementById("inputDescription").value,
    document.createElement("br")
  );
  details.append(
    "Due Date: ",
    document.getElementById("inputDate").value,
    document.createElement("br")
  );
  details.append("Due Time: ", document.getElementById("inputTime").value);

  this.createRow(checkbox, summary, details);
});

loadButton.addEventListener("click", (evt) => {
  if (alreadyLoaded) {
    alert("Tasks already loaded or empty");
    return;
  }
  const xhr = new XMLHttpRequest();
  xhr.open("GET", contentsPath);
  xhr.addEventListener("load", (evt) => {
    contents = JSON.parse(evt.target.responseText);
    populate(contents);
    alreadyLoaded = !alreadyLoaded;
  });
  xhr.send();
});

const populate = (contents) => {
  contents.forEach((todoItem) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id="check";

    const details = document.createElement("details");
    const summary = document.createElement("summary");

    summary.innerHTML = todoItem.title;

    details.append(
      "Description: ",
      todoItem.description,
      document.createElement("br")
    );
    details.append("Due Date: ", todoItem.date, document.createElement("br"));
    details.append("Due Time: ", todoItem.time);

    this.createRow(checkbox, summary, details);
  });
};

function createRow(checkbox, summary, details) {
  const tr = document.createElement("tr");
  if(oddRow){
      tr.classList.add('oddRow');
  }
  else{
    tr.classList.add('evenRow');

  }
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");

  
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.id = "deleteBtn";

  td1.appendChild(checkbox);
  td2.appendChild(summary);
  td3.appendChild(details);
  td4.appendChild(deleteButton);

  td1.style.width = "2%";
  td2.style.width = "20%";
  td4.style.width = "20%";


  td2.classList.add('title');
  td3.classList.add('details');

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);

  table.appendChild(tr);
  container.appendChild(table);
  oddRow=!oddRow;

  deleteButton.addEventListener('click', function(){deleteTask((tr.rowIndex))});
}

const deleteTask = (row) => {
    table.deleteRow(row);
}
