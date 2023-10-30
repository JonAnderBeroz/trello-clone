import { closeCardForm, formSubmited, openCardForm } from './cardForm'
import { $, addIcon, cancelIcon } from './utils'
import { dragEnter, dragLeave, dropHandler, dragoverHandler } from './drag&drop'

const $container = $('.card-list-adder')
const $addButton = $('.add-list-button')
const $cancelButton = $('.cancel-list')
const $listForm = $('.list-form')

function openForm (e) {
  e.preventDefault()
  const sibling = e.currentTarget.previousElementSibling
  sibling.style.display = 'flex'
  const textArea = sibling.children[0].children[0]
  textArea.focus()
  textArea.value = ''
  e.currentTarget.style.display = 'none'
}

function closeForm (e) {
  const formContainer = e.currentTarget.closest('.card-list-adder')
  const addButton = formContainer.nextElementSibling
  formContainer.style.display = 'none'
  addButton.style.display = 'flex'
}

function createAddForm () {
  const addForm = document.createElement('form')
  addForm.classList.add('card-form')

  const textarea = document.createElement('textarea')
  textarea.classList.add('card')
  textarea.name = 'cardContent'
  textarea.setAttribute('placeholder', 'Introduzca un título para esta tarjeta...')

  const formInnerContainer = document.createElement('section')
  formInnerContainer.classList.add('form-controls')

  const addButton = document.createElement('button')
  addButton.classList.add('add')
  addButton.setAttribute('type', 'submit')
  addButton.innerText = 'Añadir tarjeta'
  formInnerContainer.appendChild(addButton)

  const cancelButton = document.createElement('button')
  cancelButton.classList.add('cancel')
  cancelButton.classList.add('cancel-card')
  cancelButton.setAttribute('type', 'button')
  cancelButton.appendChild(cancelIcon())
  cancelButton.addEventListener('click', closeCardForm)

  formInnerContainer.appendChild(cancelButton)
  addForm.appendChild(textarea)
  addForm.appendChild(formInnerContainer)

  addForm.addEventListener('submit', formSubmited)
  return addForm
}

function createAddButton () {
  const addButton = document.createElement('button')
  addButton.setAttribute('type', 'button')
  addButton.classList.add('add-button')
  addButton.innerText = 'Añada una tarjeta'
  addButton.addEventListener('click', openCardForm)
  const iconContainer = document.createElement('span')

  iconContainer.appendChild(addIcon())
  addButton.prepend(iconContainer)
  return addButton
}

function addList (e) {
  e.preventDefault()
  const { value } = e.target[0]
  const list = document.createElement('section')
  list.classList.add('card-list-wrapper')

  const title = document.createElement('h2')
  title.classList.add('title')
  title.innerText = value

  const innerContainer = document.createElement('article')
  innerContainer.style.display = 'flex'
  innerContainer.style.flexDirection = 'column'
  innerContainer.style.gap = '10px'

  const cardList = document.createElement('ul')
  cardList.classList.add('card-list')

  const addForm = createAddForm()
  const addButton = createAddButton()

  innerContainer.appendChild(cardList)
  innerContainer.appendChild(addForm)
  innerContainer.appendChild(addButton)

  list.appendChild(title)
  list.appendChild(innerContainer)
  list.addEventListener('drop', (e) => dropHandler(e, list))
  list.addEventListener('dragover', (e) => dragoverHandler(e, list))
  list.addEventListener('dragenter', (e) => dragEnter(e, list))
  list.addEventListener('dragleave', (e) => dragLeave(e, list))

  e.target.parentElement.insertAdjacentElement('beforebegin', list)
  e.target[0].focus()
  e.target[0].value = ''
}

$addButton.addEventListener('click', openForm)
$cancelButton.addEventListener('click', closeForm)
$listForm.addEventListener('submit', addList)
