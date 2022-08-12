const URL_API = "https://todolist-api-project.herokuapp.com//api/v1/todos"
//truy cap cac thanh phan
const todoListEl = document.querySelector(".todo-list");
const todoInput = document.getElementById("todo-input");
const inputVal = todoInput.firstElementChild;

const btnAdd = document.getElementById("btn-add");
const btnUpdate = document.getElementById("btn-update");

const clickAll = document.getElementById("all");
const clickUnactive = document.getElementById("unactive");
const clickActive = document.getElementById("active");
const todoOp = document.querySelector(".todo-option")

//luu lai cong viec
let todos = [];



//danh sach API ===
//1. lay danh sach tat ca cv
const getTodoAPI = () => {
    return axios.get(URL_API); // tra ve promise
}
const getTodoByStatusAPI = (status) => {
    return axios.get(`${URL_API}?status=${status}`);
}
//2. xoa cong viec
const deleteTodoAPI = (id) => {
    return axios.delete(`${URL_API}?id=${id}`); // tra ve promise
}
// 3. them cong viec moi
const postTodoAPI = () => {
    return axios.post(URL_API,{
        "name" : todoInput.value,
    })
}

// 4. thay doi 
const putTodoAPI = (id,name,status) =>{
    return axios.put(`${URL_API}?id=${id}`,{
        "name" : name,
        "status": status,
    })
}

//ham xu ly 
//1. lay danh sach tat ca cong viec 
const getTodo = async () => {
    try {
        let res = await getTodoAPI();
        console.log(res)

        todos = res.data // luu lai
        renderTodo(todos)  // res.data = array
    } catch (error) {
        console.log(error);
    }
}
//2. xoa cv
const deleteTodo = async (id) => {
    try {
        let isComfirm = confirm("Ban co muon xoa khong?");
        if(isComfirm){
            await deleteTodoAPI(id); // xoa tren server

            //xoa tren mang ban dau (splice, filter)
            todos = todos.filter(t => t.id != id);

            renderTodo(todos);
        }
    } catch (error) {
        console.log(error);
    }
}
//3. them cong viec
const postTodo = async() =>{
    try {
        await postTodoAPI();
        
        getTodo();
    } catch (error) {   
        console.log(error);
    }
}


btnAdd.addEventListener("click", async () => {
    try {
        let todo = await createTodoAPI();
        inputVal.value = "";
        let arr = todoOp.getElementsByClassName('todo-option-item');
        for(let i = 0; i < arr.length; i++){
            let val = arr[i].firstElementChild;
            console.log(val);
            if(val.checked){
                checkRender(val);
                break;
            }
        }
    } catch (error) {
        console.log(error);
    }
})


//4.thay doi trang thai
const statusTodo = async (id) => {
    try {
        let nameChange ;
        let statusChange;
        todos.forEach(t =>{
            if(t.id == id){
                if(t.status == false){
                    t.status = true;
                    
                }else{
                    t.status = false;
                }   
                nameChange =t.name;
                statusChange = t.status;
            }
        })
        putTodoAPI(id, nameChange, statusChange);
        renderTodo(todos);
        
    } catch (error) {
        console.log(error);
    }
}

//5. chinh sua title 
const updateTodo = async (id) => {
    try {
        let nameUp;
        let statusUp;
        todos.forEach(t =>{
            if(t.id == id){
                todoInput.value = t.name;
            }
        })
        btnAdd.style.display = 'none';
        btnUpdate.style.display = 'inline-block';

        btnUpdate.addEventListener("click", ()=>{
            todos.forEach(t =>{
                if(t.id == id){
                   t.name = todoInput.value;
                   nameUp = todoInput.value
                }
            })
            putTodoAPI(id, nameUp, statusUp);
            renderTodo(todos)
            btnAdd.style.display = 'inline-block';
            btnUpdate.style.display = 'none';
            todoInput.value="";
        })
    } catch (error) {
        console.log(error)
    }
}


//hien thi ds todo ra ngoai giao dien
const renderTodo = arr => {
    todoListEl.innerHTML = "";

    if (arr.length == 0) {
        todoListEl.innerHTML = "khong co cong viec nao trong danh sach"
        return;
    }
    let html = "";
    arr.forEach(t => {
        html += `
            <div class="todo-item ${t.status ? "active-todo" : ""}">
                <div class="todo-item-title">
                    <input type="checkbox" ${t.status ? "checked" : ""}  onchange="statusTodo(${t.id})">
                    <p>${t.name}</p>
                </div>
                <div class="option">
                    <button class="btn btn-update" onclick="updateTodo(${t.id})">
                        <img src="./img/pencil.svg" alt="icon" />
                    </button>
                    <button class="btn btn-delete" onclick="deleteTodo(${t.id})">
                        <img src="./img/remove.svg" alt="icon" />
                    </button>
                </div>
            </div>
        `
    });

    todoListEl.innerHTML=html;
}
getTodo();

//hien thi danh sach hoan thanh
clickAll.addEventListener("click", ()=>{
    const arr = todos;
    renderTodo(arr);
})
clickActive.addEventListener("click", ()=>{
    const arr = todos.filter(t => t.status != false);
    renderTodo(arr);
})
clickUnactive.addEventListener("click", ()=>{
    const arr1 = todos.filter(t => t.status == false);
    renderTodo(arr1);
})