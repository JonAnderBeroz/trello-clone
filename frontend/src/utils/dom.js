export const $ = (element, node) => {
  if (node) return node.querySelector(element)
  return document.querySelector(element)
}

export const $$ = (element, node) => {
  if (node) return node.querySelectorAll(element)
  return document.querySelectorAll(element)
}
