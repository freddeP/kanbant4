// global array/object för lagring av todos..
// lagringsvariabel
var todoObj = {};

window.addEventListener("DOMContentLoaded", initContent);


function initContent(){
    // Hämta sträng från local storage
    let todo = localStorage.getItem('todo');
    
    if(todo.length<3) return false;
    console.log(typeof todo + todo.length);
    // gör om till objekt igen
    todoObj = JSON.parse(todo);
  
   // const kanban = _classArr('kanban');

    for(let i in todoObj)
    {
        //console.log(todoObj[i]);

        let initTemplate = _classArr("taskTemplate")[0];
        let newTemplate = initTemplate.cloneNode(true);
        newTemplate.className = todoObj[i].className;
        newTemplate.innerHTML = todoObj[i].content;
        newTemplate.id = i;
        let kanban = _classArr('kanban');
        kanban[todoObj[i].kanban].appendChild(newTemplate);

        newTemplate.addEventListener("click", toNext);
        newTemplate.children[2].addEventListener("click", deleteParent);
        newTemplate.children[3].addEventListener("click", goBack);

        //console.log(newTemplate);

    }
}



// inläsning av viktiga element 
const newTaskButton = document.getElementById('newTaskButton');


// Lägg till lyssnare till element
newTaskButton.addEventListener("click", saveNewTask);


function saveNewTask(){

    const id = "_"+ new Date().getTime();
   

    let newTask = document.getElementById("newTask").value;

    // Om texten är längre än noll...
    if(newTask.length > 0)
    {
        const taskTemplate = _classArr("taskTemplate")[0];
  
        // meka med templaten...
        let newTemplate = taskTemplate.cloneNode(true);
        newTemplate.className = "clonedTaskTemplate";
        newTemplate.children[0].innerHTML = "Dagens datum fixa sen...";
        newTemplate.children[1].innerHTML = newTask;
     
        newTemplate.addEventListener("click", toNext);
        newTemplate.children[2].addEventListener("click", deleteParent);
        newTemplate.children[3].addEventListener("click", goBack);
        newTemplate.id = id;

        let todo = document.getElementsByClassName("kanban")[0];
        todo.appendChild(newTemplate);
        
        let todoInfo = {};
        todoInfo.kanban = 0;
        todoInfo.content = newTemplate.innerHTML;
        todoInfo.className =  newTemplate.className; 
        todoObj[id] = todoInfo;
       
        console.log(todoObj);
        saveToLocal();


    }

}


function toNext(){

    // Hämta kanbanklassen och gör om till array
    const kanban = Array.from(document.getElementsByClassName('kanban'));

    let kanbanIndex = kanban.indexOf(this.parentElement);
  
    if(kanbanIndex+1<kanban.length)
    {  kanban[kanbanIndex+1].appendChild(this);
    
        // Det vi klickade på finns i this
        // Det har ett id som låter oss komma åt todoObj
        const id = this.id;
      
        todoObj[id].kanban += 1;
        console.log(todoObj); 
        saveToLocal();
    }




}


function deleteParent(ev)
{

    ev.stopPropagation();
    const parent = this.parentElement;
    const id = parent.id;
    const gp = parent.parentElement;
    gp.removeChild(parent); 
    delete todoObj[id];
    saveToLocal();
}

function goBack(ev){


  


    ev.stopPropagation();
    const kanban = _classArr('kanban');

    let kanbanIndex = kanban.indexOf(this.parentElement.parentElement);
  
    if(kanbanIndex>0)
    {  kanban[kanbanIndex-1].appendChild(this.parentElement);
    
    // Det vi klickade på finns i this.parentElement
    // Det har ett id som låter oss komma åt todoObj
    const id = this.parentElement.id;

    todoObj[id].kanban -= 1;
    //console.log(todoObj); 


        saveToLocal();

    }

}


// Helpers

function _classArr(cName){
    return Array.from(document.getElementsByClassName(cName));
}


function saveToLocal()
{
    const todoString = JSON.stringify(todoObj);
    localStorage.setItem("todo",todoString);
}