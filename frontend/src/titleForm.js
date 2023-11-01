import { $$ } from './utils'

const $$titles = $$('.title')
const $$titleForms = $$('.title-form')

export function openTitleForm (e) {
  e.preventDefault()
  const titleForm = e.target.nextElementSibling
  const input = titleForm.children[0]
  input.value = e.target.innerText
  titleForm.style.display = 'flex'
  input.select()
  e.target.style.display = 'none'
}

export function changeTitle (e) {
  e.preventDefault()
  const { value } = e.target[0]
  const title = e.target.previousElementSibling
  title.innerText = value
  e.target.style.display = 'none'
  title.style.display = 'block'
}

$$titles.forEach($title =>
  $title.addEventListener('click', openTitleForm)
)

$$titleForms.forEach($titleForm => {
  $titleForm.addEventListener('submit', changeTitle)
  $titleForm.addEventListener('focusout', (e) => {
    e.preventDefault()
    const title = $titleForm.previousElementSibling
    $titleForm.style.display = 'none'
    title.style.display = 'block'
  })
}
)
