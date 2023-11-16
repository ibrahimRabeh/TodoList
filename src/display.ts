import { TasksBtns, ProjectList, Task, Project, addProjectBtns } from "./index";

function displayTasks(TaskList: Task[]){
    const TaskContainer:HTMLDivElement = document.querySelector(".ToDoList") as HTMLDivElement;
    TaskContainer.innerHTML = "Tasks";
    TaskList.forEach(task => {
      //if the task is done a class called Task is surrounds 
      //the whole task and its opacity is 0.5 to indicate its done
        if(task.Isdone == true|| (new Date()>task.DueDate&& new Date().getDate() != task.DueDate.getDate()))
        TaskContainer.innerHTML += displayDoneTasks(task);
       else{
        TaskContainer.innerHTML += `
        <div class="Task">
        <div id ="TaskTitle">${task.TaskTitle}</div>
        <div class = "desAndDate">
        <div id = "Description">${task.Description}</div>
        <div id ="Date">${new Date(task.DueDate).toLocaleDateString('en-GB')}</div>
        </div>
        <button class = "Deletebtn"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="22" height="22" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 7l16 0" />
        <path d="M10 11l0 6" />
        <path d="M14 11l0 6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      </svg></button>
      <button class = "EditBtn"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="22" height="22" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
      <path d="M16 5l3 3" />
    </svg></button>
    <button class = "DoneBtn"></button></div>
        `;
       }
    });
    TasksBtns(TaskList);
}
function displayDoneTasks(task:Task){
    return `
        <div class="Task">
        <div id ="TaskDone">
        <div id ="TaskTitle">${task.TaskTitle}</div>
        <div class = "desAndDate">
        <div id = "Description">${task.Description}</div>
        <div id ="Date">${new Date(task.DueDate).toLocaleDateString('en-GB')}</div>
        </div>
        <button class = "Deletebtn"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="22" height="22" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 7l16 0" />
        <path d="M10 11l0 6" />
        <path d="M14 11l0 6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      </svg></button>
      <button class = "EditBtn"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="22" height="22" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
      <path d="M16 5l3 3" />
    </svg></button>
    <button class = "DoneBtn"></button></div>
    </div>
    </div>
        `;
}
//to change which one is bold between home today and this week so that the user knows which one they are on
function ChangeToBold(){
    let elements = document.querySelectorAll('#Home, #Today, #ThisWeek');

elements.forEach(element => {
  element.addEventListener('click', () => {
    elements.forEach(el => el.classList.remove('BoldSelected'));
         element.classList.add('BoldSelected');
  });
});
};
function displayProjects(ProjectList:Project[]){
    const ProjectContainer:HTMLDivElement = document.querySelector(".myProjects") as HTMLDivElement;
    ProjectContainer.innerHTML = "";
    for(let index = 1; index<ProjectList.length; index++) {
        ProjectContainer.innerHTML += `
        <div class = "Project">
        <div class = "ProjectTitle">${ProjectList[index].ProjectName}
        </div>
        <button class = "DeleteProject"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="22" height="22" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 7l16 0" />
        <path d="M10 11l0 6" />
        <path d="M14 11l0 6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg></button>
        </div>
        `;
    }
    addProjectBtns();
}


export {displayTasks, ChangeToBold, displayProjects};