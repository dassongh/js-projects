const refs = {
  main: document.querySelector('.note-main'),
  textarea: document.querySelector('textarea'),
  editBtn: document.querySelector('[data-edit]'),
}

refs.editBtn.addEventListener('click', () => {
  refs.textarea.classList.toggle('is-hidden');
  refs.main.classList.toggle('is-hidden');

  // refs.main.textContent = marked(refs.textarea.value);
});

refs.textarea.addEventListener('input', (e) => {
  const { value } = e.currentTarget
  console.log(value)
  // refs.main.innerHTML = marked(value);
})

console.log(marked())