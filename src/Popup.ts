import {ProjectList, Task, Project, sortTask,blurBackground} from "./index";
import {displayTasks, displayProjects} from "./display";
function PopupTask(project: Project, task?: Task){
    

 
  let popUpContainer = document.createElement("div");
  let RemovePopUp = document.createElement("button");
  RemovePopUp.classList.toggle("RemovePopUp");
  let xIcon = document.createElement("i");
  xIcon.classList.toggle("fa-times");
  xIcon.classList.toggle("fa");
  let popUp = document.createElement("form");

  let App: HTMLElement = document.querySelector("#App") as HTMLElement;
  blurBackground(App); 
  let TasktitleLabel = document.createElement("label");
  TasktitleLabel.textContent = "TaskTitle";
  let Tasktitle = document.createElement("input");
  Tasktitle.ariaPlaceholder = "TaskTitle";
  let TitleIncorrect = document.createElement("div");
  TitleIncorrect.innerHTML ="";
  
  

  let descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Description";
  let description = document.createElement("input");
  description.ariaPlaceholder = "Description";

  let dateLabel = document.createElement("label");
  dateLabel.textContent = "Date";
  let date = document.createElement("input");
  date.ariaPlaceholder = "Date";
  let DateIncorrect = document.createElement("div");


  let priorityLabel = document.createElement("label");
  priorityLabel.setAttribute("id", "PriorityLabel");
  let priority: HTMLInputElement = document.createElement("input") as HTMLInputElement;
  priorityLabel.textContent = "Priority";

  let High: HTMLInputElement = document.createElement("div") as HTMLInputElement;
  High.textContent = "High";
  High.classList.toggle("High");
  High.classList.toggle("radio");
  High.setAttribute("value", "High");

  let Medium: HTMLInputElement = document.createElement("div") as HTMLInputElement;
  Medium.textContent = "Medium";
  Medium.classList.toggle("Medium");
  Medium.classList.toggle("radio");
  Medium.setAttribute("value", "Medium");

  let Low: HTMLInputElement = document.createElement("div") as HTMLInputElement;
  Low.textContent = "Low";
  Low.classList.toggle("Low");
  Low.classList.toggle("radio");
  Low.setAttribute("value", "Low");
  
  let priorityValue = "Low";
  date.setAttribute("type", "date");
  date.setAttribute("id", "dateInput"); 

  //if the task is new this creates a new everything if its not it reads old task and 
  //present it on the screen
  if (task === undefined) {
    Tasktitle.setAttribute("type", "text");
    description.setAttribute("type", "text");
    priority.setAttribute("type", "radio");
    priority.setAttribute("id", "Priority");
    Low.checked = true;

  } else {
    Tasktitle.value =  task.TaskTitle;
    description.value = task.Description;
    date.value = task.DueDate.toISOString().split('T')[0];
    priorityValue = task.PriorityValue;
  }
  
  let submit = document.createElement("button");
  submit.textContent = "Submit";
  submit.setAttribute("type", "button");
  submit.setAttribute("id", "Submitbtn");

  document.body.appendChild(popUpContainer);
  popUpContainer.classList.toggle("popUpContainer");
  popUpContainer.append(RemovePopUp, popUp);
  RemovePopUp.appendChild(xIcon);

  popUp.append(
    TasktitleLabel,
    descriptionLabel,
    dateLabel,
    priorityLabel,
    submit
  );
  TasktitleLabel.append(Tasktitle, TitleIncorrect);
  descriptionLabel.appendChild(description);
  dateLabel.append(date, DateIncorrect);
  priorityLabel.append(Low, Medium, High);

popUp.addEventListener("click", (e) => {
    e.preventDefault();
});
if (priorityValue === "High") {
    High.checked = true;
} else if (priorityValue === "Medium") {
    Medium.checked = true;
} else {
    Low.checked = true;  
}
changeColor();
//if the task is new Low is the default if we are editing an old task then the old task priority 
//is the default after that each eventlistener below is responsible to take the new priority

Low.addEventListener("click", (e) => {
    Low.checked = true;
    Medium.checked = false;
    High.checked = false;
    priority.checked = Low.checked;
    priorityValue = "Low";
    changeColor();
});
  Medium.addEventListener("click", (e) => {    
    Medium.checked = true;
    Low.checked = false;
    High.checked = false;
    priority.checked = Medium.checked;
    priorityValue = "Medium";
    changeColor();

  });
  High.addEventListener("click", (e) => {
    High.checked = true;
    Low.checked = false;
    Medium.checked = false;
    priority.checked = High.checked;
    priorityValue = "High";
    changeColor();
  });
  submit.addEventListener("click", (e) => {
    if (Tasktitle.value == ""){ 
        TasktitleLabel.classList.add("error");
        TitleIncorrect.innerHTML="Please enter a Title for the task"
        DateIncorrect.innerHTML=""

    }
    else if (date.value == ""){
        dateLabel.classList.add("error");
        DateIncorrect.innerHTML ="Please provide a due time for the task"
        TitleIncorrect.innerHTML=""
    }
    else{
      TitleIncorrect.innerHTML="";
      DateIncorrect.innerHTML="";

       
      if (task !== undefined) {
        project.RemoveTask(task);
      }

      let taskdate = new Date(date.value);
      let newTask = new Task(
        Tasktitle.value,
        description.value,
        taskdate,
        priority,
        priorityValue,
        false,
      );
      popUpContainer.remove();
     
      project.AddTask(newTask);
      sortTask(project);
      localStorage.setItem('ProjectList', JSON.stringify(ProjectList));
      displayTasks(project.TaskList);
      blurBackground(App);
    }
  });

  RemovePopUp.addEventListener("click", (e) => {
    popUpContainer.classList.toggle("popUpContainer-close");
    blurBackground(App);

    //to make the animation go smoothly 
    setTimeout(() => {
      popUpContainer.remove();

    }, 200);
  }); 
  date.addEventListener("click", function() {
    console.log(date.type);

    date.focus();
  });
}
//changes the color of the selected priority
function changeColor() {
    let radios = document.querySelectorAll(".radio");
    for (let i = 0; i < radios.length; i++) {
      if ((radios[i] as HTMLInputElement).checked) {
        radios[i].classList.add("selected");
      } else {
        radios[i].classList.remove("selected");
      }
    }
  }


  function PopUpProject(){
    let popUpContainer = document.createElement("div");
    let RemovePopUp = document.createElement("button");
    RemovePopUp.classList.toggle("RemovePopUp");
    let xIcon = document.createElement("i");
    xIcon.classList.toggle("fa-times");
    xIcon.classList.toggle("fa");
    let popUp = document.createElement("form");
  
    let App: HTMLElement = document.querySelector("#App") as HTMLElement;
    blurBackground(App); 
    let ProjecttitleLabel = document.createElement("label");
    ProjecttitleLabel.textContent = "ProjectTitle";
    let Projecttitle = document.createElement("input");
    Projecttitle.ariaPlaceholder = "ProjectTitle";
    
    let submit = document.createElement("button");
    submit.textContent = "Submit";
    submit.setAttribute("type", "button");
    submit.setAttribute("id", "Submitbtn")
  
    document.body.appendChild(popUpContainer);
    popUpContainer.classList.toggle("popUpContainer");
    popUpContainer.append(RemovePopUp, popUp);
    RemovePopUp.appendChild(xIcon);
  
    popUp.append(
      ProjecttitleLabel,
      submit
    );
    ProjecttitleLabel.appendChild(Projecttitle);
    submit.addEventListener("click", (e) => {
        if (Projecttitle.value !== "") {
             
            let newProject = new Project(
            Projecttitle.value,[]
            );
            popUpContainer.remove();
         
            ProjectList.push(newProject);
            localStorage.setItem('ProjectList', JSON.stringify(ProjectList));
            blurBackground(App);
            displayProjects(ProjectList);
            displayTasks(newProject.TaskList);
        }
        });
    RemovePopUp.addEventListener("click", (e) => {
        popUpContainer.classList.toggle("popUpContainer-close");
        blurBackground(App);
    
        setTimeout(() => {
          popUpContainer.remove();
    
        }, 200);
      });
    
  }
export { PopupTask , changeColor, PopUpProject};