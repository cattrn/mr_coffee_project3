document.addEventListener("DOMContentLoaded", () => {

  // DOM elements - Contact form
  const contactForm = document.querySelector('.new-schedule')
  const formSubmit = document.querySelector('.new-schedule button[type="submit"]')

  // don't validate form via HTML
  contactForm.setAttribute("novalidate", true)

  formSubmit.onclick = (event) => {

    // name validation
    const name = document.querySelector('.new-schedule #name')
    const nameAlert = document.querySelector('.alert.name')
    if (name.value === '') {
      event.preventDefault()
      nameAlert.innerHTML = 'Please select a name.'
      nameAlert.style.visibility = 'visible'
    } else {
      nameAlert.style.visibility = 'hidden'
    }

    // day validation
    const day = document.querySelector('.new-schedule #day')
    const dayAlert = document.querySelector('.alert.day')
    if (day.value === '') {
      event.preventDefault()
      dayAlert.innerHTML = 'Please select a day.'
      dayAlert.style.visibility = 'visible'
    } else {
      dayAlert.style.visibility = 'hidden'
    }

    // start time validation
    const startAt = document.querySelector('.new-schedule #start_at')
    const startAtAlert = document.querySelector('.alert.start_at')
    if (startAt.value === '') {
      event.preventDefault()
      startAtAlert.innerHTML = 'Please include a start time.'
      startAtAlert.style.visibility = 'visible'
    } else if (/^([1-9]|(1[0-2]))(:[0-5][0-9])?((AM)|(PM))$/i.test(startAt.value) !== true) {
      event.preventDefault()
      startAtAlert.innerHTML = 'Please check the format of your time.'
      startAtAlert.style.visibility = 'visible'
    } else {
      startAtAlert.style.visibility = 'hidden'
    }

    // end time validation
    const endAt = document.querySelector('.new-schedule #end_at')
    const endAtAlert = document.querySelector('.alert.end_at')
    if (endAt.value === '') {
      event.preventDefault()
      endAtAlert.innerHTML = 'Please include an end time.'
      endAtAlert.style.visibility = 'visible'
    } else if (/^([1-9]|(1[0-2]))(:[0-5][0-9])?((AM)|(PM))$/i.test(endAt.value) !== true) {
      event.preventDefault()
      endAtAlert.innerHTML = 'Please check the format of your time.'
      endAtAlert.style.visibility = 'visible'
    } else {
      endAtAlert.style.visibility = 'hidden'
    }
  }
})