// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');

const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener("submit", addItem);

// clear items
clearBtn.addEventListener('click', clearItems);

// load items
window.addEventListener('DOMContentLoaded', setupItems);


// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    const value = grocery.value;

    const id = new Date().getTime().toString();
    if(value && !editFlag){
        creatListItem(id, value);
        // display alert
        displayAlert('item added to the list!', 'success');
        
        // show container
        container.classList.add("show-container");

        // add to local storage
        addToLocalStorage(id, value);
        setBackToDefault();
    }
    else if(value && editFlag){
        editElement.innerHTML = value;
        displayAlert('value modified successfully!','success');
        // edit local storage
        setBackToDefault();
    }
    else{
        displayAlert('please enter a value!','danger');
    }
}
// Display Alert
function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    // remove alert
    setTimeout(function(){
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000)
}
// Clear Items
function clearItems(){
    const items = document.querySelectorAll('.grocery-item');

    if(items.length > 0){
        items.forEach(function(item){
            list.removeChild(item);
        });
    }
    container.classList.remove('show-container');
    displayAlert('empty list', 'danger');
    setBackToDefault();
    localStorage.removeItem('list');
}
// Delete Function
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id  = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0){
        container.classList.remove('show-container');
    }
    displayAlert('item removed', 'danger');
    setBackToDefault();
    // Remove from local storage
    removeFromLocalStorage(id);
}

// Edit Function
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    //  set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = 'edit';
}

// ****** SET BACK TO DEFAULT ******
function setBackToDefault(){
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
    const grocery = {id, value};
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));
}
function removeFromLocalStorage(id){
    let items = getLocalStorage();

    items = items.filter(function(itm){
        if(itm.id !== id){
            return itm;
        }
    });
    localStorage.setItem('list', JSON.stringify(items));
}
function editLocalStorage(id, value){
    let items = getLocalStorage();
    items = items.map(function(itm){
        if(itm.id === id){
            itm.value = value;
        }
        return itm;
    });
    localStorage.setItem('list', JSON.stringify(items));
}
function getLocalStorage(){
    return localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')):[];
}
// local Storage API
// set Item
// get Item
// remove Item
// save as string

// ****** SETUP ITEMS **********
function setupItems(){
    let items = getLocalStorage();
    if(items.length > 0){
        items.forEach(function(itm){
            creatListItem(itm.id, itm.value);
        })
        container.classList.add('show-container');
    }
}

function creatListItem(id, value){
    const element = document.createElement('article');
    // add class
    element.classList.add('grocery-item');
    // add id
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="tilte">${value}</p>
    <div class="btn-container">
        <button class="edit-btn" type="button">
        <i class="fas fa-edit"></i>
        </button>
        <button class="delete-btn" type="button">
        <i class="fas fa-trash"></i>
        </button>
        </div>`;
    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');

    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);

    // append child
    list.appendChild(element);
}