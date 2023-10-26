import { $, insertNode } from './utils'

export function dragstartHandler (ev) {
  const { dataTransfer, target } = ev
  dataTransfer.setData('text/plain', JSON.stringify({ id: target.id, height: target.offsetHeight }))
  dataTransfer.dropEffect = 'move'
}

function createGhost (target, height) {
  const ghostCard = document.createElement('div')
  ghostCard.height = height
  ghostCard.className = 'ghost-card'
  ghostCard.style = `--ghost-height:${height}px`
  target.prepend(ghostCard)
}

export function dragEnter (ev, el) {
  const { dataTransfer, target } = ev
  if (target !== el) return
  const data = dataTransfer.getData('text/plain')
  const { height } = JSON.parse(data)
  createGhost(el, height)
}

export function dragLeave (ev, el) {
}

export function dragoverHandler (ev) {
  ev.preventDefault()
  ev.dataTransfer.dropEffect = 'move'
}

export function dropHandler (ev) {
  ev.preventDefault()
  const data = ev.dataTransfer.getData('text/plain')
  const { id } = JSON.parse(data)
  const { screenY, currentTarget, target } = ev
  const el = $(`#${id}`)
  insertNode({ y: screenY, currentTarget, target, element: el })
}
