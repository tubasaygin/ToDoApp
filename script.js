const form = document.querySelector('#addTaskForm');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#taskList');
let items;

//load items:
loadItems();

eventListeners();

//butonlara basıldığında:
function eventListeners(){
    //ekleme:
    form.addEventListener('submit',addNewItem);

    //silme: 
    taskList.addEventListener('click', deleteItem);

    //bütün görevleri silme: 
    btnDeleteAll.addEventListener('click',deleteAllItems);
}

function loadItems(){
    items = getItemsFromLocalStorage();
    items.forEach(function(item){
        createItem(item);
    });
}

//Local storage'dan veri çekme:
function getItemsFromLocalStorage(){
    if(localStorage.getItem('items')===null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

//local storage'a veri eklleme:
function setItemLocalStorage(text){
    items = getItemsFromLocalStorage();
    items.push(text);
    localStorage.setItem('items' , JSON.stringify(items));

}

function deleteItemFromLocalStorage(text) {
    items = getItemsFromLocalStorage();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index, 1);
        }
       
    });
    localStorage.setItem('items',JSON.stringify(items));
}

function createItem(text){
    const li = document.createElement('li');
    li.className = 'list-group-item task-list';
    li.appendChild(document.createTextNode(text));
    const a = document.createElement('a');
    a.classList ='delete-item float-right'
    a.setAttribute('href', '#');
    a.innerHTML = '<i class = "fas fa-times"></i>';

    li.appendChild(a);

    taskList.appendChild(li);

}

//yeni görev ekleme:
function addNewItem(e){
    if(input.value === ''){
        alert('Empty!')
    }

    createItem(input.value);
    
    //local storage:
    setItemLocalStorage(input.value);

    //clear input:
    input.value = ''; //Ekledikten sonra yazdıklarımız input alanından silinsin.

    //console.log(li);
    e.preventDefault(); //Sayfa yenilenmesin. 
}

//görev silme:
function deleteItem(event){
    //console.log(event.target)
    if(event.target.className === 'fas fa-times'){
        // Silmemiz gereken --> li elemanı 
        event.target.parentElement.parentElement.remove();

         //local storage'dan silme:
         deleteItemFromLocalStorage(event.target.parentElement.parentElement.textContent);

    }


    event.preventDefault();
}

//bütün görevleri silme:
function deleteAllItems(e){

    if(confirm('Are you sure?')){
        taskList.childNodes.forEach(function(item){
            if(item.nodeType === 1){ //Sadece elementleri getirir.
                item.remove();
            }
        });
        localStorage.clear();
    }


    e.preventDefault();
}