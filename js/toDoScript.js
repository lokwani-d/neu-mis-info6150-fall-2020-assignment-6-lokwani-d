// Defining my nodes for the page structure
const contentsPath = "./../data/list.json";
const container = document.getElementById("list-container");
const table = document.createElement("table");
const addButton = document.getElementById("addBtn");
const loadButton = document.getElementById("loadButton");

// Defining my variables for the logic
let contents;
let alreadyLoaded, oddRow = false;

// Calling the event listener on the add button for adding the todo task to the list on the page
addButton.addEventListener("click", () => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id="check";
  const summary = document.createElement("summary");
  const details = document.createElement("details");
  summary.innerHTML = document.getElementById("inputTitle").value;

//   Checking for avoiding the null or blank titles of the todo list
  if(summary.innerHTML === null | summary.innerHTML === ""){
    alert("Title can't be empty"); 
    return;
  }

//   Getting the input details from the user using the html form/input elements
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

//   Sending the values to the createRow function to create a row of items for the lsit
  this.createRow(checkbox, summary, details);
});

// Calling the event listener on the add button for adding the todo task to the list on the page
loadButton.addEventListener("click", (evt) => {
    // Having a boolean check to avoid loading the same list multiple times
  if (alreadyLoaded) {
    alert("Tasks already loaded or empty");
    return;
  }

//   Creating a XHR request to load the data from the JSON file using the GEt method
  const xhr = new XMLHttpRequest();
  xhr.open("GET", contentsPath);
  xhr.addEventListener("load", (evt) => {
    contents = JSON.parse(evt.target.responseText);
    // Sending the JSON parsed data to the populate method and inversing the boolean flag
    populate(contents);
    alreadyLoaded = !alreadyLoaded;
  });
  xhr.send();
});


// my method to populate the JSON data from the load button listener 
const populate = (contents) => {
  contents.forEach((todoItem) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id="check";

    const details = document.createElement("details");
    const summary = document.createElement("summary");

    //   Getting the input details from the user using the html form/input elements
    summary.innerHTML = todoItem.title;

    details.append(
      "Description: ",
      todoItem.description,
      document.createElement("br")
    );
    details.append("Due Date: ", todoItem.date, document.createElement("br"));
    details.append("Due Time: ", todoItem.time);

    //   Sending the values to the createRow function to create a row of items for the lsit
    this.createRow(checkbox, summary, details);
  });
};

// my method to create a row for the each item of the todolist
// Basically each todo task is the a row for the page
function createRow(checkbox, summary, details) {
  const tr = document.createElement("tr");
//   distinguishing the row number for the styling
  if(oddRow){
      tr.classList.add('oddRow');
  }
  else{
    tr.classList.add('evenRow');

  }

//   creating different columns of the row for checkbox, title, description(including date and time) and delete button
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");

  
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.id = "deleteBtn";

//   appending fields  to the cells
  td1.appendChild(checkbox);
  td2.appendChild(summary);
  td3.appendChild(details);
  td4.appendChild(deleteButton);

  td1.style.width = "2%";
  td2.style.width = "20%";
  td4.style.width = "20%";


  td2.classList.add('title');
  td3.classList.add('details');

  //   appending columns to the row
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);

  //   appending row to the table
  table.appendChild(tr);
  container.appendChild(table);
  oddRow=!oddRow;

//   adding an eventlistener to the delete button to delete the task
  deleteButton.addEventListener('click', function(){deleteTask((tr.rowIndex))});
}

// my method to delete a task or a row
const deleteTask = (row) => {
    table.deleteRow(row);
}
