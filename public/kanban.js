var draggedElement = "";
// Initiera vårt projekt...
window.addEventListener("DOMContentLoaded", initListeners);


function initListeners(){

    console.log("projekt started");

    // Lägga till lyssnare till våra mottagare, dropElements
    const kanban = _classArr('kanban');
    for(let i=0; i<kanban.length; i++)
    {
        kanban[i].addEventListener('dragover',dragOver);
        kanban[i].addEventListener('drop',drop);
    }

    // Lägg till lyssnare för knapp, skapa ny task
    const newTaskButton = document.getElementById('newTaskButton');
    newTaskButton.addEventListener('click', createNewTask);

}

function dragStart(){
    // Koppla din dragning till global variabel
    draggedElement = this;
    console.log("drag started");
    setTimeout( ()=>{this.className += " hidden";},1);
}
function dragEnd(){}

function dragOver(ev){
    ev.preventDefault();
}
function drop(){
    // återställer synlighet för draget element
    draggedElement.className = "clonedTaskTemplate";
    // lägg till draget element till den du är ovanför...
    this.append(draggedElement);

}




function createNewTask(){
    // Hämta texten i text-rutan
    const newTask = document.getElementById('newTask').value;
   // Hämta template
    const template = _classArr('taskTemplate')[0];
    // klona template
    let newTemplate = template.cloneNode(true);
    newTemplate.className = "clonedTaskTemplate";
        newTemplate.children[1].innerHTML = newTask;
     _classArr('kanban')[0].appendChild(newTemplate);
    // todo, lägg till id för sparfunktion

    // lägg till lyssnare till vårt nya objekt.
    newTemplate.addEventListener('dragstart',dragStart);
    newTemplate.addEventListener('dragend',dragEnd);



}


// helpers
function _classArr(cName){

    return Array.from(document.getElementsByClassName(cName));

}

function _id(id)
{   
    return document.getElementById(id);
}
