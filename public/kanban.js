
// inläsning av viktiga element 
const newTaskButton = document.getElementById('newTaskButton');


// Lägg till lyssnare till element
newTaskButton.addEventListener("click", saveNewTask);


function saveNewTask(){

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

        let todo = document.getElementsByClassName("kanban")[0];
        todo.appendChild(newTemplate);
        
       




    }

}


function toNext(){
    
    
    // Hämta kanbanklassen och gör om till array
    const kanban = Array.from(document.getElementsByClassName('kanban'));

    let kanbanIndex = kanban.indexOf(this.parentElement);
  
    if(kanbanIndex+1<kanban.length)
    {  kanban[kanbanIndex+1].appendChild(this); }


}


function deleteParent(ev)
{
    ev.stopPropagation();
    const parent = this.parentElement;
    const gp = parent.parentElement;
    gp.removeChild(parent); 

}

function goBack(ev){

    ev.stopPropagation();
    const kanban = _classArr('kanban');

    let kanbanIndex = kanban.indexOf(this.parentElement.parentElement);
  
    if(kanbanIndex>0)
    {  kanban[kanbanIndex-1].appendChild(this.parentElement); }

}


// Helpers

function _classArr(cName){
    return Array.from(document.getElementsByClassName(cName));
}
