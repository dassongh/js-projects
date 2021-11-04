const addBtnRef = document.querySelector('.btn-add');
const notesData = JSON.parse(localStorage.getItem('notes'));

if (notesData) notesData.forEach(note => addNote(note));

addBtnRef.addEventListener('click', () => {
  addNote();
});

function setToLS() {
  const data = document.querySelectorAll('textarea');

  const notes = [];

  data.forEach(note => notes.push(note.value));

  localStorage.setItem('notes', JSON.stringify(notes));
}

function addNote(data = '') {
  const note = document.createElement('div');
  note.classList.add('note');

  const markup = `<div class="note-header">
                    <button class="btn" data-edit><i class="fas fa-edit"></i></button>
                    <button class="btn" data-delete><i class="fas fa-trash-alt"></i></button>
                  </div>
                  <div class="note-main ${data ? '' : 'is-hidden'}">
                  </div>
                  <textarea class="${data ? 'is-hidden' : ''}">${data}</textarea>`;
  note.insertAdjacentHTML('afterbegin', markup);

  const refs = {
    main: note.querySelector('.note-main'),
    textarea: note.querySelector('textarea'),
    editBtn: note.querySelector('[data-edit]'),
    deleteBtn: note.querySelector('[data-delete]'),
  };

  refs.main.textContent = refs.textarea.value;

  refs.editBtn.addEventListener('click', () => {
    refs.textarea.classList.toggle('is-hidden');
    refs.main.classList.toggle('is-hidden');

    refs.main.textContent = refs.textarea.value;
  });

  refs.deleteBtn.addEventListener('click', () => {
    note.remove();
    setToLS();
  });

  refs.textarea.addEventListener('input', setToLS);

  document.body.appendChild(note);
}