import { $ } from './dom'

function findValidChild ({ element, y }) {
  const children = element.children
  let validChild, computedHeight
  for (const child of children) {
    if (child.offsetHeight === 0) continue
    computedHeight = child.offsetHeight + child.offsetTop
    if (computedHeight > y) {
      validChild = child
      break
    }
  };
  return validChild
}

function findAndInsertSibling ({ cardList, element, y }) {
  const child = findValidChild({ element: cardList, y })
  if (!child) {
    cardList.appendChild(element)
    return
  }
  child.insertAdjacentElement('beforebegin', element)
}

export function insertCardNode ({ y, currentTarget, target, element }) {
  const $ghost = $('.ghost-card')
  if ($ghost) {
    $ghost.remove()
  }
  let id = ''
  if (target.className !== 'card-list-wrapper') {
    id = target.closest('.card-list-wrapper').id
  } else {
    id = target.id
  }
  console.log(id)
  const cardList = $(`#${id} .card-list`)
  findAndInsertSibling({ cardList, element, y })
}
