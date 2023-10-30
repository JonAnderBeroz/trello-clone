import { $$, $ } from './dom'

function findValidChild ({ element, y }) {
  const children = $$('div', element)
  let validChild, computedHeight
  for (const child of children) {
    computedHeight = child.offsetHeight + child.offsetTop
    if (computedHeight > y) {
      validChild = child
      break
    }
  };
  return validChild
}

function insertSibling ({ target, element, y }) {
  const computedHeight = target.offsetHeight + target.offsetTop
  const elementPosition = y - element.offsetHeight
  if (computedHeight / 2 > elementPosition) {
    target.insertAdjacentElement('beforebegin', element)
    return
  }
  target.insertAdjacentElement('afterend', element)
}

function findAndInsertSibling ({ target, currentTarget, element, y }) {
  const child = findValidChild({ element: target, y })
  if (!child) {
    currentTarget.appendChild(element)
    return
  }
  child.insertAdjacentElement('beforebegin', element)
}

export function insertCardNode ({ y, currentTarget, target, element }) {
  const ghost = $('.ghost-card')
  if (ghost) {
    ghost.remove()
  }
  if (target.className === 'card-list-wrapper') {
    const el = target.children[1].children[0]
    findAndInsertSibling({ target: el, currentTarget: el, element, y })
    return
  }
  if (target.className === 'card') {
    insertSibling({ target, element, y })
    return
  }
  if (target.className === 'card-list' || target.className === 'ghost-card') {
    findAndInsertSibling({ target, currentTarget, element, y })
    return
  }
  const parentNode = target.closest('div')
  insertSibling({ target: parentNode, element, y })
}
