const nowdate = new Date();
const daysArr = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const MonthsArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const getMonth = nowdate.getMonth();
const getDay = nowdate.getDay();
const getDate = nowdate.getDate();
const dayContent = document.getElementById('date');

const addTxt = document.querySelector("#addItem input");
const addBtn = document.querySelector("#add i");
const deldoneBtn = document.getElementById('deldoneBtn');
const todoList = document.querySelector("#todoList ul");



dayContent.innerHTML += `
    <p class="day">
        <span class="Month">${MonthsArr[getMonth]}</span>
        <span class="date">${getDate}</span>
    </p>
    <p class="month">${daysArr[getDay]}</p>
`;

addBtn.addEventListener('click',function(){addItem();})

todoList.addEventListener('click',function(e){
    let item = e.target;
    
    if(item.classList.contains('delete')){delItem(item);return}
    if(item.classList.contains('edit')){editItem(item);return}
    if(item.checked){
        item.parentElement.parentElement.className = 'item done';
    }else{
        item.parentElement.parentElement.className = 'item';
    }
})

deldoneBtn.addEventListener('click',function(){delDoneItem();})

function addItem(){
    let getValue = addTxt.value;
    if(getValue.trim() == ""){return false}
    let addcontent = `
            <div class="txt">
                <input type="checkbox">
                <p>${getValue}</p>
            </div>
            <div class="btn">
                <i class="fas fa-edit edit"></i>
                <i class="fas fa-trash-alt delete"></i>
            </div>
    `
    let li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = addcontent;
    todoList.prepend(li);
    addTxt.value = '';
}

function delItem(item){
    let li = item.parentElement.parentElement;
    todoList.removeChild(li);
}

function editItem(item){
    let editContent = document.querySelector("#editContent");
    let editInput = document.querySelector('#editContent input');
    let li = item.parentElement.parentElement;
    let itemtxt = li.getElementsByTagName('p')[0];

    editInput.value = '';
    editContent.className = 'open';
    UpdateEdit(itemtxt); 
}

function doneItem(item){
    let li = item.parentElement.parentElement;
    li.className = 'done';
}

function delDoneItem(){
    let result = [];
    let list = todoList.children;
    for(let i = 0 ; i < list.length;i++){
        if(list[i].className !== 'item done'){
            result.push(list[i]);
        }
    }
    todoList.innerHTML = '';
    result.forEach(function(item){
        todoList.append(item);
    })
}

function UpdateEdit(txt){
    let saveBtn = document.querySelector('#editContent #save');

    saveBtn.addEventListener('click',function(){
        let editInput = document.querySelector('#editContent input');
        txt.innerText = editInput.value;
        txt = '';
        editContent.className = '';
        
    })
    
}
