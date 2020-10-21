const contentsPath = "./../data/list.json";

const container = document.getElementById("list-container");
const table = document.createElement('table');
const myList = document.createElement("ul");
const addButton = document.getElementById("addBtn");
const loadButton = document.getElementById("loadButton");
let className, contents, viewButton, dataElementTag;
let alreadyLoaded = false;

addButton.addEventListener('click', () => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    // const inputTitle = document.createTextNode(document.getElementById("inputTitle").value);
    // viewButton = document.createElement("input");
    // viewButton.type = "button";
    // viewButton.value = "View";
    // viewButton.classList.add('viewButton');
    // viewButton.id=document.getElementById("inputTitle").value;
    // viewButton.setAttribute=document.getElementById("inputTitle").value;
    // container.append(inputTitle);
    // container.append(viewButton);
    container.append(checkbox);

});

loadButton.addEventListener('click', (evt) => {
    if(alreadyLoaded){
        return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open('GET', contentsPath);
    xhr.addEventListener('load', (evt) =>{
         contents = JSON.parse(evt.target.responseText);
        populate(contents);
        alreadyLoaded = !alreadyLoaded;
    });
    xhr.send();
});


const populate = (contents) => {
    contents.forEach(todoItem => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        
        const details =  document.createElement('details');
        const summary = document.createElement('summary');

        // const description = document.createElement('p');
        // const date = document.createElement('p');
        // const time = document.createElement('p');
        summary.innerHTML= todoItem.title;
        // description.innerHTML = todoItem.description;
        // date.innerHTML = todoItem.date;
        // time.innerHTML = todoItem.time;

        // details.appendChild(summary);
        details.append("Description: ", todoItem.description, document.createElement('br'));
        details.append("Due Date: ", todoItem.date, document.createElement('br'));
        details.append("Due Time: ", todoItem.time);
        

        const table=document.createElement("table");
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');

        
        td1.appendChild(checkbox);
        td2.appendChild(summary);
        td3.appendChild(details);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        container.appendChild(tr);
       
        
    });
}
// const populate = (contents) => {
//     contents.forEach((todoItem, i) => {
//         row = document.createElement('tr');
//             col = document.createElement("td");
//             col.innerHTML = todoItem.title;
//             col2 = document.createElement("td");
//             col2.innerHTML = todoItem.description;
//             col3 = document.createElement("td");
//             col3.innerHTML = todoItem.date;
//             col4 = document.createElement("td");
//             col4.innerHTML = todoItem.time;
//             col5 = document.createElement('td');
//             col5btn = document.createElement('input');
//             col5btn.type ="button";
//             col5btn.value="View";
//             col.addEventListener('click', select);
//             col5.appendChild(col5btn);
//             row.appendChild(col);
//             row.appendChild(col2);
//             row.appendChild(col3);
//             row.appendChild(col4);
//             row.appendChild(col5);


//         table.appendChild(row);
//     });
//     container.appendChild(table);
// }

// const select = (evt) => {
//     const target = evt.target;
//     target.style.backgroundColor = "#69b5e4";
// }

// const populate = (contents) => {
//     contents.forEach(Todo => {    
//         li = document.createElement('li');
//         li.className = "title";
//         li.innerHTML = Todo.title;
//         const span = document.createElement('span');
//         const textForDescription = document.createTextNode(Todo.Description);
//         const textForDate = document.createTextNode(Todo.date);
//         const textFortime = document.createTextNode(Todo.time);
//         // span.innerHTML =Todo.Description;
//         span.appendChild(textForDescription); 
//         span.appendChild(textForDate);
//         span.appendChild(textFortime);
//         span.id= Todo.id;
//         // span.style.visibility = "hidden";
//         li.appendChild(span);
//         // container.appendChild(li);   
//         myList.appendChild(li); 
//         container.appendChild(myList);   
//     });   
// }



