import "./style.scss";
import { PopupTask, PopUpProject} from "./Popup";
import { displayProjects, displayTasks } from "./display";
import { ChangeToBold } from "./display";

class Task{
    TaskTitle: string;
    Description: string;
    DueDate: Date;
    Priority: any;
    PriorityValue: string;
    Isdone: boolean;
    constructor(TaskTitle: string, Description: string, DueDate: Date, Priority:any, PriorityValue:string, Isdone: boolean){
        this.TaskTitle = TaskTitle;
        this.Description = Description;
        this.DueDate = DueDate;
        this.Priority = Priority;
        this.PriorityValue = PriorityValue;
        this.Isdone = Isdone;
    }
}
//localStorage.clear();
class Project{
    ProjectName: string;
    TaskList: Task[] = [];


   
    constructor(ProjectName: string, TaskList: Task[]){
        this.ProjectName = ProjectName;
        this.TaskList = TaskList;  
    }
    AddTask(Task: Task){
        this.TaskList.push(Task);
    }
    RemoveTask(Task: Task){
        this.TaskList.splice(this.TaskList.indexOf(Task), 1);
    }
}
function readFromCache(project:any): Project{
    let ProjectName = project.ProjectName;
    let TaskList: Task[] = [];
    project.TaskList.forEach((task: Task) => {
        let newTask = new Task(task.TaskTitle, task.Description, new Date(task.DueDate), task.Priority, task.PriorityValue, task.Isdone.toString() === "true");
        TaskList.push(newTask);
    });
    return new Project(ProjectName, TaskList);
    
    

}


let ProjectList: Project[] = [];
let CurrentProject: Project;


let projectListCache = localStorage.getItem("ProjectList");
if (projectListCache&& projectListCache !== "[]") {
    let ProjectListString: any[] = JSON.parse(projectListCache);
    ProjectListString.forEach((projectString: any) => {
       let project:Project = readFromCache(projectString);
       ProjectList.push(project);



    });
    CurrentProject = ProjectList[0];
    displayTasks(CurrentProject.TaskList);
    displayProjects(ProjectList);

}
    else {
        let HomeProject: Project = new Project("Home", []);
        ProjectList.push(HomeProject);
        CurrentProject = HomeProject;
    }




Home();
function Home(){
    const mainContainer: HTMLElement = document.getElementById("MainToDo") as HTMLElement;
    const home: HTMLElement = document.getElementById("Home") as HTMLElement;

    let Today = document.createElement("div");
    Today.setAttribute("id", "Today");
    Today.innerHTML = "Today";
    let thisWeek = document.createElement("div");
    thisWeek.setAttribute("id", "ThisWeek");
    thisWeek.innerHTML = "This Week";
    mainContainer.appendChild(Today);
    mainContainer.appendChild(thisWeek);
    let CurrentDate = new Date();
    ChangeToBold();
    home.classList.add('BoldSelected');


    home.addEventListener("click", function(){
       
        let TaskList: Task[] = [];
        ProjectList.forEach(element => {
            element.TaskList.forEach(task => {
                TaskList.push(task);
            });
        });
       displayTasks(TaskList);
       CurrentProject = ProjectList[0];
    });
    Today.addEventListener("click", function(){
        let TaskList: Task[] = [];
        ProjectList.forEach(element => {
            element.TaskList.forEach(task => {
                if(task.DueDate.getDate()      == CurrentDate.getDate()&&
                   task.DueDate.getMonth()     == CurrentDate.getMonth()&&
                   task.DueDate.getFullYear()  == CurrentDate.getFullYear())
                   {
                    TaskList.push(task);
                }
            });
        });
        CurrentProject = ProjectList[0];
        displayTasks(TaskList);
    });
    thisWeek.addEventListener("click", function(){
        let TaskList: Task[] = [];
        ProjectList.forEach(element => {
            element.TaskList.forEach(task => {
                if((task.DueDate.getDate()<= CurrentDate.getDate()+7 && task.DueDate.getDate() >= CurrentDate.getDate() )&&
                   task.DueDate.getMonth()     === CurrentDate.getMonth()&&
                   task.DueDate.getFullYear()  === CurrentDate.getFullYear())
                   {
                    TaskList.push(task);
                }
            });

        });
        CurrentProject = ProjectList[0];
        displayTasks(TaskList);
    });
}
window.onload = function(){

    let AddTaskBtn: HTMLButtonElement = document.getElementById("AddTask") as HTMLButtonElement;
    let AddProjectBtn: HTMLButtonElement = document.getElementById("AddProject") as HTMLButtonElement;
    AddTaskBtn.addEventListener("click", function(){
        //calling the popuptask function to add a task to the project chosen
        //(if none were chosen it will be saved in the home),
        // and giving the task parameters an undefined so to make the function know that this is adding
        // a new task not editing an old one
        PopupTask(CurrentProject, undefined);
    });
    AddProjectBtn.addEventListener("click", function(){
        PopUpProject();
        
    });
}
addSideBarToggle();
function addSideBarToggle(){
const sidebarToggle:HTMLElement = document.getElementById('sidebarToggle')as HTMLElement;
const sidebar: HTMLElement = document.getElementById('SideBar') as HTMLElement;

sidebarToggle.addEventListener('click', function() {
  if (sidebar.style.display === 'none') {
    sidebar.style.display = 'block';
  } else {

    sidebar.style.display = 'none';
  }
});
}
//adding a delete, edit, done buttons for each task
function TasksBtns(TaskList: Task[]){    
    TaskList.forEach((element: Task, index: number) => {
        let DeleteBtn: HTMLButtonElement = document.querySelectorAll(".Deletebtn")[index] as HTMLButtonElement;
        let EditBtn: HTMLButtonElement = document.querySelectorAll(".EditBtn")[index] as HTMLButtonElement;
        let DoneBtn: HTMLButtonElement = document.querySelectorAll(".DoneBtn")[index] as HTMLButtonElement;
        DeleteBtn.addEventListener("click", function(){
            TaskList.splice(index, 1);
            displayTasks(TaskList);
            localStorage.setItem('ProjectList', JSON.stringify(ProjectList));

        });
        EditBtn.addEventListener("click", function(){
            let task: Task = TaskList[index];
            PopupTask(CurrentProject, task);
        });
        DoneBtn.addEventListener("click", function(){
            TaskList[index].Isdone = !TaskList[index].Isdone;
            localStorage.setItem('ProjectList', JSON.stringify(ProjectList));
            displayTasks(TaskList);
        });
    });
}
//adding a delete button for each project
function addProjectBtns(){
    let ProjectBtns: NodeListOf<Element> = document.querySelectorAll(".DeleteProject");
    let Project = document.querySelectorAll(".ProjectTitle");
    ProjectBtns.forEach((element: Element, index: number) => {
        element.addEventListener("click", function(){
            ProjectList.splice(index+1, 1);
            displayProjects(ProjectList);
            localStorage.setItem('ProjectList', JSON.stringify(ProjectList));
            const home: HTMLElement = document.getElementById("Home") as HTMLElement;
            home.click();
        });

        Project[index].addEventListener("click", function(){
                CurrentProject = ProjectList[index+1];
                displayTasks(CurrentProject.TaskList);
            
        });

    });
}
//when popup is called this blurs the background behind it
function blurBackground(App: HTMLElement){
    App.classList.toggle("popUpContainer-open");
}
//sorting the task according to their priority
function sortTask(project: Project) {
    let taskList = project.TaskList;
    for (let i = 0; i < taskList.length; i++) {
      for (let j = 0; j < taskList.length; j++) {
        if (
          taskList[i].PriorityValue === "High" &&
          (taskList[j].PriorityValue === "Low" ||
            taskList[j].PriorityValue === "Medium")
        ) {
          let temp = taskList[j];
          taskList[j] = taskList[i];
          taskList[i] = temp;
        } else if (
          taskList[i].PriorityValue === "Medium" &&
          taskList[j].PriorityValue === "Low"
        ) {
          let temp = taskList[j];
          taskList[j] = taskList[i];
          taskList[i] = temp;
        }
      }
    }

    project.TaskList = taskList;
    
    }
   
  


export {TasksBtns, ProjectList, Task, Project, sortTask, blurBackground, addProjectBtns};

