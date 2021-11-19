const apikey = '3fc5d7e9-68c8-41cc-910b-295dfa8c0a15';
const apihost = 'https://todo-api.coderslab.pl';
// console.log(document.querySelector('main'));
/*
*   Fetch a list of all tasks
*   @return {json}    a json object with all tasks
 */
function apiListTask() {
    return fetch(apihost + '/api/tasks',
        {
            headers: { Authorization: apikey }
        }
        ).then(function(resp){
            if(!resp.ok) {
                alert('Wystąpił błąd zapytania!')
            }
            return resp.json();
        }
    );
}

/*
*   Fetch a list of operations by task ID
*   @param  {String}    taskId  An id of a task
*   @return {object}            returns a json object
 */
function apiListOperationsForTask(taskId) {
    return fetch(apihost + '/api/tasks/' + taskId + '/operations',
        {
            headers: { Authorization: apikey }
        }
        ).then(function(resp){
            if(!resp.ok) {
                alert('Wystąpił błąd zapytania!')
            }
            return resp.json();
        }
    );
}

/*
*   Function sends task title and description to API using POST method
*   @param {Strig}  title           operation title
*   @param {String} description     operations description
*   @return {json}                  returns json object
 */
function apiCreateTask(title, description) {
  return fetch(
    apihost + '/api/tasks',
    {
      headers: { Authorization: apikey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title, description: description, status: 'open' }),
      method: 'POST'
    }
  ).then(
    function(resp) {
      if(!resp.ok) {
        alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
      }
      return resp.json();
    }
  );
}

/*
*   Function renders task id, status, title, description
*   @param {String}     taskId      ID number of current task
*   @param {String}     status      Task status
*   @param {String}     title       Task title
*   @param {String}     description A description of a task
 */
function renderTasks(taskId, status, title, description) {

    const section = document.createElement('section');
    section.classList = 'card mt-5 shadow-sm';
    document.querySelector('main#app').appendChild(section);

    const mainDiv = document.createElement('div');
    mainDiv.classList = 'card-header d-flex justify-content-between align-items-center'
    section.appendChild(mainDiv);

    const titleDiv = document.createElement('div');
    mainDiv.appendChild(titleDiv);

    const h5 = document.createElement('h5');
    h5.innerText = title;

    const h6 = document.createElement('h6');
    h6.classList = 'card=subtitle text-muted';
    h6.innerText = description;

    titleDiv.appendChild(h5);
    titleDiv.appendChild(h6);

    const btnDiv = document.createElement('div');
    mainDiv.appendChild(btnDiv);

    if(status == 'open') {
        const finishBtn = document.createElement('button');
        finishBtn.classList = 'btn btn-dark btn-sm';
        finishBtn.innerText = 'Finish'
        btnDiv.appendChild(finishBtn);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.classList = 'btn btn-outline-danger btn-sm ml-2';
    deleteBtn.innerText = 'Delete'
    btnDiv.appendChild(deleteBtn);

    const ul = document.createElement('ul');
    ul.classList = 'list-group list-group-flush';
    section.appendChild(ul);

    apiListOperationsForTask(taskId).then(function (response) {
        response.data.forEach(function (operation) {
            renderOperations(ul, status, operation.timeSpent, operation.id, operation.description)
        });
    });

    const mainFormDiv = document.createElement('div')
    mainFormDiv.classList = 'card-body';
    section.appendChild(mainFormDiv)

    const form = document.createElement('form');
    mainFormDiv.appendChild(form);

    const formInputDiv = document.createElement('div');
    formInputDiv.classList = 'input-group';
    form.appendChild(formInputDiv);

    const operationInput = document.createElement('input');
    operationInput.classList = 'form-control';
    operationInput.minLength = '5';
    operationInput.placeholder = 'Operation description';
    operationInput.type = 'text';
    formInputDiv.appendChild(operationInput);

    const formBtnDiv = document.createElement('div');
    formBtnDiv.classList = 'input-group-append';
    formInputDiv.appendChild(formBtnDiv);

    const addBtn = document.createElement('button');
    addBtn.classList = 'btn btn-info';
    addBtn.innerText = 'Add';
    formBtnDiv.appendChild(addBtn);
}

function renderOperations(operationsList, status, timeSpent, opId, operationDescription){
    const li = document.createElement('li');
    li.classList = 'list-group-item d-flex justify-content-between align-items-center';
    operationsList.appendChild(li);
    
    const liDiv = document.createElement('div');
    liDiv.innerText = operationDescription;
    li.appendChild(liDiv);
    
    const timeSpan = document.createElement('span');
    timeSpan.classList = 'badge badge-success badge-pill ml-2'
    timeSpan.innerText = timeSpent + 'min';
    liDiv.appendChild(timeSpan);

    const operationBtnDiv = document.createElement('div');
    li.appendChild(operationBtnDiv);

    if(status == 'open') {
        const btn15Min = document.createElement('button');
        btn15Min.classList = 'btn btn-outline-success btn-sm mr-2';
        btn15Min.innerText = '+15min';
        operationBtnDiv.appendChild(btn15Min);

        const btn1H = document.createElement('button');
        btn1H.classList = 'btn btn-outline-success btn-sm mr-2';
        btn1H.innerText = '+1h';
        operationBtnDiv.appendChild(btn1H);

        const opDelBtn = document.createElement('button');
        opDelBtn.classList = 'btn btn-outline-danger btn-sm';
        opDelBtn.innerText = 'Delete';
        operationBtnDiv.appendChild(opDelBtn);
    }
}

document.addEventListener('DOMContentLoaded', function(){
    apiListTask().then(function(response){
        response.data.forEach(function(task) {
            renderTasks(task.id, task.status, task.title, task.description);
      });
   });
});

// TODO: set up adding tasks
// document.querySelector('form.js-task-adding-form').addEventListener('submit', function(event){
//     event.preventDefault();
//     const title = document.querySelector('input[name="title"]').value;
//     const description = document.querySelector('input[name="description"]').value;
//     apiCreateTask(title, description);
// });




