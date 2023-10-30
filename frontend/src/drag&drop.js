import { $, insertCardNode } from './utils'

let ghostActive = true

function setDragImage (dataTransfer, target) {
  const crt = target.cloneNode(true)
  crt.style.transform = 'rotate(10deg)'
  crt.style.height = `${target.offsetHeight}px`
  crt.style.width = `${target.offsetWidth}px`
  crt.style.position = 'absolute'
  crt.style.top = '-10000px'
  document.body.appendChild(crt)
  dataTransfer.setDragImage(crt, 120, 120)
}

export function dragstartHandler (ev) {
  const { dataTransfer, target } = ev
  setDragImage(dataTransfer, target)
  dataTransfer.setData('text/plain', JSON.stringify({ id: target.id, height: target.offsetHeight }))
  dataTransfer.dropEffect = 'move'
}

function createGhost (target, height, y) {
  const ghostCard = document.createElement('div')
  ghostCard.height = height
  ghostCard.className = 'ghost-card'
  ghostCard.style = `--ghost-height:${height}px`
  insertCardNode({ y, currentTarget: target, target, element: ghostCard })
}

export function dragEnter (ev, el) {
  const { dataTransfer, target, screenY } = ev
  if (target.className === 'ghost-card') return
  const data = dataTransfer.getData('text/plain')
  const { height } = JSON.parse(data)
  console.log(el, height, screenY)

  ghostActive = true
  createGhost(el, height, screenY)
}

export function dragLeave (ev) {
  if (ev.target.className !== 'cardList' || ghostActive) return
  const ghost = $('.ghost-card')
  if (ghost) {
    ev.currentTarget.removeChild(ghost)
  }
}

export function dragoverHandler (ev) {
  ev.preventDefault()
  ev.dataTransfer.dropEffect = 'move'
}

export function dropHandler (ev) {
  ev.preventDefault()
  const ghost = $('.ghost-card')
  if (ghost) {
    ghost.remove()
  }
  const data = ev.dataTransfer.getData('text/plain')
  const { id } = JSON.parse(data)
  const { screenY, currentTarget, target } = ev
  const el = $(`#${id}`)
  el.style.display = 'block'
  if (ev.target.className === 'ghost-card') {
    insertCardNode({ y: screenY, currentTarget, target: currentTarget, element: el })
    return
  }
  insertCardNode({ y: screenY, currentTarget, target, element: el })
}
