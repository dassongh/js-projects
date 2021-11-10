const refs = {
  form: document.getElementById('form'),
  todosUl: document.querySelector('.todos'),
  radioBtns: document.querySelectorAll('.radio-btn'),
};

const todos = JSON.parse(localStorage.getItem('todos'));
if (todos) getTodos(todos);

refs.radioBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    const todos = refs.todosUl.childNodes;
    const liRef = e.target.parentElement;

    todos.forEach(todo => {
      switch (e.target.id) {
        case 'all':
          todo.style.display = 'list-item';

          liRef.classList.add('radio-checked');
          liRef.nextElementSibling.classList.remove('radio-checked');
          liRef.nextElementSibling.nextElementSibling.classList.remove('radio-checked');
          break;
        case 'finished':
          if (todo.classList.contains('checked')) {
            todo.style.display = 'list-item';
          } else {
            todo.style.display = 'none';
          }

          liRef.previousElementSibling.classList.remove('radio-checked');
          liRef.classList.add('radio-checked');
          liRef.nextElementSibling.classList.remove('radio-checked');
          break;
        case 'unfinished':
          if (!todo.classList.contains('checked')) {
            todo.style.display = 'list-item';
          } else {
            todo.style.display = 'none';
          }

          liRef.previousElementSibling.previousElementSibling.classList.remove('radio-checked');
          liRef.previousElementSibling.classList.remove('radio-checked');
          liRef.classList.add('radio-checked');
          break;
      }
    });
  });
});

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  let todo = e.currentTarget[0].value;
  
  if (!todo) return;

  renderTodo(todo);

  e.currentTarget.reset()
})

function renderTodo(data) {
  const todoEl = document.createElement('li');
  todoEl.classList.add('todo');
  todoEl.innerHTML = `<button class="btn-delete is-hidden">
                      <i class="far fa-minus-square">
                      </i>
                      </button>${data}`;
  
  const btn = todoEl.querySelector('.btn-delete');
  btn.addEventListener('click', () => {
    todoEl.classList.add('todo-out');
    todoEl.addEventListener('transitionend', () => {
      todoEl.remove();
      updateLS();
    });
  });

  toggleTodos(todoEl);

  refs.todosUl.prepend(todoEl);

  updateLS();
}

function toggleTodos(el) {
  el.addEventListener('click', () => {
    el.classList.toggle('checked');

    if (el.classList.contains('checked')) {
      el.dataset.finished = 'true';
    } else {
      el.dataset.finished = 'false';
    }

    el.children[0].classList.toggle('is-hidden');

    updateLS();
  });
}

function updateLS() {
  const todoRefs = document.querySelectorAll('.todo');

  const todos = [];

  todoRefs.forEach(todo => {
    todos.push({
      text: todo.innerText,
      finished: todo.classList.contains('checked'),
    });
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(todos) {
  todos.forEach(({ text, finished }) => {
    const todoEl = document.createElement('li');
    todoEl.classList.add('todo');
    todoEl.innerHTML = `<button class="btn-delete ${finished ? '' : 'is-hidden'}">
                        <i class="far fa-minus-square">
                        </i>
                        </button>${text}`;
    
    if (finished === true) todoEl.classList.add('checked');
    
    const btn = todoEl.querySelector('.btn-delete');
    btn.addEventListener('click', () => {
      todoEl.classList.add('todo-out');
      todoEl.addEventListener('transitionend', () => {
        todoEl.remove();
        updateLS();
      });
    });

    toggleTodos(todoEl);

    refs.todosUl.appendChild(todoEl);

    updateLS();
  });
}
