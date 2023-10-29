import './styles/style.css'
import { dragEnter, dragLeave, dragstartHandler, dropHandler, dragoverHandler } from './drag&drop'
import { $$, $ } from './utils'

const $$cards = $$('.card')
const $$cardLists = $$('.card-list')
const $$cardForms = $$('.card-form')
const $$cancelButtons = $$('.cancel')
const $$addButtons = $$('.add-button')

function formSubmited (e) {
  e.preventDefault()
  const { value } = e.target[0]
  const cardList = e.target.previousElementSibling
  const card = document.createElement('div')
  card.id = `c-${crypto.randomUUID()}`
  card.innerText = value
  card.classList.add('card')
  cardList.appendChild(card)
}

function closeCardForm (e) {
  e.preventDefault()
  const cardForm = e.currentTarget.closest('.card-form')
  cardForm.children[0].value = ''
  cardForm.style.display = 'none'
  cardForm.nextElementSibling.style.display = 'flex'
}

function openCardForm (e) {
  e.preventDefault()
  const cardForm = e.target.previousElementSibling
  const textArea = cardForm.children[0]
  cardForm.style.display = 'flex'
  textArea.focus()
  e.target.style.display = 'none'
}

$$addButtons.forEach($$addButton =>
  $$addButton.addEventListener('click', openCardForm)
)

$$cardForms.forEach($cardForm =>
  $cardForm.addEventListener('submit', formSubmited)
)

$$cancelButtons.forEach($cancelButton =>
  $cancelButton.addEventListener('click', closeCardForm)
)

$$cardLists.forEach($cardList => {
  $cardList.addEventListener('drop', (e) => dropHandler(e, $cardList))
  $cardList.addEventListener('dragover', (e) => dragoverHandler(e, $cardList))
  $cardList.addEventListener('dragenter', (e) => dragEnter(e, $cardList))
  $cardList.addEventListener('dragleave', (e) => dragLeave(e, $cardList))
})

$$cards?.forEach(($card, i) => {
  $card.id = `c-${crypto.randomUUID()}`
  $card.addEventListener('dragstart', dragstartHandler)
})
