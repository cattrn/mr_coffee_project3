document.addEventListener("DOMContentLoaded", () => {

  // DOM elements - Contact form
  const contactForm = document.querySelector('.new-schedule')
  const formSubmit = document.querySelector('.new-schedule button[type="submit"]')

  // don't validate form via HTML
  contactForm.setAttribute("novalidate", true)

  formSubmit.onclick = (event) => {

    // username validation
    const username = document.querySelector('.new-schedule #username')
    const usernameAlert = document.querySelector('.alert.username')
    if (username.value === '') {
      event.preventDefault()
      usernameAlert.innerHTML = 'Please select a username.'
      usernameAlert.style.visibility = 'visible'
    } else if (/[+*?^$\[\]{}()<>|/\s]/.test(username.value)) {
      event.preventDefault()
      usernameAlert.innerHTML = 'Including spaces, the following characters cannot be included in usernames: + * ? ^ [ ] { } ( ) < > | /'
      usernameAlert.style.visibility = 'visible'
    } else {
      usernameAlert.style.visibility = 'hidden'
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
    const startAt = document.querySelector('.new-schedule #start_time')
    const startAtAlert = document.querySelector('.alert.start_time')
    if (startAt.value === '') {
      event.preventDefault()
      startAtAlert.innerHTML = 'Please include a start time.'
      startAtAlert.style.visibility = 'visible'
    } else if (/^((0[0-9])|(1[0-9])|(2[0-3]))(:[0-5][0-9])$/.test(startAt.value) !== true) {
      event.preventDefault()
      startAtAlert.innerHTML = 'Please check the format of your time.'
      startAtAlert.style.visibility = 'visible'
    } else {
      startAtAlert.style.visibility = 'hidden'
    }

    // end time validation
    // TODO: check if earlier than start time
    const endAt = document.querySelector('.new-schedule #end_time')
    const endAtAlert = document.querySelector('.alert.end_time')
    if (endAt.value === '') {
      event.preventDefault()
      endAtAlert.innerHTML = 'Please include an end time.'
      endAtAlert.style.visibility = 'visible'
    } else if (/^((0[0-9])|(1[0-9])|(2[0-3]))(:[0-5][0-9])$/.test(endAt.value) !== true) {
      event.preventDefault()
      endAtAlert.innerHTML = 'Please check the format of your time.'
      endAtAlert.style.visibility = 'visible'
    } else {
      endAtAlert.style.visibility = 'hidden'
    }
  }
})