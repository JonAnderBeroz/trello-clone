import './styles/style.css'
import { dragEnter, dragLeave, dragstartHandler, dropHandler, dragoverHandler } from './drag&drop'
import { $$ } from './utils'
import './listForm'
import './cardForm'

const $$cards = $$('.card')
const $$cardLists = $$('.card-list')

$$cardLists.forEach($cardList => {
  $cardList.addEventListener('drop', (e) => dropHandler(e, $cardList))
  $cardList.addEventListener('dragover', (e) => dragoverHandler(e, $cardList))
  $cardList.addEventListener('dragenter', (e) => dragEnter(e, $cardList))
  $cardList.addEventListener('dragleave', (e) => dragLeave(e, $cardList))
  // $cardList.addEventListener('focusout', closeCardForm)
})

$$cards?.forEach(($card, i) => {
  $card.id = `c-${crypto.randomUUID()}`
  $card.addEventListener('dragstart', dragstartHandler)
})
