import { dragstartHandler } from './drag&drop'
import { $$ } from './utils'

export function formSubmited (e) {
  e.preventDefault()
  const { value } = e.target[0]
  if (!value) {
    closeCardForm(e)
    return
  }
  const cardList = e.target.previousElementSibling
  const card = document.createElement('li')
  card.setAttribute('draggable', 'true')
  card.id = `c-${crypto.randomUUID()}`
  card.innerText = value
  card.classList.add('card')
  card.addEventListener('dragstart', dragstartHandler)
  cardList.appendChild(card)
}

export function closeCardForm (e) {
  e.preventDefault()
  console.log(e.currentTarget, e.target)
  const cardForm = e.currentTarget.closest('.card-form')
  cardForm.children[0].value = ''
  cardForm.style.display = 'none'
  cardForm.nextElementSibling.style.display = 'flex'
}

export function openCardForm (e) {
  e.preventDefault()
  const cardForm = e.currentTarget.previousElementSibling
  const textArea = cardForm.children[0]
  cardForm.style.display = 'flex'
  textArea.focus()
  e.currentTarget.style.display = 'none'
}

const $$cardForms = $$('.card-form')
const $$cancelButtons = $$('.cancel-card')
const $$addButtons = $$('.add-button')

$$addButtons.forEach($$addButton =>
  $$addButton.addEventListener('click', openCardForm)
)

$$cardForms.forEach($cardForm => {
  $cardForm.addEventListener('submit', formSubmited)
})

$$cancelButtons.forEach($cancelButton =>
  $cancelButton.addEventListener('click', closeCardForm)
)
