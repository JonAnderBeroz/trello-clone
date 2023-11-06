import { $ } from './utils'

const $overlay = $('.overlay')
const $close = $('.close-modal')
const $parent = $('.parent-element')
const $cardTitle = $('.card-title')

let prevCardTitle = ''
let card

export function openCardEditModal ({ e, selectedCard }) {
  e.preventDefault()
  card = selectedCard
  $overlay.style.display = 'flex'
  const { innerText } = selectedCard
  console.log(selectedCard)
  const parent = selectedCard.closest('.card-list-wrapper')
  const parentName = parent.firstElementChild.innerText
  $cardTitle.value = innerText
  prevCardTitle = innerText
  $cardTitle.style.height = $cardTitle.scrollHeight + 'px'
  $parent.innerText = `en la lista ${parentName ?? '-'}`
}

function closeCardEditModal (e) {
  e.preventDefault()
  $overlay.style.display = 'none'
}

function saveTitle (e) {
  e.preventDefault()
  if (!$cardTitle.value) {
    $cardTitle.value = prevCardTitle
    $cardTitle.style.height = $cardTitle.scrollHeight + 'px'
    return
  }
  card.innerText = $cardTitle.value
}

function checkHeight (e) {
  e.preventDefault()
  $cardTitle.style.height = '32px'
  $cardTitle.style.height = $cardTitle.scrollHeight + 'px'
}

$close.addEventListener('click', closeCardEditModal)
$cardTitle.addEventListener('focusout', saveTitle)
$cardTitle.addEventListener('input', checkHeight)
