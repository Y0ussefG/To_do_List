
document.addEventListener('DOMContentLoaded', () => { // for doing erverthing as the dom starts

const task_to_do = document.getElementById("task") 
const task_list = document.getElementById("to-do-list")
const add_button = document.getElementById("add-btn")

let tasks =  JSON.parse(localStorage.getItem("tasks")) || []
tasks.forEach(task =>render_tasks(task)) 

add_button.addEventListener("click",()=>{

    let input = task_to_do.value.trim()
    if(input === ""){
        return
    }else{

        let new_task = {
            id : Date.now(),
            text : input
            ,done : false
        }
        tasks.push(new_task)
        render_tasks(new_task)
        save_to_local_storage()
        task_to_do.value = ""
        console.log(tasks)
    }
})

function save_to_local_storage(){
    localStorage.setItem("tasks",JSON.stringify(tasks))
}

function render_tasks(task) {
    let li = document.createElement("li")
    li.setAttribute("id", task.id)

    

    li.innerHTML = `
    <span id = "${task.id}-span">${task.text}</span>
    <button class = "delete-btn">delete</button>
    `
    li.addEventListener("click",(e)=>{
        if(e.target.nameTag === "BUTTON") return
            task.done = !task.done
            let span = document.getElementById(`${task.id}-span`)
            span.classList.toggle("line-through")
            save_to_local_storage()

    })

    li.querySelector(".delete-btn").addEventListener("click",(e)=>{
        e.stopPropagation() // to stop the event from bubbling up to the li click event
        tasks = tasks.filter(t => t.id !== task.id)
        li.remove()
        save_to_local_storage()
    })




    task_list.appendChild(li)


}




})

