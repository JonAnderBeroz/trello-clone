export function cancelIcon () {
  const cancelSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

  const iconPath1 = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  )
  const iconPath2 = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  )
  cancelSvg.setAttribute('fill', 'none')
  cancelSvg.setAttribute('viewBox', '0 0 24 24')
  cancelSvg.setAttribute('width', '24')
  cancelSvg.setAttribute('height', '24')
  cancelSvg.setAttribute('stroke', 'currentColor')
  cancelSvg.setAttribute('stroke-width', '2')
  cancelSvg.setAttribute('stroke-linejoin', 'round')

  iconPath1.setAttribute(
    'd',
    'M18 6l-12 12'
  )
  iconPath2.setAttribute(
    'd',
    'M6 6l12 12'
  )

  cancelSvg.appendChild(iconPath1)
  cancelSvg.appendChild(iconPath2)
  return cancelSvg
}

export function addIcon () {
  const addSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  const iconPath1 = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  )
  const iconPath2 = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  )
  addSvg.setAttribute('fill', 'none')
  addSvg.setAttribute('viewBox', '0 0 20 20')
  addSvg.setAttribute('width', '20')
  addSvg.setAttribute('height', '20')
  addSvg.setAttribute('stroke', 'currentColor')
  addSvg.setAttribute('stroke-width', '2')
  addSvg.setAttribute('stroke-linejoin', 'round')
  iconPath1.setAttribute(
    'd',
    'M12 5l0 14'
  )
  iconPath2.setAttribute(
    'd',
    'M5 12l14 0'
  )
  addSvg.appendChild(iconPath1)
  addSvg.appendChild(iconPath2)
  return addSvg
}
